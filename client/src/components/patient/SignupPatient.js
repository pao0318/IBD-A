import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export const SignupPatient = (props) => {
  let navigate = useNavigate();
  const [image, setImage] = useState("");

  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
    phone: "",
    hospital: "",
    experience: "",
    img: "",
    specialization: "",
    location: "",
    disease: "",
  });

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const onPhoto = (e) => {
    setImage(e.target.files[0]);
  };

  async function uploadImage() {
    const data = new FormData();
    data.append("file", image);
    
    data.append("upload_preset", "yfg4rfog");
    data.append("cloud_name", "dfd7lde7f");
    data.append("API_KEY", "862782576248162");

    const resp = await fetch(
      "  https://api.cloudinary.com/v1_1/dfd7lde7f/image/upload",
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
      name,
      email,
      password,
      role,
      phone,
      hospital,
      experience,
      img,
      specialization,
      location,
      disease,
    } = credentials;

    const response = await fetch(`http://localhost:5000/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        role,
        phone,
        hospital,
        experience,
        img,
        specialization,
        location,
        disease,
      }),
    });
    const json = await response.json();
    if (json.success) {
      // save tha uth and redirect
      localStorage.setItem("token", json.authToken);
      localStorage.setItem("email", json.user.email);
      localStorage.setItem("role", json.user.role);
      navigate("/");
      props.showAlert("Account Created Succesfully", "success");
    } else {
      props.showAlert("Invalid Details", "danger");
    }
  };
  return (
    <div className="container">
      <section className="h-100 gradient-form">
        <div className="h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <form
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                      >
                        <h2>Create an account</h2>

                        <div className="form-outline">
                          <label
                            htmlFor="name"
                            className="form-label"
                            style={{ fontSize: "14px" }}
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            id="name"
                            value={credentials.name}
                            onChange={onChange}
                            minLength={3}
                            required
                          />
                        </div>
                        <div className="mb-1">
                          <label
                            htmlFor="email"
                            className="form-label"
                            style={{ fontSize: "14px" }}
                          >
                            Email address
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            onChange={onChange}
                            value={credentials.email}
                            aria-describedby="emailHelp"
                            required
                          />
                        </div>
                        <div className="mb-1">
                          <label
                            htmlFor="phone"
                            className="form-label"
                            style={{ fontSize: "14px" }}
                          >
                            Phone Number
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="phone"
                            id="phone"
                            value={credentials.phone}
                            onChange={onChange}
                          />
                        </div>
                        <div className="mb-1">
                          <label
                            htmlFor="password"
                            className="form-label"
                            style={{ fontSize: "14px" }}
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            id="password"
                            value={credentials.password}
                            onChange={onChange}
                            minLength={5}
                            required
                          />
                        </div>
                        <div className="mb-1">
                          <label
                            htmlFor="location"
                            className="form-label"
                            style={{ fontSize: "14px" }}
                          >
                            Location
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="location"
                            id="location"
                            value={credentials.location}
                            onChange={onChange}
                          />
                        </div>
                        <div className="mb-1">
                          <label
                            htmlFor="disease"
                            className="form-label"
                            style={{ fontSize: "14px" }}
                          >
                            Disease
                          </label>
                          <input
                            type="disease"
                            className="form-control"
                            name="disease"
                            id="disease"
                            value={credentials.disease}
                            onChange={onChange}
                          />
                        </div>

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

                        {credentials.img ? (
                          <img
                            src={credentials.img}
                            alt="imageupload"
                            width={"300px"}
                            className="mt-3"
                          />
                        ) : (
                          <div></div>
                        )}

                        <div className="text-center mt-4 mb-3 pb-1">
                          <button type="submit" className="btn btn-primary">
                            Submit
                          </button>
                        </div>

                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Already have an account?</p>
                          <Link
                            type="button"
                            className="btn btn-outline-danger"
                            to="/login"
                            role="button"
                          >
                            Login
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">Medibles Platform</h4>
                      <p className="small mb-0">
                        Get digital prescriptions, monitoring your progress with
                        advanced AI features, being a part of patients -
                        community. Get personalized one-to-one attentions by
                        health professionals till completely recovery .
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
