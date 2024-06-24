import React, { useEffect, useState } from 'react';

function CollegeMaster({ courseDetails }) {
    const [selectedCollegeType, setSelectedCollegeType] = useState('India');

    useEffect(() => {
        if (courseDetails) {
            setSelectedCollegeType(courseDetails.Instilist_india ? 'India' : 'Abroad');
        }
    }, [courseDetails]);

    const handleCollege = (website) => {
        window.open(`https://${website}`, '_blank');
    };

    const renderColleges = (colleges) => {
        if (!colleges || !colleges.title || !colleges.school) {
            return null;
        }

        return (
            <div className="row" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                <div className="section-header mb-4 d-md-flex justify-content-md-between align-items-md-center">
                    <h2><span>Top Colleges in </span>{colleges.title}</h2>
                </div>
                {colleges.school.map((college, index) => (
                    <div key={index} className="col-lg-6 col-md-6" style={{ cursor: 'pointer' }} onClick={() => { handleCollege(college.website) }}>
                        <div className="scolership-details" style={{ backgroundColor: '#cbe5ff' }}>
                            <h3>{college.name}</h3>
                            <p>{college.location}</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div>
            {courseDetails && (
                <section className="Top10eng-clg-join container">
                    <heading>
                        <b>Colleges</b> in {courseDetails.title}
                    </heading>
                    <ul className="nav nav-tabs nav-justified p-0" role="tablist">
                        {['India', 'Abroad'].map((type) => (
                            <li key={type} className="nav-item" role="presentation">
                                <a
                                    className={`nav-link ${selectedCollegeType === type ? 'active' : ''}`}
                                    id={`EngTop10-clg-tab-${type}`}
                                    data-bs-toggle="tab"
                                    href={`#EngTop10-clg-tabs-${type}`}
                                    role="tab"
                                    aria-controls={`EngTop10-clg-tabs-${type}`}
                                    aria-selected={selectedCollegeType === type}
                                    onClick={() => setSelectedCollegeType(type)}
                                >
                                    {type}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="tab-content">
                        {['India', 'Abroad'].map((type) => (
                            <div key={type} className={`tab-pane fade ${selectedCollegeType === type ? 'show active' : ''}`} id={`EngTop10-clg-tabs-${type}`} role="tabpanel">
                                {courseDetails[`Instilist_${type.toLowerCase()}`]?.des && <p className="p-4">{courseDetails[`Instilist_${type.toLowerCase()}`].des}</p>}
                                <div className="scolership">
                                    {renderColleges(courseDetails[`Instilist_${type.toLowerCase()}`])}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

export default CollegeMaster;

