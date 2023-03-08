import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { HomeIcon } from "@heroicons/react/24/outline";
import {
  BODY_WEIGHT,
  CATALOG,
  CREATE_NEW_PRODUCT,
  MENU,
  RECIPES,
  TO_HOME,
} from "../assets/CONSTANTS";
import { Link, useLocation } from "react-router-dom";
import BodyWeight from "./Modals/BodyWeight";
import NewProduct from "./Modals/NewProduct";

export default function NavMenu() {
  const location = useLocation();
  const home = location.pathname === "/";
  const recipes = location.pathname === "/recipes";
  const catalog = location.pathname === "/catalog";

  const [openedBodyWeight, setOpenedBodyWeight] = useState(false);
  const [openedNewProduct, setOpenedNewProduct] = useState(false);

  return (
    <>
      <BodyWeight
        openedBodyWeight={openedBodyWeight}
        setOpenedBodyWeight={setOpenedBodyWeight}
      />

      <NewProduct
        openedNewProduct={openedNewProduct}
        setOpenedNewProduct={setOpenedNewProduct}
      />

      <div className="fixed top-4 right-4 text-right">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="btn bg-blue-700 hover:bg-blue-800">
              {MENU}
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 min-w-[150px] mt-2 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
              <div className="">
                {!home && (
                  <Link to="/">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? "bg-blue-700 text-white" : "text-gray-900"
                          } menuItem group `}
                        >
                          {TO_HOME}
                          <HomeIcon className="h-6 w-6 ml-5" />
                        </button>
                      )}
                    </Menu.Item>
                  </Link>
                )}
                {!recipes && (
                  <Link to="recipes">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? "bg-blue-700 text-white" : "text-gray-900"
                          } menuItem group `}
                        >
                          {RECIPES}
                        </button>
                      )}
                    </Menu.Item>
                  </Link>
                )}
                {!catalog && (
                  <Link to="catalog">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? "bg-blue-700 text-white" : "text-gray-900"
                          } menuItem`}
                        >
                          {CATALOG}
                        </button>
                      )}
                    </Menu.Item>
                  </Link>
                )}
              </div>
              <div className="">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setOpenedBodyWeight(true)}
                      className={`${
                        active ? "bg-blue-700 text-white" : "text-gray-900"
                      } menuItem group`}
                    >
                      {BODY_WEIGHT}
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setOpenedNewProduct(true)}
                      className={`${
                        active ? "bg-blue-700 text-white" : "text-gray-900"
                      } menuItem font-semibold group `}
                    >
                      {CREATE_NEW_PRODUCT}
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </>
  );
}
