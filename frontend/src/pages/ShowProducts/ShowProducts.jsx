import { useSelector } from "react-redux";
import { PageTitle, Pagination, ProductCard } from "../../components"


function ShowProducts() {
  const { allProducts, pagination, loading } = useSelector(
    (state) => state.products
  );
  return (
    <>
      <PageTitle title={"Chose Products"} />
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
    </>
  );
}

export default ShowProducts