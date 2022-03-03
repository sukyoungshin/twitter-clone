import React from 'react';
import { Button, Ttweet } from 'components';
import { useTtweetAndImagePost } from './hooks';

const Home = ({ userData }) => {

  const { ttweet, ttweets, imageUrl, onSubmit, onChange, onFileChange, onClearImageUrl } = useTtweetAndImagePost({userData});

  return(
    <div>
      <form id="tweet-form" onSubmit={onSubmit}>
        <input 
          value={ttweet} 
          onChange={onChange}
          type="text" 
          placeholder="what's on your mind?" 
          maxLength={120} 
        />
        <input 
          type="file" 
          accept="image/*" 
          onChange={onFileChange} 
        />
        <Button type="submit" form="tweet-form">
          POST
        </Button>
        {
          imageUrl && (
            <div>
              <img src={imageUrl} width="50px" height="50px" alt="" />
              <Button onClick={onClearImageUrl}>
                CLEAR
              </Button>
            </div>
          )
        }
      </form>
      <div>
        {
          ttweets.map((tweet) => (
            <Ttweet 
              key={tweet.id} 
              ttweetObj={tweet}
              isOwner={tweet.createrID === userData.uid}
            />
          ))
        }
      </div>
    </div>
  )
};

export default Home;