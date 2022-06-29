import React, {useEffect, useState } from "react";
import Axios from 'axios'
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Flex,

  } from '@chakra-ui/react'


    function UploadReport(props) {
      
      let navigate = useNavigate();
      const [profile, setProfile] = useState([]);
      const [bloodimage, setBloodImage] = useState("");
      const [credentials, setcredentials] = useState({
        id:"",
        img: "",
      });

      useEffect(() => {
        getUser();

        // eslint-disable-next-line
      }, []);


      // Getting user details
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


      const onPhoto = (e) => {
        setBloodImage(e.target.files[0])

      };
      async function submitImage() {
        const myData ={
          id:credentials[0].id,
          img: credentials[0].img,
        }

        const res=await fetch(`http://localhost:5000/api/bloodreport/addbloodreport/${credentials[0].id}`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify(myData)
        })
        const resinJson=await res.json();
        console.log(resinJson)
        }


          async function uploadImage() {
            const data = new FormData();
            data.append("file", bloodimage);
            data.append("upload_preset", "yfg4rfog");
            data.append("cloud_name", "dfd7lde7f");
            data.append("API_KEY", "862782576248162");
            Axios.post("https://api.cloudinary.com/v1_1/dfd7lde7f/image/upload",data).then((response)=>{
              const array=[{id: profile._id, img:response.data.secure_url}]
            setcredentials(array);
            console.log(credentials)
            }
           ) ;
          }


        return (
          <Flex
            position='relative'
            flexDirection='column'
            alignItems='center'
            h='100vh'
            w='100vw'
          >
            <div>
            <Box bg='tomato' w='100%' p={40} color='white'>
            Upload your blood report
            <div className="mb-1">
                          <label
                            htmlFor="img"
                            className="form-label"
                            style={{ fontSize: "14px" }}
                          >
                            Upload Photo
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            name="img"
                            id="img"
                            onChange={onPhoto}
                          />
                          <button
                            type="button"
                            className="btn btn-success mt-2"
                            onClick={uploadImage}
                          >
                            Upload Image
                          </button>

                          <button
                            type="button"
                            className="btn btn-success mt-2"
                            onClick={submitImage}
                          >
                            Done
                          </button>

                        </div>
            </Box>
            </div>

          </Flex>
        )
      }

      export default UploadReport