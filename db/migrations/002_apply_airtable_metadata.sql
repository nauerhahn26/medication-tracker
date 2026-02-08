begin;
update med set
      med_type = 'Pharmaceutical',
      target = 'Head Growth,Loss of Function,Gross Motor,Mitochondrial Support',
      delivery_mechanism = 'Before Meals in Pudding',
      result = 'Ellie stopped losing function. Ellie runs around. Remains on head growth chart.
',
      source = '24 patient study in Italy in 2014 that showed improved head growth. Mechanistically makes sense as its the most powerful anti-oxidant ever created.
',
      dose_at_13kg = '2ml TID',
      brand = NULL,
      supporting_research = '*https://clinicaltrials.gov/study/NCT01822249
*https://journals.sagepub.com/doi/10.1177/2326409817733013
*https://www.prnewswire.com/news-releases/edison-pharmaceuticals-announces-phase-2-positive-clinical-results-for-epi-743-in-rett-syndrome-273691331.html


'
    where id = '9bff836d-995a-46e9-8fb1-b769c59e57b0';
update med set
      med_type = 'Pharmaceutical',
      target = 'Sleep,Apneas,Weight Gain',
      delivery_mechanism = 'Pill in Pudding Before Bed',
      result = 'Ellie started sleeping through the night, increased appetite, and reduced apneas.',
      source = '80 patient study in Italy showing improved sleep, reduced apneas, increase appetite.
',
      dose_at_13kg = '7.5mg QHS',
      brand = NULL,
      supporting_research = '*https://pubmed.ncbi.nlm.nih.gov/32988385
*https://pubmed.ncbi.nlm.nih.gov/35358499/'
    where id = 'fe66d45b-3024-4adc-a054-0a06fdc077b0';
update med set
      med_type = 'Pharmaceutical',
      target = 'Hand Function,Executive Function,Speech',
      delivery_mechanism = 'Pill in Pudding Before Bed',
      result = 'Ellie became where more alert, better eye contact, improved AAC.
',
      source = 'RTT organoid study, Aricept normalized firing activity. Planned study in AU.
',
      dose_at_13kg = '2.5mg QHS',
      brand = NULL,
      supporting_research = '*https://finance.yahoo.com/news/vyant-bio-presents-key-takeaways-220500638.html?
*https://rettsyndromenews.com/news/mecp2-deficiency-rett-linked-low-acetylcholine-increased-symptoms
'
    where id = '25ea6194-e150-454e-a773-6d0694a0efe1';
update med set
      med_type = 'Pharmaceutical',
      target = 'Weight Gain,Seizures',
      delivery_mechanism = 'In Food',
      result = 'No seizures. Ellie maintains weight chart.
',
      source = '12 patient study at Emory beginning in 2017. Anecdotal reduction in seizures. Good in vitro data on improved cell function in RTT cells. Mechanism makes sense.
',
      dose_at_13kg = '12.5ml 5x/day',
      brand = 'https://www.dojolvi.com/',
      supporting_research = '*https://aesnet.org/abstractslisting/treatment-of-mitochondrial-dysfunction-in-rett-syndrome-with-triheptanoin
*https://pubmed.ncbi.nlm.nih.gov/25299635/
'
    where id = '1051e36d-2532-4fd1-ac7a-6d6176d9421a';
update med set
      med_type = 'Pharmaceutical',
      target = 'Hand Function',
      delivery_mechanism = 'On its Own',
      result = 'Ellie started playing with her toys again.
',
      source = '24 patient study ~2020. Reports of improvements. Meaningful results found in RTT mice. Mechanism makes sense.
',
      dose_at_13kg = '4ml 2x/week',
      brand = NULL,
      supporting_research = '*https://clinicaltrials.gov/study/NCT03633058
*https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7410367/
'
    where id = 'd4d74cd9-5bdf-4654-9b2a-0d09df4c9d64';
update med set
      med_type = 'Nutraceutical',
      target = 'Immune Dysfunction',
      delivery_mechanism = 'Before Meals in Pudding',
      result = 'Hard to say
',
      source = 'Standard of care in Italy. Strong in vitro data. Mechanism makes sense.
',
      dose_at_13kg = '650 IU QD',
      brand = 'https://www.amazon.com/Organic-MaryRuths-Supplement-Formulated-Servings/dp/B08TC5GB4W',
      supporting_research = '*https://rettsyndromenews.com/news/vitamin-d-supplementation-improves-behaviors-rett-mouse-model/
*https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3638258'
    where id = 'd054060e-d6eb-449a-9284-40dc2744e2cb';
update med set
      med_type = 'Nutraceutical',
      target = 'Sleep,Dystonia,Gross Motor,Excitatory/Inhibitory Imbalance',
      delivery_mechanism = 'In Night Time Bottle',
      result = 'Ellie''s movements smoothed out.
