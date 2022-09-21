import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products/${search}`);
    } else {
      navigate(`/products`);
    }
    setSearch("");
  };
  return (
    <form onSubmit={handleSearchSubmit}>
      <label className="relative hidden sm:flex items-center lg:w-96">
        <SearchIcon className="absolute left-2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="search by product, category or collection"
          className="px-10 py-3 focus:border focus:border-black bg-gray-200 focus:bg-white focus:ring-1 focus:ring-slate-500 text-slate-600 border-none text-sm rounded-sm w-full transition-all delay-100"
        />
      </label>
    </form>
  );
};

export default Search;
