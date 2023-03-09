import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { ADD, ADD_WEIGHT } from "../../assets/CONSTANTS";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addMeal } from "../../store/mealsSlice";

export default function AddMeal({
  openedAddMeal,
  setOpenedAddMeal,
  favoriteProductToMeal,
}) {
  const dispatch = useDispatch();
  const { date } = useSelector((state) => state.date);

  const [value, setValue] = useState("");

  function closeModal() {
    setOpenedAddMeal(false);
  }

  const createNewMeal = () => {
    return {
      id: uuidv4(),
      date: date,
      weight: value,
      dish: favoriteProductToMeal,
    };
  };
  const newMeal = favoriteProductToMeal && value && createNewMeal();
  const handleAddNewMeal = () => {
    dispatch(addMeal(newMeal));
    closeModal();
    setValue("");
  };

  return (
    <>
      <Transition appear show={openedAddMeal} as={Fragment}>
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
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-3xl bg-white/80 backdrop-blur-md p-6 text-left align-middle shadow-lg transition-all">
                  <Dialog.Title as="h3" className="modalTitle">
                    <div className="flex flex-col">
                      <div className="pb-6 select-none">
                        {favoriteProductToMeal.title}
                      </div>
                      <input
                        type="number"
                        min="0"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        step={1}
                        placeholder={ADD_WEIGHT}
                        className="input p-4 text-2xl"
                        required
                      />
                    </div>
                  </Dialog.Title>

                  <div className="flex flex-col justify-center gap-2">
                    <div className="mt-6 flex justify-center">
                      <button
                        type="button"
                        className="btn rounded-3xl bg-blue-700 hover:bg-blue-700/90 text-xl py-5"
                        onClick={handleAddNewMeal}
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
