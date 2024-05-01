/* eslint-disable react/prop-types */
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { fetchProductsDataAsync } from "../../store/productsSlice";

export default function Pagination({ pagination }) {
  const { totalProducts, totalPages, previousPage, currentPage, nextPage } =
    pagination;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  console.log(pages);

  const dispatch = useDispatch()

  const onPageClickHandler = (pageNumber) => {
    console.log(pageNumber);
    dispatch(
      fetchProductsDataAsync({
        search: "",
        page: pageNumber,
        limit: 1,
      })
    );
  }

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => onPageClickHandler(previousPage)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          onClick={() => onPageClickHandler(nextPage)}
          disabled={currentPage === totalPages}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1 </span>
            {/* to{" "}
                      <span className="font-medium">10</span> */}
            of{"  "}
            <span className="font-medium">{totalProducts}</span> results
          </p>
        </div>
        <div>
          <div
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={() => onPageClickHandler(previousPage)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>

              <ArrowLeft />
            </button>
            {pages.map((page) => {
              return (
                <button
                  key={page}
                  aria-current="page"
                  className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold ${
                    currentPage === page
                      ? "bg-[#df6172] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                  }`}
                  onClick={() => onPageClickHandler(page)}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => onPageClickHandler(nextPage)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
