import React from 'react'
export const CheckBox = (props:any) => {
  const { item, isChecked } = props;
    return (
      <label>        
      {/* <li> */}
            <div className="row d-flex">
                <div className="ml-3 mt-2">
                <input
                  type="checkbox"
                  value={item.id}
                  checked={isChecked}
                  onChange={props.handleCheckboxClick}
                />
                </div>
                <div className="col-md-8">
                    <div className="prog-avatar ml-2 mr-0">
                        <button className="mdl-button
                                mdl-js-button
                                mdl-button--fab
                                mdl-button--mini-fab
                                btn-pink firstletter">
                            <span>{item.student_name.charAt(0)}</span>
                        </button>
                    </div>
                    <div className="details mt-1">
                        <div className="title">
                            {item.student_name}
                        </div>
                    </div>
                </div>                                           
            </div>
      </label>
    );
}

export default CheckBox