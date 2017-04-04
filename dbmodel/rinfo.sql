set define off verify off feedback off
whenever sqlerror exit sql.sqlcode rollback
--------------------------------------------------------------------------------
--
-- ORACLE Application Express (APEX) export file
--
-- You should run the script connected to SQL*Plus as the Oracle user
-- APEX_050100 or as the owner (parsing schema) of the application.
--
-- NOTE: Calls to apex_application_install override the defaults below.
--
--------------------------------------------------------------------------------
begin
wwv_flow_api.import_begin (
 p_version_yyyy_mm_dd=>'2016.08.24'
,p_default_workspace_id=>35757589246198386068
);
end;
/
begin
wwv_flow_api.remove_restful_service(
 p_id=>wwv_flow_api.id(8808490288776152565)
,p_name=>'rinfo'
);
 
end;
/
prompt --application/restful_services/rinfo
begin
wwv_flow_api.create_restful_module(
 p_id=>wwv_flow_api.id(8808490288776152565)
,p_name=>'rinfo'
,p_uri_prefix=>'rinfo/'
,p_parsing_schema=>'PRIEM'
,p_items_per_page=>100
,p_status=>'PUBLISHED'
,p_row_version_number=>23
);
wwv_flow_api.create_restful_template(
 p_id=>wwv_flow_api.id(8809034162334601415)
,p_module_id=>wwv_flow_api.id(8808490288776152565)
,p_uri_template=>'patient_in/'
,p_priority=>0
,p_etag_type=>'HASH'
);
wwv_flow_api.create_restful_handler(
 p_id=>wwv_flow_api.id(8809049740786604895)
,p_template_id=>wwv_flow_api.id(8809034162334601415)
,p_source_type=>'QUERY'
,p_format=>'DEFAULT'
,p_method=>'GET'
,p_require_https=>'NO'
,p_source=>wwv_flow_string.join(wwv_flow_t_varchar2(
'select *',
'from priem.VIRI_PATIENT_ALL',
'where date_out is null and 1 = 2'))
);
wwv_flow_api.create_restful_template(
 p_id=>wwv_flow_api.id(9540987696886345724)
,p_module_id=>wwv_flow_api.id(8808490288776152565)
,p_uri_template=>'patient_in/{name}'
,p_priority=>0
,p_etag_type=>'NONE'
);
wwv_flow_api.create_restful_handler(
 p_id=>wwv_flow_api.id(9540989683035348060)
,p_template_id=>wwv_flow_api.id(9540987696886345724)
,p_source_type=>'QUERY'
,p_format=>'DEFAULT'
,p_method=>'GET'
,p_require_https=>'NO'
,p_source=>wwv_flow_string.join(wwv_flow_t_varchar2(
'select *',
'from priem.VIRI_PATIENT_ALL',
'where date_out is null',
'  and show_fullname like upper(:name)||''%'''))
);
wwv_flow_api.create_restful_template(
 p_id=>wwv_flow_api.id(9257273725923610585)
,p_module_id=>wwv_flow_api.id(8808490288776152565)
,p_uri_template=>'patient_out/'
,p_priority=>0
,p_etag_type=>'NONE'
);
wwv_flow_api.create_restful_handler(
 p_id=>wwv_flow_api.id(9257284002168230866)
,p_template_id=>wwv_flow_api.id(9257273725923610585)
,p_source_type=>'QUERY'
,p_format=>'DEFAULT'
,p_method=>'GET'
,p_require_https=>'NO'
,p_source=>wwv_flow_string.join(wwv_flow_t_varchar2(
'select *',
'from priem.VIRI_PATIENT_ALL',
'where ',
'  date_out is not null'))
);
wwv_flow_api.create_restful_template(
 p_id=>wwv_flow_api.id(9257125081939210870)
,p_module_id=>wwv_flow_api.id(8808490288776152565)
,p_uri_template=>'patient_out_year/'
,p_priority=>0
,p_etag_type=>'NONE'
);
wwv_flow_api.create_restful_handler(
 p_id=>wwv_flow_api.id(9257270598558603851)
,p_template_id=>wwv_flow_api.id(9257125081939210870)
,p_source_type=>'QUERY'
,p_format=>'DEFAULT'
,p_method=>'GET'
,p_require_https=>'NO'
,p_source=>wwv_flow_string.join(wwv_flow_t_varchar2(
'select *',
'from priem.VIRI_PATIENT_ALL',
'where ',
'  date_out is not null and',
'  date_out > trunc(sysdate -366)'))
);
end;
/
begin
wwv_flow_api.import_end(p_auto_install_sup_obj => nvl(wwv_flow_application_install.get_auto_install_sup_obj, false));
commit;
end;
/
set verify on feedback on define on
prompt  ...done
