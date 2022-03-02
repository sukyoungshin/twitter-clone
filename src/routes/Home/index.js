import React from 'react';
import { Ttweet } from 'components';
import { useTtweetAndImagePost } from './hooks';

const Home = ({ userData }) => {

  const { ttweet, ttweets, attachment, onSubmit, onChange, onFileChange, onClearAttachment } = useTtweetAndImagePost({userData});

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
          type="file" 
          accept="image/*" 
          onChange={onFileChange} 
        />
        <input 
          type="submit" 
          value="ttweet" 
        />
        {
          attachment && (
            <div>
              <img src={attachment} width="50px" height="50px" alt="" />
              <button onClick={onClearAttachment}>Clear</button>
            </div>
          )
        }
      </form>
      <div>
        {
          ttweets.map((twt) => (
          <Ttweet 
            key={twt.id} 
            ttweetObj={twt}
            isOwner={twt.createrID === userData.uid}
          />
          ))
        }
      </div>
    </div>
  )
};

export default Home;