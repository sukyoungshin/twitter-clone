import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { authService } from 'firebaseConfig';

console.log('@@authService', authService );

ReactDOM.render(
    <App />,
  document.getElementById('root')
);