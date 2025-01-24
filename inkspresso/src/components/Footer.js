// /components/Footer.js

export default function Footer() {
  return (
    <footer className="p-4 text-center bg-cornsilk dark:bg-drabDarkBrown dark:text-white">
      <p>&copy; {new Date().getFullYear()} Inkspresso. All rights reserved.</p>
    </footer>
  );
}
