import React, { useEffect, useState } from 'react';
import call from '../../service';
import ViewEmployee from './userDetails';
import { delCookie } from '../../auth';


function EmployeeList({flag}) {
  // State to Store data
  const [data, setData] = useState([]);
  const [viewModal, setViewModal] = useState({
    flag: false
  });

  // useEffect Hook to fetch the data
  useEffect(() => {
    call('GET', '/api/users?page=2').then((result) => {
      setData(result.data.data);
    }).catch((e) => {
      console.log("Error In /api/users?page=2", e);
    });
  }, []);

  // Function to close the modal
  function openModal(flag, id) {
    setViewModal({...viewModal, flag: flag, id: id});
  }

  // Removing Cookie on Logout
  function logout() {
    delCookie();
    window.location = "/";
  }

  // Body Component
  function getTableBody() {
    let body = data.length ? data.map((item) => {
      return (
          <tr>
          <td>{item.id}</td>
          <td><img src={item.avatar} className="rounded-circle" alt="Girl in a jacket" width="60" height="60" /></td>
          <td>{item.first_name}</td>
          <td>{item.last_name}</td>
          <td>{item.email}</td>
          <td>
          <button className="btn btn-info btn-sm mt-0 mr-1" onClick={() => openModal('view', item.id)}><i class="fa fa-eye pr-2" aria-hidden="true"></i>View Details</button>
          </td>
        </tr>
      )
    }) : ''
    return body
  }

  // Main JSX Body
  return (
    <div className="container-fluid">
      {viewModal.flag === 'view' ? <ViewEmployee flag={'view'} id={viewModal.id} setViewModal={setViewModal} />: ''}
      <div className="row">
        <main role="main" class="col-md-12">
          <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-dark border-bottom shadow-sm text-white">
            <h3 class="my-0 mr-md-auto font-weight-normal">Dashboard</h3>
            <nav class="my-2 my-md-0 mr-md-3">
              <input type="button" value="Logout" class="btn btn-success" onClick={logout} />
            </nav>
          </div>

          <div class="table-responsive table">
            <table class="table table-striped table-sm">
              <thead className="thead-dark">
                <tr>
                <th>S No.</th>
                <th>Avatar</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {getTableBody()}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

export default EmployeeList;
