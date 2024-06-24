import React, { useEffect } from 'react';

function SetAlert({ alertMessage, setAlertMessage }) {
  const { success, error } = alertMessage;

  useEffect(() => {
    if (error) {
      const errorTimer = setTimeout(() => {
        setAlertMessage((prevMessage) => ({ ...prevMessage, error: '' }));
      }, 2000);

      return () => clearTimeout(errorTimer);
    }
  }, [error, setAlertMessage]);

  useEffect(() => {
    if (success) {
      const successTimer = setTimeout(() => {
        setAlertMessage((prevMessage) => ({ ...prevMessage, success: '' }));
      }, 2000);

      return () => clearTimeout(successTimer);
    }
  }, [success, setAlertMessage]);

  return (
    <>
      {error && <div className="alert alert-danger text-center">{error}</div>}
      {success && <div className="alert alert-primary text-center">{success}</div>}
    </>
  );
}

export default SetAlert;
