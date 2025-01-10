import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { TailSpin } from "react-loader-spinner";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });


  const { error, isLoading } = useSelector((state) => state.user)
  const [rememberMe, setRememberMe] = useState(false); // Remember Me state

  // Load stored data if "Remember Me" was checked
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    if (storedEmail) {
      setEmail(storedEmail);
      setPassword(storedPassword);
      setRememberMe(true);
    }
    const token = localStorage.getItem("token")
    if (token) {
      navigate("/movies")
    }
  }, []);

  // Validate form
  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    const newBorderColor = { email: "border-gray-300", password: "border-gray-300" };
    let isValid = true;

    // Validate email
    if (!email.trim()) {
      newErrors.email = "Email is required";
      newBorderColor.email = "border-red-500"; // Red border on error
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
      newBorderColor.email = "border-red-500"; // Red border on error
      isValid = false;
    }

    // Validate password
    if (!password.trim()) {
      newErrors.password = "Password is required";
      newBorderColor.password = "border-red-500"; // Red border on error
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  //^ Handle form submission (Login)
  const handleLogin = () => {
    if (!validateForm()) {
      return; // Stop if validation fails
    }
    // Store email and password if "Remember Me" is checked
    if (rememberMe) {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
    } else {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }
    // Dispatch setUser action to store user data in Redux
    const userData = { user: { email, password } };
    dispatch(loginUser(userData));
  };

  // Trigger the toaster when an error occurs
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-right", // Position of the toaster
        autoClose: 3000, // Time in milliseconds before the toast disappears
        hideProgressBar: true, // Hide the progress bar
        closeOnClick: true, // Allow closing on click
        pauseOnHover: true, // Pause on hover
        draggable: true, // Allow dragging the toast
        progress: undefined,
      });
    }
  }, [error]);

  return (
    <div className="relative h-screen bg-[#093545]">
      {/* ToastContainer at the top to render toast notifications */}
      <ToastContainer />

      {/* Loader Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <TailSpin height={80} width={80} color="#2BD17E" />
        </div>
      )}

      {/* Form Container */}
      <div className="flex justify-center items-center h-full">
        <div className="w-full max-w-md p-8 bg-transparent rounded-md">
          <h2 className="text-2xl font-bold mb-6 text-white text-center">Sign In</h2>
          <form>
            {/* Email Input */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full mb-4 p-2 border rounded bg-[#224957] text-white placeholder-white focus:outline-none focus:border-2 focus:border-[#224957] ${errors.email ? 'border-2 border-red-500' : 'border-transparent'
                }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mb-4">{errors.email}</p>
            )}

            {/* Password Input */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full mb-4 p-2 border rounded bg-[#224957] text-white placeholder-white focus:outline-none focus:border-2 focus:border-[#224957] ${errors.password ? 'border-2 border-red-500' : 'border-transparent'
                }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mb-4">{errors.password}</p>
            )}

            {/* Remember Me Checkbox */}
            <div className="flex items-center mb-4 justify-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="mr-2 text-white"
              />
              <label htmlFor="remember" className="text-white">Remember Me</label>
            </div>

            {/* Login Button */}
            <button
              type="button"
              onClick={handleLogin}
              className="w-full bg-[#2BD17E] text-white py-2 rounded"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
