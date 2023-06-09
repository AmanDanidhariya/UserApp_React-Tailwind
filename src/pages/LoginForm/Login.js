import React, { useState, useCallback } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Joi from "joi";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import LoginServer from "../../LoginData.json";
import { useNavigate } from "react-router-dom";

const schema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .messages({
      "string.pattern.base":
        "Password should be between 3 and 30 characters and contain only letters and numbers",
    }),
},{});

//removing double quote from error message
const options = {
  abortEarly: false,
  errors: {
    wrap: {
      label: false,
    },
  },
};
const Login = () => {
  const Navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [LoginData, setLoginData] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema, options),
  });

  const onLogin = (data) => {
    setLoginData(data);
    const user = LoginServer.users.find(
      (userData) =>
        userData.email === LoginData.email &&
        userData.password === LoginData.password
    );

    if (user) {
      setLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      Navigate("/user");
    } else {
      setLoginError(
        "* User is not registered. Please register the user first."
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="lg:text-3xl text-center mt-14 text-white font-bold sm:text-2xl">
        Login
      </div>
      {/* form start */}
      <div className="flex justify-center mt-8  ">
        <form
          onSubmit={handleSubmit(onLogin)}
          data-theme="garden"
          className="w-[350px] flex  flex-col p-8 rounded shadow-lg shadow-white"
        >
          {/* email field start */}
          <div className="px-3 sm:w-full">
            <label className="label label-text text-lg font-medium">
              Email
            </label>
            <input
              {...register("email")}
              type="text"
              placeholder="user@gmail.com"
              className="w-full input input-md input-bordered"
            />
            {errors.email && (
              <span className="text-red-700 block pt-3">
                {errors.email.message}
              </span>
            )}
          </div>
          {/* email field end */}
          {/* Password field start */}
          <div className=" px-3 sm:w-full">
            <label className="label label-text text-lg font-medium">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder="password"
              className="w-full input input-md input-bordered"
            />
            {errors.password && (
              <span className="text-red-700 block pt-3">
                {errors.password.message}
              </span>
            )}
          </div>
          <button className="btn btn-active mx-auto mt-5 md:w-1/3  xs:w-full sm:w-full">
            Login
          </button>
          {/* Password field end */}
          <div className="text-red-700  block pt-3">{loginError}</div>
        </form>
      </div>
      {/* form end */}
    </>
  );
};

export default Login;
