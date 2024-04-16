import { useState } from "react";
// import Header from "./Header";
import BgImg from "./Sign.jpg";
import { useNavigate } from "react-router-dom";
// import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const navigate = useNavigate();

  const userRoute = () => {
    navigate("/traffic");
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <>
      {/* <Header /> */}
      <div className="absolute">
        <img className="h-lvh sm:h-[100%] object-cover" src={BgImg} alt="background" />
      </div>
      <form className="absolute z-10 rounded-lg text-white p-8 bg-black my-36 bg-opacity-50 w-3/4 md:w-3/12 mx-auto right-0 left-0">
        <h1 className="font-bold text-2xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm ? (
          <input
            type="text"
            placeholder="Full Name"
            className="bg-gray-200 p-4 my-4 w-full rounded-sm"
          />
        ) : (
          ""
        )}

        <input
          type="text"
          placeholder="Email Address"
          className="bg-gray-200 p-4 my-4 w-full rounded-sm"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 bg-gray-200 w-full my-4 rounded-sm"
        />
        <p className="text-red-600 animate-bounce font-bold text-lg py-2"></p>
        <button
          className="p-4 w-full my-4 rounded-lg bg-red-600"
          onClick={userRoute}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p
          className="py-4 cursor-pointer text-sm md:text-lg"
          onClick={toggleSignInForm}
        >
          {isSignInForm
            ? "New to App ? Sign Up Now."
            : "Already registered? Sign In Now."}
        </p>
      </form>
    </>
  );
};

export default Login;
