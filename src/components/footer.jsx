import React from "react";
import { Link } from "react-router-dom";

const footer = () => {
  return (
    <div className="mx-auto w-[95%] text-sm my-3 mt-5 mb-0">
        <div className="flex justify-around md:justify-between pb-8">
          <div>
            <p>© 2024 Maathru Inc.</p>
          </div>
          <div className="hidden md:flex md:gap-3">
            <Link to="/#">Home</Link>
            <p>|</p>
            <Link to="/#">Blog</Link>
            <p>|</p>
            <Link to="/#">Drugs</Link>
            <p>|</p>
            <Link to="/#">Clinics</Link>
            <p>|</p>
            <Link to="/#">Midwife</Link>
            <p>|</p>
            <Link to="/#">Analysis</Link>
            <p>|</p>
            <Link to="/#">Profile</Link>
          </div>
        </div>
    </div>
  );
};

export default footer;
