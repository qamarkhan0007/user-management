import React, { useEffect, useState } from 'react';
import call from '../../service';

function ViewEmployee({flag, id, setViewModal}) {
  // State for storing data of a particular user
  const [emp, setEmp] = useState({});

  // Get User Details API
  useEffect(() => {
    call('GET', '/api/users/'+id).then((result) => {
      setEmp(result.data.data);
    }).catch((e) => {
      console.log("Error In /api/users/id", e);
    });
  }, []);

  // JSX
  return (
    <div className="modal show" style={{display:'block'}}>
      <div className="modal-dialog " id="parent_class">
        <form action="/employee">
          <div className="modal-content custom-border">

            <div className="modal-header ">
              <h4>User Details View </h4>
              <button type="button" className="close" onClick={() => setViewModal({flag: false})} >×</button>
            </div>

            <div className="modal-body ">
              <div className="col-md-12">
                <div className="row form-group">

                  <div className="col-md-12 text-center pb-2">
                    <img src={emp.avatar} className="rounded-circle" alt="Girl in a jacket" width="200" height="200" />
                  </div>
                  <div className="col-md-12 text-center">
                    <label ><h2>{emp.first_name} {emp.last_name}</h2></label>
                  </div>
                  <div className="col-md-7 text-center">
                    <label ><i class="fa fa-envelope-o pr-2" aria-hidden="true"></i>{emp.email}</label>
                  </div>
                  <div className="col-md-5 text-center">
                    <label ><i class="fa fa-phone pr-2" aria-hidden="true"></i>+91-2378654587</label>
                  </div>

                </div>
              </div>
            </div>

            <div className="modal-footer ">
              <button type="button" className="btn btn-success" onClick={() => setViewModal({flag: false})}>Close</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ViewEmployee;
