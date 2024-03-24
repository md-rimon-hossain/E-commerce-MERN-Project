import { Link, useNavigate, useParams } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import Error from "./Error";
import { useEffect, useState } from "react";
import { apiService } from "../api/apiService";

function UserActivate() {
  const { token } = useParams();
  const [errorMgs, setErrorMgs] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setErrorMgs("");
        const response = await apiService.post("/api/users/activate", {
          token,
        });

        console.log(response);
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      } catch (error) {
        console.log(error.response.data);

        if (error.response.data.statusCode === 401) {
          setErrorMgs(error.response.data.message);
          setTimeout(() => {
            navigate("/register");
          }, 5000);
        }

        if (error.response.data.statusCode === 409) {
          setErrorMgs(error.response.data.message);
        }
      }
    })();
  }, []);

  if (token) {
    return (
      <>
        <PageTitle title={"Register-activate"} />
        <div className="flex min-h-[90vh] items-center justify-center px-2 md:px-0">
          <div>
            <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
              {errorMgs == "" ? "Registration successful" : errorMgs}
            </h1>
            
            {errorMgs == "" ? (
              <div className="mt-6 flex items-center space-x-3">
                <Link to="/login">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <line x1="19" y1="12" x2="5" y2="12"></line>
                      <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    Login
                  </button>
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </>
    );
  } else {
    return <Error />;
  }
}

export default UserActivate;
