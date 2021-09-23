import React from 'react';
import { authService } from 'fbConfig';
import { useHistory } from 'react-router';

const Profile = () => {
  const history = useHistory();
  const onLogout = () => {
    authService.signOut();
    history.push("/");
  };

  return (
    <>
      <button onClick={onLogout}>LOGOUT</button>
    </>
  )
};

export default Profile;