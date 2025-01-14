import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/userSlice";
import Footer from "../components/Footer";
import { TailSpin } from "react-loader-spinner";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignIn() {

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const { error, isLoading } = useSelector((state) => state.user)
  const [rememberMe, setRememberMe] = useState(false);

  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    const newBorderColor = { email: "border-gray-300", password: "border-gray-300" };
    let isValid = true;
    if (!email.trim()) {
      newErrors.email = "Email is required";
      newBorderColor.email = "border-red-500";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
      newBorderColor.email = "border-red-500";
      isValid = false;
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
      newBorderColor.password = "border-red-500";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = () => {
    if (!validateForm()) {
      return;
    }
    if (rememberMe) {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
    } else {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }
    const userData = { user: { email, password } };
    dispatch(loginUser(userData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [error]);

  return (
    <div className="relative h-screen bg-[#093545]">
      <ToastContainer />
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <TailSpin height={80} width={80} color="#2BD17E" />
        </div>
      )}
      <div className="flex justify-center items-center h-full">
        <div className="w-full max-w-md p-8 bg-transparent rounded-md">
          <h2 className="text-2xl font-bold mb-6 text-white text-center">Sign In</h2>
          <form>
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
