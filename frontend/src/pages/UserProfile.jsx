
import PageTitle from "../components/PageTitle";

function UserProfile() {
  return (
    <>
      <PageTitle title={"Error"} />
      <div className="flex min-h-[90vh] items-center justify-center px-2 md:px-0">
        <div>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
            User Profile page
          </h1>
          <p className="mt-4 text-gray-500">
            Coming soon..
          </p>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
