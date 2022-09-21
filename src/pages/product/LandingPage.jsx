import React, { useEffect } from "react";
import ProductCard from "../../components/product/ProductCard";
// import { product } from "../assets/demoproduct";
import SaleCarousel from "../../components/layout/SaleCarousel";
import MetaData from "../../components/layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../features/product/productSlice";
import { STATUSES } from "../../utils/STATUSES";
import Loader from "../../assets/loader.svg";

const LandingPage = () => {
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <div className="w-full">
      <MetaData title="cash N carry | The ONE N ONLY place to spend your Earnings..." />
      <SaleCarousel />
      <h2 className="mt-4 lg:mt-14 xl:py-5 text-2xl lg:text-4xl font-medium lg:font-semibold font-primary text-center">
        Featured Products
      </h2>
      {status === STATUSES.LOADING ? (
        <div className="flex items-center justify-center w-full min-h-[60vh]">
          <img src={Loader} alt="Loading..." className="w-24 h-24" />
        </div>
      ) : (
        <div className="container mx-auto px-2 xl:px-16 my-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 xl:gap-20">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LandingPage;
