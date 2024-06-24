import React, { useEffect, useState } from 'react'
import world from '../../../assets/images/world-study.png'
import enginner from '../../../assets/images/tab-enginner.png'
import { ChevronRight } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setActiveLink } from '../../../store/Link/action';
import { setCarrer } from '../../../store/Career/action';
import { Link } from 'react-router-dom';
import { SchoolSrc, CollegeSrc } from '../../../components/common/CareerIcons'
import { handleDynamicRequestHeader } from '../../../components/common/DyanamicRequest';
import { BASE_URL } from '../../../components/common/AppConfig';
import SetAlert from '../../../components/common/SetAlert';
import { useNavigate } from 'react-router-dom';
function CareerOptions({ studentData, classType, career }) {
  const [selectedId, setSelectedId] = useState(null);
  const [careerOptions, setCareerOptions] = useState([]);
  const [alertMessage, setAlertMessage] = useState({ success: '', error: '' });
  const userToken = useSelector((state) => state.roleReducer.jwtToken);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleItemClick = (id) => {
    setSelectedId(id);
    dispatch(setCarrer(id.toString()));
    dispatch(setActiveLink("Career Library"))

  };

  useEffect(() => {
    setCareerOptions(studentData.seniorvalue);
  }, [studentData]);

  const handleOptions = () => {
    dispatch(setActiveLink('Career Library'));
  }

  if (!selectedId && careerOptions && careerOptions.careerlist) {
    const name = Object.keys(careerOptions.careerlist).map((optionKey) => {
      return optionKey;
    });
    setSelectedId(name[0]);
    dispatch(setCarrer(name[0].toString()));
  }
  
  if (careerOptions?.careerlist) {
    for (let key in careerOptions.careerlist) {
      let positionTitle = careerOptions.careerlist[key]?.position_title;
      let matchedItem = SchoolSrc.find(item => item.position_title.trim() === positionTitle.trim()) ||
                     CollegeSrc.find(item => item.position_title.trim() === positionTitle.trim());

      if (matchedItem) {
        careerOptions.careerlist[key].imageSrc = matchedItem.image;
      }
    }
  }



  const handleRegisterWebinar = async () => {
    if (careerOptions) {
      const requestBody = { career: career };
      const method = 'POST';
      const url = `${BASE_URL}/mobile/ClickWebiner`;
      const token = userToken;
      const wrongResponse = () => {
        setAlertMessage({ success: '', error: 'Something went wrong' });
      }
      const rightResponse = (data) => {
        setAlertMessage({ success: `Successfully Registerd for ${career} Webinar`, error: '' });
      }
      handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse);
    }
  }

  const handleMore = (id) => {
    //setSelectedId(id);
    //dispatch(setCarrer(id.toString()));
    //navigate('/library/courses');
    navigate('/library');
  }

  return (
    <div>
      <section className="text-white CareerOptions-Tabs-type2 v2-add-CareerOptions">
        {careerOptions && careerOptions.careerlist && (
          <>

            <div className="tab-header">
              <div className="mb-1 Sec-HeadingBlock d-flex justify-content-between">
                <h5>Recommended Career Options</h5>
                <Link to="/library" onClick={handleOptions} className='d-flex justify-content-end align-items-center' href="#">
                  Explore more career <ChevronRight />
                </Link>
              </div>
              <SetAlert alertMessage={alertMessage} setAlertMessage={setAlertMessage} />
              <ul className="nav card-header-tabs" data-bs-tabs="tabs">
                {Object.keys(careerOptions.careerlist).map((optionKey) => {
                  const option = careerOptions.careerlist[optionKey];
                  return (
                    <li className="nav-item" key={optionKey} >
                      <a
                        className={`nav-link ${selectedId === optionKey ? 'active' : ''}`}
                        data-bs-toggle="tab"
                        href={`#${optionKey.replace(/\s+/g, '-').toLowerCase()}`}
                        onClick={() => handleItemClick(optionKey)}
                      >
                        {optionKey}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <form className="tab-body tab-content">
              {Object.keys(careerOptions.careerlist).map((optionKey) => {
                const option = careerOptions.careerlist[optionKey];
                return (
                  <div
                    className={`tab-pane ${selectedId === optionKey ? 'active' : ''}`}
                    id={optionKey}
                    key={optionKey}

                    style={{ display: selectedId === optionKey ? 'block' : 'none' }}
                  >
                    <div className="row">
                      <div className="text-center col-lg-4 col-md-5">
                        <img className='v2-tab-img' src={option.imageSrc} alt={option.position_title} />
                      </div>
                      <div className="col-lg-8 col-md-7 d-flex align-self-center flex-column justify-content-start">
                        <div className="cardTab-Heading">
                          <span>{option.position_title}</span>
                        </div>
                        <p className="card-text">{option.desc}</p>
                        <br />
                        <a className="Textbtn-more" href="#" onClick={() =>
                          handleMore(optionKey)
                        }>

                          Learn More <ChevronRight />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </form>
            <div className="fixed-registerBlock">
              <h4>Register for a free engineering webinar now!</h4>
              <button type="button" onClick={handleRegisterWebinar} className="btn btn-primary">
                Register
              </button>
            </div> *
          </>
        )}
      </section>
    </div>
  )
}

export default CareerOptions
