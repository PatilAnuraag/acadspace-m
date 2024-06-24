import React, { useEffect, useState } from 'react'
import engineer from '../../../../assets/images/engCareerPath-1.png'
import jee from '../../../../assets/images/jee.png'
import btech from '../../../../assets/images/btech.png'
import mtech from '../../../../assets/images/mtech.png'
import phd from '../../../../assets/images/phd.png'
function CareerPath({ courseDetails }) {
    const [career, setCareer] = useState([]);

    useEffect(() => {
        if (courseDetails) {
            setCareer(courseDetails.careerpath);
        }
    }, [courseDetails]);

    return (
        <div>
            {career && career?.length > 0 && (
                <section class="Path-to-enginnerTabs container">
                    <heading><b>Possible Path</b> to become an {courseDetails.title}</heading>
                    <ul class="nav nav-tabs nav-justified" id="pills-tab" role="tablist">
                        {career.map((path, index) => (
                            <li key={index} class="nav-item" role="presentation">
                                <button
                                    class={`nav-link ${index === 0 ? 'active' : ''}`}
                                    id={`PossiblePath-${index + 1}-tab`}
                                    data-bs-toggle="pill"
                                    data-bs-target={`#PossiblePath-${index + 1}`}
                                    type="button"
                                    role="tab"
                                    aria-controls={`PossiblePath-${index + 1}`}
                                    aria-selected={index === 0 ? 'true' : 'false'}
                                >
                                    {path.title}
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div class="tab-content" id="Path-to-enginner-tabContent">
                        {career.map((path, index) => (
                            <div key={index} class={`tab-pane fade ${index === 0 ? 'show active' : ''}`} id={`PossiblePath-${index + 1}`} role="tabpanel" aria-labelledby={`PossiblePath-${index + 1}-tab`}>
                            <div className='v2-flex-career-path'>
                                {path.data.map((step, stepIndex) => (
                                    <div key={stepIndex} class="engCareerPathBlock">
                                        <div class="text-center">
                                            {stepIndex === 0 && <img src={engineer} class="career-img" alt="" />}
                                            {stepIndex === 1 && <img src={jee} class="career-img" alt="" />}
                                            {stepIndex === 2 && <img src={path.data.length === 3 && stepIndex === 2 ? phd : btech} class="career-img" alt="" />}
                                            {stepIndex === 3 && <img src={stepIndex === path.data.length - 1 ? phd : mtech} class="career-img" alt="" />}
                                            {stepIndex === 4 && <img src={phd} class="career-img" alt="" />}
                                            <p>{step}</p>
                                        </div>
                                        {stepIndex < path.data.length - 1 && <i class="bi bi-arrow-right-short"></i>}
                                    </div>
                                ))}
                            </div>
                            </div>
                        ))}
                    </div>

                </section>
            )}
        </div>
    )
}

export default CareerPath
