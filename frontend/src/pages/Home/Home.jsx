import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchProductsDataAsync } from "../../store/productsSlice";

import { PageTitle, ProductCard, Pagination, Carousel } from "../../components";

import "./Home.css";

function Home() {
  const { allProducts, pagination, loading } = useSelector(
    (state) => state.products
  )
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (!allProducts) {
        dispatch(
          fetchProductsDataAsync({
            search: "",
            page: 1,
            limit: 1,
          })
        );
      }
    })();
  }, [dispatch, allProducts]);

  return (
    <>
      <PageTitle title={"Home"} />
      <div className="py-2">
        <Carousel />
        <h2 className="text-3xl font-bold text-[#111827]">SHOES</h2>
        <div className="grid gap-1  xm-grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-2">
          {loading ? (
            <>
              <div className="flex flex-col gap-4 md:w-60 mb-3">
                <div className="skeleton h-40 w-full "></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
              <div className="flex flex-col gap-4 md:w-60 ">
                <div className="skeleton h-40 w-full "></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
              <div className="flex flex-col gap-4 md:w-60 ">
                <div className="skeleton h-40 w-full "></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
              <div className="flex flex-col gap-4 md:w-60 ">
                <div className="skeleton h-40 w-full "></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
            </>
          ) : (
            allProducts &&
            allProducts.map((product, _id) => {
              return <ProductCard key={_id} product={product} />;
            })
          )}
        </div>
        {pagination && pagination?.totalPages !== 1 ? (
          <Pagination pagination={pagination} />
        ) : null}
      </div>
    </>
  );
}

export default Home;
