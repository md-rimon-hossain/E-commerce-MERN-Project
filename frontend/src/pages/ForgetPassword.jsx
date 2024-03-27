import { useEffect, useRef, useState } from "react";
import PageTitle from "../components/PageTitle";
import { apiService } from "../api/apiService";
import { Link } from "react-router-dom";
import { CheckCircle, X } from "lucide-react";

const EMAIL_REGEX = /^[a-zA-Z-0-9._-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,4}$/;

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const [allErrAndSuccessMsg, setAllErrAndSuccessMsg] = useState("");

  const userEmailRef = useRef(true);
  const [validEmail, setValidEmail] = useState(false);

  useEffect(() => {
    userEmailRef.current.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);


  const handleForgetPassword = async (e) => {
    e.preventDefault();

    const validUserEmail = EMAIL_REGEX.test(email);

    if (!validUserEmail) {
      setAllErrAndSuccessMsg(
        "Invalid Email. Please provide your valid email"
      );
      return;
    }
    try {
      setIsLoading(true);
      const response = await apiService.post("/api/users/forget-password", {
        email,
      });

      setEmail("");
      setAllErrAndSuccessMsg(response.data.message);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      if (!error?.response) {
        setIsLoading(false);
        setAllErrAndSuccessMsg("NO Server Response");
      } else {
        setAllErrAndSuccessMsg(
          "Email is incorrect or you have not verified your email address. please register first"
        );
      console.error("Forget Password error:", error); 
      }

    }
  };

  return (
    <>
      <PageTitle title={"Forget Password"} />
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-3xl text-center text-black">Hi </h2>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Forget Password
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
                 ${
                   allErrAndSuccessMsg.includes("incorrect")
                     ? "text-[#FF1515]"
                     : "text-green-500"
                 }
                mr-2 text-center  flex-auto`}
              >
                {allErrAndSuccessMsg}
              </span>
            </div>
          </div>
        )}

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleForgetPassword}>
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
                  className="block w-full bg-white outline-none rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
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
                  "Send Email"
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
  );
}

export default ForgetPassword;
