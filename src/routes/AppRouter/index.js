import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Auth, Home, Profile } from 'routes';
import { Navigation } from 'components';
import { ROUTER } from 'constants/router';

const AppRouter = ({ isLoggedIn, userData }) => {
  return (
    <Router>
      { isLoggedIn && <Navigation /> }
      <Switch>
        { 
          isLoggedIn 
          ? <PostPage userData={userData} />
          : <LoginPage />
        }
      </Switch>
    </Router>
  )
};

const LoginPage = () => {
  return (
    <>
    <Route exact path={ROUTER.ROOT}>
      <Auth />
    </Route>
    </>
  );
};

const PostPage = ({ userData }) => {
  return (
    <>
    <Route exact path={ROUTER.ROOT}>
      <Home userData={userData} />
    </Route>
    <Route exact path={ROUTER.PROFILE}>
      <Profile />
    </Route>
    </>
  );
};

export default AppRouter;