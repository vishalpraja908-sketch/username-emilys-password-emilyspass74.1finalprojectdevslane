import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className=" mt-10 flex flex-col justify-center items-center ">
        <Link to="/">
        <button className="self-center   py-1 px-4 rounded-md bg-black text-white outline">
          Go Home
        </button>
      </Link>
   <img src="https://sitechecker.pro/wp-content/uploads/2023/06/404-status-code.png" alt="error"/>
  
    </div>
  
  );
};

export default NotFound;