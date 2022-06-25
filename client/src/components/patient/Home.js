import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import ChatBot from "react-simple-chatbot";
import PropTypes from 'prop-types';

import "./Home.css";

export default function Home(props) {
  let navigate = useNavigate();
  const [usercards, setusercards] = useState([]);
  const [totalcards, settotalcards] = useState([]);
  const [filterCard, setFilter] = useState({
    location: "",
    specialization: "",
  });

  const BMI = (props) => {
    const { steps } = props;
    const height = steps.height.value;
    const weight = steps.weight.value;
    const bmi = Number(((weight / (height * height)) * 10000).toFixed(1));
    let result = 'Underweight';

    if (bmi >= 18.5 && bmi < 25) {
      result = 'Normal weight';
    } else if (bmi >= 25 && bmi < 30) {
      result = 'Overweight';
    } else if (bmi >= 30) {
      result = 'Obesity';
    }

    return (
      <div className="test">
        Your BMI is {bmi} ({result})
      </div>
    );
  };

  BMI.propTypes = {
    steps: PropTypes.object,
  };

  BMI.defaultProps = {
    steps: undefined,
  };



  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/homepage");
    }
    if (localStorage.getItem("role") === "doctor") {
      navigate("/homedoctor");
    }
    getAllUsers();
    // eslint-disable-next-line
  }, []);
  async function getAllUsers() {
    const response = await fetch(`http://localhost:5000/api/auth/getAllusers`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    setusercards(data);
    settotalcards(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = totalcards.filter((card) => {
      if (filterCard.specialization && filterCard.location) {
        return (
          card.specialization === filterCard.specialization &&
          card.location === filterCard.location &&
          card.role === "doctor"
        );
      } else if (filterCard.location) {
        console.log('here');
        return card.location === filterCard.location && card.role === "doctor";
      } else if (filterCard.specialization) {
        return (
          card.specialization === filterCard.specialization &&
          card.role === "doctor"
        );
      } else {
        return card.role === "doctor";
      }
    });
    setusercards(res);
  }
  const onChange = (e) => {
    setFilter({ ...filterCard, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <div className="container">
        <h1>Discover Top Doctors</h1>
        <form onSubmit={handleSubmit}>
          <div className="conatiner mt-3">
            <div className="container">
              <div className="row">
                <h5>Filter By Location and Specialization</h5>
                <div className="col-3">
                  <select
                    className="form-select"
                    name="specialization"
                    onChange={onChange}
                    aria-label="Default select example"
                  >
                    <option defaultValue="">
                      Select Specialization
                    </option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Ophthalmology">Ophthalmology</option>
                    <option value="Neurology">Neurology</option>
                  </select>
                </div>
                <div className="col-3">
                  <select
                    className="form-select"
                    name="location"
                    onChange={onChange}
                    aria-label="Default select example"
                  >
                    <option defaultValue=''>
                      Select Location
                    </option>
                    <option value="Bhubaneswar">Bhubaneswar</option>
                    <option value="Bangalore">Banagalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                  </select>
                </div>
                <div className="col-3">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>

        {
          <div className="col-12 mt-3">
            <div className="row">
              {usercards.map((usercards, index) => (
                <div className="col-xl-3 col-md-6 mb-xl-5 mb-7 mb-sm-6 mb-md-6 mb-lg-6 d-flex">
                  <div className="card" style={{ width: "18rem" }}>
                    <img
                      width="500"
                      height="250"
                      src={usercards.img}
                      className="card-img-top"
                      alt={usercards.name}
                    />
                    <div className="card-body">
                      <h4>Dr. {usercards.name}</h4>
                      <p
                        className="card-text"
                        style={{ fontSize: "14px", marginBottom: "0.3rem" }}
                      >
                        <b>{usercards.specialization}</b> at{" "}
                        {usercards.hospital}
                      </p>
                      <p
                        className="card-text"
                        style={{ fontSize: "14px", marginBottom: "0.3rem" }}
                      >
                        <b>Location :</b> {usercards.location}
                      </p>
                      <p className="card-text" style={{ fontSize: "14px" }}>
                        <b>Years of experience : </b> {usercards.experience}
                      </p>
                      <Link
                        to={`/viewProfile/${usercards._id}`}
                        className="btn btn-primary"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        }
      </div>
      <ChatBot steps={[
        {
          id: '1',
          message: 'Hi! Can we ask some questions for today?',
          trigger: '7',
        },
        {
          id: '2',
          message: 'Let\'s calculate your BMI (Body Mass Index)',
          trigger: '3',
        },
        {
          id: '3',
          message: 'Please type your height (cm)',
          trigger: 'height',
        },
        {
          id: 'height',
          user: true,
          trigger: '4',
        },
        {
          id: '4',
          message: 'Please type your weight (kg)',
          trigger: 'weight',
        },
        {
          id: 'weight',
          user: true,
          trigger: '5',
        },
        {
          id: '5',
          message: 'Thanks! Check out your BMI',
          trigger: '6',
        },
        {
          id: '6',
          component: <BMI />,
          end: true,
        },
        {
          id: '7',
          options: [
            { value: 1, label: 'Yes', trigger: '9' },
            { value: 2, label: 'No', trigger: '8' },
          ],
        },
        {
          id: '8',
          message: 'Awesome! Thankyou for your time. ',
          end: true,
        },
        {
          id: '9',
          message: 'Great!',
          trigger: '10'
        },
        {
          id: '10',
          message: "Say Hello to India's top doctors via Project MEDIBLES",
          trigger: '12'
        },
        {
          id: '12',
          message: 'Where do you feel the pain?',
          trigger: '13'
        },
        {
          id: '13',
          options: [
            { value: 1, label: 'Above navel', trigger: '14' },
            { value: 2, label: 'Below navel', trigger: '14' },
            { value: 3, label: 'To right of navel', trigger: '14' },
            { value: 4, label: ' To left of navel', trigger: '14' },
            { value: 5, label: 'I can’t pin point', trigger: '14' },
          ],
        },
        {
          id: '14',
          message: 'Since long the pain has been?',
          trigger: '15'
        },
        {
          id: '15',
          message: 'Please mention the duration in days (days)',
          trigger: 'days',
        },

        {
          id: 'days',
          user: true,
          trigger:'end'
          
        },
        {
          id: 'end',
          message: 'How does the pain feel?',
          trigger:'painoptions'
       
         
        },

        {
          id:'painoptions',
          options: [
            { value: 1, label: 'Sharp, comes, increases then decreases in intensity', trigger: '16' },
            { value: 2, label: ' Tearing type pain', trigger: '16' },
            { value: 3, label: 'Burning sensation', trigger: '16' },
            { value: 4, label: ' Sharp but constant', trigger: '16' },
            { value: 5, label: 'Dull, low intensity pain', trigger: '16' },
          ],

        },
        {
          id: '16',
          message: 'Does it spread anywhere?',
          trigger: '17'
        },
        {
          id: '17',
          options: [
            { value: 1, label: 'To the shoulders', trigger: '18' },
            { value: 2, label: ' Right shoulder only', trigger: '18' },
            { value: 3, label: 'Left shoulder only', trigger: '18' },
            { value: 4, label: 'To the back', trigger: '18' },
            { value: 5, label: 'To the throat', trigger: '18' },
            { value: 6, label: 'Not Sure', trigger: '18' },
          ],
          trigger: '8'
        },
        {
          id: '18',
          message: 'Thats all for now',
          trigger: '8'
        },




      ]}
        floating={true} />
    </div>
  );
}
