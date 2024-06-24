import React, {useState, useEffect} from 'react'
import { ChevronRight } from 'react-bootstrap-icons';
import { handleDynamicRequestHeader } from '../../../components/common/DyanamicRequest';
import { BASE_URL } from '../../../components/common/AppConfig';
import { useSelector, useDispatch } from 'react-redux';
import { SchoolSrc, CollegeSrc } from '../../../components/common/CareerIcons'
import { useNavigate } from 'react-router-dom';
import { setType, setCarrer } from '../../../store/Career/action';

function LibraryMaster() {
    const [classType, setClassType] = useState(false);
    const [alertMessage, setAlertMessage] = useState({ success: '', error: '' });
    const userToken = useSelector((state) => state.roleReducer.jwtToken);
    const [isLoader, setIsLoader] = useState(true);
    const [careerData, setCareerData]=useState([]);
    const navigate= useNavigate();
    const dispatch = useDispatch();
    useEffect(()=>{
        handleUserDetails();
    },[classType ,careerData]);
 
    const handleUserDetails = async () => {
        const requestBody = {};
        const method = 'POST';
        const url = `${BASE_URL}/mobile/profileDetails`;
        const token = userToken;
        const wrongResponse = () => {
            setAlertMessage({ success: '', error: 'Something went wrong' });
        }
        const rightResponse = (data) => {
                if (data.student?.type === 'School') {
                    setClassType(false);
                    setCareerData(SchoolSrc);
                    dispatch(setType('School'))
                } else if(data.student?.type === 'College') {
                    setClassType(true);
                    setCareerData(CollegeSrc);
                    dispatch(setType('College'))
                }else{
                    const combinedArray = [...CollegeSrc, ...SchoolSrc];

                const uniqueTitlesMap = new Map(combinedArray.map(item => [item.title, item]));

                const uniqueItemsArray = Array.from(uniqueTitlesMap.values());
                setCareerData(uniqueItemsArray);
                }
        }
        handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse)
    }

    const handleCourse=(title)=>{
       dispatch(setCarrer(title));
       navigate(`/library/courses`);
    }

    return (
        <section class="CareerLibrary">
            <div class="Sec-HeadingBlock">
                <h3><b> Career Library</b> </h3>
            </div>
            <div className="row">
                {careerData.map((career, index) => (
                    <div key={index} className="col-lg-4 col-md-6">
                        <div className="CareerLibrary-Block">
                            <div className="topstrem-icon">
                                <img className="img-fluid" height={'80vh'} width={'80vh'} src={career.image} alt="CareerLab-icon" />
                            </div>
                            <label >{career.title}</label>
                            <p>{career.desc}</p>
                            <a style={{cursor:'pointer'}} onClick={() => handleCourse(career.title)} className="moredetail-icon" ><ChevronRight/></a>
                        </div>
                    </div>
                ))}
            </div>
        </section>

    )
}

export default LibraryMaster
