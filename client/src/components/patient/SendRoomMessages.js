import React, { useState, useEffect } from 'react'
import { db } from '../../firebase'
import firebase from 'firebase/compat/app'
import { Input, Button } from '@material-ui/core'
import { useNavigate } from "react-router-dom";
import './Discussion.css'

function SendRoomMessages({ scroll }) {

    // For finding the username
    let navigate = useNavigate();
    const [profile, setProfile] = useState([])

    async function getUser() {
        const response = await fetch(`http://localhost:5000/api/auth/getUser`, {
            method: "GET",
            headers: {
                "auth-token": localStorage.getItem("token"),
            },

        })
        const data = await response.json();
        setProfile(data);
    }

    // For sending the messages
    const [message, setMessage] = useState('')

    async function sendMessage(e) {
        e.preventDefault()
        await db.collection('messages').add({
            text: message,
            name: profile.name,
            email: profile.email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()

        })
        setMessage('')
        scroll.current.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/homepage");
        }
        getUser()
        // eslint-disable-next-line
    }, []);


    return (
        <div>
            <form onSubmit={sendMessage}>
                <div className='sendMsg'>
                    <Input style={{ width: '48%', fontSize: '15px', fontWeight: '550', marginLeft: '5px', marginBottom: '1px' }} value={message} onChange={(e) => setMessage(e.target.value)} type="text" placeholder="Message.." />
                    <Button style={{ width: '18%', fontSize: '15px', fontWeight: '550', margin: '4px 5% -13px 5%', maxWidth: '200px' }} type="submit">Send</Button>
                </div>
            </form>
        </div>
    )
}

export default SendRoomMessages
