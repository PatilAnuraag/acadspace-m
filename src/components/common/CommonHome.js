import React from 'react'

function CommonHome({children}) {
  return (
    <div>
      <div className="container pl-0 pr-0">
        <div className="row">
          <div className="col-lg-12" style={{paddingLeft:0, paddingRight:0}}>
            <div className="onboarding-main">
              <div className="create-account-flex">
                {children}
              </div>
              <div className="onboarding-bottom-content">
                <h2>Trusted by 1M+ students</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommonHome

