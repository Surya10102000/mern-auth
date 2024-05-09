import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import { signInFailure, signInStart, signInSuccess } from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const {loading,error} = useSelector((state) => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart())  
      const response = await axios.post(
        "http://localhost:3000/api/auth/sign-in",
        formData
      );
      dispatch(signInSuccess(response))
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error))
      console.log(error.message)
    }

  };
  return (
    <>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
          <input
            type="text"
            placeholder="Email"
            id="email"
            className="bg-slate-100 p-3 rounded-lg"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="bg-slate-100 p-3 rounded-lg"
            onChange={handleChange}
          />
          <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            {loading ? <Loading/> : "Sign In"}
          </button>
        </form>
        <div className="flex gap-2 mt-5">
          <p>Don't have an account</p>
          <Link to="/sign-up">
            <span className="text-blue-500">Sign in</span>
          </Link>
        </div>
        <p className="text-red-700 mt-5">{error && "something went wrong!!"}</p>
      </div>
    </>
  );
};

export default SignIn;
