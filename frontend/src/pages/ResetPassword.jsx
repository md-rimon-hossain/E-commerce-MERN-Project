import { useEffect, useRef, useState } from "react";
import PageTitle from "../components/PageTitle";
import { apiService } from "../api/apiService";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CheckCircle, Info, X } from "lucide-react";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,24}$/;

function ResetPassword() {
  const { token } = useParams();
  const navigate= useNavigate();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resetSuccessFull, setResetSuccessFull] = useState(false);

  const userPasswordRef = useRef(true);
  const [allErrAndSuccessMsg, setAllErrAndSuccessMsg] = useState("");

  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/")
    }
    userPasswordRef.current.focus();
  }, []);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPassword(result);
  }, [password]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    const validUserPassword = PWD_REGEX.test(password);
    if (!validUserPassword) {
      setAllErrAndSuccessMsg(
        "Invalid Password. Please provide valid Password.Try Again Thanks "
      );
      return;
    }

    try {
      setIsLoading(true)
      const response = await apiService.put("/api/users/reset-password", {
        token,
        password,
      });
      setPassword("");
      if (response.data.success) {
      setResetSuccessFull(true)
        setIsLoading(false)
        return;
      }
      setAllErrAndSuccessMsg(response?.data.message);
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false);
      if (!error?.response) {
        setIsLoading(false);
        setAllErrAndSuccessMsg(
          "NO Server Response, Maybe you're taking the wrong approach"
        );
      } else  if (error.response.data.message == "jwt expired") {
        setAllErrAndSuccessMsg("Time to reset password is over");
        console.error("Reset Password error:", error);
      } else {
        setAllErrAndSuccessMsg(error.response.data.message);
      }
        console.error("Reset Password error:", error);
    }
  };

  useEffect(() => {
    if (resetSuccessFull) {
      document.getElementById("my_modal_3").showModal();
    }
  }, [resetSuccessFull])
  

  return (
    <>
      <PageTitle title={"Forget Password"} />

      {resetSuccessFull ? (
        <>
          <div className="flex min-h-[100vh] flex-col justify-center px-6 py-12 lg:px-8">
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_3" className="modal ">
              <div className="modal-box flex items-center justify-center flex-col text-black md:w-[400px] md:h-[300px] bg-[#fff]">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <h3 className="font-bold md:text-2xl ">Hello!</h3>
                <p className="py-4 md:text-xl text-green-500">
                  Password reset successfully Please login
                </p>

                <Link
                  to={"/login"}
                  className="rounded  font-semibold"
                >
                  <button className="btn btn-wide">Sign In</button>
                </Link>
              </div>
            </dialog>
          </div>
        </>
      ) : (
        <>
          <div className="flex min-h-[100vh] flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="text-3xl text-center text-black">Hi </h2>
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Reset Your Password
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
              <form className="space-y-6" onSubmit={handleResetPassword}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Your New Password*
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
                  <div className="mt-2">
                    <input
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setAllErrAndSuccessMsg("");
                      }}
                      ref={userPasswordRef}
                      aria-invalid={validPassword ? "false" : "true"}
                      onFocus={() => setPasswordFocus(true)}
                      onBlur={() => setPasswordFocus(false)}
                      id="password"
                      name="password"
                      type="password"
                      required
                      className="block w-full bg-white outline-none rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <div
                      className={`duration-500 ${
                        passwordFocus && password && !validPassword
                          ? "block"
                          : "hidden"
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
                              Must include uppercase and lowercase letters, a
                              number and a special character.
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
                    className="flex w-full justify-center rounded-md bg-[#F57224] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#D0611E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {isLoading ? (
                      <span className="loading loading-dots loading-lg"></span>
                    ) : (
                      "Reset Password"
                    )}
                  </button>
                </div>
              </form>
              <p className="mt-10 text-center text-sm text-gray-500">
                Remember the password &nbsp;
                <Link
                  to="/login"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ResetPassword;
