import React, { useEffect, useState } from 'react';
import useSocket from '../hooks/useSocket';
import { ChatInput } from './ChatInput';
import cls from './style.module.css';

interface Message {
	username: string;
	text: string;
	timestamp: Date;
}
interface User {
	key: string,
	usr: string
}

export const ChatRoom: React.FC<{ userName: string }> = ({ userName }) => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [history, setHistory] = useState<Message[]>([]);
	const [allUsers, setAllUsers] = useState<User[]>([]);
	const [isReady, setIsReady] = useState<boolean>(false);

	const emitEvent = useSocket({
		roomName: 'joinChat',
		isReady,
		userName,
		socketEvents: [{
			event: 'message',
			handler: (data: Message) => {
				setMessages(prev => [...prev, data]);
			},
		}, {
			event: 'info',
			handler: (data: [User[], Message[]]) => {
				const [users, history] = data;
				setAllUsers(users);
				setHistory(history);
			},
		}]
	});

	const handleSendMessage = (text: string) => {
		const message: Message = { username: userName, text, timestamp: new Date() };
		emitEvent('message', message)
	};

	const handleHistory = () => {
		if (messages.length !== history.length) {
			setMessages(prev => [...prev, ...history]);
		}
	};

	useEffect(() => {
		setIsReady(true);
	}, []);

	useEffect(() => {
		if (isReady) {
			emitEvent('getInfo');
		}
	}, [emitEvent, isReady])

	return (
		<div>
			<div className={cls.wrapper}>
				<div className={cls.users}>
					<h4>All Users</h4>
					<ol>
						{allUsers.length ? (allUsers.map(({ key, usr }) => {
							return <li key={key}>{usr}</li>
						})) : <li>There is no user</li>}
					</ol>
				</div>
				<div className={cls.main_messages}>
					<div className={cls.messages}>
						{messages.length ? messages
							.sort((a, b) => new Date(a.timestamp).valueOf() - new Date(b.timestamp).valueOf())
							.map((msg) => (
								<div className={cls.message} key={new Date(msg.timestamp).toString()}>
									<strong>{msg.username}</strong>: {msg.text} <em>{new Date(msg.timestamp).toLocaleTimeString()}</em>
								</div>
							)) : <div>No messages yet</div>}
					</div>
					<div className={cls.input_wrapper}>
						{history?.length !== messages?.length && <button className={cls.history} onClick={handleHistory}>Show history</button>}
						<ChatInput onSendMessage={handleSendMessage} />
					</div>
				</div>
			</div>
		</div>
	);
};
