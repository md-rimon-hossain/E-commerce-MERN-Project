function Card() {
  return (
    <>
      <div className="rounded-md hover:cursor-pointer hover:shadow-xl bg-[#DBEAFE] p-3 border">
        <img
          src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60"
          alt="Laptop"
          className={`h-[200px] duration-500 w-full rounded-md object-contain `}
        />
        <div className="">
          <h1 className="text-lg font-bold text-gray-800">About Macbook</h1>
          <p className="mt-3 text-sm text-gray-600"></p>
          <button
            type="button"
            className="mt-4 rounded-sm bg-black px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            more
          </button>
        </div>
      </div>
    </>
  );
}

export default Card;


