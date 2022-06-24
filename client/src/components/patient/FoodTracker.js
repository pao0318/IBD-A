import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Text,
  SkeletonText,
  } from '@chakra-ui/react'




    function Food(props) {

        let navigate = useNavigate();
        const [image, setImage] = useState("");
        const [credentials, setcredentials] = useState({
            email: "",
            img: "",
          });

          const onPhoto = (e) => {
            setImage(e.target.files[0]);
          };

          async function uploadImage() {
            const data = new FormData();
            data.append("file", image);
            data.append("upload_preset", "jqywmvza");
            data.append("cloud_name", "rapidhack");
            data.append("API_KEY", "247546958156261");
        
            const resp = await fetch(
              "  https://api.cloudinary.com/v1_1/rapidhack/image/upload",
              {
                method: "post",
                body: data,
              }
            );
            const respoJSON = await resp.json();
            setcredentials({ ...credentials, img: respoJSON.url });
          }

        
          const handleSubmit = async (e) => {
            e.preventDefault();
            const {
              email,
              img,
            } = credentials;
            const response = await fetch(`http://localhost:5000/api/auth/signup`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email,
                img,
              }),
            });
            const json = await response.json();
            if (json.success) {
              // save tha uth and redirect
              localStorage.setItem("email", json.user.email);
              navigate("/");
              props.showAlert("Account Created Succesfully", "success");
            } else {
              props.showAlert("Invalid Details", "danger");
            }
          };








        return (
          <Flex
            position='relative'
            flexDirection='column'
            alignItems='center'
            h='100vh'
            w='100vw'
          >

            <Box bg='tomato' w='100%' p={4} color='white'>
            Upload your pic
            </Box>

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
                        </div>

          </Flex>
        )
      }

      export default Food