import React, { useState } from 'react';
import AppRouter from './Router';
import { authService } from '../fbConfig';

function App() {

  const [ isLoggedIn, setIsLoggedIn ] = useState( authService.currentUser ); // null or user을 반환
  console.log('@@isLoggedIn', authService.currentUser);

  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>
        &copy; {new Date().getFullYear()} 
      </footer>
    </>
  );
}

export default App;
