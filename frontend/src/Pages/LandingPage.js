import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup");
  };
  return (
    <div className="grid gap sm:grid-cols-2 sm:gap-6 grid-rows-2 min-h-screen">
      <div className="flex flex-col sm:row-span-2 justify-center items-center h-screen sm:h-auto">
        <div className="flex flex-col flex-warp w-[70%]">
          <h1 className="text-4xl text-violet-600 mb-6">
            Create your own questionare
          </h1>
          <h2 className="text-xl text-white">
            Whether you're a teacher or a student, use our website to easily
            create interactive forms for your assignments. Simplify your
            workflow and gather responses effortlessly with our intuitive
            platform.
          </h2>
          <h1 className="text-3xl text-indigo-500 mt-10">Get Started Today!</h1>
          <h2 className="text-xl my-6 text-white">
            Sign up now to start creating <br />
            your own interactive forms.
          </h2>
          <button
            className="border border-white text-white mt-5 py-3 w-[150px] hover:bg-violet-600 hover:text-black hover:border-violet-600"
            onClick={handleSignup}
          >
            Signup
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center flex-grow row-span-2 h-screen sm:h-auto">
        <img
          src="/backgroung.jpg"
          alt="website visualization"
          className="h-[70%] mt-[130px] w-[80%]"
        />
      </div>
    </div>
  );
};

export default LandingPage;
