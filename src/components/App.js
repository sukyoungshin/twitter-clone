import React, { useEffect, useState } from 'react';
import AppRouter from './Router';
import { authService } from '../fbConfig';

function App() {

  const [ init, setInit ] = useState(false); // router 상태를 저장
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);// 사용자의 로그인상태를 저장
  const [ userObj, setUserObj ] = useState(null); // 로그인한 유저 정보를 저장

  useEffect(() => {
    // onAuthStateChanged : auth상태에 변화가 있음을 감지하는 observer. 
    authService.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        // User is signed out
        setIsLoggedIn(false);
      }
      console.log('@@isLogginedIn', user); // null or 사용자정보
      setInit(true);
    })
  }, []);

  return (
    <>
      {
        init 
        ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> 
        : 'Initializing...'
      }
      {/* <footer>
        &copy; {new Date().getFullYear()} twitter-clone
      </footer> */}
    </>
  );
}

export default App;
