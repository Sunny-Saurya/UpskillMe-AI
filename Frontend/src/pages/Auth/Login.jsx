import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper'; // Assuming you have a helper function for email validation
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const {updateUser} = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Add your login logic here

    if(!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if(!password){
      setError("Password cannot be empty.");
      return;
    }
    if(password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setError(""); // Clear any previous errors


    // Login api call


 try {
  const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
    email: email.trim(),
    password: password.trim()
  });

  console.log("Login Response:", response.data); // ✅

  const { token } = response.data;

  if (token) {
    localStorage.setItem("token", token);
    updateUser(response.data);
    navigate("/dashboard");
  } else {
    setError("Login failed: Invalid response from server.");
  }

} catch (error) {
  console.error("Login error:", error); // ✅
  if (error.response?.data?.message) {
    setError(error.response.data.message);
  } else {
    setError("An unexpected error occurred. Please try again later.");
  }
}



  };

  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold  text-black">
        Welcome Back to UpSkillMe AI
      </h3>
      <p className="text-xs  text-slate-700 mt-[5px] mb-6">
        Please login to continue
      </p>

      <form onSubmit={handleLogin}>
        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="sunny@example.com"
          type="text"
        />

        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Min 8 Characters"
          type="password"
        />

        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
        <button className="btn-primary" type='submit'>LOGIN</button>
        <p className="text-[13px] text-slate-800 mt-3">
          Don't have an account?{" "}
          <button className="font-medium text-primary underline cursor-pointer" onClick={() =>{
            setCurrentPage("signup");
          }}>SignUp</button>

        </p>
      </form>
    </div>
  );
};

export default Login;
