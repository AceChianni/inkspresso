// /components/Footer.js

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#E8E3DA] border-t border-base-300 py-12 mt-20">
      <div className="max-w-6xl mx-auto px-6 grid gap-10 md:grid-cols-3 text-center md:text-left">

        {/* Brand */}
        <div className="flex flex-col items-center md:items-start">
  <Image
    src="/logo.png"
    alt="Inkspresso Logo"
    width={55}
    height={55}
    className="opacity-80 drop-shadow-md"
  />
  <h3 className="font-heading text-xl text-[#5A4632] mt-3">Inkspresso</h3>
  <p className="text-neutral/70 font-body mt-1">
    Where books & blends create magic.<br />Sip, read, unwind.
  </p>
</div>


        {/* Quick Links */}
        <div>
          <h3 className="font-heading text-lg text-[#5A4632] mb-2">Explore</h3>
          <ul className="space-y-1 font-body">
            <li><Link href="/" className="hover:text-primary">Home</Link></li>
            <li><Link href="/products" className="hover:text-primary">Menu</Link></li>
            <li><Link href="/library" className="hover:text-primary">Library</Link></li>
            <li><Link href="/library/checkout" className="hover:text-primary">Bookshelf</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-heading text-lg text-[#5A4632] mb-2">Legal</h3>
          <ul className="space-y-1 font-body">
            <li><Link href="/legal/terms" className="hover:text-primary">Terms</Link></li>
            <li><Link href="/legal/privacy" className="hover:text-primary">Privacy</Link></li>
            <li><Link href="/legal/faqs" className="hover:text-primary">FAQs</Link></li>
          </ul>
        </div>
      </div>

      <p className="text-center text-neutral/60 text-sm mt-10 font-body">
        © {new Date().getFullYear()} Inkspresso — All Rights Reserved.
      </p>
    </footer>
  );
}
