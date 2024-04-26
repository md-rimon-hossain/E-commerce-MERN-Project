import PageTitle from "../components/PageTitle";
import { apiService } from "../api/apiService";
import  "./Home.css";
import { ProductCard } from "../components/ProductsCard/ProductCard";

import Carousel from "../components/Carousel/Carousel";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../store/productsSlice";


function Home() {

  const { allProducts } = useSelector((state) => state.products);
  console.log(allProducts);

  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      const res = await apiService.get("/api/products")
      dispatch(getAllProducts(res.data.payload.products))
    })()
  }, [dispatch])
  

  return (
    <>
      <PageTitle title={"Home"} />
      <div className="py-2">
        <Carousel />

        <h2 className="text-3xl font-bold text-[#595B59]">SHOES</h2>
        <div className="grid gap-5  xm-grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-2">
          {
            allProducts.map((product, _id) => { 
              return <ProductCard key={_id} product={ product} />
            })
          }
        </div>
      </div>
    </>
  );
}

export default Home;
