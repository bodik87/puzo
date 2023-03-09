import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useSelector } from "react-redux";
import { HeartIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function SearchBox({ favoriteProducts }) {
  const products = useSelector((state) => state.products);
  const [selected, setSelected] = useState("");
  const [query, setQuery] = useState("");
  const [activeInput, setActiveInput] = useState(false);

  const filteredPeople =
    query === ""
      ? products
      : products.filter((product) =>
          product.title
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="relative h-20 w-full mt-3">
      <Favorites array={favoriteProducts} />
      <Transition appear show={activeInput} as={Fragment}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            onClick={() => setActiveInput(false)}
            className="fixed inset-0 z-20 bg-black bg-opacity-30"
          />
        </Transition.Child>
      </Transition>
      <div className="pb-2">
        <Combobox value={selected} onChange={setSelected}>
          <div className="absolute left-2 top-0 z-30">
            <Combobox.Button
              onClick={() => setActiveInput(!activeInput)}
              className="absolute z-30 inset-y-0 left-0 flex items-center px-4"
            >
              <MagnifyingGlassIcon className="w-8 h-8 text-gray-500 cursor-pointer" />
            </Combobox.Button>

            <div
              className={`relative ${
                activeInput ? "w-full h-16" : "w-16 h-16"
              } transition-all overflow-hidden rounded-full bg-white text-left border border-gray-300 shadow-md focus:outline-none`}
            >
              <Combobox.Input
                className="w-full border-none focus:outline-none py-4 pl-14 pr-10 text-xl leading-5 text-gray-900 "
                displayValue={(product) => product.title}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-3xl bg-white py-2 text-base shadow-lg focus:outline-none sm:text-sm">
                {filteredPeople.length === 0 && query !== "" ? (
                  <div className="relative cursor-default select-none py-4 px-4 text-gray-700">
                    Нічого не знайдено
                  </div>
                ) : (
                  filteredPeople.map((product) => (
                    <Combobox.Option
                      key={product.id}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-4 text-lg px-4 mx-2 rounded-xl ${
                          active ? "bg-blue-600 text-white" : "text-gray-900"
                        }`
                      }
                      value={product}
                    >
                      {({ selected }) => (
                        <div className="flex justify-between">
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {product.title}
                          </span>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {product.calories}
                          </span>
                        </div>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
    </div>
  );
}

function Favorites({ array }) {
  return (
    <div className="absolute w-full top-1 overflow-hidden">
      <div className="flex flex-nowrap pb-6 md:pb-0 overflow-x-auto pl-20 sm:mb-0">
        {array.map((product) => (
          <div
            key={product.id}
            className="whitespace-nowrap text-gray-900 bg-white border border-gray-300 font-medium rounded-full px-4 py-4 mr-1 mb-2 cursor-pointer select-none"
          >
            {product.title}
          </div>
        ))}
      </div>
    </div>
  );
}
