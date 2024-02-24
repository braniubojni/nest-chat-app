import React, { useState } from 'react';
import cls from './style.module.css';

interface Props {
	onSendMessage: (message: string) => void;
}

export const ChatInput: React.FC<Props> = ({ onSendMessage }) => {
	const [message, setMessage] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSendMessage(message);
		setMessage('');
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				className={cls.input}
				type="text"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				placeholder="Type a message"
			/>
			<button className={cls.btn} type="submit">Send</button>
		</form>
	);
};
