import { useEffect, useState } from "react";
import axios from "axios";

import CartRow from "../Cart/CartRow";
import Heading from "../Cart/Heading";
import Button from "../Cart/Button";
import CartTotal from "../Cart/CartTotal";
import Loading from "./Loading";

const CartList = ({ cart, updateCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // temporary cart for quantity change
  const [tempCart, setTempCart] = useState(cart);

  // jab bhi cart change ho, tempCart update karo
  useEffect(() => {
    setTempCart(cart);
  }, [cart]);

  // product remove karna
  function handleRemove(id) {
    const newCart = { ...cart };
    delete newCart[id];
    updateCart(newCart);
  }

  // cart ke products API se laana
  useEffect(() => {
    const ids = Object.keys(cart || {});

    if (ids.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }

    Promise.all(
      ids.map((id) => {
        return axios
          .get(`https://dummyjson.com/products/${id}`)
          .then((res) => res.data);
      })
    )
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setLoading(false);
      });
  }, [cart]);

  if (loading) {
    return <Loading />;
  }

  if (products.length === 0) {
    return <p className="p-4">Cart is empty</p>;
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-3 items-end">
      <div className="w-full mt-10 border-2 border-gray-500 bg-white">
        <Heading />

        {products.map((product) => (
          <CartRow
            key={product.id}
            img={product.thumbnail}
            title={product.title}
            price={product.price}
            quantity={cart[product.id]}
            onQuantityChange={(qty) => {
              setTempCart({
                ...tempCart,
                [product.id]: qty,
              });
            }}
            remove={() => handleRemove(product.id)}
          />
        ))}

        <Button onUpdateCart={() => updateCart(tempCart)} />
      </div>

      <CartTotal />
    </div>
  );
};

export default CartList;
