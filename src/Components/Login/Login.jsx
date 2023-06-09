import Joi from "joi";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    const schema = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      password: Joi.string().required(),
    });
    const input = {
      email: email,
      password: password,
    };
    const validated = schema.validate(input, { abortEarly: false });
    if (validated.error) console.log(validated.error);
  };

  return (
    <>
      <h3>Login</h3>
      <form>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div>
          <input type="button" value="Login" onClick={handleSubmit} />
        </div>
      </form>
    </>
  );
};

export default Login;
