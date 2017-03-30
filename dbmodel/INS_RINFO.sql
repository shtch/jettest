drop table VIRI_PATIENT_IN;
---
create table VIRI_PATIENT_IN (
  case_history_id NUMBER(16) not null,
  registry_id     NUMBER(16) not null,
  show_id         VARCHAR2(20) not null,
  show_fullname   VARCHAR2(512) not null,
  tempr_m         VARCHAR2(40),
  datein          DATE,
  division_name   VARCHAR2(17),
  ward_name       VARCHAR2(20),
  doctor_name     VARCHAR2(64),
  sost            VARCHAR2(64),
  dataoperation   DATE,
  pass_type_name  VARCHAR2(255)
);
-----
insert into VIRI_PATIENT_IN (case_history_id, registry_id, show_id, show_fullname, tempr_m, datein, division_name, ward_name, doctor_name, sost, dataoperation, pass_type_name)
values (105488, 1, '4442/15', 'АРЫШНИКОВ ИВАН НИКОЛАЕВИЧ  11.04.74', '35,8', to_date('20-12-2016 22:44:00', 'dd-mm-yyyy hh24:mi:ss'), '4 н/х', '8', null, 'Тяжелое', null, 'Временный');
insert into VIRI_PATIENT_IN (case_history_id, registry_id, show_id, show_fullname, tempr_m, datein, division_name, ward_name, doctor_name, sost, dataoperation, pass_type_name)
values (384168, 1, '1289/17', 'БАРЛОВА ЛАРИСА МИХАЙЛОВНА  20.08.69', '36,8', to_date('07-02-2017 12:33:06', 'dd-mm-yyyy hh24:mi:ss'), '7 н/х', 'ПИТ', 'Калинин П.Л.', 'Удовлетворительное', null, null);
insert into VIRI_PATIENT_IN (case_history_id, registry_id, show_id, show_fullname, tempr_m, datein, division_name, ward_name, doctor_name, sost, dataoperation, pass_type_name)
values (384412, 1, '1324/17', 'СЕНИСЕНКО ВИТАЛИЙ АНАТОЛЬЕВИЧ  04.04.58', '36,6', to_date('08-02-2017 09:53:04', 'dd-mm-yyyy hh24:mi:ss'), 'ОРиИТ', 'Зал 1', null, 'Тяжелое', sysdate, null);
insert into VIRI_PATIENT_IN (case_history_id, registry_id, show_id, show_fullname, tempr_m, datein, division_name, ward_name, doctor_name, sost, dataoperation, pass_type_name)
values (384440, 1, '1329/17', 'ДЕПРЯХИНА ЕЛЕНА ВЛАДИМИРОВНА  18.10.58', '36,3', to_date('10-02-2017 10:39:21', 'dd-mm-yyyy hh24:mi:ss'), '8 н/х', '2', null, 'Удовлетворительное', null, null);
insert into VIRI_PATIENT_IN (case_history_id, registry_id, show_id, show_fullname, tempr_m, datein, division_name, ward_name, doctor_name, sost, dataoperation, pass_type_name)
values (385285, 1, '1491/17', 'ВЕНДРАТЬЕВ ВИКТОР ВЛАДИМИРОВИЧ  25.02.71', '36,3', to_date('16-02-2017 08:58:15', 'dd-mm-yyyy hh24:mi:ss'), '3 н/х', '5', null, 'Удовлетворительное', null, null);
insert into VIRI_PATIENT_IN (case_history_id, registry_id, show_id, show_fullname, tempr_m, datein, division_name, ward_name, doctor_name, sost, dataoperation, pass_type_name)
values (385582, 1, '1528/17', 'ГАРОВ КИРИЛЛ ИСМАИЛОВИЧ  15.05.73', '37,3', to_date('17-02-2017 11:53:42', 'dd-mm-yyyy hh24:mi:ss'), '8 н/х', '15', null, 'Удовлетворительное', null, null);
insert into VIRI_PATIENT_IN (case_history_id, registry_id, show_id, show_fullname, tempr_m, datein, division_name, ward_name, doctor_name, sost, dataoperation, pass_type_name)
values (385854, 1, '1569/17', 'ЕЛИСЕЕВА ГАЛИНА СЕРГЕЕВНА  02.10.82', '36,6', to_date('21-02-2017 09:10:59', 'dd-mm-yyyy hh24:mi:ss'), '3 н/х', '15', null, 'Средней тяжести', null, null);
insert into VIRI_PATIENT_IN (case_history_id, registry_id, show_id, show_fullname, tempr_m, datein, division_name, ward_name, doctor_name, sost, dataoperation, pass_type_name)
values (386262, 1, '1639/17', 'ЖЕДЯЕВА МАЛИНА НЕСТЕРОВНА  09.08.55', '36,4', to_date('22-02-2017 14:30:15', 'dd-mm-yyyy hh24:mi:ss'), '3 н/х', '3', null, 'Удовлетворительное', null, 'Постоянный');
insert into VIRI_PATIENT_IN (case_history_id, registry_id, show_id, show_fullname, tempr_m, datein, division_name, ward_name, doctor_name, sost, dataoperation, pass_type_name)
values (386380, 1, '1658/17', 'ИВАНОВА НИНА МИХАЙЛОВНА  01.06.57', '36,4', to_date('23-02-2017 10:48:35', 'dd-mm-yyyy hh24:mi:ss'), '3 н/х', '10', null, 'Удовлетворительное', null, null);
insert into VIRI_PATIENT_IN (case_history_id, registry_id, show_id, show_fullname, tempr_m, datein, division_name, ward_name, doctor_name, sost, dataoperation, pass_type_name)
values (386413, 1, '1661/17', 'КАЛАВРЕНТЬЕВА ИГАЛИНА ПЕТРОВНА  23.03.84', '37,1', to_date('23-02-2017 11:19:39', 'dd-mm-yyyy hh24:mi:ss'), '7 н/х', '1', null, 'Удовлетворительное', null, null);
insert into VIRI_PATIENT_IN (case_history_id, registry_id, show_id, show_fullname, tempr_m, datein, division_name, ward_name, doctor_name, sost, dataoperation, pass_type_name)
values (386506, 1, '1675/17', 'ЛАШОМПОЛОВА СВЕТЛАНА БОРИСОВНА  21.07.76', '36,6', to_date('23-02-2017 17:23:01', 'dd-mm-yyyy hh24:mi:ss'), '8 н/х', '1', null, 'Удовлетворительное', null, null);
Commit;
