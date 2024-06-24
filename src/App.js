import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes, authProtectedRoutes, authStudentRoutes, authConsolerRoutes } from "./routes";
import LoginAuthentication from "./pages/Authentication/Login";
import "./assets/scss/app.scss";
import { useSelector } from 'react-redux';
import { clarity } from 'react-microsoft-clarity';
import mixpanel from 'mixpanel-browser';

function App() {
  const Login = LoginAuthentication;

  const sessionToken = sessionStorage.getItem('sessionToken');
  const userRole = useSelector((state) => state.roleReducer.userRole);

  // clarity.init('m13atq0b9w');

  mixpanel.init("f2ec55c44ba4e57f0e1dd04cfbf920b2", {
    debug: true,
    track_pageview: "url-with-path-and-query-string",
    persistence: "localStorage",
  });

  return (
    <Router>
      <Routes>
        {/* Rendering public routes only if there's no active session */}
        {!sessionToken &&
          publicRoutes.map((route, idx) => (
            <Route
              key={idx}
              path={route.path}
              element={<route.component />}
            />
          ))
        }

        {authProtectedRoutes.map((route, idx) => (
          <Route
            key={idx}
            path={route.path}
            element={
              sessionToken ? <route.component /> : <Navigate to="/" />
            }
          />
        ))}
        {!sessionToken && <Route path="/*" element={<Navigate to="/" />} />}
        {sessionToken && (userRole.includes('ROLE_PARENT') || userRole.includes('NEW_ACCOUNT')) && authProtectedRoutes.some(route => route.path === "/profile") && (
          <Route path="/*" element={<Navigate to="/profile" />} />
        )}
        {sessionToken && userRole.includes('ROLE_STUDENT') && authStudentRoutes.some(route => route.path === "/dashboard") && (
          <Route path="/*" element={<Navigate to="/dashboard" />} />
        )}
        {sessionToken && userRole.includes('ROLE_COUNSELLOR') && authConsolerRoutes.some(route => route.path === "/consoler") && (
          <Route path="/*" element={<Navigate to="/consoler" />} />
        )}

        {sessionToken && userRole.includes('ROLE_FREELANCER') && authConsolerRoutes.some(route => route.path === "/consoler") && (
          <Route path="/*" element={<Navigate to="/partner" />} />
        )}


      </Routes>
    </Router>
  );
}

export default App;
