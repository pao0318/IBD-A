import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MedicineCard from "./MedicineCard";
import Spinner from "react-bootstrap/Spinner";

export const ShopMedicine = () => {
  let navigate = useNavigate();
  const [medicine, setMedicine] = useState([]);
  const [query, setquery] = useState("");
  const [loading, setloading] = useState("false");
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/homepage");
    }
    if (localStorage.getItem("role") === "doctor") {
      navigate("*");
    }
    // eslint-disable-next-line
  }, []);

  // Separate function to get user details
  async function getMedicine() {
    setloading("true");
    setMedicine([]);
    const response = await fetch(
      `http://localhost:5000/api/shopping/shopmedicine`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ query }),
      }
    );
    const data = await response.json();
    console.log(data);
    setloading("false");
    setMedicine(data);
  }

  return (
    <div>
      <div>
        <div
          className="bg-image d-flex justify-content-center align-items-center flex-column"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1573883430697-4c3479aae6b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)", height:'230px'
          }}
          height="150px"
        >
          <h1 className="display-2 text-center text-white mb-3 my-5">
            <b>Online Medicine</b>
          </h1>
          <div>
            <div className="input-group mb-3">
              <input
                className="form-control mr-sm-6"
                placeholder="Medicine Search"
                value={query}
                onChange={(e) => setquery(e.target.value)}
                style={{ backgroundColor: "white", borderRadius: "4px" }}
              />
              <button
                className="btn btn-primary my-2 my-sm-0 mx-2"
                type="submit"
                onClick={getMedicine}
              >
                <i
                  className="fas fa-search"
                  style={{ borderRadius: "4px" }}
                ></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12">
        <div className="row">
          {loading === "true" ? (
            <div className="d-flex justify-content-center mt-5 pt-2">
              <Spinner
                animation="border"
                variant="primary"
                role="status"
                style={{ width: "10rem", height: "10rem" }}
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <></>
          )}
          {medicine.map((med, index) => (
            <div
              className="col-4 mb-xl-5 mb-7 mb-sm-6 mb-md-6 mb-lg-6 d-flex mt-5"
              key={index}
            >
              <MedicineCard
                title={med.title}
                product_link={med.link}
                extracted_price={med.extracted_price}
                thumbnail={med.thumbnail}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
