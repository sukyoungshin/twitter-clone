import { Button } from 'components';
import React from 'react';
import { useAuthentication } from './hooks';

const Auth = () => {

  const { email, password, error, newAccount, onToggleAccount, onSubmit, onChange, onSocialLogin } = useAuthentication();

  return (
    <>
      <form onSubmit={onSubmit}>
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={email} 
          onChange={onChange}
          required 
          />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={password} 
          onChange={onChange}
          required 
        />
        <Button type="submit">
          {newAccount ? 'Create Account' : 'LOG IN'}
        </Button>
        <br />
        {error}
      </form>
      <span onClick={onToggleAccount}> 
        {newAccount ? 'Sign in' : 'Create Account'} 
      </span>
      <br/>
      <div>
        <Button 
          onClick={onSocialLogin} 
          name="google"
        >
          Continue with Google
        </Button>
        <Button 
          onClick={onSocialLogin} 
          name="github"
        >
          Continue with Github
        </Button>
      </div>
    </>
  );
};

export default Auth;