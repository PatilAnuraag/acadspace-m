import React, { useState } from 'react';
import CommonHome from '../../components/common/CommonHome'
import Select from "react-select";
import { useNavigate } from 'react-router-dom';
function PortAccount() {
    const [formData, setFormData] = useState({
        parentName: '',
        mobileNo: '',
    });
    const navigate = useNavigate();

    const handleInputChange = (event) => {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log('Form data to be sent:', formData);
  
      setFormData({
        parentName: '',
        mobileNo: '',
     
      });
      navigate('/profile');
    };

    const handleCloseProfile = () => {
      navigate('/profile');
    }
  return (
    <CommonHome>
           <div className="create-account-middle-content">
        <div className="create-account-info">
          <button className="close-form" onClick={handleCloseProfile} ></button>
          <h1>Port Number</h1>
          <p>Please enter details below</p>
          <form className="create-account-form" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-12">
                <label>Student email</label>
                <input
                  className="input"
                  value={formData.parentName}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Enter student email"
                  name="parentName"
                />
              </div>
              <div className="col-lg-12">
                <label>Mobile Number</label>
                <input
                  className="input"
                  value={formData.mobileNo}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Enter mobile number"
                  name="mobileNo"
                  minLength={10}
                  maxLength={10}
                />
              </div>
              <div className="col-lg-12">
                <button  className={`request-otp`}   type='submit' >Port Number</button>
              </div>
            </div>
          </form>

        </div>
      </div>
    </CommonHome>
  )
}

export default PortAccount
