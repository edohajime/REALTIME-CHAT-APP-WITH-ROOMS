// client/src/pages/chat/messages.js

import styles from './styles.module.css';
import { useState, useEffect, useRef } from 'react';

const Messages = ({ socket }) => {
  const [messagesReceived, setMessagesReceived] = useState([]);

  const messagesColumnRef = useRef(null); // Add this

  useEffect(() => {
    // Lấy dữ liệu từ localStorage khi component được render
    const messages = localStorage.messages;
    if (messages) {
      setMessagesReceived(JSON.parse(messages));
    }
  }, []);


  // Runs whenever a socket event is received from the server
  useEffect(() => {
    socket.on('receive_message', (data) => {
      const messages = [
        ...messagesReceived, 
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ];
      localStorage.messages = JSON.stringify(messages);
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ]);
      console.log('local storages messages 2: ', localStorage.messages);
    });

	  // Remove event listener on component unmount
    return () => socket.off('receive_message');
  }, [socket]);

  useEffect(() => {
    socket.on('last_100_messages', (last100Messages) => {
      console.log('last 100 messages:', JSON.parse(last100Messages));
      last100Messages = JSON.parse(last100Messages);
      last100Messages = sortMessagesByDate(last100Messages);
      const messages = [...last100Messages, ...messagesReceived];
      localStorage.messages = JSON.stringify(messages);
      setMessagesReceived(messages);
      console.log('local storages messages 1: ', localStorage.messages);
    });

    return () => socket.off('last_100_messages');
  }, [socket])

  // Scroll to the most recent message
  useEffect(() => {
    messagesColumnRef.current.scrollTop = messagesColumnRef.current.scrollHeight;
    console.log('messages received: ', messagesReceived);
  }, [messagesReceived])

  function sortMessagesByDate(messages) {
    return messages.sort(
      (a, b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__)
    )
  }

  // dd/mm/yyyy, hh:mm:ss
  function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  return (
    <div className={styles.messagesColumn} ref={messagesColumnRef}>
      {messagesReceived.map((msg, i) => (
        <div className={styles.message} key={i}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className={styles.msgMeta}>{msg.username}</span>
            <span className={styles.msgMeta}>
              {formatDateFromTimestamp(msg.__createdtime__)}
            </span>
          </div>
          <p className={styles.msgText}>{msg.message}</p>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Messages;
