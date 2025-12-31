import React from "react";
import { Link } from "react-router-dom";

function Product(props) {
  return (
    <div className=" border-4 w-50 rounded-lg gap-2"> 
      {props.sale && <p>SALE</p>}

      <img
        src={props.thumbnail}
        alt={props.title}
        width="200"
      />

      <p>{props.category}</p>
      <h3>{props.title}</h3>
      <p>Price: ${props.price}</p>

      <Link to={"/product/" + props.id} className="border-2 bg-blue-700 rounded-lg">
        View Details
      </Link>
    </div>
  );
}

export default Product;
