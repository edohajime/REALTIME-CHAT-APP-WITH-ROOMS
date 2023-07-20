import { useEffect, useState } from "react";
import styles from "./styles.module.css";

const SendMessage = ({ socket, username, room }) => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message !== '') {
      const __createdtime__ = Date.now();

      // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
      socket.emit('send_message', { username, room, message, __createdtime__ });
      setMessage('');
    }
  };

  useEffect(() => {
    // Lấy dữ liệu từ localStorage khi component được render
    const msg = localStorage.msg;
    if (msg) {
      setMessage(msg);
    }
  }, []);

  const changeMessage = (e) => {
    localStorage.msg = e.target.value;
    setMessage(e.target.value);
    console.log('local storages msg: ', localStorage.msg);
  }
  return (
    <div className={styles.sendMessageContainer}>
      <input
        className={styles.messageInput}
        placeholder="Message..."
        onChange={changeMessage}
        value={message}
      />
      <button className="btn btn-primary" onClick={sendMessage}>
        Send Message
      </button>
    </div>
  );
};

export default SendMessage;