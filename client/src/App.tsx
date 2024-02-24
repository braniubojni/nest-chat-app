import { useEffect, useRef, useState } from 'react';
import './App.css';
import { ChatRoom } from './components/ChatRoom';
import { checkImg } from './helpers';
import cls from './style.module.css';

export interface Message {
  username: string;
  text: string;
  timestamp: Date;
}
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const userName = prompt("Please enter username");
const notFound = 'https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=1024x1024&w=is&k=20&c=Bs1RdueQnaAcO888WBIQsC6NvA7aVTzeRVzSd8sJfUg='

function App() {
  const [avatar, setAvatar] = useState(notFound);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (userName) {
      (async () => {
        const url = `${SERVER_URL}/avatars/${userName}`
        const hasAvatar = await checkImg(url);
        if (hasAvatar) {
          setAvatar(url);
        }
      })()
    }
  }, []);

  if (!userName) {
    return <h1>username is invalid</h1>
  }
  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const saveAvatar = async (event: any) => {
    const file = event.target?.files;

    if (!file?.length) return;

    const formData = new FormData();
    formData.append('file', file[0]);
    formData.append('userName', userName);

    try {
      console.log(1);
      const response = await fetch(`${SERVER_URL}/avatar`, {
        method: 'POST',
        body: formData,
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      });

      if (response.ok) {
        const newAvatarUrl = `${SERVER_URL}/avatar/${userName}`;
        setAvatar(newAvatarUrl);
      } else {
        console.error('Failed to upload avatar');
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
    } finally {
      console.log('Finaly');
      setAvatar(`${SERVER_URL}/avatar/${userName}`)
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Erik's Chat - {userName} </h1>
        <div className={cls.avatar_wrapper}>
          <img onClick={handleAvatarClick} className={cls.avatar} src={avatar} alt="avatar" />
          <input ref={fileInputRef} className={cls.input} type='file' name="file" accept="image/jpeg" onChange={saveAvatar} style={{ display: 'none' }} />
        </div>
      </header>
      <div>
        <ChatRoom userName={userName} />
      </div>
    </div>
  );
}

export default App;
