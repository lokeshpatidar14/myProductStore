import React from "react";
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";

const Footer = () => {
  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #edd8a7, #eeffdd14)",
        paddingTop: "10px",
        textAlign: "center",
        
        color: "#333",
      }}
    >
      <div className="social-links" style={{ marginBottom: "10px" }}>
        <a
          href="https://www.linkedin.com/in/lokesh-patidar-14cool/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ margin: "0 10px", color: "#0077b5" }}
        >
          <FaLinkedin size={24} />
        </a>
        <a
          href="https://github.com/lokeshpatidar14"
          target="_blank"
          rel="noopener noreferrer"
          style={{ margin: "0 10px", color: "#333" }}
        >
          <FaGithub size={24} />
        </a>
        <a
          href="https://x.com/LokeshMrCool"
          target="_blank"
          rel="noopener noreferrer"
          style={{ margin: "0 10px", color: "#1da1f2" }}
        >
          <FaTwitter size={24} />
        </a>
        <a
          href="https://www.instagram.com/civilian_lokesh_14/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ margin: "0 10px", color: "#c13584" }}
        >
          <FaInstagram size={24} />
        </a>
        <a
          href="mailto:lpatidar00@gmail.com"
          style={{ margin: "0 10px", color: "#ea4335" }}
        >
          <MdEmail size={24} />
        </a>
      </div>

      <div className="contact-info" style={{ marginBottom: "10px" }}>
        <p>
          <IoLocationSharp size={20} style={{ marginRight: "5px" }} />
          14 Block, Silicon City, Indore
        </p>
        <p>&copy; 2024 Product Store. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
