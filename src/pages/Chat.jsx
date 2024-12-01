import { useContext, useEffect, useRef, useState } from "react";
import UserImage from "../assets/user_icon.png";
import { userData } from "@/context/userAuth";
import axiosInstance from "@/service/axiosInstance";
import { useLocation } from "react-router-dom";

const Chat = () => {
  const { userDetails } = useContext(userData);

  const [selectedUser, setSelectedUser] = useState(null); // Change default to null
  const [messageContent, setMessageContent] = useState("");
  const [messages, setMessages] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  const stompClientRef = useRef(null); // Persist stompClient
  const selectedUserRef = useRef(selectedUser);
  const chatMessagesRef = useRef(null);
  const initialized = useRef(false);

  const location = useLocation();

  useEffect(() => {
    selectedUserRef.current = selectedUser;
  }, [selectedUser]);

  const connect = () => {
    if (stompClientRef.current) {
      console.log("WebSocket already connected");
      return; // Prevent re-connection
    }

    if (userDetails.userId && userDetails.name) {
      const socket = new SockJS(`${process.env.CHAT_API_URL}/ws`);
      const stompClient = Stomp.over(socket);

      stompClient.connect(
        {},
        () => {
          setIsConnected(true);
          stompClientRef.current = stompClient;
          console.log("Connected to STOMP");
          onConnected();
        },
        (error) => {
          setIsConnected(false);
          console.error("STOMP connection error:", error);
          onError();
        }
      );
    }
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      if (!stompClientRef.current) {
        connect();
      }
    }

    return () => {
      // Clean up on unmount
      const stompClient = stompClientRef.current;
      if (stompClient && isConnected) {
        stompClient.disconnect(() => {
          console.log("Disconnected from STOMP");
        });
      }
    };
  }, []); // Run once on mount

  useEffect(() => {
    const handleLogout = () => {
      const stompClient = stompClientRef.current;
      if (stompClient && isConnected) {
        stompClient.send("/app/user.disconnectUser", {}, userDetails.userId);
      }
    };

    return () => {
      // Cleanup on route change
      handleLogout();
    };
  }, [location, isConnected, userDetails]);

  const onConnected = () => {
    const stompClient = stompClientRef.current;

    stompClient.subscribe(
      `/user/${userDetails.userId}/queue/messages`,
      onMessageReceived
    );
    stompClient.subscribe(`/user/public`, onMessageReceived);

    // Notify backend that the user has connected
    stompClient.send("/app/user.addUser", {}, userDetails.userId);

    findAndDisplayConnectedUsers();
  };

  const onError = () => {
    console.log(
      "Could not connect to WebSocket server. Please refresh this page to try again!"
    );
  };

  const findAndDisplayConnectedUsers = async () => {
    const response = await axiosInstance.get(
      `${process.env.CHAT_API_URL}/users`
    );

    setConnectedUsers(
      response.data.filter((user) => user.userId != userDetails.userId)
    );
  };

  const userItemClick = async (user) => {
    setSelectedUser(user); // State update for selected user
    fetchAndDisplayUserChat(user); // Pass user directly to avoid stale state
  };

  const fetchAndDisplayUserChat = async (user) => {
    const response = await axiosInstance.get(
      `${process.env.CHAT_API_URL}/messages/${userDetails.userId}/${user.userId}`
    );

    setMessages(response.data);
  };

  const sendMessage = (event) => {
    event.preventDefault();
    const stompClient = stompClientRef.current;

    if (messageContent && stompClient && selectedUser) {
      const chatMessage = {
        senderId: userDetails.userId,
        recipientId: selectedUser.userId,
        content: messageContent.trim(),
        timestamp: new Date(),
      };

      stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
      setMessages((prev) => [...prev, chatMessage]);
      setMessageContent("");
    }
  };

  const onMessageReceived = async (payload) => {
    await findAndDisplayConnectedUsers();

    const currentSelectedUser = selectedUserRef.current;

    const message = JSON.parse(payload.body);
    if (currentSelectedUser && currentSelectedUser.userId == message.senderId) {
      setMessages((prevMessages) => [...prevMessages, message]);
    } else {
      setConnectedUsers((prev) =>
        prev.map((user) =>
          user.userId == message.senderId
            ? { ...user, hasUnreadMessage: true }
            : user
        )
      );
    }
  };

  useEffect(() => {
    const handleLogout = () => {
      const stompClient = stompClientRef.current;
      if (stompClient) {
        stompClient.send("/app/user.disconnectUser", {}, userDetails.userId);
      }
    };

    return () => {
      // This cleanup function will run before the route changes
      handleLogout();
    };
  }, [location, stompClientRef, userDetails]);

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  const formatLastSeen = (isoTimestamp) => {
    const date = new Date(isoTimestamp);
    const now = new Date();

    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    // Check if the date is today
    const isToday = date.toDateString() === now.toDateString();

    const timeString = date.toLocaleTimeString("en-US", options);

    if (isToday) {
      return `Last seen today at ${timeString}`;
    } else {
      // If not today, format as a full date and time
      const dateString = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      return `Last seen on ${dateString} at ${timeString}`;
    }
  };

  return (
    <div className="font-sans bg-gray-200 flex items-center justify-center h-screen flex-col">
      <div
        className="flex w-[800px] h-[600px] m-5 border border-solid border-[#ccc] bg-white overflow-hidden rounded-lg"
        style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
      >
        <div className="flex-1 border-r border-solid border-gray-300 p-5 box-border bg-blue-500 text-white rounded-tl-md rounded-bl-md flex flex-col justify-between">
          <div className="h-full overflow-y-auto">
            <h2 className="text-2xl mb-2.5">Online Users</h2>
            <ul className="list-none">
              {connectedUsers.map((user) => (
                <li key={user.userId}>
                  <div
                    className={`flex items-center mb-2 cursor-pointer ${
                      selectedUser?.userId == user.userId
                        ? "bg-blue-200 text-gray-700 p-2 rounded"
                        : "hover:bg-blue-600"
                    }`}
                    onClick={() => userItemClick(user)}
                  >
                    <img
                      className="w-10 h-10 mr-2 rounded-full"
                      src={UserImage}
                      alt={user.name}
                    />
                    <span className="font-bold">{user.name}</span>
                    <span
                      className={`ml-2.5 bg-yellow-200 text-white p-1.25 w-2.5 h-2.5 rounded-full font-bold ${
                        selectedUser?.userId == user.userId ? "hidden" : ""
                      } ${user.hasUnreadMessage == true ? "active" : "hidden"}`}
                    ></span>
                  </div>
                  <div className="text-xs text-black font-semibold">
                    <p className="text-xs text-black font-semibold">
                      {user.role}
                    </p>
                    <p className="">
                      {user.status == "ONLINE"
                        ? user.status
                        : user.lastSeen
                        ? formatLastSeen(user.lastSeen)
                        : "Offline"}
                    </p>
                  </div>
                  <div className="h-px bg-gray-300 my-2.5"></div>
                </li>
              ))}
            </ul>
          </div>
          <div>{userDetails.name && <p> {userDetails.name}</p>}</div>
        </div>

        <div className="flex-[3] flex flex-col p-5 box-border rounded-tr-md rounded-br-md">
          <div
            ref={chatMessagesRef}
            className="flex-[3] flex flex-col p-5 box-border rounded-tr-md rounded-br-md overflow-y-auto"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-1 rounded ${
                  msg.senderId == userDetails.userId
                    ? "bg-blue-500 text-white self-end"
                    : "bg-gray-200 text-gray-800 self-start"
                }`}
              >
                <p className="px-3 rounded-lg break-words">{msg.content}</p>
              </div>
            ))}
          </div>

          {selectedUser && (
            <form onSubmit={sendMessage} id="messageForm" name="messageForm">
              <div className="mt-auto flex">
                <input
                  className="flex-1 p-2.5 border border-gray-300 rounded-md mr-2.5"
                  autoComplete="off"
                  type="text"
                  onChange={(e) => setMessageContent(e.target.value)}
                  value={messageContent}
                  placeholder="Type your message..."
                  required
                />
                <button
                  className="p-2 bg-blue-500 text-white rounded cursor-pointer border-none"
                  type="submit"
                >
                  Send
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
