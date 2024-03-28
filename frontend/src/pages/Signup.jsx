import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import G from "../img/G.svg"
import { baseUrl } from "../components/config";

function Signup() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (event) => {
    event.preventDefault();

    const response = await fetch(`${baseUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.user) {
      let a = localStorage.setItem("token", data.user);
      console.log("somedate", a);
      alert("Login Successful");
      window.location.href = "/signin";
    } else {
      alert("Error : Incorrect Email and Password ");
    }
  };

  const navigate = useNavigate();

  function signinpage() {
    navigate("/");
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
         onSubmit={registerUser}
          className="mt-8 space-y-5"
        >
          <div>
            <label className="font-medium">Email</label>
            <input
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             type="email"
             required
             autoComplete="email"
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              autoComplete="password"
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <button
            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
            type="submit"
          >
            Create account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
