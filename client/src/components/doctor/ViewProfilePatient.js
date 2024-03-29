import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

export default function ViewProfilePatient(props) {
  const { id } = useParams();
  let navigate = useNavigate();
  const [profile, setProfile] = useState([]);
  const [note, setnote] = useState("");

  const [prescription, setPrescription] = useState([]);


  let freqOptions = [
    {
      value: "mon",
      label: "Monday",
    },
    {
      value: "tue",
      label: "Tuesday",
    },
    {
      value: "wed",
      label: "Wednesday",
    },
    {
      value: "thurs",
      label: "Thursday",
    },
    {
      value: "fri",
      label: "Friday",
    },
    {
      value: "sat",
      label: "Saturday",
    },
    {
      value: "sun",
      label: "Sunday",
    },
  ];
  const [medicine, setmedicine] = useState([
    {
      name: "",
      dosage: "",
      duration: "",
      time: "",
      frequency: [],
      eatenTime: "",
      state: "info",
    },
  ]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/homepage");
    }
    if (localStorage.getItem("role") === "patient") {
      navigate("*");
    }
    getUser();
    getPrescription();
    // eslint-disable-next-line
  }, []);

  // Separate function to get user details
  async function getUser() {
    const response = await fetch(
      `http://localhost:5000/api/auth/getDetailsofPatient/${id}`,
      {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const data = await response.json();
    setProfile(data);
  }
  async function getPrescription() {
    const response = await fetch(
      `http://localhost:5000/api/prescription/fetchprescriptiondoctor/${id}`,
      {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const data = await response.json();
    setPrescription(data);
  }


  const handleMedChange = (i, e) => {
    let newMedicine = [...medicine];
    console.log(newMedicine);
    newMedicine[i][e.target.name] = e.target.value;
    setmedicine(newMedicine);
  };
  const handleFreqChange = (i, e) => {
    let newMedicine = [...medicine];
    newMedicine[i]["frequency"] = Array.isArray(e) ? e.map((x) => x.value) : [];
    setmedicine(newMedicine);
  };


  let addFormFields = () => {
    setmedicine([
      ...medicine,
      {
        name: "",
        dosage: "",
        duration: "",
        time: "",
        frequency: [],
        eatenTime: "",
        state: "info",
      },
    ]);
  };


  let removeFormFields = (i) => {
    let newMedicine = [...medicine];
    newMedicine.splice(i, 1);
    setmedicine(newMedicine);
  };


  async function handleSubmit(event) {
    //event.preventDefault();
    props.showAlert("Prescription Added Succesfully", "success");
    const response = await fetch(
      `http://localhost:5000/api/prescription/addPrescription/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ medicine, note }),
      }
    );
    const data = await response.json();
    setPrescription(data);
    setmedicine([
      {
        name: "",
        dosage: "",
        duration: "",
        time: "",
        frequency: [],
        eatenTime: "",
        state: "info",
      },
    ]);
    setnote("");
  }



  const handleNoteChange = (e) => {
    setnote(e.target.value);
  };


  const deletePrescription = async (Prescid) => {
    console.log("in delete");
    props.showAlert("Prescription Deleted Succesfully", "success");
    //call api for deleting prescription
    const response = await fetch(
      `http://localhost:5000/api/prescription/deleteprescription/${Prescid}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    console.log(response);
    // e.target.className = e.target.className + "disabled";
    // setPrescription(data);
    const newPrescriptions = prescription.filter((prescription) => {
      return prescription._id !== Prescid;
    });
    setPrescription(newPrescriptions);
  };


  return (
    <div className="container">
      <div className="container rounded bg-white">
        <div className="row">
          <div
            className="w3-content w3-margin-top"
            style={{ maxWidth: "1400px" }}
          >
            <div className="w3-row-padding">
              <div className="w3-third">
                <div className="w3-white w3-text-grey w3-card-4">
                  <div className="w3-display-container">
                    <img
                      src={profile.img}
                      style={{ width: "100%" }}
                      alt="Avatar"
                    />
                  </div>
                </div>
                <br />
              </div>
              <div className="w3-twothird">
                <div className="w3-container w3-card w3-white w3-margin-bottom">
                  <div className="w3-container">
                    <br />
                    <h2 className="w3-text-grey w3-padding-16">
                      <i className="fa fa-certificate fa-fw w3-margin-right w3-xxlarge w3-text-blue"></i>
                      About {profile.name}
                    </h2>
                    <hr />
                    <p>
                      <i className="fa fa-home fa-fw w3-margin-right w3-large w3-text-blue"></i>
                      {profile.location}
                    </p>
                    <p>
                      <i className="fa fa-envelope fa-fw w3-margin-right w3-large w3-text-blue"></i>
                      {profile.email}
                    </p>
                    <p>
                      <i className="fa fa-phone fa-fw w3-margin-right w3-large w3-text-blue"></i>
                      {profile.phone}
                    </p>
                    <p>
                      <i className="fa fa-chalkboard fa-fw w3-margin-right w3-large w3-text-blue"></i>
                      Disease - {profile.disease}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="w3-half">
              <div className="w3-half">
                <div className="w3-container w3-card w3-white w3-margin-bottom">
                  <div className="w3-container">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-7 mb-3">
                          <h3>Medicine assign</h3>
                        </div>
                      </div>
                      {medicine.map((element, index) => (
                        <div key={index}>
                          <div className="mb-1 ">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Type Medicines names"
                              name="name"
                              value={medicine.name}
                              onChange={(e) => handleMedChange(index, e)}
                              minLength={3}
                              required
                            />
                          </div>
                          <div className="w3-half mt-1">
                            <div className="mb-1">
                              <select
                                className="form-select"
                                name="dosage"
                                value={medicine.dosage}
                                onChange={(e) => handleMedChange(index, e)}
                                aria-label="Default select example"
                                required
                              >
                                <option defaultValue="">Select Dosage</option>
                                <option value="morning">Morning</option>
                                <option value="day">Day</option>
                                <option value="night">Night</option>
                              </select>
                            </div>
                          </div>
                          <div className="w3-half mt-1">
                            <div className="mb-1 mx-2">
                              <input
                                type="number"
                                className="form-control "
                                placeholder="Type duration"
                                name="duration"
                                value={medicine.duration}
                                onChange={(e) => handleMedChange(index, e)}
                                required
                                minLength={1}
                              />
                            </div>
                          </div>
                          <div className="w3-half mt-1">
                            <div className="mb-1">
                              <select
                                className="form-select mb-3"
                                name="time"
                                value={medicine.time}
                                onChange={(e) => handleMedChange(index, e)}
                                aria-label="Default select example"
                                required
                              >
                                <option defaultValue="">Select Timing</option>
                                <option value="before">Before Food</option>
                                <option value="after">After Food</option>
                              </select>
                            </div>
                          </div>
                          <div className="w3-half mt-1">
                            <div className="mb-1 mx-2">
                              <Select
                                isMulti
                                options={freqOptions}
                                placeholder="Select Frequency"
                                onChange={(e) => handleFreqChange(index, e)}
                                required
                              ></Select>
                            </div>
                          </div>
                          {index ? (
                            <button
                              type="button"
                              className="btn btn-danger mb-3"
                              onClick={() => removeFormFields(index)}
                            >
                              Remove
                            </button>
                          ) : null}
                        </div>
                      ))}

                      <input
                        type="text"
                        className="form-control mb-2 py-3"
                        placeholder="Type any specific instructions for the patient"
                        name="note"
                        value={note}
                        onChange={(e) => handleNoteChange(e)}
                      />
                      <div className="w3-half align-items-end">
                        <button
                          type="button"
                          className="btn btn-dark mb-3 px-4"
                          onClick={addFormFields}
                        >
                          Add More Fields
                        </button>
                      </div>
                      <div className="w3-half ">
                        <button
                          type="submit"
                          className="btn btn-success mb-3 px-4"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 mt-5 card card-body">
        <div className="row">
          <h2>Prescription given by you</h2>

          <h4 className="mt-2">
            {prescription.length === 0 && "No Prescriptions Yet"}
          </h4>
          {prescription.map((prescription, index) => (
            <div className="w3-half">
              <div className="w3-container w3-card w3-white w3-margin-bottom">
                <div
                  className="row"
                  style={
                    prescription.refill
                      ? { backgroundColor: "rgb(255 248 248)" }
                      : { backgroundColor: "white" }
                  }
                >
                  <div key={index} className="w3-container ">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-10">
                          <h4>
                            Prescription{" "}
                            {prescription.refill ? " - Refill Request" : ""}
                          </h4>
                        </div>
                        <div className="col-2 float-end">
                          <button
                            className={
                              prescription.refill === false
                                ? "btn btn-danger disabled"
                                : "btn btn-danger "
                            }
                            onClick={() => {
                              deletePrescription(prescription._id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="table-responsive">
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Medicine Name</th>
                              <th scope="col">Dosage</th>
                              <th scope="col">Time</th>
                              <th scope="col">Frequency</th>
                              <th scope="col">Duration</th>
                            </tr>
                          </thead>
                          <tbody>
                            {prescription.medicines.map((med, index) => (
                              <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{med.name}</td>
                                <td>{med.dosage}</td>
                                <td>{med.time}</td>
                                <td>
                                  {med.frequency.map((freq, index) => (
                                    <>
                                      {index === med.frequency.length - 1
                                        ? freq + " "
                                        : freq + ", "}
                                    </>
                                  ))}
                                </td>
                                <td>{med.duration} days</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <h6>
                          <b>Starting Date: </b>
                          {prescription.startDate}{" "}
                        </h6>
                      </div>
                      {prescription.note ? (
                        <>
                          <b className="d-block">Special Instruction</b>
                          {prescription.note}
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-12 mt-5 card card-body">
      </div>
    </div>
    </div>
  );
}
