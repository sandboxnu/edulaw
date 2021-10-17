import React from 'react'
import MainPage from './MainPage'
import SidePage from './SidePage'

function FullPage() {
  return (
    <div className="fullpage">
      {/* full  */}
      <MainPage />
      <SidePage />
    </div>
  )
}

export default FullPage
