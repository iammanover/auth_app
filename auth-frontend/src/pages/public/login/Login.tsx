import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RouteConstant } from "../../../utils/enum/RouteConstant";
import "./Login.css";
import { IAuthForm } from "../../../utils/interface/loginForm.interface";
import { useAuthentication } from "../../../hooks/useAuthentication";
import { validateEmail, validatePassword } from "../../../utils/common/common";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthentication();
  const [user, setUser] = useState<IAuthForm>({
    _id: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  // Handle user input
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // setting input values to our state
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

    // Clearing error
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  // Handle form Login
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    let emailError = "";
    let passwordError = "";

    if (!user.email) {
      emailError = "Email is required";
    } else if (!validateEmail(user.email)) {
      emailError = "Invalid email address";
    }

    if (!user.password) {
      passwordError = "Password is required";
    } else if (!validatePassword(user.password)) {
      passwordError =
        "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      email: emailError,
      password: passwordError,
    }));
    
    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      if (data.success) {
        alert(data?.message);
        login(data?.data?.token);
      } else {
        alert(data?.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleRedirectToRegistration = () => {
    navigate(RouteConstant.REGISTRATION);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={user.email}
            onChange={handleInputChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group password-group">
          <label htmlFor="password">Password</label>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              value={user.password}
              onChange={handleInputChange}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <button type="submit" className="login-button button">
          Login
        </button>
        <button
          type="button"
          className="redirect-button"
          onClick={handleRedirectToRegistration}
        >
          Don't have an account? Register
        </button>
      </form>
    </div>
  );
};

export default Login;