',
      source = 'Reported in community, mechanism makes sense.',
      dose_at_13kg = '200mg QHS',
      brand = 'https://www.lifeextension.com/vitamins-supplements/item01603/neuro-mag-magnesium-l-threonate',
      supporting_research = NULL
    where id = 'fbb28f35-a69d-43f8-905c-eaa7888fb1db';
update med set
      med_type = 'Nutraceutical',
      target = 'Immune Dysfunction,Loss of Function,Inflammation',
      delivery_mechanism = 'Pouch (amazon.com/dp/B072QWWQC5)',
      result = 'Ellie stopped losing function after she''d get sick.
',
      source = 'Studied in CDKL5 & Long Covid. Mechanism makes sense.',
      dose_at_13kg = '20 QD',
      brand = 'https://www.amazon.com/dp/B0B355TDL1',
      supporting_research = '*https://pubmed.ncbi.nlm.nih.gov/35955854/
*https://www.nature.com/articles/s41598-023-41101-9
'
    where id = 'b82399e3-d4a0-4d5f-a5d3-1802c80d95e7';
update med set
      med_type = 'Nutraceutical',
      target = 'Mitochondrial Support',
      delivery_mechanism = 'Pouch (amazon.com/dp/B072QWWQC5)',
      result = 'More alert
',
      source = 'Mito cocktail, planned study in Canada.',
      dose_at_13kg = '250mg QD',
      brand = 'https://www.lifeextension.com/vitamins-supplements/item01534/n-acetyl-l-cysteine',
      supporting_research = '*https://www.rett.ca/news/canadas-first-clinical-trial-for-rett-syndrome-to-commence-early-2020/2019/'
    where id = '80257b52-32d0-46a1-abdb-af689b94ca25';
update med set
      med_type = 'Nutraceutical',
      target = 'Inflammation,Speech,Gross Motor',
      delivery_mechanism = 'In Smoothie',
      result = 'More speech. Maybe an improvement with climbing stairs.
',
      source = 'Studied in ALS and other neurological disorders. Mechanism makes sense.',
      dose_at_13kg = '75mg QD',
      brand = 'https://www.amazon.com/Integrative-Therapeutics-Theracurmin-Supplement-Bioavailable/dp/B00UZE9YZI',
      supporting_research = '*https://pubmed.ncbi.nlm.nih.gov/30033879/
'
    where id = '5a73853f-4dda-4614-aed5-8846a25564f9';
update med set
      med_type = 'Nutraceutical',
      target = 'Mitochondrial Support,Weight Gain',
      delivery_mechanism = 'Pouch (amazon.com/dp/B072QWWQC5)',
      result = 'Hard to say, but imagine helps with weight gain
',
      source = 'Mito cocktail, planned study in Canada.
',
      dose_at_13kg = '2500mg QD',
      brand = 'https://www.amazon.com/Thorne-Creatine-High-Quality-Monohydrate-Gluten-Free/dp/B07978VPPH',
      supporting_research = '*https://pubmed.ncbi.nlm.nih.gov/21654506/
'
    where id = 'f1a15c13-f80e-4c33-af79-262f5119321b';
update med set
      med_type = 'Nutraceutical',
      target = 'Mitochondrial Support,Loss of Function',
      delivery_mechanism = 'Fruit Salad',
      result = 'More alert',
      source = 'Mito cocktail, planned study in Canada.
',
      dose_at_13kg = '90mg BID',
      brand = 'https://www.amazon.com/dp/B079S36KFV',
      supporting_research = '*https://www.rett.ca/news/canadas-first-clinical-trial-for-rett-syndrome-to-commence-early-2020/2019/'
    where id = '5af68bf1-42c2-416e-9dda-4a8c563f1cb7';
update med set
      med_type = 'Nutraceutical',
      target = 'Gross Motor,Weight Gain',
      delivery_mechanism = 'In Smoothie',
      result = 'Walking better',
      source = 'Made sense to support her ligaments
',
      dose_at_13kg = '5g QD',
      brand = 'https://www.amazon.com/gp/product/B005KG7EDU/',
      supporting_research = NULL
    where id = '4be4d92e-714f-4486-8ba1-c5a42ecc1b7b';
update med set
      med_type = 'Nutraceutical',
      target = 'Mitochondrial Support,Weight Gain',
      delivery_mechanism = 'Pouch (amazon.com/dp/B072QWWQC5)',
      result = 'Hard to say',
      source = 'Mouse data showing improved neurite growth and cell body growth.',
      dose_at_13kg = '330mg QD',
      brand = 'https://www.lifeextension.com/vitamins-supplements/item01532/l-carnitine',
      supporting_research = '*https://pubmed.ncbi.nlm.nih.gov/10190267/
*https://pubmed.ncbi.nlm.nih.gov/8272924/
'
    where id = 'a7fa1549-562a-47db-88f3-01369b04db42';
