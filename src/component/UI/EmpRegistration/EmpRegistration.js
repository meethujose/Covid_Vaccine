import React from 'react'
import './EmpRegistration.css';
function EmpRegistration() {
    return (
        <div>
            

            <div className="container">
            <form className="form-horizontal" role="form">
                <h2>Registration</h2>
                <div className="form-group">
                    <label for="firstName" className="col-sm-3 control-label">First Name</label>
                    <div className="col-sm-9">
                        <input type="text" id="firstName" placeholder="First Name" className="form-control" autofocus/>
                    </div>
                </div>
                <div className="form-group">
                    <label for="lastName" className="col-sm-3 control-label">Last Name</label>
                    <div className="col-sm-9">
                        <input type="text" id="lastName" placeholder="Last Name" className="form-control" autofocus/>
                    </div>
                </div>
                <div className="form-group">
                    <label for="email" className="col-sm-3 control-label">Email* </label>
                    <div className="col-sm-9">
                        <input type="email" id="email" placeholder="Email" className="form-control" name= "email"/>
                    </div>
                </div>
                <div className="form-group">
                    <label for="EmiratesId" className="col-sm-3 control-label">EmiratesId*</label>
                    <div className="col-sm-9">
                        <input type="number" id="EmiratesId" placeholder="EmiratesId" className="form-control"/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-3">IsAdmin</label>
                    <div className="col-sm-6">
                        <div className="row">
                            <div className="col-sm-4">
                                <label className="radio-inline">
                                    <input type="radio" id="femaleRadio" value="Female"/>
                                </label>
                            </div>                 
                        </div>
                    </div>
                </div> 
                <div className="form-group">
                    <label className="control-label col-sm-3">First Dose</label>
                    <div className="col-sm-6">
                        <div className="row">
                            <div className="col-sm-4">
                                <label className="radio-inline">
                                    <input type="radio" id="FirstDose" value="FirstDose"/>
                                </label>
                            </div>                 
                        </div>
                    </div>
                </div> 
                
                <div className="form-group">
                    <label for="birthDate" className="col-sm-3 control-label">First Dose Date</label>
                    <div className="col-sm-9">
                        <input type="date" id="firstDoseDate" className="form-control"/>
                    </div>
                </div>
                <div className="form-group">
                    <label for="FirstDoseDetails" className="col-sm-3 control-label">First Dose Details</label>
                    <div className="col-sm-9">
                        <input type="file" id="FirstDoseDetails" />
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-3">Second Dose</label>
                    <div className="col-sm-6">
                        <div className="row">
                            <div className="col-sm-4">
                                <label className="radio-inline">
                                    <input type="radio" id="SecondDose" value="SecondDose"/>
                                </label>
                            </div>                 
                        </div>
                    </div>
                </div> 
                <div className="form-group">
                    <label for="SecondDoseDate" className="col-sm-3 control-label">Second Dose Date</label>
                    <div className="col-sm-9">
                        <input type="date" id="SecondDoseDate" className="form-control"/>
                    </div>
                </div>
                <div className="form-group">
                    <label for="SecondDoseDetails" className="col-sm-3 control-label">Second Dose Details</label>
                    <div className="col-sm-9">
                        <input type="file" id="SecondDoseDetails" />
                    </div>
                </div>
                
                <div className="form-group">
                    <div className="col-sm-9 col-sm-offset-3">
                     
                    </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Register</button>
            </form>
        </div> 



            
        </div>
    )
}

export default EmpRegistration
