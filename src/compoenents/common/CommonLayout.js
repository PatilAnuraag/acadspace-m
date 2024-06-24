import React  from 'react'

function CommonLayout({children, showNotification}) {
  

  return (
    <div>
    <main>
    
    <div className='overlay' style={{ display: showNotification ? 'block' : 'none' }}></div>
    
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
