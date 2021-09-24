import React, { useEffect, useState } from 'react';
import { dbService } from 'fbConfig';
import Ttweet from 'components/Ttweet';

const Home = ({ userObj }) => {

  // console.log('@@userObject', userObj );

  const [ ttweet, setTtweet ] = useState(''); // 새로 등록되는 트윗 -> firestore에 저장
  const [ ttweets, setTtweets ] = useState([]); // firestore에 저장된 데이터에 변화가 있을때 실시간으로 받아와서 저장

  useEffect(() => {
    dbService.collection('ttweet').onSnapshot((snapshot) => {
      const ttweetsArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setTtweets(ttweetsArray);
    });
  }, []);  

  const onSubmit = async(e) => {
    e.preventDefault();
    await dbService.collection('ttweet').add({
      createdAt : Date.now(),
      createrID : userObj.uid,
      text : ttweet,
    });
    setTtweet('');
  };
  const onChange = (e) => {
    const { 
      target : { value } 
    } = e;
    setTtweet(value);
  };

  console.log(ttweets);

  return(
    <div>

      <form onSubmit={onSubmit}>
        <input 
          value={ttweet} 
          onChange={onChange}
          type="text" 
          placeholder="what's on your mind?" 
          maxLength={120} 
        />
        <input 
          type="submit" 
          value="ttweet" 
        />
      </form>
      <div>
        {
          ttweets.map((twt) => (
          <Ttweet 
            key={twt.id} 
            ttweetObj={twt}
            isOwner={twt.createrID === userObj.uid}
          />
          ))
        }
      </div>
    </div>
  )
}

export default Home;