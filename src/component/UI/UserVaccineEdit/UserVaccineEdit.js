import React from 'react'

function UserVaccineEdit() {
    return (
        <div>
            <div className="container" style={{ marginTop: '20px'}} >

<div className="card">
  <div className="card-header text-center">
    Edit vaccine details
  </div>
  <div className="card-body">
    <div className="container">
      <div className="row gx-5">
        <div className="col">
         <div className="p-3 border bg-light">
              <div className="mb-3 row">
                <label for="inputPassword" className="col-sm-4 col-form-label">First dose</label>
                <div className="col-sm-5">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    </div>
                </div>
              </div>
              <div className="mb-3 row">
                <label for="inputPassword" className="col-sm-4 col-form-label">First dose date</label>
                <div className="col-sm-5">
                  <input type="text" className="form-control" id="inputPassword"/>
                </div>
              </div>
              <div className="mb-3 row">
                <label for="inputPassword" className="col-sm-4 col-form-label">First dose details</label>
                <div className="col-sm-5">
                  <input type="file" id="inputPassword"/>
                </div>
              </div>
              <div className="mb-3 row">
                <label for="inputPassword" className="col-sm-4 col-form-label">Second dose</label>
                <div className="col-sm-5">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    </div>
                </div>
              </div>
              <div className="mb-3 row">
                <label for="inputPassword" className="col-sm-4 col-form-label">Second dose date</label>
                <div className="col-sm-5">
                  <input type="text" className="form-control" id="inputPassword"/>
                </div>
              </div>
              <div className="mb-3 row">
                <label for="inputPassword" className="col-sm-4 col-form-label">Second dose details</label>
                <div className="col-sm-5">
                  <input type="file" id="inputPassword"/>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <button className="btn btn-md btn-primary" style={{float:" right"}}>Submit</button>
                </div>
              </div>
         </div>
        </div>
      </div>
    </div>
  </div>
</div>

</div>

            
        </div>
    )
}

export default UserVaccineEdit
