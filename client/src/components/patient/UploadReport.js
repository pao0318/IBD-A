import React, { useState } from "react";
import Axios from 'axios'
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Flex,

  } from '@chakra-ui/react'


    function UploadReport(props) {

        let navigate = useNavigate();
        const [image, setImage] = useState("");
        const [credentials, setcredentials] = useState({
          email: "",
          img: "",
        
        });
    

          const onPhoto = (e) => {
            setImage(e.target.files[0]);
          };

          const onChange = (e) => {
            setcredentials({ ...credentials, [e.target.name]: e.target.value });
          };


          async function uploadImage() {
            const data = new FormData();
            data.append("file", image);
            data.append("upload_preset", "yfg4rfog");
            data.append("cloud_name", "dfd7lde7f");
            data.append("API_KEY", "862782576248162");
            Axios.post("https://api.cloudinary.com/v1_1/dfd7lde7f/image/upload",data).then((response)=>{
              console.log(response.data.secure_url)
              const respoJSON = response.data.secure_url
            setcredentials({ ...credentials, img: respoJSON.url });
            }
            
           )

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
                        </div>
                        
            </Box>
            </div>


     


            

          </Flex>
        )
      }

      export default UploadReport