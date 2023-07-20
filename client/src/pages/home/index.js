import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Home = ({ username, setUsername, room, setRoom, socket }) => {
  const navigate = useNavigate();
  // Add this
  const joinRoom = () => {
    if (room !== "" && username !== "") {
      socket.emit("join_room", { username, room });
    }
    
    navigate('/chat', { replace: true });
  };

  const changeUsername = (e) => {
    localStorage.username = e.target.value;
    setUsername(e.target.value);

    console.log('local storage username: ', localStorage.username);
  }

  const changeRoom = (e) => {
    localStorage.room = e.target.value;
    setRoom(e.target.value);

    console.log('local storage room: ', localStorage.room);
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>{`<>DevRooms</>`}</h1>
        <input
          className={styles.input}
          placeholder="Username..."
          onChange={changeUsername}
        />

        <select
          className={styles.input}
          onChange={changeRoom}
        >
          <option>-- Select Room --</option>
          <option value="javascript">JavaScript</option>
          <option value="node">Node</option>
          <option value="express">Express</option>
          <option value="react">React</option>
        </select>

        <button 
          className="btn btn-secondary" 
          style={{ width: "100%" }}
          onClick={joinRoom}
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default Home;
