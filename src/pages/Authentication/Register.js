import React, { useState, useEffect } from 'react';
import CommonHome from '../../components/common/CommonHome'
import { BASE_URL } from '../../components/common/AppConfig';
import { setUserId, setUserRole, setUserName, setJwtToken, setO_photo, setStudent } from '../../store/Role/action';
import { handleDynamicRequest } from '../../components/common/DyanamicRequest';
import CreatableSelect from 'react-select/creatable';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SetAlert from '../../components/common/SetAlert'
import mixpanel from 'mixpanel-browser';
function Register() {
  const [isSchoolSelected, setIsSchoolSelected] = useState(false);
  const [isCollegeSelected, setIsCollegeSelected] = useState(false);
  const [alertMessage, setAlertMessage] = useState({ success: '', error: '' });
  const [school, setSchool] = useState('');
  const [college, setCollege] = useState('');
  const [submit, setSubmit] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    studentname: '',
    email: '',
    type: '',
    schoolname: '',
    Class: '',
    section: ''
  });
  const userRole = useSelector((state) => state.roleReducer.userRole);
  const userId = useSelector((state) => state.roleReducer.userId);
  const phone = useSelector((state) => state.roleReducer.phone);
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = location.state || {};

  // console.log('check role : ', role);
  // console.log('check user roloe  : ', userRole);

  const handleRadioChange = (event) => {
    setIsSchoolSelected(event.target.value === 'School');
    setIsCollegeSelected(event.target.value === 'College');
    const selectedtype = event.target.value;
    setFormData({
      ...formData,
      type: selectedtype
    });
  };
  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSchoolChange = (option) => {
    console.log('check event : ', option);
    if (option && option.value) {
      setFormData({ ...formData, schoolname: option.value });
    }
    console.log('check form data : ', formData.schoolname);
  };

  const fetchOrganisationData = async () => {

    const requestBody = {};

    const method = 'POST';
    const url = `${BASE_URL}/mobile/getAllSchoolInfo`;
    const wrongResponse = (data) => {
      if (data.message)

        setAlertMessage({ success: '', error: data.message });
    }
    const rightResponse = (data) => {
      if (data.schools && data.schools.length > 0) {
        console.log(data)
        setSchool(data);


      } if (data.colleges && data.colleges.length > 0) {
        setCollege(data.colleges)
      }
    }
    handleDynamicRequest(method, url, requestBody, wrongResponse, rightResponse)
  }

  useEffect(() => {
    fetchOrganisationData();
  }, []);

  const allClass = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const allColleges = [1, 2, 3, 4];
  const allStream = ['Engineering', 'Computer Science', 'Medicine', 'Accounting & Finance', 'Business and Management', 'Science', 'Mathematics', 'Social Sciences',
    'Humanities', 'Arts', 'Education', 'Law', 'Data Science', 'Architecture and Design', 'Health Sciences', 'Environmental Science', 'Agriculture',
    'Communications and Media', 'Information Technology', 'Hospitality and Tourism', 'Fashion and Apparel Design', 'Music and Fine Arts', 'Aviation',
    'Banking & Insurance', 'Culinary Arts', 'Sports Science and Management', 'Dentistry', 'Pharmacy', 'Veterinary Science', 'Forestry and Wildlife Management',
    ' Geology and Earth Sciences', 'Biotechnology', 'Nursing'];

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSchool(true);
    const requestBody = {
      id: userId, role: role, name: formData.name, studentname: formData.studentname,
      email: formData.email, type: formData.type, schoolname: formData.schoolname, section: formData.section, Class: parseInt(formData.Class), mobileNo: phone
    };

    mixpanel.track("Sign Up", {
      "Signup Type": "Referral Website",
      'name': formData.name || 'asasa',
      'id': userId || 'asasa',
      'mobileNo': phone || 'asasa',
    });


    if (formData.type === 'schoolname') {

    }

    console.log(requestBody);
    const method = 'POST';
    if (userRole.includes('ROLE_PARENT')) {
      const url = `${BASE_URL}/mobile/addStudentAcc`;
      const wrongResponse = (data) => {
        if (data && data.message) {
          console.log(data);
          setAlertMessage({ success: '', error: data.message });
        } else {
          setAlertMessage({ success: '', error: "Account with same email already exists" });
        }
      }
      const rightResponse = (data) => {
        console.log(data.data)
        dispatch(setUserRole(data.role));
        dispatch(setUserName(data.name));
        dispatch(setJwtToken(data.token));
        navigate('/dashboard')
      }
      handleDynamicRequest(method, url, requestBody, wrongResponse, rightResponse)
    } else if (role.includes('Student')) {

      const url = `${BASE_URL}/mobile/UpdateName`;
      const wrongResponse = (data) => {
        if (data && data.message) {
          console.log(data);
          setAlertMessage({ success: '', error: data.message });
        } else {
          setAlertMessage({ success: '', error: "Account with same email already exists" });
        }
      }
      const rightResponse = (data) => {
        console.log(data.data)
        dispatch(setUserRole(data.role));
        dispatch(setUserName(formData.studentname));
        dispatch(setStudent(data.student));
        dispatch(setJwtToken(data.token));

        navigate('/dashboard')
      }
      handleDynamicRequest(method, url, requestBody, wrongResponse, rightResponse)

    } else {
      const url = `${BASE_URL}/mobile/UpdateName`;
      const wrongResponse = (data) => {
        if (data && data.message) {
          console.log(data);
          setAlertMessage({ success: '', error: data.message });
        } else {
          setAlertMessage({ success: '', error: "Account with same email already exists" });
        }
      }
      const rightResponse = (data) => {
        console.log(data.data)
        dispatch(setUserRole(data.role));
        dispatch(setUserName(formData.name));
        dispatch(setStudent(data.student));
        dispatch(setJwtToken(data.token));

        navigate('/dashboard')
      }
      handleDynamicRequest(method, url, requestBody, wrongResponse, rightResponse)
    }


  }

  const handleCloseProfile = () => {
    navigate('/profile');
  }

  return (
    <CommonHome>
      <div className="create-account-middle-content">
        <div className="create-account-info">
          <button className="close-form" onClick={handleCloseProfile} ></button>
          <h1>Create Account</h1>
          <p>Please enter details below</p>
          <SetAlert alertMessage={alertMessage} setAlertMessage={setAlertMessage} />
          <form className="create-account-form" onSubmit={handleSubmit}>
            <div className="row">
              {userRole === 'NEW_ACCOUNT' && role !== 'Counsellor' &&
                <div className="col-lg-12">
                  <label>Parent name</label>
                  <input
                    className="input"
                    value={formData.name}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Enter parent name"
                    name="name"
                  />
                </div>
              }
              {userRole === 'NEW_ACCOUNT' && role !== 'Counsellor' &&
                <div className="col-lg-12">
                  <label>Student name</label>
                  <input
                    className="input"
                    value={formData.studentname}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Enter full name"
                    name="studentname"
                  />
                </div>
              }
              {userRole !== 'NEW_ACCOUNT' && role !== 'Counsellor' &&
                <div className="col-lg-12">
                  <label>Student name</label>
                  <input
                    className="input"
                    value={formData.name}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Enter full name"
                    name="name"
                  />
                </div>
              }
              {userRole === 'NEW_ACCOUNT' && role === 'Counsellor' &&
                <div className="col-lg-12">
                  <label>Name</label>
                  <input
                    className="input"
                    value={formData.name}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Enter full name"
                    name="name"
                  />
                </div>
              }
              <div className="col-lg-12">
                <label>Email</label>
                <input className="input" name='email' value={formData.email} onChange={handleInputChange} type="email" placeholder="Enter your mail id" />
              </div>

              <div className="col-lg-12">
                {role === 'Counsellor' ? <label>Select Institute Type</label> : <label>Select current education</label>}
                <div className="flex-check">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      value="School"
                      onChange={handleRadioChange}
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                      School
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      value="College"
                      onChange={handleRadioChange}
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                      College
                    </label>
                  </div>
                </div>
              </div>

              {isSchoolSelected && (
                <>
                  <div className="col-lg-12 form-group">

                    <div className="col-lg-12">
                      <label>Select/Add your school</label>
                      <CreatableSelect
                        className="bg-white tw-mb-4 tw-rounded-xl tw-p-2"
                        name="schoolname"
                        // value={formData.schoolname}
                        defaultValue={formData.schoolname}
                        // inputValue={formData.schoolname}
                        options={school.schools?.map((school, index) => ({
                          value: school,
                          label: school
                        }))}
                        isClearable
                        placeholder="Select a school"
                        isSearchable
                        onChange={(event) => handleSchoolChange(event)}
                        onInputChange={(event) => handleSchoolChange(event)}
                        formatCreateLabel={(inputValue) => `New School ${inputValue}`}
                      />
                    </div>
                  </div>

                  {role !== 'Counsellor' && <div className="col-lg-12">
                    <label>Select class </label>
                    <select className="input" name="Class"
                      onChange={handleInputChange}
                      value={formData.Class}>
                      <option value="">Select Class</option>
                      {allClass.map((classItem, index) => (
                        <option key={index} value={classItem}>{classItem}</option>
                      ))}
                    </select>
                  </div>}
                </>
              )}
              {isCollegeSelected && (
                <>
                  <div className="col-lg-12 form-group">

                    <label>Select/Add your College</label>
                    <CreatableSelect
                      className="bg-white tw-mb-4 tw-rounded-xl tw-p-2"
                      name="schoolname"
                      // value={formData.schoolname}
                      defaultValue={formData.schoolname}
                      // inputValue={formData.schoolname}
                      options={college.map((school, index) => ({
                        value: school,
                        label: school
                      }))}
                      isClearable
                      placeholder="Select a College"
                      isSearchable
                      onChange={(event) => handleSchoolChange(event)}
                      onInputChange={(event) => handleSchoolChange(event)}
                      formatCreateLabel={(inputValue) => `New College ${inputValue}`}
                    />
                  </div>

                  {role !== 'Counsellor' && <>
                    <div className="col-lg-6">
                      <label>Select Year</label>
                      <select className="input" name="Class"
                        onChange={handleInputChange}
                        value={formData.Class}>
                        <option value="">select year</option>
                        {allColleges.map((classItem, index) => (
                          <option key={index} value={classItem}>{classItem}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-lg-6">
                      <label>Select Stream</label>
                      <select
                        className="input"
                        name="section"
                        onChange={handleInputChange}
                        value={formData.section}
                      >
                        <option value="">Select Class Name</option>
                        {allStream.map((classItem, index) => (
                          <option key={index} value={classItem}>
                            {classItem}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>}

                </>
              )}
              <div className="col-lg-12">
                <button className={`request-otp`} disabled={submit} type='submit' >Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </CommonHome>


  )
}

export default Register
