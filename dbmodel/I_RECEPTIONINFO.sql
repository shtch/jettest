create or replace package I_RECEPTIONINFO as

function patient_in (
    p_name_search in varchar2,
    p_date_in in date default null,
    p_registry_id in number default 1)
    return sys_refcursor;
    
function patient_out_year (
    p_name_search in varchar2,
    p_registry_id in number default 1)
    return sys_refcursor;
    
function patient_out_all (
    p_name_search in varchar2,
    p_registry_id in number default 1)
    return sys_refcursor;    
end;
