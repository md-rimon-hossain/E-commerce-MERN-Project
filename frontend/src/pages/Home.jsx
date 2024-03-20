/* eslint-disable no-unused-vars */
import React from "react";
import PageTitle from "../components/PageTitle";
import LogoutBtn from "../components/LogoutBtn";



function Home() {
  return (
    <>
      <PageTitle title={"Home"} />
      <LogoutBtn/>
      <div className="py-5">
        <h2 className="text-2xl text-[#595B59]">Categories</h2>
        <div className="grid grid-cols-8 py-2">
          <h1 className="text-2xl bg-[#fff] border p-1 border-r-[#e2e2e2]">
            category
          </h1>
          <h1 className="text-2xl bg-[#fff] border p-1 border-r-[#e2e2e2]">
            category
          </h1>
          <h1 className="text-2xl bg-[#fff] border p-1 border-r-[#e2e2e2]">
            category
          </h1>
          <h1 className="text-2xl bg-[#fff] border p-1 border-r-[#e2e2e2]">
            category
          </h1>
          <h1 className="text-2xl bg-[#fff] border p-1 border-r-[#e2e2e2]">
            category
          </h1>
          <h1 className="text-2xl bg-[#fff] border p-1 border-r-[#e2e2e2]">
            category
          </h1>
          <h1 className="text-2xl bg-[#fff] border p-1 border-r-[#e2e2e2]">
            category
          </h1>
          <h1 className="text-2xl bg-[#fff] border p-1 border-r-[#e2e2e2]">
            categorie
          </h1>
          <h1 className="text-2xl bg-[#fff] border p-1 border-r-[#e2e2e2]">
            categorie
          </h1>
        </div>
      </div>

    </>
  );
}

export default Home;
