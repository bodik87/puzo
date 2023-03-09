import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { Dialog, Transition } from "@headlessui/react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as Heart } from "@heroicons/react/24/solid";
import { Fragment, useState } from "react";
import {
  ADD_TO_FAVORITES,
  DELETE_FROM_FAVORITES,
  CALORIES,
  CANCEL,
  CANCEL_CREATION,
  CARBOHIDR,
  CARBOHIDR_PLACEHOLDER,
  CREATE,
  FATS,
  NAME,
  PROTEINS,
} from "../../assets/CONSTANTS";
import { addNewProduct } from "../../store/productsSlice";
import Warning from "../Popups/Warning";

export default function NewProduct({ openedNewProduct, setOpenedNewProduct }) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [checked, setChecked] = useState(false);
  const [proteins, setProteins] = useState("");
  const [fats, setFats] = useState("");
  const [carbohydrates, setCarbohydrates] = useState("");
  const [calories, setCalories] = useState("");

  const [openedWarning, setOpenedWarning] = useState(false);
  const closeModal = () => {
    if (title) {
      setOpenedWarning(true);
    } else {
      setOpenedNewProduct(false);
      cleanInputs();
    }
  };

  const createNewProduct = () => {
    return {
      id: uuidv4(),
      title: title,
      proteins: proteins,
      fats: fats,
      carbohydrates: carbohydrates,
      calories: calories,
      isFavorite: checked,
    };
  };
  const newProduct = carbohydrates && createNewProduct();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(addNewProduct(newProduct));
    cleanInputs();
    setOpenedNewProduct(false);
  };

  function cleanInputs() {
    setTitle("");
    setChecked("");
    setProteins("");
    setFats("");
    setCarbohydrates("");
    setCalories("");
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
        <Dialog as="div" className="relative z-40" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30" />
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
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white/70 backdrop-blur-lg py-3 text-left align-middle shadow-lg transition-all">
                  <Dialog.Title
                    as="h3"
                    className="modalTitle px-6 pb-3 flex justify-between items-center"
                  >
                    {CREATE}
                    <button
                      type="button"
                      className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-3"
                      onClick={closeModal}
                    >
                      {CANCEL}
                    </button>
                  </Dialog.Title>
                  <div className="px-6 pb-4">
                    <form onSubmit={handleClick}>
                      <div className="mb-4">
                        <label className="block ml-2 mb-1 font-medium text-gray-900">
                          {NAME}
                        </label>
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder={NAME}
                          className="input p-4"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="mb-6">
                          <label className="block ml-2 mb-1 text-sm font-medium text-gray-900">
                            {PROTEINS}
                          </label>
                          <input
                            type="number"
                            min="0"
                            step={0.1}
                            value={proteins}
                            onChange={(e) => setProteins(e.target.value)}
                            className="input px-4 py-3 md:px-4 text-sm"
                            placeholder={PROTEINS}
                            required
                          />
                        </div>
                        <div className="mb-6">
                          <label className="block ml-2 mb-1 text-sm font-medium text-gray-900">
                            {FATS}
                          </label>
                          <input
                            type="number"
                            min="0"
                            step={0.1}
                            value={fats}
                            onChange={(e) => setFats(e.target.value)}
                            className="input px-4 py-3 md:px-4 text-sm"
                            placeholder={FATS}
                            required
                          />
                        </div>
                        <div className="mb-6">
                          <label className="block ml-2 mb-1 text-sm font-medium text-gray-900">
                            {CARBOHIDR}
                          </label>
                          <input
                            type="number"
                            min="0"
                            step={0.1}
                            value={carbohydrates}
                            onChange={(e) => setCarbohydrates(e.target.value)}
                            className="input px-4 py-3 md:px-4 text-sm"
                            placeholder={CARBOHIDR_PLACEHOLDER}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 items-center">
                        <div className="mb-6">
                          <label className="block ml-2 mb-1 font-medium text-gray-900">
                            {CALORIES}
                          </label>
                          <input
                            type="number"
                            min="0"
                            step={0.1}
                            value={calories}
                            onChange={(e) => setCalories(e.target.value)}
                            className="input px-4 py-4 md:px-4"
                            placeholder={CALORIES}
                            required
                          />
                        </div>

                        <div className="flex flex-col md:flex-row gap-2 justify-center items-center select-none">
                          <div className="flex items-center h-5 cursor-pointer">
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
                            {checked ? DELETE_FROM_FAVORITES : ADD_TO_FAVORITES}
                          </label>
                          {checked ? (
                            <Heart
                              style={{ fill: "#EF4444" }}
                              onClick={() => setChecked(!checked)}
                              className="h-8 w-8 animate-scale"
                            />
                          ) : (
                            <HeartIcon
                              style={{ stroke: "#EF4444" }}
                              onClick={() => setChecked(!checked)}
                              className="h-8 w-8"
                            />
                          )}
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="btn bg-blue-700 hover:bg-blue-800"
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
