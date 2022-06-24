import React, { useRef, useState } from "react";

import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  SkeletonText,
  } from '@chakra-ui/react'


  import {
    useJsApiLoader,
    GoogleMap,
    Marker,
  } from '@react-google-maps/api'
import { set } from "date-fns";


  const center = {  lat: 28.7041, lng: 77.1025 };

    function Maps() {
  const [currlocation, setLocation] = useState({ lat:'',lng:''
  })
  const [restaurants, setRestaurants]= useState('')
  const [markers, Markers]=useState('')




      const [map,setMap] = useState(/** @type google.maps.Map */ (null))
        const { isLoaded } = useJsApiLoader({
          googleMapsApiKey: 'AIzaSyCV-Q1fA16u69dXONHH_z1ckezZNZfL8xc',
          libraries: ['places'],
        })
  
        if (!isLoaded) {
          return <SkeletonText />
        }

     async function getLocation(){
        const getl=document.getElementById("getlocation")
        if('geolocation' in navigator){
          navigator.geolocation.getCurrentPosition(position=>{
            const latitude =position.coords.latitude
            const longitude=position.coords.longitude
            const arr= {}
            arr[0]=latitude;
            arr[1]=longitude
            const array=[{lat: arr[0], lng:arr[1]}]
            setLocation(array)

          },error => {
            console.log(error.code);
          })
        }

        console.log(currlocation);
        console.log(center)
      }


     async function getNearBy(){
      // eslint-disable-next-line no-undef
      const restaurantservice = new google.maps.PlacesService()
      const res= await restaurantservice.route({
        location: currlocation[0],
        radius:5500,
        type:['restaurant']
      })
      setRestaurants(res)
      console.log(currlocation)

      }

        return (
          <Flex
            position='relative'
            flexDirection='column'
            alignItems='center'
            h='100vh'
            w='100vw'
          >
              {/* Google Map Box */}
              <GoogleMap
             center={currlocation[0]}
             zoom={15}
             mapContainerStyle={{ width: '100%', height: '100%' }}
             options={{
               zoomControl: false,
               streetViewControl: false,
               mapTypeControl: false,
               fullscreenControl: false,
             }}
                onLoad={map => setMap(map)}
              >
                <Marker position={center}/>

                <ButtonGroup>
                <Button type='submit' onClick={getLocation} >Locate</Button>
                <Button type='submit' onClick={getNearBy} >Find NearBy toilets</Button>
                </ButtonGroup>
                <Marker position={currlocation[0]}/>
              </GoogleMap>

          </Flex>
        )
      }

      export default Maps