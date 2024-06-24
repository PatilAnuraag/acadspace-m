import React, { useEffect, useState } from 'react';
import { ChevronRight } from 'react-bootstrap-icons';
import wallet from '../../../assets/images/wallet-icon.png';
import civil from '../../../assets/images/civil.png';
import { useNavigate } from 'react-router-dom';
function StreamMaster({ careerData, streamCount, careerOptions }) {
  const [streamData, setStreamData] = useState({ streams: [] });
  const [displayStream, setDisplayStream] = useState([]);
  const navigate=useNavigate();
  
  useEffect(() => {
    if (careerData) {
      setStreamData(careerData);
    }
  }, [careerData, careerOptions]);

  useEffect(() => {
    if (Array.isArray(streamData.streams) && streamCount) {
      setDisplayStream(streamData.streams.slice(0, streamCount));
    }
  }, [streamData.streams, streamCount]);

  const handleSteam=()=>{
   navigate('/career/steams')
  }
  return (
    <div>
      {displayStream?.length > 0 && (
        <section className="Topengineering-strems">
          <div className="row">
            <div className="Sec-HeadingBlock">
              <div className="col-md-8 ">
                <h4>
                  <b>Top Streams</b> in {careerOptions}
                </h4>
              </div>
              <a href="#" onClick={handleSteam}>
                Explore more streams <ChevronRight />
              </a>
            </div>
            {displayStream.map((stream, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <div className="engineering-stremsBlock">
                  <div className="topstrem-icon">
                    <img className="img-fluid" src={stream.profilepic || civil} alt="Stream icon" />
                  </div>
                  <label>{stream.Stream}</label>
                  <div className="package-icon">
                    <img
                      className="img-fluid pr-2"
                      style={{ marginRight: '8px' }}
                      src={wallet}
                      alt="Wallet icon"
                    />
                    Avg. Salary : <b>{stream.CTC} </b>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default StreamMaster;
