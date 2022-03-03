import { useEffect, useState } from 'react';
import { dbService, storageService } from 'firebaseConfig';
import { v4 as uuidv4 } from 'uuid';

export const useTtweetAndImagePost = ({ userData }) => {

  const [ ttweet, setTtweet ] = useState(''); // 새로 등록되는 트윗 -> firestore에 저장
  const [ ttweets, setTtweets ] = useState([]); // firestore에 저장된 데이터에 변화가 있을때 실시간으로 받아와서 저장
  const [ imageUrl, setImageUrl ] = useState(); // image url (base64)

  useEffect(() => {
    dbService
    .collection('ttweet')
    .onSnapshot((snapshot) => {
        const ttweetsArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })
      );
      setTtweets(ttweetsArray);
    });
  }, []);  

  const onSubmit = async(e) => {
    e.preventDefault();
    let imageURL = "";
    if (imageUrl !== "") {
      const imageRef = storageService.ref().child(`${userData.uid}/${uuidv4()}`);
      const response = await imageRef.putString(imageUrl, "data_url");
      imageURL = await response.ref.getDownloadURL();
    }
    const newTweet = {
      createdAt : Date.now(),
      createrID : userData.uid,
      text : ttweet,
      imageURL,
    };
    // tweet 업로드
    await dbService.collection('ttweet').add(newTweet);
    setTtweet('');
    setImageUrl('');
  };

  const onChange = (e) => {
    const { target : { value } } = e;
    setTtweet(value);
  };

  // image -> string (base64)
  const onFileChange = (e) => {
    const { target : { files } } = e;
    const imageFile = files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const { target : {result} } = evt;
      setImageUrl(result); 
    };
    reader.readAsDataURL(imageFile);
  };

  const onClearImageUrl = () => setImageUrl(null);

  return { ttweet, ttweets, imageUrl, onSubmit, onChange, onFileChange, onClearImageUrl };
};