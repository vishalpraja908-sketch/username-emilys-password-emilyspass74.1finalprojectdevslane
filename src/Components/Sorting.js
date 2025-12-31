const Sorting = ({ SortData }) => {
  return (
    <select
      onChange={SortData}
      className="border border-gray-400 px-4 py-2"
    >
      <option value="default">Default Sort</option>
      <option value="title">Sort by Title</option>
      <option value="priceLow">Price: Low to High</option>
      <option value="priceHigh">Price: High to Low</option>
    </select>
  );
};

export default Sorting;
