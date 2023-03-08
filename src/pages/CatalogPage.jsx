import React from "react";
import { useSelector } from "react-redux";
import { CAL, CARB, FAT, NAME, PROT } from "../assets/CONSTANTS";

export default function CatalogPage() {
  const products = useSelector((state) => state.products);
  return (
    <div>
      <div className="relative mt-4 overflow-y-auto shadow-md rounded-lg">
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
            {products.map((product) => (
              <tr
                key={product.id}
                className="bg-slate-50 border-b odd:bg-white cursor-pointer hover:bg-slate-100"
              >
                <th
                  scope="row"
                  className="py-4 px-2 font-medium text-gray-900 whitespace-nowrap"
                >
                  {product.title}
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
    </div>
  );
}
