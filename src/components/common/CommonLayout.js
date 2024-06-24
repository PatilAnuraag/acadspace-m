import React, {useEffect}  from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setDisplayOff } from '../../store/Link/action';
function CommonLayout({children}) {
  const display = useSelector((state) => state.linkReducer.display);
  const dispatch = useDispatch();
  useEffect(() => {
  
    if (!display) {
      dispatch(setDisplayOff(true));
     
    }
  }, []);


  return (
    <div>
    <main>
    {!display ? <div className='overlay'></div> : null}
    <div className=" main-dashboard ">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 padding0">
            <div className="main"> 
            {children}
            </div>
          </div>
     
        </div>
      </div>
    </div>
    </main>
    </div>
  )
}

export default CommonLayout
