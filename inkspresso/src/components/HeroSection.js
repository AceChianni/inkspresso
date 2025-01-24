// // /components/HeroSection.js

// import { useRouter } from "next/router";

// const HeroSection = () => {
//   const router = useRouter();

//   const navigateToMenu = () => {
//     router.push("/menu");
//   };

//   return (
//     <section
//       className="relative flex items-center justify-center w-full min-h-screen bg-cover bg-center text-center"
//       style={{
//         backgroundImage: "url('/coffeeshop.jpg')",
//         backgroundSize: "cover",
//         backgroundPosition: "center center",
//       }}
//     >
//       <div className="absolute inset-0 bg-black-50"></div>
//       <div className="relative z-10 w-full px-4">
//         <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#FEF7D5]">
//           Fuel Your Imagination
//         </h1>
//         <p className="mt-4 text-lg md:text-xl lg:text-2xl text-[#FEF7D5]">
//           Where the coffee is always fresh and the books are always good.
//         </p>
//         <button
//           onClick={navigateToMenu}
//           className="order-now-btn mt-6 px-8 py-4 text-lg font-semibold"
//         >
//           Order Now
//         </button>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

import { useRouter } from "next/router";

const HeroSection = () => {
  const router = useRouter();

  const navigateToMenu = () => {
    router.push("/menu");
  };

  return (
    <section
      className="relative flex items-center justify-center w-full min-h-screen bg-cover bg-center text-center"
      style={{
        backgroundImage: "url('/coffeeshop.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="absolute inset-0 bg-black-50"></div>
      <div className="relative z-10 w-full px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-hero">
          Fuel Your Imagination
        </h1>
        <p className="mt-4 text-lg md:text-xl lg:text-2xl text-hero">
          Where the coffee is always fresh and the books are always good.
        </p>
        <button
          onClick={navigateToMenu}
          className="order-now-btn mt-6 px-8 py-4 text-lg font-semibold"
        >
          Order Now
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
