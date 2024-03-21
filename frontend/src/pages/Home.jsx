/* eslint-disable no-unused-vars */
import React from "react";
import PageTitle from "../components/PageTitle";
import LogoutBtn from "../components/LogoutBtn";
import Card from "../components/Card";



function Home() {
  return (
    <>
      <PageTitle title={"Home"} />
      <div className="py-5">
        <h2 className="text-2xl text-[#595B59]">Categories</h2>
        <div className="grid grid-cols-4 py-2">
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
        </div>
      </div>

    </>
  );
}

export default Home;
