import React, { useState } from 'react';
import { dbService } from 'firebaseConfig';

const Ttweet = ({ ttweetObj, isOwner }) => {

  const [ isEnableEdit, setIsEnableEdit ] = useState(false); 
  const [ newTtweet, setNewTtweet ] = useState(ttweetObj.text); // 기존에 입력된 데이터를 저장

  // delete
  const onDeleteClick = async() => {
    const OKAY = window.confirm('Are you sure you want to delete this tweet?');
    if (OKAY) await dbService.doc(`ttweet/${ttweetObj.id}`).delete();
  };

  // update
  const toggleEditting = () => setIsEnableEdit(prev => !prev);
  const onSubmit = async(e) => {
    e.preventDefault();
    console.log(ttweetObj.text, newTtweet); // 서버에 저장된 값과 업데이트된 값 비교

    await dbService.doc(`ttweet/${ttweetObj.id}`).update({
      text : newTtweet
    });
    setIsEnableEdit(false);
  };
  // update
  const onChange = (e) => {
    const { 
      target : {value}
    } = e;
    setNewTtweet(value); // input에 입력한 값 -> 기존에 있던값으로 replace
  };
  
  return (
    <div>
      {

        isEnableEdit
        ? (
          <>
          <form onSubmit={onSubmit}> 
            <input 
              type="text"
              placeholder="Edit your tweet"
              value={newTtweet} 
              onChange={onChange}
              required 
            />
            <input 
              type="submit"
              value="Update tweet" 
            />
          </form>
          <button onClick={toggleEditting}>CANCEL</button>
          </>
          )
        : (
          <form>
            <h4>{ttweetObj.text}</h4>
            {
            // 글 작성한 사람의 ID와 로그인한 유저의 ID가 일치할 때만, delete/edit 버튼이 보임
              isOwner && (
              <>
                <button onClick={onDeleteClick}>delete</button>
                <button onClick={toggleEditting}>edit</button>
              </>
              )
            }
          </form>
          )
      }
    </div>
  )
};

export default Ttweet;