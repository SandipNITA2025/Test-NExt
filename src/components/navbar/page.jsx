import React from "react";
import "./style.scss";
import Logo from "public/LOGO_PNG.png";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { LiaFlagUsaSolid } from "react-icons/lia";

const Navbar = () => {
  return (
    <div className="navbar-container container">
      <div className="left ">
        <Link href="/">
          <Image className="img" src={Logo} alt={"Logo Image"} />
        </Link>
      </div>
      <div className="mid ">
        <ul className="links">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/products"}>Products</Link>
          </li>
          <li>
            <Link href={"/contact"}>Contact</Link>
          </li>
          <li>
            <Link href={"/about"}>About Us</Link>
          </li>
        </ul>
      </div>
      <div className="right ">
        <div className="icon">
          <AiOutlineSearch className="react-icon" />
        </div>
        <div className="icon">
          <AiOutlineShoppingCart className="react-icon" />
        </div>
        <div className="icon">
          <BiUser className="react-icon" />
        </div>
        <div className="icon">
          <LiaFlagUsaSolid className="react-icon" /> USD
        </div>
      </div>
    </div>
  );
};

export default Navbar;





