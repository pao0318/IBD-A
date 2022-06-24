import React from "react";
const MedicineCard = ({ title, product_link, extracted_price, thumbnail }) => {
  // States

  return (
    <div className="card d-flex m-auto" style={{ width: "250px" }}>
      <img
        className="card-img-top"
        top
        style={{ width: "100%", height: "233px" }}
        src={thumbnail}
        alt={title}
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p>
          <b>Price: </b>
          {extracted_price}
        </p>
        <a
          type="button"
          className="btn btn-sm btn-primary"
          href={product_link}
          target='_blank'
          rel="noreferrer"
        >
          More info
        </a>
      </div>
    </div>
  );
};

export default MedicineCard;
