import { dbService } from 'firebaseConfig';
import React, { useEffect } from 'react';
import { useLogout } from './hooks';

const Profile = ({ userData }) => {

  const { onLogout } = useLogout();

  const getMyTtweets = async() => {
    const posts = await dbService
    .collection("ttweet")
    .where("createrID", "==", userData.uid)
    .orderBy("createdAt")
    .get();
    console.log(posts.docs.map((doc) => doc.data()));
  };
  useEffect(() => {
    getMyTtweets();
  }, []);


  return (
    <>
      <button onClick={onLogout}>LOGOUT</button>
    </>
  )
};

export default Profile;