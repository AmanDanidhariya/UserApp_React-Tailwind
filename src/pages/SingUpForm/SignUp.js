import { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import countries from "../../country.json";
import Joi from "joi";

const schema = Joi.object({
  fullName: Joi.string().alphanum().min(3).max(15).required(),
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .messages({
      "string.pattern.base":
        "Password should be between 3 and 30 characters and contain only letters and numbers",
    }),
  confirmPassword: Joi.valid(Joi.ref("password")).required().messages({
    "any.required": "Confirm password is required",
    "any.only": "Confirm password must match password",
  }),
  dob: Joi.date().iso().less("now").max("now").required().messages({
    "date.format": "BirthDate must be in the format DD-MM-YYYY",
    "any.required": "BirthDate is required",
    "date.less": "BirthDate must be on or before today",
  }),
  gender: Joi.string().valid("male", "female"),
  country: Joi.string().required(),
  city: Joi.string().required(),
  postalCode: Joi.string().required(),
  phoneNumber: Joi.number().required(),
  agree: Joi.boolean().invalid(false).required(),
});
//removing double quote from error message
const options = {
  abortEarly: false,
  errors: {
    wrap: {
      label: false,
    },
  },
};

const SignUpForm = () => {
  const [userData, setUserData] = useState(null);
  const [countryData, setCountryData] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: joiResolver(schema, options),
  });
  // function to fetch countries
  const fetchCountry = () => {
    setCountryData(countries);
  };
  //using for update countryData
  useEffect(() => {
    fetchCountry();
  }, []);

  const onSubmit = (data) => {
    if (isValid) {
      setUserData(data);
    }
    console.log(userData);  
  };
  

  return (
    <>
      <Navbar />
      {/* form heading start*/}
      <div className="lg:text-3xl text-center my-4 text-white font-bold sm:text-2xl">
        Sign Up
      </div>
      {/* form heading end */}
      {/* form start */}
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          data-theme="garden"
          className=" flex flex-wrap shadow-white p-8 w-3/4 rounded-lg shadow-lg sm:flex-col lg:flex-row"
        >
          {/* full name field start */}
          <div className="lg:w-1/2 xs:w-full px-3 ">
            <label className="label label-text text-lg font-medium">
              FullName
            </label>
            <input
              {...register("fullName")}
              type="text"
              placeholder="Full Name"
              className="w-full input input-md input-bordered"
            />
            {errors.fullName && (
              <span className="text-red-700 block pt-3">
                {errors.fullName.message}
              </span>
            )}
          </div>
          {/* full name field end */}
          {/* email field start */}
          <div className="lg:w-1/2 xs:w-full px-3">
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
          <div className="lg:w-1/2 xs:w-full px-3">
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
          {/* Password field end */}
          {/* confirm password field start */}
          <div className="lg:w-1/2 xs:w-full px-3 ">
            <label className="label label-text text-lg font-medium">
              Confirm Password
            </label>
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="confirm password "
              className="w-full input input-md input-bordered"
            />
            {errors.confirmPassword && (
              <span className="text-red-700 block pt-3">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          {/* confirm Password field end */}

          {/* Date field start */}
          <div className="lg:w-1/2 xs:w-full px-3">
            <label className="label label-text text-lg font-medium">
              Date Of Birth
            </label>
            <input
              {...register("dob")}
              type="date"
              placeholder="DOB"
              className="w-full input input-md input-bordered"
            />
            {errors.dob && (
              <span className="text-red-700 block pt-3">
                {errors.dob.message}
              </span>
            )}
          </div>
          {/* Date field end */}

          {/* gender field start */}
          <div className="lg:mt-4 px-3 lg:w-1/2 xs:w-full py-2">
            <span className="text-lg font-medium ">Gender</span>
            <div className="lg:mt-2 sm:mt-0 ml-5 py-1">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="male"
                  className="form-radio"
                  name="gender"
                  {...register("gender")}
                />
                <span className="ml-2">Male</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  value="female"
                  className="form-radio"
                  name="gender"
                  {...register("gender")}
                />
                <span className="ml-2">Female</span>
              </label>
            </div>
            {errors.gender && (
              <span className="text-red-700 block pt-3">
                {errors.gender.message}
              </span>
            )}
          </div>
          {/* gender field end */}
          {/* country field start */}
          <div className="lg:w-1/2 xs:w-full px-3">
            <label className="label label-text text-lg font-medium">
              Country
            </label>
            <select
              {...register("country")}
              className="w-full input input-md input-bordered"
            >
              <option selected disabled={true}>
                Select Your Country
              </option>
              {countryData &&
                countryData.map((item, i) => (
                  <option key={i}>{item.country}</option>
                ))}
            </select>
            {errors.country && (
              <span className="text-red-700 block pt-3">
                {errors.country.message}
              </span>
            )}
          </div>
          {/* country field end */}
          {/* city field start */}
          <div className="lg:w-1/2 xs:w-full px-3">
            <label className="label label-text text-lg font-medium ">
              City
            </label>
            <input
              {...register("city")}
              type="text"
              placeholder="Enter Your City"
              className="w-full input input-md input-bordered"
            />
            {errors.city && (
              <span className="text-red-700 block pt-3">
                {errors.city.message}
              </span>
            )}
          </div>
          {/*city field end */}
          {/* postal code field start */}
          <div className="lg:w-1/2 xs:w-full px-3">
            <label className="label label-text text-lg font-medium ">
              postal code
            </label>
            <input
              {...register("postalCode")}
              type="tel"
              placeholder="560012"
              className=" w-full input input-md input-bordered"
            />
            {errors.postalCode && (
              <span className="text-red-700 block pt-3">
                {errors.postalCode.message}
              </span>
            )}
          </div>
          {/* postal code field end */}
          {/* phone number field start */}
          <div className="lg:w-1/2 xs:w-full  px-3">
            <label className="label label-text text-lg font-medium ">
              Phone Number
            </label>
            <input
              {...register("phoneNumber")}
              type="tel"
              placeholder="+91 012-345-6789"
              className=" w-full input input-md input-bordered"
            />
            {errors.phoneNumber && (
              <span className="text-red-700 block pt-3">
                {errors.phoneNumber.message}
              </span>
            )}
          </div>
          {/* phone number field end */}
          {/* terms & condition field start */}
          <div className=" lg:w-full px-3 mt-3 ">
            <label className="label cursor-pointer label-text text-md font-medium">
              I have read and agree to the terms and conditions
              <input
                {...register("agree")}
                type="checkbox"
                className="checkbox mx-3"
              />
            </label>
            {errors.agree && (
              <span className="text-red-700 block pt-3">
                {errors.agree.message}
              </span>
            )}
          </div>
          {/* terms & condition field start */}
          <button className="btn btn-active mx-auto mt-5">Submit</button>
        </form>
      </div>
      {/* form end */}
    </>
  );
};

export default SignUpForm;
