import React from "react";
import { Slider } from "@mui/material";
import { capitaliseFirstLetter } from "../../utils/capitaliseFirstLetter";

const categories = ["electronics", "books", "fashion"];

const Filters = ({
  toggleFilter,
  setToggleFilter,
  setPrice,
  setRatings,
  setCategory,
  ratings,
  price,
}) => {
  return (
    <div
      className={`${
        toggleFilter ? "block absolute h-full" : "hidden"
      } lg:block w-[16rem] py-5 px-8 m-4 z-10 bg-white border border-slate-300 space-y-3`}
    >
      <h2 className="text-2xl font-bold font-primary text-slate-600">
        Filters
      </h2>
      <hr />
      <div>
        <h3 className="text-xl font-medium text-slate-600 my-1">Price</h3>
        <Slider
          size="small"
          sx={{ width: "11rem" }}
          getAriaLabel={() => "Price Filter Slider"}
          value={price}
          onChange={(event, newValue) => setPrice(newValue)}
          valueLabelDisplay="auto"
          disableSwap
          step={500}
          marks
          min={0}
          max={5000}
        />
        <hr />
        <h3 className="text-xl font-medium text-slate-600 my-2">Categories</h3>
        <ul className="mb-3">
          {categories.map((category) => (
            <li
              key={category}
              className="cursor-pointer text-base mb-1 text-slate-800"
              onClick={() => setCategory(category)}
            >
              {capitaliseFirstLetter(category)}
            </li>
          ))}
          <button onClick={() => setCategory("")}>See All</button>
        </ul>
        <hr />

        <h3 className="text-xl font-medium text-slate-600 my-1">Ratings</h3>
        <Slider
          size="small"
          sx={{ width: "11rem" }}
          aria-labelledby="continuous-slider"
          value={ratings}
          onChange={(e, newRating) => setRatings(newRating)}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={0}
          max={5}
        />
        <hr />
      </div>
      <div
        className="min-h-full"
        onClick={() => toggleFilter && setToggleFilter(false)}
      />
    </div>
  );
};

export default Filters;
