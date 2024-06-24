import React from 'react'
import { Audio } from 'react-loader-spinner';
function Loader() {
  return (
    <div className="quiz-main">
                    <div className="main-dashboard">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-12 padding0">
                                    <div className="middle-quiz-sec " style={{ width: '100%', height:'100vh' }}>
                                        <div className="d-flex justify-content-center align-tem-center" style={{ width: '100%' }}>
                                            <Audio
                                                height="80"
                                                width="80"
                                                radius="9"
                                                color="#369FFF"
                                                ariaLabel="loading"
                                                wrapperStyle
                                                wrapperClass
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
  )
}

export default Loader
