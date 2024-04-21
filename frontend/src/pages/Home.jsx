import PageTitle from "../components/PageTitle";
import Card from "../components/Card";
import  "./Home.css";
import { ProductCard } from "../components/ProductsCard/ProductCard";
import { CategoryCard } from "../components/CategoryCard/CategoryCard";
import Carousel from "../components/Carousel/Carousel";


function Home() {
  return (
    <>
      <PageTitle title={"Home"} />
      <div className="py-2">
        <Carousel />

        <h2 className="text-2xl text-[#595B59]">SHOES</h2>
        <div className="grid gap-5  xm-grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-2">
          <ProductCard />
        </div>
      </div>
    </>
  );
}

export default Home;
