import React, { useState, useEffect, useRef } from "react";
import { db } from "../../firebase";
import SendRoomMessages from "./SendRoomMessages";
import { useNavigate } from "react-router-dom";
import "./Discussion.css";

export default function Discussion() {
  let navigate = useNavigate();
  const scroll = useRef();
  const [messages, setMessages] = useState([]);

  const [profile, setProfile] = useState([]);

  // Function to get user datas
  async function getUser() {
    const response = await fetch(`http://localhost:5000/api/auth/getUser`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    setProfile(data);
  }

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/homepage");
    }
    if (localStorage.getItem("role") === "doctor") {
      navigate("*");
    }
    getUser();
    // To get message state
    db.collection("messages")
      .orderBy("createdAt")
      .limit(80)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container card px-5 mt-4" style={{ backgroundColor: "#EDEDED" }}>
      <h1 style={{ textAlign: "center" }}>Patient-Community</h1>
      <div className="msgs mx-4 mb-5 pb-4">
        {messages.map(({ name, text, email }) => {
          return (
            <div>
              {email === profile.email ? (
                <div key={email} className="msg sent py-2">
                  <p className="mb-1">{text}</p>
                </div>
              ) : (
                <div key={email} className="msg received py-1">
                  <p className="mb-1">{text}</p>
                  <p
                    className="pt-4 pb-0 mb-1 text-muted"
                    style={{ fontSize: "12px" }}
                  >
                    {name}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <SendRoomMessages scroll={scroll} />
      <div ref={scroll}></div>
    </div>
  );
}