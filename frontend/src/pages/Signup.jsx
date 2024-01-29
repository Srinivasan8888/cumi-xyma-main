import React from "react";
import { useNavigate } from "react-router-dom";
import G from "../img/G.svg"

function Signup() {
  const navigate = useNavigate();

  function signinpage() {
    navigate("/signin");
  }

  function gotodashboard() {
    navigate("/dashboard");
  }

  const containerStyle = {
    backgroundColor: "#808080",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="bg-container min-h-screen flex items-center justify-center" style={containerStyle}>
      <div className="max-w-sm w-full text-gray-600 bg-white bg-opacity-90 rounded-lg p-6">
        <div className="text-center">
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Sign up</h3>
            <br></br>
            <p className="mt-1">
              Already have an account?{" "}
              <button className="font-medium text-indigo-600 hover:text-indigo-500" onClick={signinpage}>Sign-In</button>
        </p>
          </div>
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-8 space-y-5"
        >
          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Password</label>
            <input
              type="password"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <button
            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
            onClick={gotodashboard}
          >
            Create account
          </button>
        </form>
        <button className="w-full flex items-center justify-center gap-x-3 py-2.5 mt-5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100">
            <img src={G} alt="Google Icon" className="w-5 h-5 justify-end" />
            Continue with Google
        </button>
      </div>
    </div>
  );
}

export default Signup;
