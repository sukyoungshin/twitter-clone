import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTER } from 'constants/router';

const Navigation = () => (
<nav>
  <ul>
    <li>
      <Link to={ROUTER.ROOT}>HOME</Link>
    </li>
    <li>
      <Link to={ROUTER.PROFILE}>PROFILE</Link>
    </li>
  </ul>
</nav>
);

export default Navigation;