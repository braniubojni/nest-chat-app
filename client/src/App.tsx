import { useMemo, useRef, useState } from 'react';
import './App.css';
import { ChatRoom } from './components/ChatRoom';
import cls from './style.module.css';

export interface Message {
  username: string;
  text: string;
  timestamp: Date;
}
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const userName = prompt("Please enter username");

function App() {
  const [avatar, setAvatar] = useState(`${SERVER_URL}/avatars/${userName}.jpg`);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const saveAvatar = async (event: any) => {
    const file = event.target?.files;

    if (!file?.length || !userName) return;

    const formData = new FormData();
    formData.append('file', file[0]);
    formData.append('userName', userName);
    try {
      setLoading(true);
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
      setLoading(false);
      setAvatar(`${SERVER_URL}/avatars/${userName}.jpg`)
    }
  };

  return (
    <div className="App">
      {!userName
        ? <h1>Loading ...</h1>
        : <>
          <header className="App-header">
            <h1>Erik's Chat - {userName} </h1>
            <div className={cls.avatar_wrapper}>
              {!loading ? <img onClick={handleAvatarClick} className={cls.avatar} src={avatar} alt="avatar" /> : <span>...</span>}
              <input ref={fileInputRef} className={cls.input} type='file' name="file" accept="image/jpeg" onChange={saveAvatar} style={{ display: 'none' }} />
            </div>
          </header>
          <div>
            <ChatRoom userName={userName} />
          </div>
        </>
      }
    </div>
  );
}

export default App;
