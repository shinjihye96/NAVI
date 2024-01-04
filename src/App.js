import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'styles/global.scss';
import BottomNav from 'components/bottom_nav/bottom_nav';
import { BottomNavPaths } from 'pages/pages_paths';
import * as Pages from 'pages/pages'

function App() {
  return (
    <>
      <div id='main'>
        <Router>
          <div className="main_pages">
            <Routes>
              <Route path='/' element={<Pages.Diary/>}></Route>
              <Route path={BottomNavPaths.DIARY} element={<Pages.Diary/>} />
              <Route path={BottomNavPaths.DIARY} element={<Pages.Diary/>} />
              <Route path={BottomNavPaths.COMMUNITY} element={<Pages.Community />} />
              <Route path={BottomNavPaths.HEALTH_INFO} element={<Pages.HealthInfo />} />
              <Route path={BottomNavPaths.MEDICAL_SPONSORSHIP} element={<Pages.MedicalSponsorship />} />
              <Route path={BottomNavPaths.MYPAGE} element={<Pages.Mypage />} />
            </Routes>
          </div>
          <BottomNav />
        </Router>
      </div>
    </>
  );
}

export default App;