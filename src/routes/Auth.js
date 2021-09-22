import { authService } from '../fbConfig';
import React, { useState } from 'react';

const Auth = () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ newAccount, setNewAccount ] = useState(false);

  const onChange = (e) => {
    const { target : { name, value} } = e;
    console.log(name, value);
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
        data = await authService.createUserWithEmailAndPassword(email, password);
      } else {
        // log in
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log('@@data', data);
      
    } catch(err) {
      console.log(err);
    }
    
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
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </>
  );
};


export default Auth;