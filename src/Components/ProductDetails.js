import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function ProductDetails(props) {
  const params = useParams();
  const productId = Number(params.id);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setLoading(true);

    axios
      .get("https://dummyjson.com/products/" + productId)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [productId]);

  function addToCart() {
    props.onAddCart(productId, qty);
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product Not Found</p>;
  }

  return (
    <div className="border-4 mt-5 rounded-lg">
      <Link to="/" className="border-2 bg-red-500 rounded-lg">⬅ Back</Link>

      <h2>{product.title}</h2>
      <img src={product.thumbnail} alt={product.title} width="200" />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>

      <input
        type="number"
        value={qty}
        min="1"
        onChange={(e) => setQty(Number(e.target.value))}
      />

      <button onClick={addToCart} className=" border-2 bg-red-500 rounded-lg">Add to Cart</button>

      <div>
        {productId > 1 && (
          <Link to={`/product/${productId - 1}`}>⬅ Previous</Link>
        )}

        <Link to={`/product/${productId + 1}`}>Next ➡</Link>
      </div>
    </div>
  );
}

export default ProductDetails;
