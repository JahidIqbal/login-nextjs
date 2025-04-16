"use client";

import React from "react";
import { FaGithub, FaLaptopCode, FaLinkedin } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import styles from "./App.module.css";
import Image from "next/image";


const Footer = () => {
    return (
      <div className="flex justify-center items-center bg-[#e5d5ed] h-[60px] w-full">
        <span className="text-primary-text font-bold text-sm flex items-center gap-2">
          Developed By
          <Image 
            src="/logo.png" 
            alt="Polygon Logo" 
            width={50} 
            height={60} 
            className="mx-1"
          />
          Polygon Technology
        </span>
      </div>
    );
  };
  export default Footer;