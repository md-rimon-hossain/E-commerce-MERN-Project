import PageTitle from "../components/PageTitle";
import Card from "../components/Card";
import  "./Home.css";


function Home() {
  return (
    <>
      <PageTitle title={"Home"} />
      <div className="py-2">
        <h2 className="text-2xl text-[#595B59]">Categories</h2>
        <div className="grid px-4 gap-5  xm-grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-2">
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
