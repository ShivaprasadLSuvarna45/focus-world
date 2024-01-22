import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Trans, useTranslation } from 'react-i18next';
import i18n from "i18next";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SignIn from '../src/components/prelogin/SignIn';
import Dashboard from '../src/components/postlogin/dashboard';
// import { useUserAuth } from "../src/hooks/userAuthContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { UserAuthContextProvider, useUserAuth } from "./userAuthContext";

import { users } from "../src/constant";

const ProtectedRoute = ({ children }: { children: JSX.Element }): JSX.Element => {
  const { user } = useUserAuth();

  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};

function App() {

  const { t } = useTranslation();
  const [userLocation, setUserLocation] = useState<string>("en");

  const handleColorChange = (location: string) => {
    setUserLocation(location);
  };

  const getLocationTheme = () => {
    const locationConfig =
      users?.locations?.find((loc) => loc?.name === userLocation) ||
      users?.locations[0];
    return createTheme(locationConfig.theme);
  };

  return (
    <div className="App">
      <ThemeProvider theme={getLocationTheme()}>
        <UserAuthContextProvider>
          <Router>
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard handleColorChange={handleColorChange} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/login"
                element={<SignIn handleColorChange={handleColorChange} />}
              />
              <Route
                path="/"
                element={<SignIn handleColorChange={handleColorChange} />}
              />
            </Routes>
          </Router>
        </UserAuthContextProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
