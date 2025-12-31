import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "./Product";
import Search from "./Search";
import Sorting from "./Sorting";
import Button from "./Button";
import Loading from "./Loading";

function Main() {
  const [products, setProducts] = useState([]);
  const [showProducts, setShowProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => {
        setProducts(res.data.products);
        setShowProducts(res.data.products);
      });
  }, []);

  
  function handleSearch(e) {
    const text = e.target.value.toLowerCase();

    const result = products.filter((item) =>
      item.title.toLowerCase().includes(text)
    );

    setShowProducts(result);
  }

  function handleSort(e) {
  const value = e.target.value;
  let data = [...products];

  if (value === "default") {
    setShowProducts(products);
  }

  if (value === "title") {
    data.sort((a, b) => a.title.localeCompare(b.title));
    setShowProducts(data);
  }

  if (value === "priceLow") {
    data.sort((a, b) => a.price - b.price);
    setShowProducts(data);
  }

  if (value === "priceHigh") {
    data.sort((a, b) => b.price - a.price);
    setShowProducts(data);
  }
}


  if (products.length === 0) {
    return <Loading />;
  }

  return (
    <div className="bg-gray-100 py-10">
      <div className="bg-white shadow-md mx-auto p-10 flex flex-col gap-6 w-[80vw]">

        <div className="flex sm:justify-between flex-col sm:flex-row gap-6 w-full">
          <Search search={handleSearch} />
          <Sorting SortData={handleSort} />
        </div>

        <div className="flex flex-wrap justify-between">
          {showProducts.map((product) => (
            <Product key={product.id} {...product} />
          ))}
        </div>

        <Button />
      
      </div>
    </div>
  );
}

export default Main;
