import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useSelector } from "react-redux";
import { HeartIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function SearchBox({ favoriteProducts }) {
  const products = useSelector((state) => state.products);
  const [selected, setSelected] = useState("");
  const [query, setQuery] = useState("");
  const [activeInput, setActiveInput] = useState(true);

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
    <div className="relative h-20">
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
            className="fixed inset-0 z-40 bg-black bg-opacity-30"
          />
        </Transition.Child>
      </Transition>
      <div className="px-2 pb-2 w-fit z-50">
        <Combobox value={selected} onChange={setSelected}>
          <div className="absolute top-0 z-50">
            <Combobox.Button
              onClick={() => setActiveInput(!activeInput)}
              className="absolute z-50 inset-y-0 left-0 flex items-center px-4"
            >
              <MagnifyingGlassIcon className="w-8 h-8 text-gray-500 cursor-pointer" />
            </Combobox.Button>

            <div
              className={`relative ${
                activeInput ? "w-full shadow-xl" : "w-16"
              } transition-all overflow-hidden rounded-full bg-white text-left border border-gray-300 focus:outline-none`}
            >
              <Combobox.Input
                className="w-full border-none focus:outline-none py-4 pl-14 pr-10 text-xl leading-5 text-gray-900 "
                displayValue={(product) => product.title}
                onChange={(event) => setQuery(event.target.value)}
              />
              {/* <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400 cursor-pointer"
              aria-hidden="true"
              />
            </Combobox.Button> */}
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
    <div className="absolute w-full top-0 overflow-hidden">
      <div className="flex flex-nowrap pb-6 md:pb-0 overflow-x-auto pl-20 sm:mb-0">
        <div className="mt-1 mr-2">
          <HeartIcon
            style={{ fill: "#EF4444" }}
            className="h-12 w-12 animate-scale"
          />
        </div>
        {array.map((product) => (
          <div
            key={product.id}
            className="whitespace-nowrap text-gray-900 bg-white border border-gray-300 font-medium rounded-full px-3 py-4 mr-1 mb-2 cursor-pointer select-none"
          >
            {product.title}
          </div>
        ))}
      </div>
    </div>
  );
}
