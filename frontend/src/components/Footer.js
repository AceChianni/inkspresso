// /components/Footer.js

import Link from "next/link";
import styles from "../styles/bars.module.css";

const Footer = () => {
  return (
    <footer className={`${styles.bgFooter} py-8`}>
      <div className="max-w-6xl mx-auto border-t border-amber-700 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Column 1 - Brand & Description */}
          <div>
            <h3 className="text-xl font-semibold text-[#FEF7D5]">Inkspresso</h3>
            <p className="text-[#AF7B3A]-600 mt-2">
              Where books & coffee create magic. A cozy place to explore flavors & stories.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-[#FEF7D5]">Quick Links</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="/" className="text-[#AF7B3A] hover:text-orange-600">Home</Link>
              </li>
              <li>
                <Link href="/about" className="text-[#AF7B3A] hover:text-orange-600">About</Link>
              </li>
              <li>
                <Link href="/products" className="text-[#AF7B3A] hover:text-orange-600">Menu</Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#AF7B3A] hover:text-orange-600">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Legal & Socials */}
          <div>
            <h3 className="text-lg font-semibold text-[#FEF7D5]">Legal</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="/legal/terms" className="text-[#AF7B3A]-300 hover:text-orange-600">Terms of Service</Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="text-[#AF7B3A]-300 hover:text-orange-600">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/legal/faqs" className="text-[#AF7B3A]-300 hover:text-orange-600">FAQs</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright & Small Print */}
        <div className="mt-8 text-center text-amber-300 text-sm border-t border-amber-700 pt-4">
          &copy; {new Date().getFullYear()} Inkspresso. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
