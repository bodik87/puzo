import React, { useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { LAST, LAST_INFO, LAST_PRODUCT_NOTHING } from "../assets/CONSTANTS";
import { ClockIcon } from "@heroicons/react/24/solid";
import AddMeal from "./Popups/AddMeal";

export default function LastProducts({ lastProducts }) {
  const [openedAddMeal, setOpenedAddMeal] = useState(false);
  const [productToMeal, setProductToMeal] = useState("");

  const handleAdd = (product) => {
    setProductToMeal(product);
    setOpenedAddMeal(true);
  };

  console.log();

  return (
    <>
      <AddMeal
        openedAddMeal={openedAddMeal}
        setOpenedAddMeal={setOpenedAddMeal}
        productToMeal={productToMeal}
      />
      <div className="fixed top-3 right-3 w-fit z-40">
        <Popover className="relative flex flex-col items-end">
          <Popover.Button className="p-2 rounded-full bg-gray-400 focus:outline-none">
            <ClockIcon className="h-8 w-8 text-white" />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="mt-3 max-w-xs">
              <div className="overflow-hidden rounded-2xl shadow-lg">
                <div className="flex flex-col gap-1 bg-white py-2 px-2">
                  {lastProducts.length > 0 ? (
                    lastProducts.map((product) => (
                      <>
                        <div
                          key={product.id}
                          onClick={() => handleAdd(product)}
                          className="flex justify-between rounded-2xl text-gray-900 hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                        >
                          <span className="py-4 text-lg px-4 mx-2 rounded-2xl">
                            {product.title}
                          </span>
                          <span className="py-4 text-lg px-4 mx-2 rounded-2xl">
                            {product.calories}
                          </span>
                        </div>
                      </>
                    ))
                  ) : (
                    <div className="flex justify-between rounded-2xl text-gray-900 hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
                      <span className="py-4 text-lg px-4 mx-2 rounded-2xl">
                        {LAST_PRODUCT_NOTHING}
                      </span>
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 px-6 py-4 select-none">
                  <span className="flex items-center">
                    <span className="text-sm font-medium text-gray-900">
                      {LAST}
                    </span>
                  </span>
                  <span className="block text-sm text-gray-500">
                    {LAST_INFO}
                  </span>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>
    </>
  );
}
