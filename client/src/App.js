import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import io from "socket.io-client"; // Add this
import { useEffect, useState } from "react";
import Home from "./pages/home";
import Chat from "./pages/chat";

const socket = io.connect("http://localhost:4000");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Home
          username={username}
          setUsername={setUsername}
          room={room}
          setRoom={setRoom}
          socket={socket}
        />
      ),
    },
    {
      path: "/chat",
      element: (
        <Chat 
          username={username}
          room={room}
          socket={socket}
        />
      )
    },
  ]);

  
  useEffect(() => {
    // Lấy dữ liệu từ localStorage khi component được render
    const username = localStorage.username;
    const room = localStorage.room;
    if (username) {
      setUsername(username);
    }
    if (room) {
      setRoom(room);
    }
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
