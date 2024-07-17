import React from "react";
import { Link } from "react-router-dom";

const Button = ({ children, active, linkto }) => {
  return (
    <Link to={linkto}>
      <div className={`flex text-center text-[13px] px-6 py-3 rounded-md font-bold ${active ? "bg-yellow-500 text-black": "bg-black text-white"} hover:scale-95 transition-all`}>
        {children}
      </div>
    </Link>
  );
};

export default Button;
