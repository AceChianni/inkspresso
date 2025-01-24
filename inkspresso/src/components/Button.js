// /components/Button.js

const Button = ({ label, handleClick }) => {
  return (
    <button
      onClick={() => (window.location.href = "/menu")}
      className="mt-6 px-6 py-2 bg-burntOrange text-white rounded-full hover:bg-burntOrange/80"
    >
      Order Now
    </button>
  );
};

export default Button;
