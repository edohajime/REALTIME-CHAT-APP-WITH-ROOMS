import Messages from "./messages";
import RoomAndUsers from "./room-and-users";
import SendMessage from "./send-message";
import styles from "./styles.module.css";

const Chat = ({ socket, username, room }) => {

  return (
    <div className={styles.chatContainer}>
      <RoomAndUsers socket={socket} username={username} room={room} />

      <div>
        <Messages socket={socket} />
        <SendMessage socket={socket} username={username} room={room} />        
      </div>
    </div>
  );
};
export default Chat;
