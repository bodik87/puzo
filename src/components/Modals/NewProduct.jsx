import { Dialog, Transition } from "@headlessui/react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as Heart } from "@heroicons/react/24/solid";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_FAVORITES,
  CALORIES,
  CANCEL,
  CANCEL_CREATION,
  CARBOHIDR,
  CREATE,
  FATS,
  NAME,
  PROTEINS,
} from "../../assets/CONSTANTS";
import Warning from "./Warning";

export default function NewProduct({ openedNewProduct, setOpenedNewProduct }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [openedWarning, setOpenedWarning] = useState(false);

  const [title, setTitle] = useState("");
  const [checked, setChecked] = useState(false);

  function closeModal() {
    // dispatch(updateWeight(Number(value)));
    setOpenedWarning(true);
  }

  return (
    <>
      <Warning
        openedWarning={openedWarning}
        setOpenedWarning={setOpenedWarning}
        setOpenedNewProduct={setOpenedNewProduct}
      >
        {CANCEL_CREATION}
      </Warning>
      <Transition appear show={openedNewProduct} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed top-5 left-0 right-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white py-3 text-left align-middle shadow-lg transition-all  divide-y divide-gray-200">
                  <Dialog.Title
                    as="h3"
                    className="modalTitle px-6 pb-3 flex justify-between items-center"
                  >
                    {CREATE}
                    <button
                      type="button"
                      className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5"
                      onClick={closeModal}
                    >
                      {CANCEL}
                    </button>
                  </Dialog.Title>
                  <div className="px-6 pt-6 pb-4">
                    <form onSubmit={closeModal}>
                      <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          {NAME}
                        </label>
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          step={0.1}
                          placeholder={NAME}
                          className="input p-4"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="mb-6">
                          <label className="block mb-2 text-sm font-medium text-gray-900">
                            {PROTEINS}
                          </label>
                          <input
                            type="number"
                            className="input p-2"
                            placeholder={PROTEINS}
                            required
                          />
                        </div>
                        <div className="mb-6">
                          <label className="block mb-2 text-sm font-medium text-gray-900">
                            {FATS}
                          </label>
                          <input
                            type="number"
                            className="input p-2"
                            placeholder={FATS}
                            required
                          />
                        </div>
                        <div className="mb-6">
                          <label className="block mb-2 text-sm font-medium text-gray-900">
                            {CARBOHIDR}
                          </label>
                          <input
                            type="number"
                            className="input p-2"
                            placeholder={CARBOHIDR}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 items-center">
                        <div className="mb-6">
                          <label className="block mb-2 text-sm font-medium text-gray-900">
                            {CALORIES}
                          </label>
                          <input
                            type="number"
                            className="input p-2"
                            placeholder={CALORIES}
                            required
                          />
                        </div>

                        <div className="flex flex-col md:flex-row gap-2 justify-center items-center select-none">
                          <div className="flex items-center h-5 cursor-pointer">
                            {checked ? (
                              <Heart
                                style={{ fill: "#EF4444" }}
                                onClick={() => setChecked(!checked)}
                                className="h-8 w-8"
                              />
                            ) : (
                              <HeartIcon
                                style={{ stroke: "#EF4444" }}
                                onClick={() => setChecked(!checked)}
                                className="h-8 w-8"
                              />
                            )}
                            <input
                              id="favorite"
                              type="checkbox"
                              value=""
                              checked={checked}
                              onChange={() => setChecked(!checked)}
                              className="hidden"
                            />
                          </div>
                          <label
                            htmlFor="favorite"
                            className="text-sm font-medium text-gray-900 cursor-pointer select-none"
                          >
                            {ADD_TO_FAVORITES}
                          </label>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-full sm:w-auto px-5 py-4 mt-4 text-center"
                      >
                        {CREATE}
                      </button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
