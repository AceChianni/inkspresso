// /components/Footer.js

import styles from "../styles/navbar.module.css";

const Footer = () => {
  return (
    <footer className={`${styles.bgFooter} py-4`}>
      <div className="w-full text-center text-[#FEF7D5] px-4">
        <p>&copy; 2025 Inkspresso. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
