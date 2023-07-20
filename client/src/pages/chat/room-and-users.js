import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

const RoomAndUsers = ({ socket, username, room }) => {
  const [roomUsers, setRoomUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    socket.on("chatroom_users", (data) => {
      localStorage.roomUsers = JSON.stringify(data);
      setRoomUsers(data);
      console.log("local storages room: ", localStorage.roomUsers);
    });

    return () => socket.off("chatroom_users");
  }, [socket]);

  useEffect(() => {
    // Lấy dữ liệu từ localStorage khi component được render
    const roomAndUsers = localStorage.roomUsers;
    if (roomAndUsers) {
      setRoomUsers(JSON.parse(roomAndUsers));
    }
  }, []);

  const leaveRoom = () => {
    const __createdtime__ = Date.now();

    socket.emit("leave_room", { username, room, __createdtime__ });

    // Redirect to home page
    navigate("/", { replace: true });
  };

  return (
    <div className={styles.roomAndUsersColumn}>
      <h2 className={styles.roomTitle}>{room}</h2>

      <div>
        {roomUsers.length > 0 && <h5 className={styles.usersTitle}>Users:</h5>}
        <ul className={styles.usersList}>
          {roomUsers.map((user) => (
            <li
              style={{
                fontWeight: `${user.username === username ? "bold" : "normal"}`,
              }}
              key={user.id}
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>

      <button className="btn btn-outline" onClick={leaveRoom}>
        Leave
      </button>
    </div>
  );
};

export default RoomAndUsers;
