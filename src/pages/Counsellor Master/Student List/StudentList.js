import React, { useEffect, useState } from 'react';
import c_filter from '../../../assets/images/c-filter.png';
import c_add from '../../../assets/images/c-add-circle.png';
import counsler from '../../../assets/images/counsler-user.png';
import Loader from '../../../components/common/Loader';
import { ChevronRight } from 'react-bootstrap-icons';
import { handleDynamicRequestHeader } from '../../../components/common/DyanamicRequest';
import { BASE_URL } from '../../../components/common/AppConfig';
import { useSelector } from 'react-redux';

function StudentList() {
    const [isLoader, setIsLoader] = useState(true);
    const [studentData, setStudentData] = useState([]);
    const userToken = useSelector((state) => state.roleReducer.jwtToken);
    const [alertMessage, setAlertMessage] = useState({ success: '', error: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const [isChecked, setIsChecked] = useState(false);
    const [sortOrder, setSortOrder] = useState('ASC'); 
    const [classValue, setClassValue] = useState(''); 
    const [isClassValue, setIsClassValue] = useState(false); 

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        if (!isChecked) {
            setSortOrder('ASC'); 
        }
    };
    const handleCheckboxChangeClass = () => {
        setIsClassValue(!isClassValue);
        console.log(classValue)
    };

    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
    };
    
    const handleSortOrderChangeClass = (event) => {
        setClassValue(event.target.value);
    };

    const [selectedUser, setSelectedUser] = useState({
        name: "",
        mobileNo: "",
        class: "",
        section: "",
        email: "",
        rollNo: "",
        parentsName: "",
        parentsmobile: "",
        parentsemail: "",
        type: ""
    });

    useEffect(() => {
        handleStudent(1, sortOrder, classValue); // Pass sortOrder here
    }, [isChecked, sortOrder, classValue]); 
    
    const handleStudent = async (page, sortOrderParam, classValueParms) => {
        const requestBody = {};
        const method = 'POST';
        let url = `${BASE_URL}/mobile/studentlist?page=${page}`;
        const token = userToken;
    
        if (isChecked) {
            const sortOrder = sortOrderParam === 'ASC' ? 'ASC' : 'DESC'; // Ensure sortOrder is either 'ASC' or 'DESC'
            url += `&order=${sortOrder}`;
        }

        if (isClassValue) {
          
            url += `&classValue=${classValueParms}`;
        }
        const wrongResponse = () => {
            setAlertMessage({ success: '', error: 'Something went wrong' });
        }
    
        const rightResponse = (data) => {
            if (currentPage === 1) {
                setStudentData(data.student);
            } else {
                // If it's not the first page, append the new data to the existing one
                setStudentData(prevData => [...prevData, ...data.student]);
            }
        }
    
        handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse);
    }
    

    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) {
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage); 
            handleStudent(nextPage, sortOrder, classValue); // Pass sortOrder here
        }
    };
    

    useEffect(() => {
        handleStudent(currentPage);
    }, []); 


    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };


    const filteredStudents = studentData
    .filter(student =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice() // Create a shallow copy to avoid mutating the original array
    .sort((a, b) => {
        const nameA = a.name.trim().toLowerCase(); // Convert names to lowercase
        const nameB = b.name.trim().toLowerCase();
        
        if (sortOrder === 'ASC') {
            return nameA.localeCompare(nameB);
        } else if (sortOrder === 'DESC') {
            return nameB.localeCompare(nameA);
        } else {
            return 0; // Default behavior: no sorting
        }
    })
   





    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        let selectedValue = value;
        setSelectedUser((prevUser) => ({
            ...prevUser,
            [name]: selectedValue,
        }));
    };


    const handleSave = async (e) => {
        e.preventDefault();
        if (selectedUser) {
            const requestBody = {
                name: selectedUser.name,
                email: selectedUser.email,
                Class: selectedUser.class,
                mobileNo: selectedUser.mobileNo,
                section: selectedUser.section,
                rollNo: selectedUser.rollNo,
                parentsName: selectedUser.parentsName,
                parentsNumber: selectedUser.parentsmobile,
                parentsemail: selectedUser.parentsemail,

            };
            const method = 'POST';
            const url = `${BASE_URL}/mobile/singleStudentAdd`;
            const token = await userToken;
            const wrongResponse = () => {
                setAlertMessage({ success: '', error: 'Wrong Credentials' });
            }
            const rightResponse = (data) => {
                if (data) {

                }
            }
            handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse);
        }
        window.location.reload();
    };



    return (
        <>
            <div class="col-lg-12">

                <section class="counsellor-student-list">

                    <div class="row">

                        <div class="col-lg-12">
                            <div class="c-student-list">

                                <h2>Student List</h2>

                                <div class="search-add-student">
                                    <form>

                                        <div class="c-search-header">
                                            <div className="c-search">
                                                <input type="text" placeholder="Search for student name" onChange={handleSearch} />
                                            </div>
                                            <div className="dropdown ">

                                              <a href="#" className="c-filter dropdown-toggle dropwodn-toggle-icon-none" data-bs-toggle="modal" data-bs-target="#add-filter-option">
                                                <img src={c_filter} alt="Filter" />
                                              </a>

                                              {/* <ul className="dropdown-menu filter-ics" aria-labelledby="dropdownMenuLink">
                                                <spam><h6>Filter Options</h6></spam>
                                                <li>
                                                  <div className="form-check">
                                                    
                                                    <input className="form-check-input" type="checkbox" value="" id="checkbox1" />
                                                    <label className="form-check-label" htmlFor="checkbox1">
                                                      Action
                                                    </label>
                                                    
                                                  </div>
                                                </li>
                                                <li>
                                                  <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" value="" id="checkbox2" />
                                                    <label className="form-check-label" htmlFor="checkbox2">
                                                      Another action
                                                    </label>
                                                  </div>
                                                </li>
                                                <li>
                                                  <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" value="" id="checkbox3" />
                                                    <label className="form-check-label" htmlFor="checkbox3">
                                                      Something else here
                                                    </label>
                                                  </div>
                                                </li>
                                              </ul> */}

                                            </div>
                                            <button type="button" class="c-add-btn" data-bs-toggle="modal" data-bs-target="#add-student">Add Student
                                                <img src={c_add} alt="" /></button>

                                        </div>
                                        <div class="outer-c-thead">
                                            <div class="c-thead">
                                                <div class="row">
                                                    <div class="col-lg-4 text-center">
                                                        <span>Personal<br></br>Details</span>
                                                    </div>
                                                    <div class="col-lg-8">
                                                        <div class="mobile-assiment-dc">
                                                            <span>Personality<br></br>Assessment</span>
                                                            <span>Parents<br></br>Assessment</span>
                                                            <span>Career<br></br>Discovery</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div onScroll={handleScroll} style={{
                                                overflowY: 'scroll',
                                                maxHeight: '800px',
                                                scrollbarWidth: 'none',
                                                '-ms-overflow-style': 'none'
                                            }}>
                                                {studentData && studentData.length > 0 ? (
                                                    <>
                                                        {filteredStudents.map((student, index) => (
                                                            <div key={index} className="c-table-user-list">
                                                                <div className="row align-items-center">
                                                                    <div className="col-lg-4">
                                                                        <div className="c-user-rane">
                                                                            <img src={student.profilepic} alt="" />
                                                                            <div>
                                                                                <h3>{student.name}</h3>
                                                                                <p>{student.Class} {student.section} | {student.type}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-8">
                                                                        <ul className="timeline">
                                                                            <li className={student.test1 ? 'active' : ''}>Personality<br />Assessment</li>
                                                                            <li className={student.test2 ? 'active' : ''}>Parents<br />Assessment</li>
                                                                            <li className={student.test3 ? 'active' : ''}>Career<br />Discovery</li>
                                                                        </ul>
                                                                        <a href="#" className="c-check-callout"></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </>
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Add Student Model */}
                <div class="modal fade" id="add-student" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg c-add-student">
                        <div class="modal-content" id="custom-modal-content">

                            <div class="modal-header">
                                <h5 class="modal-title">Add new student</h5>
                                <button type="button" class="btn-close close-assesment" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div class="modal-body">

                                <form onSubmit={handleSave}>
                                    <div class="row">

                                        <div class="col-lg-6">
                                            <h2>Student Details</h2>

                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <label>Full Name</label>
                                                    <input
                                                        type="text"
                                                        value={selectedUser.name || ''}
                                                        onChange={handleEditInputChange}
                                                        placeholder="enter student’s name" />
                                                </div>

                                                <div class="col-lg-6">
                                                    <label>Class</label>
                                                    <select
                                                        name="class"
                                                        value={selectedUser.class}
                                                        onChange={handleEditInputChange}>
                                                        <option value="">Select Class</option>
                                                        <option value="1">Class 1</option>
                                                        <option value="2">Class 2</option>
                                                        <option value="3">Class 3</option>
                                                    </select>
                                                </div>

                                                <div class="col-lg-6">
                                                    <label>Section</label>
                                                    <input
                                                        type="text"
                                                        value={selectedUser.section || ''}
                                                        onChange={handleEditInputChange}
                                                        placeholder="enter section" />
                                                </div>

                                                <div class="col-lg-12">
                                                    <label>Email</label>
                                                    <input
                                                        type="email"
                                                        value={selectedUser.email || ''}
                                                        onChange={handleEditInputChange}
                                                        placeholder="jesse@example.com" />
                                                </div>

                                                <div class="col-lg-12">
                                                    <label>Mobile no.</label>
                                                    <input
                                                        type="text"
                                                        value={selectedUser.mobileNo || ''}
                                                        onChange={handleEditInputChange}
                                                        placeholder="enter mobile number" />
                                                </div>
                                            </div>

                                        </div>

                                        <div class="col-lg-6">
                                            <h2>Parent’s Details</h2>

                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <label>Parent’s Name</label>
                                                    <input
                                                        type="text"
                                                        value={selectedUser.parentsName || ''}
                                                        onChange={handleEditInputChange}
                                                        placeholder="enter student’s name" />
                                                </div>

                                                <div class="col-lg-12">
                                                    <label>Email </label>
                                                    <input
                                                        type="email"
                                                        value={selectedUser.parentsemail || ''}
                                                        onChange={handleEditInputChange}
                                                        placeholder="jesse@example.com" />
                                                </div>

                                                <div class="col-lg-12">
                                                    <label>Mobile no.</label>
                                                    <input
                                                        type="text"
                                                        value={selectedUser.parentsmobile || ''}
                                                        onChange={handleEditInputChange}
                                                        placeholder="enter mobile number" />
                                                </div>

                                                <div class="col-lg-12">
                                                    <button class="c-add-submit">Submit</button>
                                                </div>
                                            </div>
                                      </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter Options Model */}
                <div class="modal fade" id="add-filter-option" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-sm modal-dialog-centered c-filter-student">
                        <div class="modal-content" id="custom-modal-content">

                            <div class="modal-header">
                                <h5 class="modal-title">Filter Options</h5>
                                {/* <button type="button" class="btn-close close-assesment" data-bs-dismiss="modal" aria-label="Close"></button> */}
                            </div>

                            <div class="modal-body">

                                {/* <div className='sort-order'>
                                    <div className="form-check">        
                                        <input className="form-check-input" type="checkbox" value="" id="checkbox1" />
                                        <label className="form-check-label" htmlFor="checkbox1">
                                            Sort Order:
                                        </label>
                                    </div>
                                    <div className='radio-two-btn'>
                                        <input type="radio" name="btnradio" value="btnradio1" autocomplete="off" checked />
                                        <label for="btnradio1">ASC</label>

                                        <input type="radio" name="btnradio" value="btnradio2" autocomplete="off" />
                                        <label for="btnradio2">DSC</label>
                                    </div>
                                </div> */}

<div className='sort-order'>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkbox1"
                    onChange={handleCheckboxChange}
                    checked={isChecked}
                />
                <label className="form-check-label" htmlFor="checkbox1">
                    Sort Order:
                </label>
            </div>
            {isChecked && (
                <div className='radio-two-btn'>
                    <input type="radio" name="btnradio" value="ASC" autoComplete="off" checked={sortOrder === 'ASC'} onChange={handleSortOrderChange} />
                    <label htmlFor="btnradio1">ASC</label>

                    <input type="radio" name="btnradio" value="DSC" autoComplete="off" checked={sortOrder === 'DSC'} onChange={handleSortOrderChange} />
                    <label htmlFor="btnradio2">DSC</label>
                </div>
            )}
        </div>

                                <div className='sort-order-by'>
                                    <div className="form-check">        
                                        <input className="form-check-input" type="checkbox" value="" id="sortby" />
                                        <label className="form-check-label" htmlFor="sortby">
                                            Sort by:
                                        </label>
                                    </div>
                                    <select>
                                        <option>Class</option>
                                        <option>ClassOne</option>
                                        <option>ClassTwo</option>
                                    </select>
                                </div>

                                <div className='sort-order-by'>
            <div className="form-check">
                <input 
                    className="form-check-input" 
                    type="checkbox" 
                    value="" 
                    id="classyear" 
                    onChange={handleCheckboxChangeClass}
                />
                <label className="form-check-label" htmlFor="classyear">
                    Class/Year:
                </label>
            </div>
            {isClassValue && ( 
                <select onChange={handleSortOrderChangeClass} value={classValue}> {/* Add onChange event and value attribute */}
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            )}
        </div>

                                <div className='group-btn-filter'>
                                    <button data-bs-dismiss="modal">Cancel</button>
                                    <button data-bs-dismiss="modal" className='apply'>Apply</button>
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default StudentList


