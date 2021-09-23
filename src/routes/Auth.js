import { authService, firebaseInstance } from '../fbConfig';
import React, { useState } from 'react';

const Auth = () => {
  const [ email, setEmail ] = useState(''); // 사용자 email 저장
  const [ password, setPassword ] = useState(''); // 사용자 password 저장
  const [ newAccount, setNewAccount ] = useState(true); // 버튼 내부글씨 변경; true일땐 'create account', false일땐 'log in' 
  const [ error, setError ] = useState(''); // error message 저장

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

  const toggleAccount = () => setNewAccount(!newAccount);
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

  return (
    <>
      <form onSubmit={onSubmit}>
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          required 
          value={email} 
          onChange={onChange}
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          required 
          value={password} 
          onChange={onChange}
        />
        <input 
          type="submit" 
          value={newAccount ? 'Create Account' : 'LOG IN'} 
        />
        <br />
        {error}
      </form>
      <span onClick={toggleAccount}> 
        {newAccount ? 'Sign in' : 'Create Account'} 
      </span>
      <br/>
      <div>
        <button onClick={onSocialLogin} name="google">Continue with Google</button>
        <button onClick={onSocialLogin} name="github">Continue with Github</button>
      </div>
    </>
  );
};


export default Auth;