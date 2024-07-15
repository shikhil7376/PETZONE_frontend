// pages/OTPVerificationPage.jsx

import React from 'react';
import OTPInput from './OTPInput'; // Adjust the import path based on your project structure

const OTPVerificationPage = () => {
  const email = new URLSearchParams(location.search).get('email');

  return <OTPInput email={email} />;
};

export default OTPVerificationPage;
