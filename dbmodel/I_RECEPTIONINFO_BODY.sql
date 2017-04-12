create or replace package body I_RECEPTIONINFO as

function patient_in (
    p_name_search in varchar2,
    p_date_in in date default null,
    p_registry_id in number default 1)
    return sys_refcursor as
  r_cur sys_refcursor;
begin  
  if p_name_search is null then
    open r_cur for
      select *
      from
      VIRI_PATIENT_ALL
      where 1=2;
  else
    open r_cur for
      select *
      from
      VIRI_PATIENT_ALL
      where
        date_out is null and
        registry_id = p_registry_id and
        ((date_in = p_date_in) or (p_date_in is null)) and
        show_fullname like upper(p_name_search)||'%';
  end if;
  
  return r_cur;
end patient_in;

function patient_out_year (
    p_name_search in varchar2,
    p_registry_id in number default 1)
    return sys_refcursor as
  r_cur sys_refcursor;
begin  
  if p_name_search is null then
    open r_cur for
      select *
      from
      VIRI_PATIENT_ALL
      where 1=2;
  else
    open r_cur for
      select *
      from
      VIRI_PATIENT_ALL
      where
        date_out is not null and
        date_out > (trunc(sysdate) - 366) and 
        registry_id = p_registry_id and
        show_fullname like upper(p_name_search)||'%';
  end if;
  
  return r_cur;
end patient_out_year;

function patient_out_all (
    p_name_search in varchar2,
    p_registry_id in number default 1)
    return sys_refcursor as
  r_cur sys_refcursor;
begin  
  if p_name_search is null then
    open r_cur for
      select *
      from
      VIRI_PATIENT_ALL
      where 1=2;
  else
    open r_cur for
      select *
      from
      VIRI_PATIENT_ALL
      where
        date_out is not null and
        registry_id = p_registry_id and
        show_fullname like upper(p_name_search)||'%';
  end if;
  
  return r_cur;
end patient_out_all;    

end I_RECEPTIONINFO;
