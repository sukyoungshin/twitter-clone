import React from 'react';
import { useHistory } from 'react-router';
import { authService } from 'firebaseConfig';
import { ROUTER } from 'constants/router';

const Profile = () => {
  const history = useHistory();
  const onLogout = () => {
    authService.signOut();
    history.push(ROUTER.ROOT);
  };

  return (
    <>
      <button onClick={onLogout}>LOGOUT</button>
    </>
  )
};

export default Profile;