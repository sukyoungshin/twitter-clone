import React from 'react';
import { Button } from 'components';
import { usePostCRUD } from './hooks';

const Ttweet = ({ ttweetObj, isOwner }) => {

  const { isEnableEdit, newTtweet, onSubmit, onChange, onDeleteClick, toggleEditting } = usePostCRUD({ ttweetObj });
  
  return (
    <div>
      {
        isEnableEdit
        ? (
          <>
          <form id="tweet-form" onSubmit={onSubmit}> 
            <input 
              type="text"
              placeholder="Edit your tweet"
              value={newTtweet} 
              onChange={onChange}
              required 
            />
            <Button form="tweet-form" type="submit" >
              Update tweet
            </Button>
          </form>
          <Button type="button" onClick={toggleEditting}>
            CANCEL
          </Button>
          </>
          )
        : (
          <form>
            <h4>
              {ttweetObj.text}
            </h4>
            {ttweetObj.imageURL && <img src={ttweetObj.imageURL} alt="" /> }
            {
            // 글 작성한 사람의 ID와 로그인한 유저의 ID가 일치할 때만, delete/edit 버튼이 보임
              isOwner && (
              <>
                <Button type="button" onClick={onDeleteClick}>
                  delete
                </Button>
                <Button type="button" onClick={toggleEditting}>
                  edit
                </Button>
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