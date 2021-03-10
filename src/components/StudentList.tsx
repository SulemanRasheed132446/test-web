import React from 'react'

export const StudentList = (props:any) => {
  const { studentlist, handleCheckStudent} = props;
  return (
    <>
    {studentlist?
      <>
      {studentlist.map((item: any, index: any) => (
        <li className="list-group-item" key={index} data-id={item.id} onClick={handleCheckStudent}>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id={'student_'+item.id} />
            <label className="form-check-label" htmlFor={'student_'+item.id}>{item.student_name}</label>
          </div>
        </li>
      ))}
      </>
      : 'No Records'} 
      </>
  )
}
export default StudentList
