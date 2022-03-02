import { useEffect, useState } from 'react';
import { dbService, storageService } from 'firebaseConfig';
import { v4 as uuidv4 } from 'uuid';

export const useTtweetAndImagePost = ({userData}) => {

  const [ ttweet, setTtweet ] = useState(''); // 새로 등록되는 트윗 -> firestore에 저장
  const [ ttweets, setTtweets ] = useState([]); // firestore에 저장된 데이터에 변화가 있을때 실시간으로 받아와서 저장
  const [ attachment, setAttachment ] = useState(); // 사용자가 업로드한 image파일의 url

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
    // tweet 업로드
    // await dbService.collection('ttweet').add({
    //   createdAt : Date.now(),
    //   createrID : userObj.uid,
    //   text : ttweet,
    // });
    // setTtweet('');

    // image업로드
    const fileRef = storageService.ref().child(`${userData.uid}/${uuidv4()}`);
  };
  
  const onChange = (e) => {
    const { 
      target : { value } 
    } = e;
    setTtweet(value);
  };

  // image upload
  const onFileChange = (e) => {
    const { 
      target : { files }
    } = e;
    const imageFile = files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const {
        target : {result}
      } = evt;
      setAttachment(result); // img url 전달
    };
    reader.readAsDataURL(imageFile);
  };

  const onClearAttachment = () => setAttachment(null);

  return { ttweet, ttweets, attachment, onSubmit, onChange, onFileChange, onClearAttachment };
};