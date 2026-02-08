import csv, difflib, re, json, subprocess, textwrap

def normalize(s):
    s=s.lower().strip()
    s=s.replace('&','and')
    s=re.sub(r'\b(l|d|dl)[- ]','', s)
    s=re.sub(r'[^a-z0-9]+','', s)
    return s

psql_cmd = ['/opt/homebrew/opt/postgresql@16/bin/psql','postgres://localhost:5432/medication_tracker','-Atc','select id, name from med']
med_rows = subprocess.check_output(psql_cmd, text=True).strip().split('\n')
meds=[]
for line in med_rows:
    if not line:
        continue
    med_id, name = line.split('|',1)
    meds.append((med_id, name, normalize(name)))

path='/Users/noah/Dropbox/Downloads/Medications-Grid view (2).csv'
with open(path, newline='') as f:
    reader=csv.DictReader(f)
    rows=list(reader)

if rows:
    name_key = 'Name'
    if name_key not in rows[0]:
        for k in rows[0].keys():
            if k.strip().lower().endswith('name'):
                name_key = k
                break
else:
    name_key = 'Name'

updates=[]
unmatched=[]

for row in rows:
    raw_name = (row.get(name_key,'') or '').strip()
    if not raw_name:
        continue
    norm = normalize(raw_name)
    best=None
    best_ratio=0.0
    for med_id, name, n in meds:
        ratio = difflib.SequenceMatcher(None, norm, n).ratio()
        if ratio>best_ratio:
            best_ratio=ratio
            best=(med_id, name)
    if best is None or best_ratio < 0.82:
        unmatched.append((raw_name, best_ratio, best[1] if best else None))
        continue
    med_id, matched_name = best
    updates.append({
        'id': med_id,
        'matched_name': matched_name,
        'source_name': raw_name,
        'med_type': row.get('(Pharma/Nutra)-ceutical','') or None,
        'target': row.get('Target','') or None,
        'delivery_mechanism': row.get('Delivery Mechanism','') or None,
        'result': row.get('Result','') or None,
        'source': row.get('Source','') or None,
        'dose_at_13kg': row.get('Dose @ 13kg','') or None,
        'brand': row.get('Brand','') or None,
        'supporting_research': row.get('Supporting Research','') or None,
    })


def esc(v):
    if v is None or v=='':
        return 'NULL'
    return "'" + v.replace("'","''") + "'"

sql_lines=["begin;"]
for u in updates:
    sql_lines.append(textwrap.dedent(f"""
    update med set
      med_type = {esc(u['med_type'])},
      target = {esc(u['target'])},
      delivery_mechanism = {esc(u['delivery_mechanism'])},
      result = {esc(u['result'])},
      source = {esc(u['source'])},
      dose_at_13kg = {esc(u['dose_at_13kg'])},
      brand = {esc(u['brand'])},
      supporting_research = {esc(u['supporting_research'])}
    where id = '{u['id']}';
    """).strip())

sql_lines.append('commit;')

out_sql='/Users/noah/medication-tracker/db/migrations/002_apply_airtable_metadata.sql'
with open(out_sql,'w') as f:
    f.write('\n'.join(sql_lines))

out_unmatched='/Users/noah/medication-tracker/db/migrations/002_airtable_unmatched.json'
with open(out_unmatched,'w') as f:
    json.dump(unmatched, f, indent=2)

print('name_key', name_key)
print('updates', len(updates))
print('unmatched', len(unmatched))
print('sql', out_sql)
print('unmatched_report', out_unmatched)
