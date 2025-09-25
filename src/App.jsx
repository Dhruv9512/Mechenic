import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"; // 1. Import BrowserRouter here
import './App.css'

// Import your page and component files
import Profile from "./mechanic/page/Profile";
import Dashboard from "./mechanic/Dashboard";

import Login from "./components/LoginForm";
import Logout from "./components/Logout";
import OTP from './components/Otppage';
import MechanicForm from './components/MechanicForm';



import Protected from './ProtectedRoute'

// Import the lock screen functionality
import { LockProvider, useLock } from './context/LockContext';
import LockScreen from './mechanic/componets/LockScreen';



// This component now handles rendering the lock screen and all the routes
const AppContent = () => {
  const { isLocked, lockScreen } = useLock(); // 2. Get the lockScreen function

  // 3. Add the useEffect hook for the keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Shortcut: Ctrl + Shift + L
      if (event.ctrlKey && event.shiftKey && event.key === 'L') {
        event.preventDefault(); // Prevent any default browser action
        lockScreen();
      }
    };

    // Add the event listener when the component mounts
    window.addEventListener('keydown', handleKeyDown);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lockScreen]); // Dependency array ensures the effect uses the latest lockScreen function


  return (
    <>
     
      {isLocked && <LockScreen />}

      <div className="App transition-all duration-500 ease-in-out bg-white">
        {/* 2. A SINGLE <Routes> component holds all your app's routes */}
        <Routes>


          {/* Main Page */}
          <Route path="/" element={
            <Protected>
              <Dashboard />
            </Protected>
          } />
          <Route path="/form" element={
            <Protected>
              <MechanicForm />
            </Protected>
          } />




          {/* Auth */}
          <Route path="/Login" element={
            <Login />
          } />
          <Route path="/verify" element={
            <OTP />
          } />
          <Route path="/logout" element={
            <Logout />
          } />

          
          {/* Mechanic */}
          <Route path="/Dashboard" element={
            <Protected>
              <Dashboard />
            </Protected>
          } />
          <Route path="/profile" element={
            <Protected>
              <Profile />
            </Protected>
          } />

          {/* You can add a "Not Found" route as a fallback */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
    </>
  );
};

// The main App component is now responsible for setting up the providers and router
function App() {

  return (
    // 3. The Providers and Router wrap the AppContent
    <LockProvider>
      <AppContent />
    </LockProvider>
  );
}

export default App;