// /pages/index.js

export default function Home() {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0">
        <img
          src="/coffeeshop.jpg"
          alt="Coffee Shop"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full bg-black bg-opacity-50 text-white text-center">
        <h1 className="text-5xl font-bold text-sunset">Inkspresso</h1>
        <p className="mt-4 text-lg text-sunset">Fuel your imagination</p>
        <button
          onClick={() => (window.location.href = "/menu")}
          className="mt-6 px-6 py-2 bg-burntOrange text-white rounded-full hover:bg-burntOrange/80"
        >
          Order Now
        </button>
      </div>
    </div>
  );
}