update med set
      med_type = 'Nutraceutical',
      target = 'Mitochondrial Support,Weight Gain',
      delivery_mechanism = 'Pouch (amazon.com/dp/B072QWWQC5)',
      result = 'More energy',
      source = 'Mito cocktail, planned study in Canada.

',
      dose_at_13kg = '37mg QD',
      brand = 'https://www.amazon.com/dp/B00VVLAPKM',
      supporting_research = '*https://www.rett.ca/news/canadas-first-clinical-trial-for-rett-syndrome-to-commence-early-2020/2019/
'
    where id = '2b5f63ca-812a-46d7-87d2-a6a140b82dbc';
update med set
      med_type = 'Nutraceutical',
      target = 'Mitochondrial Support',
      delivery_mechanism = 'Pouch (amazon.com/dp/B072QWWQC5)',
      result = 'More energy',
      source = 'Mito cocktail, planned study in Canada.',
      dose_at_13kg = '18mg QD',
      brand = 'https://www.amazon.com/Herb-Science-Vitamin-Supplement-Riboflavin-Non-Alcoholic/dp/B07DP651RW',
      supporting_research = '*https://www.rett.ca/news/canadas-first-clinical-trial-for-rett-syndrome-to-commence-early-2020/2019/
'
    where id = '47199a7a-2e09-4ba3-87ed-b3fa1469e907';
update med set
      med_type = 'Nutraceutical',
      target = 'Regularity,Mitochondrial Support',
      delivery_mechanism = 'Before Meals in Pudding',
      result = 'Ellie started pooping almost daily.
',
      source = 'Studied in aging, mechanism makes sense.',
      dose_at_13kg = '125 QD',
      brand = 'https://www.timelinenutrition.com/products/mitopure-powder',
      supporting_research = '*https://www.sciencedirect.com/science/article/abs/pii/S0028390822000223
*https://www.science.org/doi/10.1126/scitranslmed.abb0319#sec-2'
    where id = '5a2a1874-07ac-4442-91cb-522bd8f4dabe';
update med set
  med_type = 'Nutraceutical',
  target = 'Sleep',
  delivery_mechanism = 'In Night Time Bottle',
  result = 'Maybe better sleep',
  source = 'Tried for sleep',
  dose_at_13kg = '10mg QHS',
  brand = 'https://www.amazon.com/dp/B08KFCTLRG',
  supporting_research = NULL
where id = 'b06fb5c1-0362-4834-b558-e8bf57beee2b';
update med set
      med_type = 'Nutraceutical',
      target = 'Mitochondrial Support,Excitatory/Inhibitory Imbalance',
      delivery_mechanism = 'Pouch (amazon.com/dp/B072QWWQC5)',
      result = 'More alert',
      source = 'Studied in Angelmann, mechanism makes sense.',
      dose_at_13kg = '250mg QD',
      brand = 'https://www.lifeextension.com/vitamins-supplements/item01827/taurine',
      supporting_research = '*https://pubmed.ncbi.nlm.nih.gov/29621152/
'
    where id = '00a14a60-0659-4d02-908b-502cb99f6834';
update med set
      med_type = 'Nutraceutical',
      target = 'Excitatory/Inhibitory Imbalance',
      delivery_mechanism = 'Before Meals in Pudding',
      result = 'Hard to say',
      source = 'In vitro data shows activates KCC2 to help cells achieve better inhibitory/excitatory balance.',
      dose_at_13kg = '2mg QD',
      brand = 'https://botany.bio/',
      supporting_research = '*https://pubmed.ncbi.nlm.nih.gov/31366578/
'
    where id = '68c6d310-1ec3-470a-b099-4556c5d4b48b';
update med set
  med_type = 'Nutraceutical',
  target = 'Circulation',
  delivery_mechanism = 'Fruit Salad',
  result = 'Warmer hands',
  source = 'Found to improve circulation.',
  dose_at_13kg = '30mg QD',
  brand = 'https://www.fruitflowplus.com/buy/',
  supporting_research = NULL
where id = 'b285aef1-37c7-46e6-b081-456c7d930eb8';
update med set
      med_type = 'Nutraceutical',
      target = 'Loss of Function,Gross Motor,Mitochondrial Support',
      delivery_mechanism = NULL,
      result = 'More alert, learned to walk
',
      source = 'Standard of care in Italy. Small patient studies conducted. Mechanism makes sense.',
      dose_at_13kg = '150mg TID',
      brand = 'https://www.amazon.com/Puritans-Pride-Ubiquinol-Release-Softgels/dp/B004R675BU',
      supporting_research = '*https://pubmed.ncbi.nlm.nih.gov/31595423/
'
    where id = 'e5443cef-b53c-4251-869d-4c19a217d993';
commit;