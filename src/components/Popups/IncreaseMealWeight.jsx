import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ADD, ADD_AGAIN, GRAM, MORE, PREVIOUS } from "../../assets/CONSTANTS";
import { editMeal } from "../../store/mealsSlice";

export default function IncreaseMealWeight({
  title,
  meal,
  openedIncreaseMealWeight,
  setOpenedIncreaseMealWeight,
  setOpenedPopup,
}) {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [increasedWeight, setIncreasedWeight] = useState("");

  function closeModal() {
    setOpenedIncreaseMealWeight(false);
  }

  function closeModals() {
    setIncreasedWeight("");
    setValue("");
    setOpenedIncreaseMealWeight(false);
    setOpenedPopup(false);
  }

  useEffect(() => {
    setIncreasedWeight(Number(meal.weight) + Number(value));
  }, [value]);

  const createUpdatedProduct = () => {
    return {
      id: meal.id,
      weight: increasedWeight,
      isFavorite: meal.dish.isFavorite,
    };
  };
  const updatedProduct = value && createUpdatedProduct();

  const handleUpdate = () => {
    dispatch(editMeal(updatedProduct));
    closeModals();
  };

  return (
    <>
      <Transition appear show={openedIncreaseMealWeight} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed top-16 max-w-md mx-auto left-0 right-0 overflow-y-auto">
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
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-3xl bg-white/60 backdrop-blur-md p-6 text-left align-middle shadow-lg transition-all">
                  <Dialog.Title as="h3" className="modalTitle">
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <label className="block mb-2 text-lg font-medium text-gray-900">
                      {PREVIOUS}
                      {meal.weight}
                      {GRAM} {MORE}
                      {value}
                      {GRAM}
                    </label>
                    <input
                      type="number"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      step={5}
                      placeholder={ADD_AGAIN}
                      className="input p-4 text-2xl"
                      min="0"
                      required
                    />

                    <div className="mt-6 flex justify-center">
                      <button
                        type="button"
                        className="btn rounded-3xl bg-blue-700 hover:bg-blue-700/90 text-xl py-5"
                        onClick={handleUpdate}
                      >
                        {ADD}
                      </button>
                    </div>
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
