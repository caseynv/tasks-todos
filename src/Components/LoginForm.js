import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { fetchUsers } from './Features/slices/authSlice';
//import { getalltodo } from "./Features/slices/crudSlice";



function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [Error, setError] = useState('');

  const loading = useSelector((state) => state.auth.loading);

  const handlesubmit = (e) => {

    e.preventDefault();
    if (
      [user.email,
      user.password].includes("")
    ) {
      setError('Kindly fill all required field(s) before proceeeding')
    }
    else{
    dispatch(fetchUsers(user));
    navigate("/Todo");
    //dispatch(getalltodo());

  }
   };

  const handlechange = (e) => {
    const { name, value } = e.target;
    setUser({...user, [name]: value });
  };
  
  return (
    <>
      <div className="w-full h-screen items-center flex justify-center mt-4">
        {Error && (
          <div className="rounded py-4 mt-4 w-full px-4 bg-red-300 text-black font-semibold">
            {Error}
          </div>
        )}
        <div>
          <form className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block tracking-wide text-gray-700 text-xl font-bold mb-2"
                  htmlFor=""
                >
                  Email
                </label>
                <input
                  className="appearance-none block text-xl text-gray-700 w-full border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name="email"
                  type="text"
                  onChange={handlechange}
                  placeholder="Email Address"
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block tracking-wide text-gray-700 text-xl font-bold mb-2"
                  htmlFor=""
                >
                  Password
                </label>
                <input
                  className="appearance-none text-xl block w-full border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name="password"
                  type="Password"
                  onChange={handlechange}
                  placeholder="******************"
                />
              </div>
            </div>
          </form>
          <div className="rounded-full bg-red-500 w-full font-bold text-xl px-6 py-4 relative">
            <button
              className="w-full text-center"
              type="submit"
              onClick={handlesubmit}
            >
              {loading ? (
                <svg className="spinner" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="20"></circle>
                </svg>
              ) : (
                <p>Login</p>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;