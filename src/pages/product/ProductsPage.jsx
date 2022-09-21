import React, { useEffect, useState } from "react";
import MetaData from "../../components/layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../features/product/productSlice";
import ProductCard from "../../components/product/ProductCard";
import { Pagination } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import FilterListIcon from "@mui/icons-material/FilterList";
import { capitaliseFirstLetter } from "../../utils/capitaliseFirstLetter";
import { STATUSES } from "../../utils/STATUSES";
import Filters from "../../components/product/Filters";
import Loader from "../../assets/loader.svg";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, resultPerPage, filteredProductsCount, status } =
    useSelector((state) => state.product);
  const { search } = useParams();

  const [price, setPrice] = useState([0, 2500]);
  const [ratings, setRatings] = useState(0);
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [toggleFilter, setToggleFilter] = useState(false);

  useEffect(() => {
    dispatch(fetchAllProducts(search, currentPage, price, category, ratings));
  }, [dispatch, search, currentPage, price, category, ratings]);

  return (
    <div className="min-h-[80vh] w-full">
      <MetaData title="Explore Products" />
      <div className="container mx-auto flex relative min-h-[80vh]">
        <Filters
          toggleFilter={toggleFilter}
          setToggleFilter={setToggleFilter}
          setPrice={setPrice}
          setRatings={setRatings}
          setCategory={setCategory}
          ratings={ratings}
          price={price}
        />

        {category && (
          <div className="w-full h-10 flex items-center justify-center cursor-pointer absolute">
            <h2 className="flex items-center space-x-2 py-1 px-2 mt-2 text-2xl md:text-3xl text-slate-600">
              {capitaliseFirstLetter(category)}
            </h2>
          </div>
        )}
        <button className="w-full h-10 flex lg:hidden items-center justify-end cursor-pointer absolute">
          <h2
            onClick={() => setToggleFilter((prev) => !prev)}
            className="flex items-center space-x-2 py-1 px-2 mt-3 border-2 rounded-sm bg-blue-50 border-blue-300 active:bg-blue-200"
          >
            <span className="text-lg font-medium text-slate-600">Filters</span>
            <FilterListIcon />
          </h2>
        </button>
        {status === STATUSES.IDLE ? (
          filteredProductsCount === 0 ? (
            <div className="flex flex-col justify-center items-center w-full space-y-5">
              <h2 className="text-xl md:text-4xl font-medium">
                No Products Found
              </h2>
              <h3 className="text-md md:text-lg text-slate-500">
                This place seems to be lonely!
              </h3>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="py-1 px-6 rounded-sm w-52 text-xl text-blue-600 border border-blue-500 hover:bg-blue-200 active:bg-blue-400 active:text-white cursor-pointer"
              >
                Go To Products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 px-2 lg:px-8 my-14 sm:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-10 md:gap-12 xl:gap-14">
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          )
        ) : (
          <div className="flex items-center justify-center w-full">
            <img src={Loader} alt="Loading..." className="w-24 h-24" />
          </div>
        )}
      </div>
      <div className="w-full flex justify-center items-center my-7">
        {filteredProductsCount > resultPerPage && (
          <Pagination
            variant="outlined"
            shape="rounded"
            size="large"
            defaultPage={1}
            count={Math.ceil(filteredProductsCount / resultPerPage)}
            showFirstButton
            showLastButton
            onChange={(e, pageValue) => setCurrentPage(pageValue)}
          />
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
