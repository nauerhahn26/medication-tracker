begin;
delete from dose_event where user_id = 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3';
delete from med_product where user_id = 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3';
delete from med where user_id = 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3';
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('d6be662d-1f45-4d16-b90e-614513b87d0b', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'KEPPRA (Oral Pill)', 'RxNorm', '1', 't', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('7cbf226b-df36-4b7a-b79c-c965530e51b9', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Ubiquinone', NULL, NULL, 't', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('ad80d422-6080-47ad-92b9-24617ba3aa88', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'CBD (60 Hemp)', NULL, NULL, 't', NULL, 'Pharmaceutical,Nutraceutical', 'Dystonia,Seizures', 'With Bottle', 'Dystonia went away.', '100+ patient study, ended due to COVID. Community reports improvements in dystonia. ', '.5ml BID', 'https://www.charlottesweb.com/maximum-strength-hemp-extract-cbd-oil', '*https://clinicaltrials.gov/study/NCT03848832*https://rettsyndromenews.com/news/rett-patients-have-fewer-monthly-seizures-cannabidivarin-treatment/')
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('3072a3b9-c352-499f-b810-5893eb1c90cd', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'DHA', NULL, NULL, 't', NULL, 'Nutraceutical', 'Mitochondrial Support', 'In Food', 'Hard to say', 'Standard of care in Italy. Data showed improved bone density. Mechanism makes sense.', '1000mg QD', 'https://www.amazon.com/dp/B001LF39RE', '*https://rettsyndromenews.com/news/omega-3-fatty-acid-dha-raises-energy-astrocytes-lacking-mecp2-protein*https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3380188/')
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('333bfae0-515f-48db-9415-4400cae617ff', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Vitamin E', NULL, NULL, 't', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('8f27ef09-1879-4de8-b5e4-6f5a652595b2', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Lipoic Acid', NULL, NULL, 't', NULL, 'Nutraceutical', 'Mitochondrial Support,Loss of Function', 'Fruit Salad', 'More energy', 'Mito cocktail, planned study in Canada.', '50mg BID', 'https://www.amazon.com/dp/B07XTS5FMS', '*https://www.rett.ca/news/canadas-first-clinical-trial-for-rett-syndrome-to-commence-early-2020/2019/')
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('61d0b0a7-ee59-443d-9fa1-a94ec8fc0866', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Vitamin C', NULL, NULL, 't', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('8c1f394b-9259-4ed9-8d38-378e3f0b1497', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Tyrosine*', NULL, NULL, 't', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('ce6e699c-b775-4159-98c6-d405edd8204a', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'CBD (18:1)', NULL, NULL, 't', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('4d3c927c-3c6e-4239-a4cb-47d16b038415', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'CBD (40:1)', NULL, NULL, 't', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('a7734b30-a4ce-45ca-8ee4-d3cd3beecae1', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'CBD/CBDv', NULL, NULL, 't', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('b0b28a43-9491-4380-8806-4df4a561be2b', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'EPA', NULL, NULL, 't', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('e0b5bd49-c9b6-46e8-b2fd-f4f1a525222b', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'lamoTRIgine (Oral Pill)', 'RxNorm', '1', 't', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('bd3d2dc3-b0fb-4e15-b5f4-b364d26556a1', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Reservatrol', NULL, NULL, 't', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('06657bb8-c2fb-484a-b21b-b5d93d8d9fbd', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'B-Vitamin Mix', NULL, NULL, 't', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('b725322a-9759-4944-9848-9f35af49ac60', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Active B Vitamin', NULL, NULL, 't', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('2a252910-6f0e-4f2d-8d43-810e4b21ce90', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'TTFD', NULL, NULL, 't', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('7814aa0c-e961-499e-bc6b-9c61aaaffa0a', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Magtein', NULL, NULL, 't', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('e0298a46-09c4-4923-8be4-5b9506636506', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Clonidine', NULL, NULL, 't', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('b67a236f-459f-4915-8952-7cead2b14d83', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Gabapentin', NULL, NULL, 't', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('f8970a96-c5fb-4e42-84f0-428c577f4f77', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'NR', NULL, NULL, 't', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('b651048a-289d-4d3d-aa41-6079b0d3ac6d', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Piperine', NULL, NULL, 't', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('6e83b994-b26d-406b-a90a-05de0af48612', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Lion''s Mane', NULL, NULL, 't', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('0daf5b9a-354f-41cc-9c13-6b0b14ca391f', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Ursolic', NULL, NULL, 't', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('df097235-e839-4bef-b89c-888e026bd68f', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Zinc Carnosine (PRN)', NULL, NULL, 't', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('3de8bce6-852a-498d-baad-69842c213d71', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Ozone Water', NULL, NULL, 't', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('6d1ace91-db28-4a49-a4e9-273f2c96366c', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Fimotidine', NULL, NULL, 't', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('98a684c6-66ae-4e58-a146-2c3881949044', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Quercetin', NULL, NULL, 't', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('5c7f0d24-b8dc-4f68-a5f0-64a1f637287d', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'NMN', NULL, NULL, 't', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('4b6b6bb6-e5ff-409a-8c10-b4394854764c', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Fiber', NULL, NULL, 't', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('24ac4b1f-8038-47b6-ae3f-c295f99e8648', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Iron', NULL, NULL, 't', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('588a7ffc-3c4e-408f-8319-12506a20cadd', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Multi', NULL, NULL, 't', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('d6f02422-e48b-461a-a3e5-c1e2bf51c836', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Doxepin', NULL, NULL, 't', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('fe0b5a61-59ef-44af-9841-318a80176eed', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Motegrity', NULL, NULL, 't', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('c25261e9-b846-4f9e-ae45-37622b54aedc', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Rifaximin', NULL, NULL, 't', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('bdcecfa2-f715-46ea-8576-5c43e0c268aa', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Seed Probiotic', NULL, NULL, 't', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('a0db619e-d57e-4afb-b92f-3781257e6ca6', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Thc', NULL, NULL, 't', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('9bff836d-995a-46e9-8fb1-b769c59e57b0', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Vatiquinone', NULL, NULL, 't', NULL, 'Pharmaceutical', 'Head Growth,Loss of Function,Gross Motor,Mitochondrial Support', 'Before Meals in Pudding', 'Ellie stopped losing function. Ellie runs around. Remains on head growth chart.', '24 patient study in Italy in 2014 that showed improved head growth. Mechanistically makes sense as its the most powerful anti-oxidant ever created.', '2ml TID', NULL, '*https://clinicaltrials.gov/study/NCT01822249*https://journals.sagepub.com/doi/10.1177/2326409817733013*https://www.prnewswire.com/news-releases/edison-pharmaceuticals-announces-phase-2-positive-clinical-results-for-epi-743-in-rett-syndrome-273691331.html')
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('fe66d45b-3024-4adc-a054-0a06fdc077b0', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Mirtazapine', NULL, NULL, 't', NULL, 'Pharmaceutical', 'Sleep,Apneas,Weight Gain', 'Pill in Pudding Before Bed', 'Ellie started sleeping through the night, increased appetite, and reduced apneas.', '80 patient study in Italy showing improved sleep, reduced apneas, increase appetite.', '7.5mg QHS', NULL, '*https://pubmed.ncbi.nlm.nih.gov/32988385*https://pubmed.ncbi.nlm.nih.gov/35358499/')
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('25ea6194-e150-454e-a773-6d0694a0efe1', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Aricept', NULL, NULL, 't', NULL, 'Pharmaceutical', 'Hand Function,Executive Function,Speech', 'Pill in Pudding Before Bed', 'Ellie became where more alert, better eye contact, improved AAC.', 'RTT organoid study, Aricept normalized firing activity. Planned study in AU.', '2.5mg QHS', NULL, '*https://finance.yahoo.com/news/vyant-bio-presents-key-takeaways-220500638.html?*https://rettsyndromenews.com/news/mecp2-deficiency-rett-linked-low-acetylcholine-increased-symptoms')
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('1051e36d-2532-4fd1-ac7a-6d6176d9421a', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Triheptanoin', NULL, NULL, 't', NULL, 'Pharmaceutical', 'Weight Gain,Seizures', 'In Food', 'No seizures. Ellie maintains weight chart.', '12 patient study at Emory beginning in 2017. Anecdotal reduction in seizures. Good in vitro data on improved cell function in RTT cells. Mechanism makes sense.', '12.5ml 5x/day', 'https://www.dojolvi.com/', '*https://aesnet.org/abstractslisting/treatment-of-mitochondrial-dysfunction-in-rett-syndrome-with-triheptanoin*https://pubmed.ncbi.nlm.nih.gov/25299635/')
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('d4d74cd9-5bdf-4654-9b2a-0d09df4c9d64', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Ketamine', NULL, NULL, 't', NULL, 'Pharmaceutical', 'Hand Function', 'On its Own', 'Ellie started playing with her toys again.', '24 patient study ~2020. Reports of improvements. Meaningful results found in RTT mice. Mechanism makes sense.', '4ml 2x/week', NULL, '*https://clinicaltrials.gov/study/NCT03633058*https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7410367/')
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('d054060e-d6eb-449a-9284-40dc2744e2cb', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Vitamin D', NULL, NULL, 't', NULL, 'Nutraceutical', 'Immune Dysfunction', 'Before Meals in Pudding', 'Hard to say', 'Standard of care in Italy. Strong in vitro data. Mechanism makes sense.', '650 IU QD', 'https://www.amazon.com/Organic-MaryRuths-Supplement-Formulated-Servings/dp/B08TC5GB4W', '*https://rettsyndromenews.com/news/vitamin-d-supplementation-improves-behaviors-rett-mouse-model/*https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3638258')
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('fbb28f35-a69d-43f8-905c-eaa7888fb1db', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Magnesium Citrate', NULL, NULL, 't', NULL, 'Nutraceutical', 'Sleep,Dystonia,Gross Motor,Excitatory/Inhibitory Imbalance', 'In Night Time Bottle', 'Ellie''s movements smoothed out.', 'Reported in community, mechanism makes sense.', '200mg QHS', 'https://www.lifeextension.com/vitamins-supplements/item01603/neuro-mag-magnesium-l-threonate', NULL)
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('b82399e3-d4a0-4d5f-a5d3-1802c80d95e7', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Luteolin', NULL, NULL, 't', NULL, 'Nutraceutical', 'Immune Dysfunction,Loss of Function,Inflammation', 'Pouch (amazon.com/dp/B072QWWQC5)', 'Ellie stopped losing function after she''d get sick.', 'Studied in CDKL5 & Long Covid. Mechanism makes sense.', '20 QD', 'https://www.amazon.com/dp/B0B355TDL1', '*https://pubmed.ncbi.nlm.nih.gov/35955854/*https://www.nature.com/articles/s41598-023-41101-9')
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('80257b52-32d0-46a1-abdb-af689b94ca25', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'NAC', NULL, NULL, 't', NULL, 'Nutraceutical', 'Mitochondrial Support', 'Pouch (amazon.com/dp/B072QWWQC5)', 'More alert', 'Mito cocktail, planned study in Canada.', '250mg QD', 'https://www.lifeextension.com/vitamins-supplements/item01534/n-acetyl-l-cysteine', '*https://www.rett.ca/news/canadas-first-clinical-trial-for-rett-syndrome-to-commence-early-2020/2019/')
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('4be4d92e-714f-4486-8ba1-c5a42ecc1b7b', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Collagen', NULL, NULL, 't', NULL, 'Nutraceutical', 'Gross Motor,Weight Gain', 'In Smoothie', 'Walking better', 'Made sense to support her ligaments', '5g QD', 'https://www.amazon.com/gp/product/B005KG7EDU/', NULL)
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('5a73853f-4dda-4614-aed5-8846a25564f9', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Curcumin', NULL, NULL, 't', NULL, 'Nutraceutical', 'Inflammation,Speech,Gross Motor', 'In Smoothie', 'More speech. Maybe an improvement with climbing stairs.', 'Studied in ALS and other neurological disorders. Mechanism makes sense.', '75mg QD', 'https://www.amazon.com/Integrative-Therapeutics-Theracurmin-Supplement-Bioavailable/dp/B00UZE9YZI', '*https://pubmed.ncbi.nlm.nih.gov/30033879/')
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('f1a15c13-f80e-4c33-af79-262f5119321b', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Creatine', NULL, NULL, 't', NULL, 'Nutraceutical', 'Mitochondrial Support,Weight Gain', 'Pouch (amazon.com/dp/B072QWWQC5)', 'Hard to say, but imagine helps with weight gain', 'Mito cocktail, planned study in Canada.', '2500mg QD', 'https://www.amazon.com/Thorne-Creatine-High-Quality-Monohydrate-Gluten-Free/dp/B07978VPPH', '*https://pubmed.ncbi.nlm.nih.gov/21654506/')
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('5af68bf1-42c2-416e-9dda-4a8c563f1cb7', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Glutathione', NULL, NULL, 't', NULL, 'Nutraceutical', 'Mitochondrial Support,Loss of Function', 'Fruit Salad', 'More alert', 'Mito cocktail, planned study in Canada.', '90mg BID', 'https://www.amazon.com/dp/B079S36KFV', '*https://www.rett.ca/news/canadas-first-clinical-trial-for-rett-syndrome-to-commence-early-2020/2019/')
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('a7fa1549-562a-47db-88f3-01369b04db42', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Carnitine*', NULL, NULL, 't', NULL, 'Nutraceutical', 'Mitochondrial Support,Weight Gain', 'Pouch (amazon.com/dp/B072QWWQC5)', 'Hard to say', 'Mouse data showing improved neurite growth and cell body growth.', '330mg QD', 'https://www.lifeextension.com/vitamins-supplements/item01532/l-carnitine', '*https://pubmed.ncbi.nlm.nih.gov/10190267/*https://pubmed.ncbi.nlm.nih.gov/8272924/')
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('2b5f63ca-812a-46d7-87d2-a6a140b82dbc', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Thiamine', NULL, NULL, 't', NULL, 'Nutraceutical', 'Mitochondrial Support,Weight Gain', 'Pouch (amazon.com/dp/B072QWWQC5)', 'More energy', 'Mito cocktail, planned study in Canada.', '37mg QD', 'https://www.amazon.com/dp/B00VVLAPKM', '*https://www.rett.ca/news/canadas-first-clinical-trial-for-rett-syndrome-to-commence-early-2020/2019/')
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('47199a7a-2e09-4ba3-87ed-b3fa1469e907', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Riboflavin', NULL, NULL, 't', NULL, 'Nutraceutical', 'Mitochondrial Support', 'Pouch (amazon.com/dp/B072QWWQC5)', 'More energy', 'Mito cocktail, planned study in Canada.', '18mg QD', 'https://www.amazon.com/Herb-Science-Vitamin-Supplement-Riboflavin-Non-Alcoholic/dp/B07DP651RW', '*https://www.rett.ca/news/canadas-first-clinical-trial-for-rett-syndrome-to-commence-early-2020/2019/')
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('5a2a1874-07ac-4442-91cb-522bd8f4dabe', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Urolithin A', NULL, NULL, 't', NULL, 'Nutraceutical', 'Regularity,Mitochondrial Support', 'Before Meals in Pudding', 'Ellie started pooping almost daily.', 'Studied in aging, mechanism makes sense.', '125 QD', 'https://www.timelinenutrition.com/products/mitopure-powder', '*https://www.sciencedirect.com/science/article/abs/pii/S0028390822000223*https://www.science.org/doi/10.1126/scitranslmed.abb0319#sec-2')
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('b06fb5c1-0362-4834-b558-e8bf57beee2b', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Gaba', NULL, NULL, 't', NULL, 'Nutraceutical', 'Sleep', 'In Night Time Bottle', 'Maybe better sleep', 'Tried for sleep', '10mg QHS', 'https://www.amazon.com/dp/B08KFCTLRG', NULL)
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('00a14a60-0659-4d02-908b-502cb99f6834', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Taurine***', NULL, NULL, 't', NULL, 'Nutraceutical', 'Mitochondrial Support,Excitatory/Inhibitory Imbalance', 'Pouch (amazon.com/dp/B072QWWQC5)', 'More alert', 'Studied in Angelmann, mechanism makes sense.', '250mg QD', 'https://www.lifeextension.com/vitamins-supplements/item01827/taurine', '*https://pubmed.ncbi.nlm.nih.gov/29621152/')
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('68c6d310-1ec3-470a-b099-4556c5d4b48b', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Piperine*', NULL, NULL, 't', NULL, 'Nutraceutical', 'Excitatory/Inhibitory Imbalance', 'Before Meals in Pudding', 'Hard to say', 'In vitro data shows activates KCC2 to help cells achieve better inhibitory/excitatory balance.', '2mg QD', 'https://botany.bio/', '*https://pubmed.ncbi.nlm.nih.gov/31366578/')
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('b285aef1-37c7-46e6-b081-456c7d930eb8', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Fruit Flow', NULL, NULL, 't', NULL, 'Nutraceutical', 'Circulation', 'Fruit Salad', 'Warmer hands', 'Found to improve circulation.', '30mg QD', 'https://www.fruitflowplus.com/buy/', NULL)
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('e5443cef-b53c-4251-869d-4c19a217d993', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Ubiquinol', NULL, NULL, 't', NULL, 'Nutraceutical', 'Loss of Function,Gross Motor,Mitochondrial Support', NULL, 'More alert, learned to walk', 'Standard of care in Italy. Small patient studies conducted. Mechanism makes sense.', '150mg TID', 'https://www.amazon.com/Puritans-Pride-Ubiquinol-Release-Softgels/dp/B004R675BU', '*https://pubmed.ncbi.nlm.nih.gov/31595423/')
on conflict (id) do nothing;
insert into med (id, user_id, name, standard_code_system, standard_code, is_supplement, notes, med_type, target, delivery_mechanism, result, source, dose_at_13kg, brand, supporting_research)
values ('ff03a147-dd30-44fd-9dd2-f2c3d580c636', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'Melatonin (at night)', NULL, NULL, 't', NULL, 'Nutraceutical', 'Sleep', 'With Bottle', 'Better sleep onset', 'Well studied in pediatric sleep disorders.', '1.5mg QHS', 'https://www.amazon.com/Life-Extension-Fast-Acting-Liquid-Melatonin/dp/B07DBG625G', '*https://pubmed.ncbi.nlm.nih.gov/9566656/')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('58495a9d-e720-4687-bd1e-7c23f6d95d19', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'e5443cef-b53c-4251-869d-4c19a217d993', NULL, '2021-04-20', '100', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('647c06e4-62e2-4110-89d3-7b914efb02f9', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'e5443cef-b53c-4251-869d-4c19a217d993', NULL, '2021-04-26', '150', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('56ba827a-a110-4665-9b67-557f469fa200', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'e5443cef-b53c-4251-869d-4c19a217d993', NULL, '2021-05-13', '200', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('af1834cc-fd89-4438-81c2-386a79eb56ba', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'e5443cef-b53c-4251-869d-4c19a217d993', NULL, '2021-05-18', '250', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('02d77c64-1e6c-41df-bf69-d1877f251119', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'e5443cef-b53c-4251-869d-4c19a217d993', NULL, '2021-06-12', '330', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('1f18676b-78eb-418f-a319-1540439a4286', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'e5443cef-b53c-4251-869d-4c19a217d993', NULL, '2021-06-16', '400', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('0f871e12-e388-4913-ab32-10c5efb409aa', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'e5443cef-b53c-4251-869d-4c19a217d993', NULL, '2021-06-18', '450', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('185c22c2-bb13-4626-81df-948af2bfe2af', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'e5443cef-b53c-4251-869d-4c19a217d993', NULL, '2021-06-19', '500', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('a03df17e-0067-4ce0-8d83-6f03d24333f7', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'e5443cef-b53c-4251-869d-4c19a217d993', NULL, '2021-06-20', '550', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('8e8c3baa-8d41-4820-996b-fa8b69603ad6', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'e5443cef-b53c-4251-869d-4c19a217d993', NULL, '2021-07-02', '100', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('493d9ec4-8f7e-4f30-a05e-7e4eb5883c3e', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'e5443cef-b53c-4251-869d-4c19a217d993', NULL, '2021-10-19', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('58b70f98-5030-4208-91b8-602b55a73deb', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '7cbf226b-df36-4b7a-b79c-c965530e51b9', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('ecdde1f5-acdb-4324-bbd7-12053622ad1d', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '7cbf226b-df36-4b7a-b79c-c965530e51b9', NULL, '2021-05-31', '100', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('bb15b188-1737-403f-b46e-189119e98c66', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '7cbf226b-df36-4b7a-b79c-c965530e51b9', NULL, '2021-06-13', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('f6fecece-6b1a-4046-b118-ede5bd378dec', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '8f27ef09-1879-4de8-b5e4-6f5a652595b2', NULL, '2021-04-20', '100', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('7ef0b089-de8b-4e4f-8c02-c758e40819ef', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '47199a7a-2e09-4ba3-87ed-b3fa1469e907', NULL, '2021-04-20', '13', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('680b5e66-0d8a-4697-95aa-2acc1a86ddd1', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '47199a7a-2e09-4ba3-87ed-b3fa1469e907', NULL, '2021-05-22', '20', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('6adb1248-e04b-4882-a5e6-30eb568617f8', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '47199a7a-2e09-4ba3-87ed-b3fa1469e907', NULL, '2021-05-24', '40', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('251d628b-32f3-4e65-a477-38938a1ace73', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '47199a7a-2e09-4ba3-87ed-b3fa1469e907', NULL, '2021-05-31', '50', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('225e683d-a8d7-4c15-8611-756d84ce434e', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '47199a7a-2e09-4ba3-87ed-b3fa1469e907', NULL, '2021-06-09', '18', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('3732d22c-3220-4519-a552-282c1bce0191', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '47199a7a-2e09-4ba3-87ed-b3fa1469e907', NULL, '2021-06-10', '50', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('6b8af108-b56e-4668-9ab1-c3f7bdd4aa02', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '47199a7a-2e09-4ba3-87ed-b3fa1469e907', NULL, '2021-06-25', '18', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('51132df9-f3df-4067-894b-389dd4e1f41a', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '47199a7a-2e09-4ba3-87ed-b3fa1469e907', NULL, '2021-12-22', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('fb212ded-bc09-4677-b257-624507349a49', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '47199a7a-2e09-4ba3-87ed-b3fa1469e907', NULL, '2022-01-03', '18', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('0f737c48-c40a-4a2d-9803-565ed4a73771', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '47199a7a-2e09-4ba3-87ed-b3fa1469e907', NULL, '2022-06-18', '6', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('108fe858-5fe7-4d20-bb55-9e0233194ae8', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '47199a7a-2e09-4ba3-87ed-b3fa1469e907', NULL, '2022-08-15', '18', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('53433fce-2da7-4fed-9acf-3590b9f6950e', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '80257b52-32d0-46a1-abdb-af689b94ca25', NULL, '2021-04-20', '100', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('a3517371-5945-44bb-8c31-7f2adfc0cdd4', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '80257b52-32d0-46a1-abdb-af689b94ca25', NULL, '2021-04-26', '180', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('99bae279-2cf1-442b-8597-736c047e1600', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '80257b52-32d0-46a1-abdb-af689b94ca25', NULL, '2022-08-15', '250', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('0337a553-b422-4854-b63a-822283452da7', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '333bfae0-515f-48db-9415-4400cae617ff', NULL, '2021-04-20', '12', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('8669da6b-ccdb-4d65-93fb-f7db174d3b55', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '333bfae0-515f-48db-9415-4400cae617ff', NULL, '2021-10-19', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('aa55938f-bec3-4da7-8761-2283c19d0bde', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'f1a15c13-f80e-4c33-af79-262f5119321b', NULL, '2021-04-20', '1000', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('edfdf022-c469-4b5c-a48d-b7243693d4fa', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'f1a15c13-f80e-4c33-af79-262f5119321b', NULL, '2021-06-12', '1500', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('21f71faf-aca4-493c-88d5-fe83ba30a301', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'f1a15c13-f80e-4c33-af79-262f5119321b', NULL, '2021-10-19', '2000', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('1dbde5b3-2e1a-4fb9-893e-9f82fa1af406', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'f1a15c13-f80e-4c33-af79-262f5119321b', NULL, '2022-08-15', '2500', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('110302d7-2169-4b7a-b6d4-9eb5f5736593', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '5af68bf1-42c2-416e-9dda-4a8c563f1cb7', NULL, '2021-04-20', '75', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('4c58e1cb-704e-4a84-9d2f-d6f38239c057', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '5af68bf1-42c2-416e-9dda-4a8c563f1cb7', NULL, '2021-04-26', '130', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('45aa4beb-239e-4752-b9e3-94516f404559', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '5af68bf1-42c2-416e-9dda-4a8c563f1cb7', NULL, '2021-06-14', '160', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('2f3f4e23-7e11-4e84-b96a-04b8e9fa6a15', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '5af68bf1-42c2-416e-9dda-4a8c563f1cb7', NULL, '2021-10-19', '175', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('56085b9a-a0fd-4f5a-8367-2b6fb3e62882', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '61d0b0a7-ee59-443d-9fa1-a94ec8fc0866', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('c302ec03-db0e-457d-83c5-3b57aaabd5e0', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '2b5f63ca-812a-46d7-87d2-a6a140b82dbc', NULL, '2021-04-20', '2', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('7c140ddd-37da-43f2-943a-3aa34dc4e8a2', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '2b5f63ca-812a-46d7-87d2-a6a140b82dbc', NULL, '2021-05-24', '20', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('509e5228-db35-4750-accc-7cfad11c45fe', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '2b5f63ca-812a-46d7-87d2-a6a140b82dbc', NULL, '2021-05-31', '50', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('c31e0be5-b37b-4f4c-b32a-e4d28696d4f0', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '2b5f63ca-812a-46d7-87d2-a6a140b82dbc', NULL, '2021-06-09', '6', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('59a70c44-6d32-45e1-b86a-2261556d7139', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '2b5f63ca-812a-46d7-87d2-a6a140b82dbc', NULL, '2021-06-10', '25', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('50021a0b-3a1b-4044-a1ad-7fdb7ef53071', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '2b5f63ca-812a-46d7-87d2-a6a140b82dbc', NULL, '2021-06-11', '50', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('df770aa3-a566-443f-b2a0-5eecf63f3a42', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '2b5f63ca-812a-46d7-87d2-a6a140b82dbc', NULL, '2021-06-25', '6', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('07c4229d-b0c4-4828-ae92-54d4469f079b', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '2b5f63ca-812a-46d7-87d2-a6a140b82dbc', NULL, '2021-07-03', '18', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('ef046c18-e565-4417-8dad-d1cfb916c62f', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '2b5f63ca-812a-46d7-87d2-a6a140b82dbc', NULL, '2021-10-19', '37', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('12f2f585-fc6b-4148-b08f-5fd1f7f10af3', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '2b5f63ca-812a-46d7-87d2-a6a140b82dbc', NULL, '2021-12-22', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('04c0e70a-4b12-47c3-9fef-f753046f9777', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '2b5f63ca-812a-46d7-87d2-a6a140b82dbc', NULL, '2022-01-03', '37', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('d12ede4d-df5f-41c7-8c79-5bd65db7beff', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '00a14a60-0659-4d02-908b-502cb99f6834', NULL, '2021-04-20', '450', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('ef750424-5693-41ae-8cc2-36e0e12a240d', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '00a14a60-0659-4d02-908b-502cb99f6834', NULL, '2021-04-26', '500', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('97d2935f-af61-48b2-8899-f083e6e98b7e', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '00a14a60-0659-4d02-908b-502cb99f6834', NULL, '2021-05-06', '450', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('4c2d2dbc-98a8-4058-bcc9-f0abc982e528', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '00a14a60-0659-4d02-908b-502cb99f6834', NULL, '2021-05-10', '250', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('bb590ada-d08d-4637-a2f9-24a70df44bbe', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '00a14a60-0659-4d02-908b-502cb99f6834', NULL, '2021-05-22', '500', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('7b2b3700-fea1-45c1-b262-96a120689ae2', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '00a14a60-0659-4d02-908b-502cb99f6834', NULL, '2023-04-28', '250', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('f588cb74-49f4-4afc-a136-601e4b58ddff', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'a7fa1549-562a-47db-88f3-01369b04db42', NULL, '2021-04-20', '330', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('e01a75ee-d07f-41eb-84ce-9d57be670d46', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'a7fa1549-562a-47db-88f3-01369b04db42', NULL, '2021-04-28', '110', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('a69a86d1-ca6f-4b35-9bc4-f90c540c7fe4', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'a7fa1549-562a-47db-88f3-01369b04db42', NULL, '2021-04-30', '330', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('23a37af6-9512-4036-bbe9-f482a429c1c0', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '68c6d310-1ec3-470a-b099-4556c5d4b48b', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('67ccbc54-16c5-486b-8257-1cbc1b95db7b', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '68c6d310-1ec3-470a-b099-4556c5d4b48b', NULL, '2021-04-28', '20', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('641e340d-ca00-46da-808d-23cf716e487e', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '68c6d310-1ec3-470a-b099-4556c5d4b48b', NULL, '2021-05-02', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('8915b77d-fb8e-4316-9252-988586edc335', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '8c1f394b-9259-4ed9-8d38-378e3f0b1497', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('7687f5f4-84da-4ba4-be64-6dc3803de7fa', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'b285aef1-37c7-46e6-b081-456c7d930eb8', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('96c21566-ebaa-4659-9809-dfd8a8f2bdc8', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'b285aef1-37c7-46e6-b081-456c7d930eb8', NULL, '2021-05-17', '15', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('9ac1c7c3-c6ef-4e8e-8f33-0d36c34147b9', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'b285aef1-37c7-46e6-b081-456c7d930eb8', NULL, '2023-01-31', '30', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('e025bc02-426c-4fb7-84f1-eea054a88028', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'ce6e699c-b775-4159-98c6-d405edd8204a', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('789240a2-903a-45cf-ae73-6833a4e3ebc5', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'ce6e699c-b775-4159-98c6-d405edd8204a', NULL, '2021-05-06', '5', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('0cf1959d-2f95-403a-858d-c98bc2610bcc', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'ce6e699c-b775-4159-98c6-d405edd8204a', NULL, '2021-05-10', '10', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('e193b885-4dc2-4a0b-b6ce-09cd7abfdae9', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'ce6e699c-b775-4159-98c6-d405edd8204a', NULL, '2021-05-20', '20', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('f82ae182-3bdc-468f-b56a-c007c94c63e5', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'ce6e699c-b775-4159-98c6-d405edd8204a', NULL, '2021-05-22', '10', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('8250279f-4bef-4fda-83ec-97b7faf3ed29', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'ce6e699c-b775-4159-98c6-d405edd8204a', NULL, '2021-06-09', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('dc9dc436-629e-46be-8067-ca5bd99fa7ff', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'ce6e699c-b775-4159-98c6-d405edd8204a', NULL, '2021-06-11', '10', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('491819ce-5dfe-4b3b-bcf2-9ffbafa25f16', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'ce6e699c-b775-4159-98c6-d405edd8204a', NULL, '2021-06-19', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('db6d0cc1-e389-4a6c-b71b-c03cb0e706b3', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '4d3c927c-3c6e-4239-a4cb-47d16b038415', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('0e810370-0814-4b0d-82c1-49bad59e4d05', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '4d3c927c-3c6e-4239-a4cb-47d16b038415', NULL, '2021-06-19', '15', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('500a9090-9f1f-48f1-aa22-f258c05431af', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '4d3c927c-3c6e-4239-a4cb-47d16b038415', NULL, '2021-06-20', '20', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('8c126b76-0a30-4683-a2d6-70b8d80612da', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '4d3c927c-3c6e-4239-a4cb-47d16b038415', NULL, '2021-06-21', '25', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('d9abff5f-12a4-48ff-907b-8aed00d9a161', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '4d3c927c-3c6e-4239-a4cb-47d16b038415', NULL, '2021-06-22', '30', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('93105414-f8d9-4ce7-9fa9-84bdd42ac906', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '4d3c927c-3c6e-4239-a4cb-47d16b038415', NULL, '2021-06-24', '35', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('3bd568df-cdd6-4da0-8a26-c0554c9f060e', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '4d3c927c-3c6e-4239-a4cb-47d16b038415', NULL, '2021-07-01', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('ff613861-f8e6-4450-a420-37b38609d869', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'a7734b30-a4ce-45ca-8ee4-d3cd3beecae1', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('04999f94-ce9d-4405-a73a-d7dde49ed791', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'a7734b30-a4ce-45ca-8ee4-d3cd3beecae1', NULL, '2021-06-09', '5', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('00b88539-853e-44ac-8158-ed68af48916a', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'a7734b30-a4ce-45ca-8ee4-d3cd3beecae1', NULL, '2021-06-11', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('6e5a8e28-4ee1-4504-8f81-dba4c3ad2601', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'a7734b30-a4ce-45ca-8ee4-d3cd3beecae1', NULL, '2021-06-12', '5', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('4f4f070e-ac58-434f-b358-7bef0ed4d739', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'a7734b30-a4ce-45ca-8ee4-d3cd3beecae1', NULL, '2021-06-18', '10', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('302bb064-e3a6-4917-b638-fff18e06952d', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'a7734b30-a4ce-45ca-8ee4-d3cd3beecae1', NULL, '2021-06-23', '15', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('0f54e0fb-240d-4c0a-aa2a-f4fda7a65308', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'a7734b30-a4ce-45ca-8ee4-d3cd3beecae1', NULL, '2021-07-01', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('c36a0ff4-2707-4ad6-a9aa-3d4ff1b0ac6c', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'ad80d422-6080-47ad-92b9-24617ba3aa88', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('7cac4e15-ac28-4c37-ab39-8f373e5ed50a', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'ad80d422-6080-47ad-92b9-24617ba3aa88', NULL, '2021-07-01', '50', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('323469e8-65e5-43ec-aa27-f65d69fefbfe', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'ad80d422-6080-47ad-92b9-24617ba3aa88', NULL, '2021-11-16', '25', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('f4c54547-0ec0-411f-9a65-0af1b9eb2e95', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'ad80d422-6080-47ad-92b9-24617ba3aa88', NULL, '2021-11-23', '45', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('788c7a72-03db-4eb0-9009-e10af0cb412a', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'ad80d422-6080-47ad-92b9-24617ba3aa88', NULL, '2021-11-29', '50', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('cddc42a8-4d86-4f98-ac5e-3ed4dad6947b', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'ad80d422-6080-47ad-92b9-24617ba3aa88', NULL, '2021-12-22', '55', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('9b9cd12b-26bd-416f-a275-3513515eec41', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'ad80d422-6080-47ad-92b9-24617ba3aa88', NULL, '2022-01-01', '70', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('a99cc464-abdb-4ae6-9183-f84f869503ac', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'ad80d422-6080-47ad-92b9-24617ba3aa88', NULL, '2023-04-17', '55', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('1bbaa272-5c1d-4bb9-929d-551880264b7a', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'ad80d422-6080-47ad-92b9-24617ba3aa88', NULL, '2023-11-19', '75', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('4c1d902a-0d0b-4fe8-851a-c9a2af6cbb6e', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'ad80d422-6080-47ad-92b9-24617ba3aa88', NULL, '2025-10-28', '90', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('db61db65-72d9-4236-8ad1-b262bd5fcc1c', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'ad80d422-6080-47ad-92b9-24617ba3aa88', NULL, '2025-11-02', '110', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('6e3c5273-f542-4894-a38b-bad5ab46875b', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'ad80d422-6080-47ad-92b9-24617ba3aa88', NULL, '2025-11-07', '150', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('c15db791-48b8-4669-8fa7-8e6facb196ef', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '1051e36d-2532-4fd1-ac7a-6d6176d9421a', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('bd72e6f4-e080-4a9d-9899-fb32ff093efd', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '1051e36d-2532-4fd1-ac7a-6d6176d9421a', NULL, '2021-06-11', '13', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('94c8d167-95a2-432b-ab44-fadfa9ce57d5', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '1051e36d-2532-4fd1-ac7a-6d6176d9421a', NULL, '2021-06-15', '19', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('1c9d2a09-6e20-4745-93c7-d03467d24acc', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '1051e36d-2532-4fd1-ac7a-6d6176d9421a', NULL, '2021-06-18', '25', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('8a3ffba8-1b26-4ebd-a565-96af1039ef6b', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '1051e36d-2532-4fd1-ac7a-6d6176d9421a', NULL, '2021-06-22', '31', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('c9f14616-5638-41a3-b7ac-41ab9dc7151d', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '1051e36d-2532-4fd1-ac7a-6d6176d9421a', NULL, '2021-06-25', '37', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('3893fc2e-3ff0-4d00-8e6d-090479d431b9', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '1051e36d-2532-4fd1-ac7a-6d6176d9421a', NULL, '2021-06-28', '43', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('fcc16b59-de24-4d30-8ba5-df6f8c13bf01', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '1051e36d-2532-4fd1-ac7a-6d6176d9421a', NULL, '2021-07-01', '46', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('141e706f-5fc2-4c03-9085-95c7249a43e2', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '1051e36d-2532-4fd1-ac7a-6d6176d9421a', NULL, '2021-10-19', '40', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('0bae7e0c-94fb-4aff-a76e-8b3534675a51', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '9bff836d-995a-46e9-8fb1-b769c59e57b0', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('96fae4e5-d8a1-4f96-9178-97aabca80b54', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '9bff836d-995a-46e9-8fb1-b769c59e57b0', NULL, '2021-07-02', '1.5', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('df3d7d0a-3b2a-4b45-b122-181e51ab0748', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '9bff836d-995a-46e9-8fb1-b769c59e57b0', NULL, '2021-07-05', '2.25', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('bd998c20-f1be-4081-8776-37a4b513b150', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '9bff836d-995a-46e9-8fb1-b769c59e57b0', NULL, '2021-07-09', '3', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('5f31a2ae-ed8e-4bcf-b1bb-0baf0a95962e', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '9bff836d-995a-46e9-8fb1-b769c59e57b0', NULL, '2021-10-19', '4.5', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('90d88dd2-dd5a-4cb4-a843-b06f37dccecd', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '9bff836d-995a-46e9-8fb1-b769c59e57b0', NULL, '2021-11-23', '5', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('5c57f5af-9a57-406c-bf31-5610673c7741', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '9bff836d-995a-46e9-8fb1-b769c59e57b0', NULL, '2022-09-29', '6', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('7ae099c7-930f-4ef2-a88a-09c24b37534c', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'fe66d45b-3024-4adc-a054-0a06fdc077b0', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('91091efb-0f60-4f01-959b-2d42ae691175', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'fe66d45b-3024-4adc-a054-0a06fdc077b0', NULL, '2021-10-19', '1.8', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('a1fbc9a1-749e-4616-8e38-161d3525a415', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'fe66d45b-3024-4adc-a054-0a06fdc077b0', NULL, '2021-10-24', '2.5', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('a56aa73b-18b7-4a28-93d8-700161bededf', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'fe66d45b-3024-4adc-a054-0a06fdc077b0', NULL, '2021-11-01', '3.75', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('ce567f45-d6ab-4bec-a937-46c71d67f77e', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'fe66d45b-3024-4adc-a054-0a06fdc077b0', NULL, '2021-11-18', '3', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('869a92d8-d456-4c58-907f-2aa34828ab7a', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'fe66d45b-3024-4adc-a054-0a06fdc077b0', NULL, '2021-11-29', '3.2', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('6b5ffc57-19e3-4053-bad6-d27b2deb8ba8', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'fe66d45b-3024-4adc-a054-0a06fdc077b0', NULL, '2021-12-22', '3.5', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('afd0da02-49b2-42ae-ac99-7ae9e96b60f9', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'fe66d45b-3024-4adc-a054-0a06fdc077b0', NULL, '2022-05-01', '3.75', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('b0c4c54c-0f0d-4549-b437-0d4adeed0126', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'fe66d45b-3024-4adc-a054-0a06fdc077b0', NULL, '2022-05-13', '5.5', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('88b3b011-4b27-4a7b-a095-6b9cbcde185a', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'fe66d45b-3024-4adc-a054-0a06fdc077b0', NULL, '2022-12-30', '7.5', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('cf74a8b7-975e-45ad-8d4f-1a6e8bf12b07', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'fe66d45b-3024-4adc-a054-0a06fdc077b0', NULL, '2023-01-08', '7.2', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('cfbac005-04ba-48fa-887b-712e39b8923d', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'fe66d45b-3024-4adc-a054-0a06fdc077b0', NULL, '2024-03-26', '9', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('0671d15e-ffb6-474f-be08-39457829a2f3', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'fe66d45b-3024-4adc-a054-0a06fdc077b0', NULL, '2024-05-06', '7.2', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('20346ad1-e063-46f8-b4f9-6a27d90e11b0', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'fe66d45b-3024-4adc-a054-0a06fdc077b0', NULL, '2025-01-20', '9', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('32fa086f-3c2b-4ca3-8742-912664f21961', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'fe66d45b-3024-4adc-a054-0a06fdc077b0', NULL, '2025-01-27', '11', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('633660ae-e2ee-4d89-a403-fa02901a62bd', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'fe66d45b-3024-4adc-a054-0a06fdc077b0', NULL, '2025-05-10', '13', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('2bd34f7b-bec6-4f10-a208-f296cd751b82', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'fe66d45b-3024-4adc-a054-0a06fdc077b0', NULL, '2025-05-31', '7.5', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('32fa0c48-537a-42a9-9cfc-026417b43398', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'b0b28a43-9491-4380-8806-4df4a561be2b', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('8accee4d-b3b0-4a7d-b4b9-0efd75814e23', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'b0b28a43-9491-4380-8806-4df4a561be2b', NULL, '2021-05-13', '264', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('ca848140-07c7-471e-8bd7-ba891301e645', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'b0b28a43-9491-4380-8806-4df4a561be2b', NULL, '2021-05-17', '414', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('3cc62b96-55f3-4a39-a876-367069c6c584', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'b0b28a43-9491-4380-8806-4df4a561be2b', NULL, '2021-05-18', '514', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('33476d2b-d104-48ab-9ec1-42e4fef24fc7', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'b0b28a43-9491-4380-8806-4df4a561be2b', NULL, '2021-06-14', '591', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('54547f0f-016d-4785-97b9-a96f8b635925', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'b0b28a43-9491-4380-8806-4df4a561be2b', NULL, '2021-12-22', '600', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('aead56a9-b6ad-4515-bc5d-936e1555d407', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '3072a3b9-c352-499f-b810-5893eb1c90cd', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('1d691379-ca43-41ad-bc68-034509b05f24', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '3072a3b9-c352-499f-b810-5893eb1c90cd', NULL, '2021-05-13', '165', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('96637b9d-2f63-47f2-b6b5-e6314fd1218d', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '3072a3b9-c352-499f-b810-5893eb1c90cd', NULL, '2021-05-17', '265', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('60d9b1c5-6670-4655-bc38-469c0bbf9b83', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '3072a3b9-c352-499f-b810-5893eb1c90cd', NULL, '2021-05-18', '330', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('d446993c-f42d-4d72-a30b-f8018cc17c12', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '3072a3b9-c352-499f-b810-5893eb1c90cd', NULL, '2021-06-14', '380', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('02be177a-f36c-4484-8a6b-aa124e91b152', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '3072a3b9-c352-499f-b810-5893eb1c90cd', NULL, '2021-12-22', '400', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('d420324f-c91d-4fb2-a629-a13bb346037a', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'f8970a96-c5fb-4e42-84f0-428c577f4f77', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('efbcaa23-0004-42dc-8b2e-a76029a50b3e', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'bd3d2dc3-b0fb-4e15-b5f4-b364d26556a1', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('be25d97b-4071-4526-a5a1-6d14f65aaa16', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'bd3d2dc3-b0fb-4e15-b5f4-b364d26556a1', NULL, '2022-05-01', '75', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('fe7e36f6-b0cb-4cc2-8433-55b46a6819e9', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'bd3d2dc3-b0fb-4e15-b5f4-b364d26556a1', NULL, '2022-05-13', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('b6e0b73c-a5c6-450d-af05-013ba89e5a18', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '06657bb8-c2fb-484a-b21b-b5d93d8d9fbd', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('c13df07a-9cb4-490c-94cc-1e517008ce56', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '06657bb8-c2fb-484a-b21b-b5d93d8d9fbd', NULL, '2021-11-29', '0.5', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('1f1a55f8-af6f-4099-af3f-3b4b321290fd', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '06657bb8-c2fb-484a-b21b-b5d93d8d9fbd', NULL, '2021-12-22', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('41bacab1-349b-4540-9518-ccaacc9812f3', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'b725322a-9759-4944-9848-9f35af49ac60', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('bf692859-28a6-4702-b869-8d16954db5e2', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'b725322a-9759-4944-9848-9f35af49ac60', NULL, '2021-12-22', '0.05', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('ec8b4270-aeb4-4c1c-823f-ebdfe4b66300', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'b725322a-9759-4944-9848-9f35af49ac60', NULL, '2022-01-03', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('ce55d766-0b79-4136-a38c-a51fd2a2a0b4', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '2a252910-6f0e-4f2d-8d43-810e4b21ce90', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('d0a5cd00-6aa4-4085-b4ab-22a2c14443c5', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '2a252910-6f0e-4f2d-8d43-810e4b21ce90', NULL, '2021-12-25', '20', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('d0d2535f-45e0-4254-aed4-8482e792ee95', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '2a252910-6f0e-4f2d-8d43-810e4b21ce90', NULL, '2022-01-03', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('a498bb18-f3f4-490d-9182-679827ea5149', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '7814aa0c-e961-499e-bc6b-9c61aaaffa0a', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('b62f96f1-b84e-460e-8dba-088011b299f4', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '7814aa0c-e961-499e-bc6b-9c61aaaffa0a', NULL, '2021-12-29', '200', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('d65ad069-0ad2-4b5b-8437-57542dde593d', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '7814aa0c-e961-499e-bc6b-9c61aaaffa0a', NULL, '2022-01-03', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('791e0031-7741-4f4e-b651-7e952fabe100', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '7814aa0c-e961-499e-bc6b-9c61aaaffa0a', NULL, '2022-01-14', '200', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('70927bce-960c-49d6-b8b7-699f9f7f7fba', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'fbb28f35-a69d-43f8-905c-eaa7888fb1db', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('440f76b2-1692-474a-ae35-40875bad4d95', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'fbb28f35-a69d-43f8-905c-eaa7888fb1db', NULL, '2021-12-29', '20', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('c6376674-f102-45eb-ad34-821b8c8875cc', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'fbb28f35-a69d-43f8-905c-eaa7888fb1db', NULL, '2022-01-03', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('79e6738d-7207-4e65-97fb-f729e3ac3376', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'fbb28f35-a69d-43f8-905c-eaa7888fb1db', NULL, '2022-01-14', '20', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('8c573cd3-a665-49e4-8f8d-96081c4ab6ad', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'fbb28f35-a69d-43f8-905c-eaa7888fb1db', NULL, '2022-02-21', '35', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('8436926f-2ed8-4897-b57a-bf1317ef9c35', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'fbb28f35-a69d-43f8-905c-eaa7888fb1db', NULL, '2024-04-02', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('c3ec5abe-da13-489a-85d2-4250053c8e8c', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'd054060e-d6eb-449a-9284-40dc2744e2cb', NULL, '2021-04-20', NULL, 'IU', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('4ca3203b-ebe7-4448-bb2f-99eb574648c1', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'd054060e-d6eb-449a-9284-40dc2744e2cb', NULL, '2025-06-15', '2000', 'IU', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('3e786a4f-548c-4340-805f-1f1ad697314d', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '5a2a1874-07ac-4442-91cb-522bd8f4dabe', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('b401c633-9d76-4993-88eb-0f2a60f343e6', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '5a2a1874-07ac-4442-91cb-522bd8f4dabe', NULL, '2022-03-05', '125', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('b0d97434-a3e5-4f85-bb0a-07e94e84512c', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'b06fb5c1-0362-4834-b558-e8bf57beee2b', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('b550d1f6-9624-403d-91a9-c19ce0da4fc8', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'b06fb5c1-0362-4834-b558-e8bf57beee2b', NULL, '2022-06-05', '10', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('a5a55f1a-0730-4da9-9035-863aba2852c5', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'b82399e3-d4a0-4d5f-a5d3-1802c80d95e7', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('7cdac8e7-1e8d-4d3f-bab6-0df87022b9db', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'b82399e3-d4a0-4d5f-a5d3-1802c80d95e7', NULL, '2022-07-25', '20', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('4c6922f9-0a4b-42fe-9af0-c43650b4b8bc', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'd4d74cd9-5bdf-4654-9b2a-0d09df4c9d64', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('34ac813c-6dad-4ff7-a792-6e065f9c0d64', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'd4d74cd9-5bdf-4654-9b2a-0d09df4c9d64', NULL, '2022-08-19', '18', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('87ff034a-4ed4-4f80-bb57-143c570b1d26', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'd4d74cd9-5bdf-4654-9b2a-0d09df4c9d64', NULL, '2022-08-27', '36', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('30439fc2-6c98-4c37-87b3-6a5e938202ea', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'd4d74cd9-5bdf-4654-9b2a-0d09df4c9d64', NULL, '2023-01-13', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('3f049955-5bc4-4cf2-90f2-923dd60bddd0', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'd4d74cd9-5bdf-4654-9b2a-0d09df4c9d64', NULL, '2023-05-20', '36', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('c008885b-d1b3-4d38-8e70-f6e80977c2eb', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'e0298a46-09c4-4923-8be4-5b9506636506', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('a6bce639-ffdf-42d1-9b3f-2a55666ca87e', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'e0298a46-09c4-4923-8be4-5b9506636506', NULL, '2022-09-29', '0.018', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('493efe3a-6d58-45f6-8c1e-010e616529ae', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'e0298a46-09c4-4923-8be4-5b9506636506', NULL, '2022-10-09', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('0581d6e0-0013-41ea-ac93-f91a20ec86d5', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'e0298a46-09c4-4923-8be4-5b9506636506', NULL, '2022-10-28', '0.015', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('31d4dd0b-ff2a-4cf1-a7b7-9f335414c0ab', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'e0298a46-09c4-4923-8be4-5b9506636506', NULL, '2022-11-10', '0.03', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('16e9541e-b70b-4c4b-a179-e3ca03f8b668', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'e0298a46-09c4-4923-8be4-5b9506636506', NULL, '2022-12-26', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('c6e417fa-71c6-4a11-8406-c353e9a1aa3e', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'b67a236f-459f-4915-8952-7cead2b14d83', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('5f6dc46d-f263-4c19-9ead-bd1e337a3026', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'b67a236f-459f-4915-8952-7cead2b14d83', NULL, '2022-12-16', '40', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('be9d779e-7590-4f6e-b2c0-951c7c8a1efd', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'b67a236f-459f-4915-8952-7cead2b14d83', NULL, '2022-12-26', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('d300d7ac-464e-4522-8681-a0be7ede5968', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '25ea6194-e150-454e-a773-6d0694a0efe1', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('bbee73fb-bd66-42f4-8fbd-da78c8472ebc', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '25ea6194-e150-454e-a773-6d0694a0efe1', NULL, '2023-02-03', '0.65', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('3094e46b-c531-4e32-8a7b-72455a38a127', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '25ea6194-e150-454e-a773-6d0694a0efe1', NULL, '2023-02-07', '1.25', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('67a18a81-704f-47d1-83ff-487b9a2247c1', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '25ea6194-e150-454e-a773-6d0694a0efe1', NULL, '2023-02-23', '2.5', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('11462b4e-3f54-4f9d-90be-27775310b4ae', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '25ea6194-e150-454e-a773-6d0694a0efe1', NULL, '2023-11-26', '1.25', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('aca5ce11-85fa-4113-bbbb-2f037b960c58', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '25ea6194-e150-454e-a773-6d0694a0efe1', NULL, '2024-02-06', '2.5', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('134d27e3-65ac-4080-b2c9-bc811d52fb7a', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'b651048a-289d-4d3d-aa41-6079b0d3ac6d', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('bf4f231c-5144-4636-96dd-def82ab64bae', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'b651048a-289d-4d3d-aa41-6079b0d3ac6d', NULL, '2022-10-15', '2', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('29ab6dff-d3ff-4d5d-8665-fb29c4c4d7c8', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'ff03a147-dd30-44fd-9dd2-f2c3d580c636', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('5eccd300-6f55-4591-b5c3-15e5a1ccfe7d', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'ff03a147-dd30-44fd-9dd2-f2c3d580c636', NULL, '2023-05-20', '1.5', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('af56b169-3018-4db1-add5-7d6fa48620e6', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '6e83b994-b26d-406b-a90a-05de0af48612', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('3765a5b1-8724-4418-a486-e68dab9a0225', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '6e83b994-b26d-406b-a90a-05de0af48612', NULL, '2023-01-21', '250', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('fa4a3477-dc2c-413a-a289-8e3905513c8a', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '6e83b994-b26d-406b-a90a-05de0af48612', NULL, '2023-02-16', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('ce41203a-7215-4148-87be-88410fe71107', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '6e83b994-b26d-406b-a90a-05de0af48612', NULL, '2023-07-25', '250', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('1d9685d7-39fa-4637-a426-feccc9157af6', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '6e83b994-b26d-406b-a90a-05de0af48612', NULL, '2023-08-15', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('33f25209-dac0-425a-81d1-3865a157e3fa', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '0daf5b9a-354f-41cc-9c13-6b0b14ca391f', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('78647882-b001-4361-bb4f-c97ea0fb51ee', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '0daf5b9a-354f-41cc-9c13-6b0b14ca391f', NULL, '2022-12-30', '50', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('360704fc-efde-4a6f-b235-4976595d88e6', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '0daf5b9a-354f-41cc-9c13-6b0b14ca391f', NULL, '2023-01-11', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('c8ecd7ee-58d7-41b7-b5a2-1e64dd82f1db', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'df097235-e839-4bef-b89c-888e026bd68f', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('4bc50b7e-de97-4763-af8c-c787e4f16378', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'df097235-e839-4bef-b89c-888e026bd68f', NULL, '2022-11-27', '45', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('a37bb3c7-cdb8-4487-be88-1df7aadb4b47', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'df097235-e839-4bef-b89c-888e026bd68f', NULL, '2022-12-03', '90', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('70665e57-01ce-446f-8bf8-879732366d32', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'df097235-e839-4bef-b89c-888e026bd68f', NULL, '2022-12-16', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('c97e6001-dbba-4957-b00e-b9a3ecc911df', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '3de8bce6-852a-498d-baad-69842c213d71', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('22e2ee5f-f138-41dc-8de1-161c418599ac', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '6d1ace91-db28-4a49-a4e9-273f2c96366c', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('c01553e4-336e-4e8a-8cc9-60ec74eb7d5b', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '6d1ace91-db28-4a49-a4e9-273f2c96366c', NULL, '2023-03-04', '25', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('8a73b953-5b7c-4c66-9666-844248f2a72f', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '6d1ace91-db28-4a49-a4e9-273f2c96366c', NULL, '2023-04-17', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('7c4fa571-4e60-4d7c-ab04-f39835dae62d', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '5a73853f-4dda-4614-aed5-8846a25564f9', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('52d8d579-8f86-4899-8b7d-232767d34712', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '5a73853f-4dda-4614-aed5-8846a25564f9', NULL, '2023-09-03', '75', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('4f55db01-f074-43c2-a7bf-557664652106', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '98a684c6-66ae-4e58-a146-2c3881949044', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('e0178228-9975-4866-829b-be75bda01f35', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '4be4d92e-714f-4486-8ba1-c5a42ecc1b7b', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('e15c6751-6fb1-49f2-8a26-d3151b7035ca', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '4be4d92e-714f-4486-8ba1-c5a42ecc1b7b', NULL, '2024-06-15', '2000', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('17dd4aaf-6461-4ddc-b06c-2a432f2fafba', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '4be4d92e-714f-4486-8ba1-c5a42ecc1b7b', NULL, '2024-07-14', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('390bf928-538e-4332-8a7b-b79c20507c95', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '4be4d92e-714f-4486-8ba1-c5a42ecc1b7b', NULL, '2024-08-01', '2000', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('8d3ef6c4-2cf4-4255-be54-430bf4ecb5ef', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '4be4d92e-714f-4486-8ba1-c5a42ecc1b7b', NULL, '2024-12-01', '2500', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('33817709-8bb0-4ec8-937e-aed14ea04279', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '5c7f0d24-b8dc-4f68-a5f0-64a1f637287d', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('c0c13563-4fd5-4f87-9223-c4e7d4eb482a', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '5c7f0d24-b8dc-4f68-a5f0-64a1f637287d', NULL, '2024-09-14', '100', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('8c51921f-cac2-4ba1-b52e-f27f9ae99b3b', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '5c7f0d24-b8dc-4f68-a5f0-64a1f637287d', NULL, '2024-09-20', '70', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('49a2d5cb-4597-4a78-b19f-295c2150466b', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '4b6b6bb6-e5ff-409a-8c10-b4394854764c', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('27833dd9-0d4d-40e5-80a2-28ce8b9cf6c9', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '4b6b6bb6-e5ff-409a-8c10-b4394854764c', NULL, '2024-12-01', '1250', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('b84e8b7d-65ff-461d-8495-01a3d43c7faf', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '4b6b6bb6-e5ff-409a-8c10-b4394854764c', NULL, '2025-01-15', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('09a4bda0-ae0b-4753-9199-e177c3c883fc', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '24ac4b1f-8038-47b6-ae3f-c295f99e8648', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('c2cef057-c3fa-448b-8912-6b4058092152', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '24ac4b1f-8038-47b6-ae3f-c295f99e8648', NULL, '2025-04-27', '55', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('ed8f83fe-b06f-48f7-bb6b-43fdcc09379e', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '24ac4b1f-8038-47b6-ae3f-c295f99e8648', NULL, '2025-07-18', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('3290ae59-3e5a-43a3-b8c6-7efbba6b0f73', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '24ac4b1f-8038-47b6-ae3f-c295f99e8648', NULL, '2025-08-05', '55', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('f4ce96d5-a266-48bc-a9cf-30c698732851', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '24ac4b1f-8038-47b6-ae3f-c295f99e8648', NULL, '2025-10-16', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('f17c7a4b-0ac5-45e3-b753-242bdf9f7fcf', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '588a7ffc-3c4e-408f-8319-12506a20cadd', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('679c7b02-4918-4197-bb4a-564141dcc0e2', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '588a7ffc-3c4e-408f-8319-12506a20cadd', NULL, '2025-04-27', '10', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('089c63f6-df98-4119-b8ac-9edef72780ea', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '588a7ffc-3c4e-408f-8319-12506a20cadd', NULL, '2025-07-18', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('d7d810bc-0a95-49e7-b19b-9108f20bb59b', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '588a7ffc-3c4e-408f-8319-12506a20cadd', NULL, '2025-08-05', '10', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('d595b91b-9907-40d2-ae80-1ae8caede350', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', '588a7ffc-3c4e-408f-8319-12506a20cadd', NULL, '2025-10-16', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('b5bec1ed-49e2-4e98-afec-25375049b01c', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'd6f02422-e48b-461a-a3e5-c1e2bf51c836', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('de158e27-8ab0-466b-b42b-3e04fed2e275', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'd6f02422-e48b-461a-a3e5-c1e2bf51c836', NULL, '2025-07-18', '0.1', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('a09638a3-d93a-402a-a557-49a3b28b1b0f', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'd6f02422-e48b-461a-a3e5-c1e2bf51c836', NULL, '2025-07-27', '0.15', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('e696db32-4697-497c-8f11-45f351e63981', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'd6f02422-e48b-461a-a3e5-c1e2bf51c836', NULL, '2025-08-17', '0.2', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('1873f9c8-a382-4b0b-aa7c-3a7ea7a358b7', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'd6f02422-e48b-461a-a3e5-c1e2bf51c836', NULL, '2025-08-25', '0.1', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('6591fb6b-4f8d-45c4-9c5f-76c8c6f93b41', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'd6f02422-e48b-461a-a3e5-c1e2bf51c836', NULL, '2025-10-24', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('6398242f-1f08-45b7-816a-778eeac13067', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'fe0b5a61-59ef-44af-9841-318a80176eed', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('f8af8fe4-47f6-4f26-8194-97aff3f29d87', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'fe0b5a61-59ef-44af-9841-318a80176eed', NULL, '2025-10-08', '0.25', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('6e305450-0a91-4b1f-89df-81594dc157ff', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'fe0b5a61-59ef-44af-9841-318a80176eed', NULL, '2025-10-28', '0.5', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('4a12b6cd-2b4b-41aa-8566-1bffe53612a1', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'c25261e9-b846-4f9e-ae45-37622b54aedc', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('dd8d25f5-bc02-4d02-b415-8956a7770c59', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'c25261e9-b846-4f9e-ae45-37622b54aedc', NULL, '2025-10-11', '200', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('428ee29d-58fd-404e-ad9f-6e5b76169fe9', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'c25261e9-b846-4f9e-ae45-37622b54aedc', NULL, '2025-10-25', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('49f4bda1-e124-4a96-9839-d3985465094c', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'bdcecfa2-f715-46ea-8576-5c43e0c268aa', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('6e23155e-87c8-4b16-9d21-dac70259f084', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'bdcecfa2-f715-46ea-8576-5c43e0c268aa', NULL, '2025-10-25', '0.5', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('4a8cb6a5-d84d-4081-8883-08d780f2570e', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'bdcecfa2-f715-46ea-8576-5c43e0c268aa', NULL, '2025-10-28', '0.25', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('ddfdc43c-ed07-4c36-82a1-85acf9b89980', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'a0db619e-d57e-4afb-b92f-3781257e6ca6', NULL, '2021-04-20', NULL, 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('ac4a680d-8964-4735-9766-ae4133bb348e', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'a0db619e-d57e-4afb-b92f-3781257e6ca6', NULL, '2025-10-30', '1', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('08466bd3-6f5e-4937-8913-3796c100dfb1', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'a0db619e-d57e-4afb-b92f-3781257e6ca6', NULL, '2025-11-02', '2.5', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('dbddeeff-bae9-461b-9d23-b490661d7cf5', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'a0db619e-d57e-4afb-b92f-3781257e6ca6', NULL, '2025-11-06', '5', 'mg', NULL, NULL, 'imported from mito sheet')
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('5510e26c-ac90-4857-9136-e68a1737695a', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'd6be662d-1f45-4d16-b90e-614513b87d0b', NULL, '2025-12-08', '750', 'mg', '375', 'BID', NULL)
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('0b725de0-75fc-472c-aae9-4e3a2877116e', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'e0b5bd49-c9b6-46e8-b2fd-f4f1a525222b', NULL, '2025-12-06', '5', 'mg', '5', 'QD', NULL)
on conflict (id) do nothing;
insert into dose_event (id, user_id, med_id, med_product_id, effective_date, total_daily_amount, unit, per_dose_amount, frequency_code, notes)
values ('8fde35ca-1a92-4959-b233-20e863bc40bf', 'e74bc88f-0e02-4433-bbd7-a5979a2a3cb3', 'e0b5bd49-c9b6-46e8-b2fd-f4f1a525222b', NULL, '2025-12-08', '0', 'mg', NULL, NULL, NULL)
on conflict (id) do nothing;
commit;
