import React, { useEffect, useState } from 'react';
import { authService } from 'firebaseConfig';
import { AppRouter } from 'routes';

const App = () => {

  const [ init, setInit ] = useState(false); // router 상태를 저장
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ userData, setUserData ] = useState(null); 

  useEffect(() => {
    // onAuthStateChanged : auth상태에 변화가 있음을 감지하는 observer. 
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserData(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  }, []);

  return (
    <>
      {
        init 
        ? (
          <AppRouter 
            isLoggedIn={isLoggedIn} 
            userData={userData} 
          />
          ) 
        : 'Initializing...'
      }
      <footer>
        &copy; {new Date().getFullYear()} twitter-clone
      </footer>
    </>
  );
};

export default App;
