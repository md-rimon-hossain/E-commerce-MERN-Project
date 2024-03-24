import { useState } from "react";
import PageTitle from "../components/PageTitle";
import { Link } from "react-router-dom";
import { apiService } from "../api/apiService";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setSetPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setUsername("");
      setEmail("");
      setSetPassword("");

      const response = await apiService.post("/api/users/process-register", {
        name: username,
        email,
        password,
      });

      setMsg(response.data.message);
      console.log(response.data);
    } catch (error) {
      if (error.response.data.statusCode == 409) {
        setMsg(error.response.data.message);
      }
      console.error("Register error:", error);
    }
  };

  return (
    <>
      <PageTitle title={"Register |"} />
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-3xl text-center">Welcome !</h2>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                User Name*
              </label>
              <div className="mt-2">
                <input
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setMsg("");
                  }}
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address*
              </label>
              <div className="mt-2">
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value), setMsg("");
                  }}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password*
                </label>
              </div>
              <div className="mt-2">
                <input
                  value={password}
                  onChange={(e) => {
                    setSetPassword(e.target.value);
                    setMsg("");
                  }}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              {msg && <p className="text-lime-800">{msg}</p>}
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#F57224] px-3 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#D0611E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register Now
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            have Account &nbsp;
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login Now
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
