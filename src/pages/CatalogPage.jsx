import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  ALL,
  CAL,
  CARB,
  FAT,
  FAVORITES,
  NAME,
  PROT,
  SEARCH,
} from "../assets/CONSTANTS";
import EditProduct from "../components/Modals/EditProduct";
import {
  BackspaceIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

export default function CatalogPage() {
  const products = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState("");
  const [editableProduct, seteEditableProduct] = useState(null);
  const [openedEditProduct, setOpenedEditProduct] = useState(false);
  const [showedFilteredProduct, setShowedFilteredProduct] = useState(false);

  const favoriteProducts = products.filter((product) => product.isFavorite);

  const handleClick = (product) => {
    seteEditableProduct(product);
    setOpenedEditProduct(true);
  };
  const handleChange = (e) => {
    let lowerCase = e.target.value.toLowerCase().trim();
    const filteredData = products.filter((el) => {
      if (lowerCase === "") return products;
      else return el.title.trim().toLowerCase().includes(lowerCase);
    });
    setFilteredProducts(filteredData);
    setSearchQuery(lowerCase);
  };

  useEffect(() => {
    setFilteredProducts(products);
    setSearchQuery("");
  }, [products, editableProduct]);

  return (
    <>
      <EditProduct
        product={editableProduct}
        openedEditProduct={openedEditProduct}
        setOpenedEditProduct={setOpenedEditProduct}
      />
      <div className="relative mx-2">
        <div className="absolute top-5 left-0 flex items-center pl-3 pointer-events-none">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
        </div>
        {searchQuery && (
          <div className="absolute top-5 right-0 flex items-center pr-4 cursor-pointer">
            <BackspaceIcon
              onClick={() => {
                setFilteredProducts(products);
                setSearchQuery("");
              }}
              className="w-8 h-8 text-red-400"
            />
          </div>
        )}
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder={SEARCH}
          className="input border-2 rounded-xl p-4 pl-10 mb-2"
        />
        <button
          type="button"
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-3 flex flex-nowrap items-center gap-2 mb-2"
          onClick={() => {
            if (!showedFilteredProduct) {
              setFilteredProducts(favoriteProducts);
              setShowedFilteredProduct(true);
            } else {
              setFilteredProducts(products);
              setShowedFilteredProduct(false);
            }
          }}
        >
          <StarIcon style={{ fill: "#fcbe03" }} className="h-5 w-5" />
          {showedFilteredProduct ? ALL : FAVORITES}
        </button>
      </div>
      <div className="relative overflow-y-auto shadow-md rounded-lg mx-2">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-100 uppercase bg-slate-400">
            <tr>
              <th scope="col" className="w-1/2 sm:w-2/3 px-3 py-3">
                {NAME}
              </th>
              <th scope="col" className="text-center px-2 py-3">
                {PROT}
              </th>
              <th scope="col" className="text-center px-2 py-3">
                {FAT}
              </th>
              <th scope="col" className="text-center px-2 py-3">
                {CARB}
              </th>
              <th scope="col" className="text-center px-2 py-3">
                {CAL}
              </th>
            </tr>
          </thead>
          <tbody className="">
            {filteredProducts.map((product) => (
              <tr
                key={product.id}
                onClick={() => handleClick(product)}
                className={`bg-slate-50 border-b odd:bg-white ${
                  product.isFavorite && "bg-yellow-100"
                } cursor-pointer`}
              >
                <th
                  scope="row"
                  className="py-4 px-2 font-medium text-gray-900 whitespace-nowrap"
                >
                  {product.title.length < 28
                    ? product.title
                    : product.title.slice(0, 28)}
                </th>
                <td className="text-center py-4 md:px-2">{product.proteins}</td>
                <td className="text-center py-4 md:px-2">{product.fats}</td>
                <td className="text-center py-4 md:px-2">
                  {product.carbohydrates}
                </td>
                <td className="text-center py-4 md:px-2">{product.calories}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
