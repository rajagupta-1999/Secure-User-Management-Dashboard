import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';

const AppRouter: React.FC = () => {

    const isAuthenticated = () => {
        const token = localStorage.getItem('token');
        return !!token;
    };

    const PrivateRoute = ({ children }: { children: JSX.Element }) => {
        return isAuthenticated() ? children : <Navigate to="/signin" />;
    };

    return (
        <Router>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/dashboard"
              element={<PrivateRoute><Dashboard /></PrivateRoute>}
            />
            <Route path="*" element={<Navigate to="/signin" />} />
          </Routes>
        </Router>
      );
};

export default AppRouter;
