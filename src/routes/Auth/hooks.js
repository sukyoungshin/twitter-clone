import { useState } from 'react';
import { authService, firebaseInstance } from 'firebaseConfig';

const EMAIL = 'email';
const GOOGLE = 'google';

export const useAuthentication = () => {
  const [ email, setEmail ] = useState(''); 
  const [ password, setPassword ] = useState(''); 
  const [ error, setError ] = useState(''); // error message 저장
  const [ newAccount, setNewAccount ] = useState(true); // 버튼 내부글씨 변경; true일땐 'create account', false일땐 'log in' 

  const onChange = (e) => {
    const { target : { name, value } } = e;

    if (name === EMAIL) {
      setEmail(value);
    } else {
      setPassword(value);
    }

  };

  const onToggleAccount = () => setNewAccount(!newAccount);
  
  const onSubmit = async(e) => {
    e.preventDefault();

    try {
      let data = null;
      if (newAccount) {
        // create account
        data = await authService.createUserWithEmailAndPassword(
          email, 
          password
        );
      } else {
        // log in
        data = await authService.signInWithEmailAndPassword(
          email, 
          password
        );
      }
      console.log('@@data', data);
      
    } catch(err) {
      setError('Error : ' + err.message);
    }
  };

  return { email, password, error, newAccount, onToggleAccount, onSubmit, onChange };
};

export const useSocialLogin = () => {
  const onSocialLogin = (e) => {
    const { target : {name} } = e;

    let provider = null;
    if (name === GOOGLE) {
      provider = new firebaseInstance.auth.GoogleAuthProvider(); // google login
    } else {
      provider = new firebaseInstance.auth.GithubAuthProvider(); // github login
    }

    const data = authService.signInWithPopup(provider);
    console.log('@@ signin with popup : ' + data);
  };

  return { onSocialLogin };
};
