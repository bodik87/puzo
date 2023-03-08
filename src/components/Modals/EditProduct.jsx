import { useDispatch } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as Heart } from "@heroicons/react/24/solid";
import { Fragment, useEffect, useState } from "react";
import {
  ADD_TO_FAVORITES,
  CALORIES,
  CANCEL,
  CARBOHIDR,
  CARBOHIDR_PLACEHOLDER,
  DELETE,
  EDIT,
  FATS,
  NAME,
  PROTEINS,
} from "../../assets/CONSTANTS";
import { deleteProduct, editProduct } from "../../store/productsSlice";

export default function EditProduct({
  product,
  openedEditProduct,
  setOpenedEditProduct,
}) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [checked, setChecked] = useState(false);
  const [proteins, setProteins] = useState("");
  const [fats, setFats] = useState("");
  const [carbohydrates, setCarbohydrates] = useState("");
  const [calories, setCalories] = useState("");

  const closeModal = () => setOpenedEditProduct(false);

  const updateProduct = () => {
    return {
      id: product?.id || "",
      title: title,
      proteins: proteins,
      fats: fats,
      carbohydrates: carbohydrates,
      calories: calories,
      isFavorite: checked,
    };
  };
  const updatedProduct = updateProduct();

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(editProduct(updatedProduct));
    setOpenedEditProduct(false);
  };

  const handleDelete = (id) => {
    setOpenedEditProduct(false);
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    setTitle(product?.title);
    setChecked(product?.isFavorite);
    setProteins(product?.proteins);
    setFats(product?.fats);
    setCarbohydrates(product?.carbohydrates);
    setCalories(product?.calories);
  }, [product]);

  return (
    <>
      <Transition appear show={openedEditProduct} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={closeModal}>
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
                    {EDIT}
                    <button
                      type="button"
                      className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-3"
                      onClick={closeModal}
                    >
                      {CANCEL}
                    </button>
                  </Dialog.Title>
                  <div className="px-6 pt-6 pb-4">
                    <form onSubmit={handleEdit}>
                      <div className="mb-6">
                        <label className="block mb-2 font-medium text-gray-900">
                          {NAME}
                        </label>
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          step={0.1}
                          placeholder={NAME}
                          className="input p-4 "
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
                            value={proteins}
                            onChange={(e) => setProteins(e.target.value)}
                            className="input px-2 py-3 md:px-4 text-sm"
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
                            value={fats}
                            onChange={(e) => setFats(e.target.value)}
                            className="input px-2 py-3 md:px-4 text-sm"
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
                            value={carbohydrates}
                            onChange={(e) => setCarbohydrates(e.target.value)}
                            className="input px-2 py-3 md:px-4 text-sm"
                            placeholder={CARBOHIDR_PLACEHOLDER}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 items-center">
                        <div className="mb-6">
                          <label className="block mb-2 font-medium text-gray-900">
                            {CALORIES}
                          </label>
                          <input
                            type="number"
                            value={calories}
                            onChange={(e) => setCalories(e.target.value)}
                            className="input px-2 py-4 md:px-4"
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
                                className="h-8 w-8 animate-scale"
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

                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          className="btn bg-red-500 hover:bg-red-500/90 active:hover:bg-red-800 text-sm md:text-base"
                          onClick={() => handleDelete(product.id)}
                        >
                          {DELETE}
                        </button>
                        <button
                          type="submit"
                          className="btn bg-yellow-600 hover:bg-yellow-600 text-sm md:text-base"
                        >
                          {EDIT}
                        </button>
                      </div>
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