import React from "react";
import { useNavigate } from "react-router-dom";
// import bg from "../img/bg.jpg";
import G from "../img/G.svg";


function Login() {
  const navigate = useNavigate();

  function singuppage() {
    navigate("/signup");
  }

  function gotodashboard() {
    navigate("/dashboard");
  }

  const containerStyle = {
    // backgroundImage: `url(${bg})`,
    backgroundColor: "#808080",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="bg-container min-h-screen flex items-center justify-center" style={containerStyle}>
      <div className="max-w-sm w-full text-gray-600 bg-white bg-opacity-90 rounded-lg p-6">
        <div className="text-center">
          {/* <img src="https://floatui.com/logo.svg" width={150} className="mx-auto" /> */}
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Sign-in</h3>
            
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
            Log-in
          </button>
        </form>

        {/* <p className="flex justify-center mt-3">Don't have an account?&nbsp; {" "}<a href={Signup} className="font-medium text-indigo-600 hover:text-indigo-500">Sign Up</a>
        </p> */}

        <p className="flex justify-center mt-3">Don't have an account?&nbsp; {" "}<button className="font-medium text-indigo-600 hover:text-indigo-500" onClick={singuppage}>Sign up</button>
        </p>
        <button className="w-full flex items-center justify-center gap-x-3 py-2.5 mt-5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100">
            <img src={G} alt="Google Icon" className="w-5 h-5 justify-end" />
            Continue with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
