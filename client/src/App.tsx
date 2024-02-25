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

function App() {
  const [avatar, setAvatar] = useState(`${SERVER_URL}/avatars/${userName}.jpg`);
  const [isValidUsr, setIsValidUsr] = useState<boolean>(!!userName);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Validate userName
    if (userName) {
      (async () => {
        await fetch(`${SERVER_URL}/auth`, {
          method: 'POST',
          body: JSON.stringify({ userName })
        })
        .then(res => setIsValidUsr(res.ok))
        .catch(() => setIsValidUsr(false))
      })();
    }
  }, [isValidUsr])


  if (!userName || isValidUsr) {
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
      setAvatar(`${SERVER_URL}/avatars/${userName}.jpg`)
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
