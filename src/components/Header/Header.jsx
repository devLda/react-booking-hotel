import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/img/logo.png";
import "../../styles/header.css";

const Header = () => {
  const [backColor, setBackColor] = useState("bg-transparent");

  const isLoggedIn = JSON.parse(localStorage.getItem("persist:app/user"));

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setBackColor("bg-white");
      } else {
        setBackColor("bg-transparent");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      id="header"
      className={`pt-7 fixed w-full z-20 ${backColor} ${
        backColor !== "bg-transparent" ? "shadow-lg" : "text-slate-100"
      } md:h-24`}
    >
      <div className="container mx-auto flex justify-between">
        <div className="logo">
          <Link to="/">
            <img className="w-40 h-16" src={logo} alt="Logo" />
          </Link>
        </div>

        <nav className="flex items-end space-x-1">
          <ul className="font-normal tracking-widest">
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/about">ABOUT</Link>
            </li>
            <li className="sub-nav">
              <Link to="/room">
                ROOM
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-4 inline-block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </Link>
              <ul>
                <li>
                  {" "}
                  <Link to="/"> Deluxe Room </Link>
                </li>
                <li>
                  {" "}
                  <Link to="/"> Premium Room </Link>
                </li>
                <li>
                  {" "}
                  <Link to="/"> Premium Deluxe Room </Link>
                </li>
              </ul>
            </li>
            <li className="sub-nav">
              <Link to="/services">
                SERVICES
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-4 inline-block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </Link>
              <ul>
                <li>
                  {" "}
                  <Link to="/"> SPA </Link>
                </li>
                <li>
                  {" "}
                  <Link to="/"> Restaurant </Link>
                </li>
                <li>
                  {" "}
                  <Link to="/"> Extra </Link>
                </li>
              </ul>
            </li>
            {/* <li>
              <Link to="/moment">MOMENT</Link>
            </li>
            <li>
              <Link to="/news">NEWS</Link>
            </li>
            <li>
              <Link to="/contact">CONTACT</Link>
            </li> */}
            {isLoggedIn.isLoggedIn !== "true" && (
              <li>
                <Link to="/login">LOGIN</Link>
              </li>
            )}

            {isLoggedIn.isLoggedIn === "true" && (
              <li>
                <Link to="/login">Logged in</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
