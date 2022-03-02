import { useState } from 'react';
import { authService, firebaseInstance } from 'firebaseConfig';

export const useAuthentication = () => {

  const [ email, setEmail ] = useState(''); 
  const [ password, setPassword ] = useState(''); 
  const [ error, setError ] = useState(''); // error message 저장
  const [ newAccount, setNewAccount ] = useState(true); // 버튼 내부글씨 변경; true일땐 'create account', false일땐 'log in' 

  const onChange = (e) => {
    const { 
      target : { name, value } 
    } = e;

    if (name === 'email') {
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

  const onSocialLogin = (e) => {
    const {
      target : {name}
    } = e;

    let provider = null;
    if (name === 'google') {
      //google login
      provider = new firebaseInstance.auth.GoogleAuthProvider();
      
    } else {
      // github login
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }

    const data = authService.signInWithPopup(provider);
    console.log('@@ signin with popup : ' + data);
  };

  return { email, password, error, newAccount, onToggleAccount, onSubmit, onChange, onSocialLogin };
};
