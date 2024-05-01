
import  { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CheckCircle, Info, X } from "lucide-react";


import { login } from "../../store/authSlice";
import { apiService } from "../../api/apiService";
import { fetchCartData } from "../../store/cartSlice";

import { PageTitle } from "../../components";

const EMAIL_REGEX = /^[a-zA-Z-0-9._-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,4}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,24}$/;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setSetPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // from validation handle error for client
  const userEmailRef = useRef(true);
  const [allErrAndSuccessMsg, setAllErrAndSuccessMsg] = useState("");

  const [validEmail, setValidEmail] = useState(false);

  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  useEffect(() => {
    userEmailRef.current.focus();
  }, []);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPassword(result);
  }, [password]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const validUserPassword = PWD_REGEX.test(password);
    const validUserEmail = EMAIL_REGEX.test(email);

    if (!validUserPassword || !validUserEmail) {
      setAllErrAndSuccessMsg(
        "Invalid Entry. Please provide correct information Maybe your email or password is wrong"
      );
      return;
    }

    try {
      setIsLoading(true);

      const response = await apiService.post("/api/auth/login", {
        email,
        password,
      });

      setEmail("");
      setSetPassword("");
      setIsLoading(false);
      setAllErrAndSuccessMsg(response.data.message);

      if (!response.status == 200) {
        throw new Error("Login failed");
      }

      dispatch(login(response.data.payload));
      dispatch(fetchCartData(response.data.payload._id));
      navigate("/");
    } catch (error) {
      setIsLoading(false);

      if (!error?.response) {
        setIsLoading(false);
        setAllErrAndSuccessMsg("NO Server Response");
      } else if (error.response?.status == 401) {
        setAllErrAndSuccessMsg(error.response.data.message);
        setIsLoading(false);
        setTimeout(() => {
          setAllErrAndSuccessMsg("");
        }, 5000);
      } else {
        setAllErrAndSuccessMsg(error.response.data.message);
        console.log("log in error", error);
      }
    }
  };

  return (
    <>
      <PageTitle title={"Login"} />
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-3xl text-center  text-black">Hi </h2>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        {allErrAndSuccessMsg && (
          <div className="bg-[#DBEAFE] flex justify-center items-center duration-500 xsm-full sm:w-[35%] absolute shadow top-[25%] translate-x-[-50%] translate-y-[-50%] left-[50%] w-[30%] rounded-[20px]  mb-5 border  py-4 lg:px-4">
            <div
              className=" bg-white rounded-full items-center p-3 text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
              role="alert"
            >
              <span
                className={`font-semibold leading-6
                 text-[#FF1515]
                mr-2 text-center  flex-auto`}
              >
                {allErrAndSuccessMsg}
              </span>
            </div>
          </div>
        )}

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address*
                <span>
                  <CheckCircle
                    className={`h-6 w-6 text-green-600 ${
                      validEmail ? "inline-block" : "hidden"
                    }`}
                  />
                </span>
                <span>
                  <X
                    className={`h-6 w-6 cursor-pointer text-red-600 ${
                      validEmail || !email ? "hidden" : "inline-block"
                    }`}
                  />
                </span>
              </label>
              <div className="mt-2">
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setAllErrAndSuccessMsg("");
                  }}
                  ref={userEmailRef}
                  aria-invalid={validEmail ? "false" : "true"}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full  bg-white outline-none rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block  text-sm font-medium leading-6 text-gray-900"
                >
                  Password*
                  <span>
                    <CheckCircle
                      className={`h-6 w-6 text-green-600 ${
                        validPassword ? "inline-block" : "hidden"
                      }`}
                    />
                  </span>
                  <span>
                    <X
                      className={`h-6 w-6 cursor-pointer text-red-600 ${
                        validPassword || !password ? "hidden" : "inline-block"
                      }`}
                    />
                  </span>
                </label>
                <div className="text-sm">
                  <Link
                    to={"/forget-password"}
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  onChange={(e) => {
                    setSetPassword(e.target.value);
                    setAllErrAndSuccessMsg("");
                  }}
                  aria-invalid={validPassword ? "false" : "true"}
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full  bg-white outline-none rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div
                  className={`duration-1000 ${
                    passwordFocus && password && !validPassword
                      ? "block translate-x-0 "
                      : "hidden translate-x-0"
                  }`}
                >
                  <div className="rounded-md border-l-4 mt-1 border-black bg-gray-300 py-1 px-2">
                    <div className="flex items-center justify-between space-x-4">
                      <div>
                        <Info className="h-6 w-6 text-black" />
                      </div>
                      <div>
                        <p className="text-sm text-black font-medium">
                          6 to 24 characters.
                          <br />
                          Must include uppercase and lowercase letters, a number
                          and a special character.
                          <br />
                          Allowed special characters:{" "}
                          <span aria-label="exclamation mark">!</span>{" "}
                          <span aria-label="at symbol">@</span>{" "}
                          <span aria-label="hashtag">#</span>{" "}
                          <span aria-label="dollar sign">$</span>{" "}
                          <span aria-label="percent">%</span>
                        </p>
                      </div>
                      {/* <div>{""}</div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#F57224] px-3 py-1.5  font-semibold leading-6 text-white shadow-sm hover:bg-[#D0611E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLoading ? (
                  <span className="loading loading-dots loading-lg"></span>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Don&apos;t have Account &nbsp;
            <Link
              to="/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sing Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
