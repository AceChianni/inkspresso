// /components/Footer.js
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-base-200 border-t border-base-300 py-10 mt-20">
      <div className="max-w-6xl mx-auto px-6 grid gap-10 md:grid-cols-3 text-center md:text-left">

        {/* Brand */}
        <div>
          <h3 className="font-heading text-xl text-neutral mb-2">Inkspresso</h3>
          <p className="text-neutral/70 font-body">
            Where books & coffee create magic. A cozy space to sip, read, and unwind.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-heading text-lg text-neutral mb-2">Explore</h3>
          <ul className="space-y-1 font-body">
            <li><Link href="/" className="hover:text-primary">Home</Link></li>
            <li><Link href="/products" className="hover:text-primary">Menu</Link></li>
            <li><Link href="/cart" className="hover:text-primary">Cart</Link></li>
            <li><Link href="/library/checkoutbooks" className="hover:text-primary">Books</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-heading text-lg text-neutral mb-2">Legal</h3>
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
