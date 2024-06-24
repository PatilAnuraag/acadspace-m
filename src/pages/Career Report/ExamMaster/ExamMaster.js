import React, { useEffect, useState } from 'react';

function ExamMaster({ careerData, examCount,careerOptions }) {
    const [examData, setExamData] = useState({ exams: [] });
    const [displayExams, setDisplayExams] = useState([]);
  
    useEffect(() => {
      if (careerData) {
        setExamData(careerData);
      }
    }, [careerData]);
  
    useEffect(() => {
      if (Array.isArray(examData.exams) && examCount) {
        setDisplayExams(examData.exams.slice(0, examCount));
      }
    }, [examData.exams, examCount]);

    return (
       <>
        {displayExams?.length>0 && (
        <div className="scolership">
            <div className="row">
                <div className="section-header mb-4 d-md-flex justify-content-md-between align-items-md-center">
                    <h2><span>Top Exams </span> in {careerOptions} career</h2>
                </div>
                {
                    displayExams.map((exam, index) => (
                        <div className="col-lg-4 col-md-6" key={index}>
                            <div className="scolership-details">
                                <h3>{exam.CompetitionName}</h3>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
        )}
       </>
    )
}

export default ExamMaster
