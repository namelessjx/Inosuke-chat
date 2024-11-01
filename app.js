
// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCnTMrNtOxQnc87s2_6AYYIvjQSgF7LpM",
  authDomain: "chat-89659.firebaseapp.com",
  databaseURL: "https://chat-89659-default-rtdb.firebaseio.com",
  projectId: "chat-89659",
  storageBucket: "chat-89659.appspot.com",
  messagingSenderId: "764134912875",
  appId: "1:764134912875:web:0150f3d211497a259d522e",
  measurementId: "G-LFM3WV40RK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const messagesRef = ref(database, "messages");

// Function to send a message
window.sendMessage = function() {
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;
  const senderName = "Human"; // আপনার ব্যবহারকারীর নাম এখানে দিন

  if (message.trim()) {
    push(messagesRef, {
      text: message,
      sender: senderName, // ব্যবহারকারীর নাম যোগ করুন
      timestamp: Date.now()
    });
    messageInput.value = ""; // ইনপুট ফিল্ডটি খালি করুন
  }
};

// Function to display messages in real-time
onValue(messagesRef, (snapshot) => {
  const chatBox = document.getElementById("chat-box");
  chatBox.innerHTML = ""; // Clear chat box
  snapshot.forEach((childSnapshot) => {
    const messageData = childSnapshot.val();
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", messageData.sender);
    const textElement = document.createElement("div");
    textElement.classList.add("text");
    textElement.textContent = `${messageData.sender}: ${messageData.text}`; // Include sender name
    messageElement.appendChild(textElement);
    chatBox.appendChild(messageElement);
  });
  // Auto-scroll to the bottom
  chatBox.scrollTop = chatBox.scrollHeight;
});