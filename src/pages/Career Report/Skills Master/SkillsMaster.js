import React, { useEffect, useState } from 'react'
import { ChevronRight } from 'react-bootstrap-icons';
import { handleDynamicRequestHeader } from '../../../components/common/DyanamicRequest';
import { BASE_URL } from '../../../components/common/AppConfig';
import SetAlert from '../../../components/common/SetAlert';
import { useSelector } from 'react-redux';
function SkillsMaster({ studentData }) {
    const [personality, setPersonality] = useState([]);
    const [alertMessage, setAlertMessage] = useState({ success: '', error: '' });
    const userToken = useSelector((state) => state.roleReducer.jwtToken);
    useEffect(() => {
        if (studentData && studentData.per_arr) {
            setPersonality(studentData.per_arr);
        }
    }, [studentData]);
    

    const powers = {
        0: "Realistic",
        1: "Investigative",
        2: "Artistic",
        3: "Social",
        4: "Enterprising",
        5: "Conventional",
    };

    const sortedIndices = personality
    ? personality
        .map((value, index) => ({ value, index }))
        .sort((b, a) => a.value - b.value)
        .map((item) => item.index)
    : [];

const top3Areas = sortedIndices
    .slice(0, 3)
    .map((index) => powers[index])
    .sort((a, b) => a.length - b.length);

    const handleWebinar = async () => {

        const requestBody = { career: 'Personality' };
        const method = 'POST';
        const url = `${BASE_URL}/mobile/ClickWebiner`;
        const token = userToken;
        const wrongResponse = (data) => {
            setAlertMessage({ success: '', error: data.msg });
        }
        const rightResponse = (data) => {
            setAlertMessage({ success: data.msg, error: '' });
        }
        handleDynamicRequestHeader(method, url, requestBody, token, wrongResponse, rightResponse);
    }

    return (
        <>
            {personality && personality.length > 0 && (
                <section className="container">
                    <div className="Webinar-sec">
                        <div className="Superpowers-WebinarBlock">
                            <div>
                                <h4>Woah, looks like you have some potential</h4>
                                <heading>Superpowers!</heading>
                            </div>
                            <p style={{ cursor: 'pointer' }} onClick={handleWebinar}>Book a webinar <ChevronRight /> </p>
                        </div>
                        <div className="ShapesBlock-right">
                            <div className="rounded-rectangle">{top3Areas[2]}</div>

                            <div className="oval-triangle-block">
                                <div className="oval">{top3Areas[1]}</div>
                                <div className="triangle"><p>{top3Areas[0]}</p></div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

        </>

    )
}

export default SkillsMaster
