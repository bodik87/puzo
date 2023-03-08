import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CAL, CARB, FAT, NAME, PROT, SEARCH } from "../assets/CONSTANTS";
import EditProduct from "../components/Modals/EditProduct";
import {
  BackspaceIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function CatalogPage() {
  const products = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState("");
  const [editableProduct, seteEditableProduct] = useState(null);
  const [openedEditProduct, setOpenedEditProduct] = useState(false);
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
  }, [products]);

  return (
    <>
      <EditProduct
        product={editableProduct}
        openedEditProduct={openedEditProduct}
        setOpenedEditProduct={setOpenedEditProduct}
      />
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
        </div>
        {searchQuery && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer">
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
          className="input p-4 pl-10 mb-2"
        />
      </div>
      <div className="relative overflow-y-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-slate-300">
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
                className="bg-slate-50 border-b odd:bg-white cursor-pointer hover:bg-slate-100"
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
