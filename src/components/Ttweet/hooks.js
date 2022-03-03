import { useState } from 'react';
import { dbService } from 'firebaseConfig';

export const usePostCRUD = ({ ttweetObj }) => {

  const [ isEnableEdit, setIsEnableEdit ] = useState(false); 
  const [ newTtweet, setNewTtweet ] = useState(ttweetObj.text); // 기존에 입력된 데이터를 저장

  // delete
  const onDeleteClick = async() => {
    const deleteConfirm = window.confirm('Are you sure you want to delete this tweet?');
    if (deleteConfirm) {
      await dbService.doc(`ttweet/${ttweetObj.id}`).delete();
    }
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

  return { isEnableEdit, newTtweet, onSubmit, onChange, onDeleteClick, toggleEditting };
};