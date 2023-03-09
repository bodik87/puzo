import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { ADD_AGAIN, DELETE, EDIT_WEIGHT, GRAM } from "../../assets/CONSTANTS";
import EditMealWeight from "./EditMealWeight";
import IncreaseMealWeight from "./IncreaseMealWeight";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as Heart } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { setFavorite } from "../../store/productsSlice";
import { editMeal } from "../../store/mealsSlice";

export default function MealOptions({
  openedPopup,
  setOpenedPopup,
  editableMeal,
  productTitle,
  onDelete,
}) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

  const [openedProductWeightPopup, setOpenedProductWeightPopup] =
    useState(false);

  const [openedIncreaseMealWeight, setOpenedIncreaseMealWeight] =
    useState(false);

  function closeModal() {
    setOpenedPopup(false);
  }

  useEffect(() => {
    setChecked(editableMeal?.dish?.isFavorite);
  }, [editableMeal]);

  const createUpdatedValue = () => {
    return {
      id: editableMeal.dish.id,
      weight: editableMeal.dish.isFavorite,
      isFavorite: checked,
    };
  };
  const updatedValue = editableMeal && createUpdatedValue();

  const handleUpdate = () => {
    dispatch(setFavorite(updatedValue));
    dispatch(editMeal(updatedValue));
    setChecked(!checked);
  };

  return (
    <>
      <IncreaseMealWeight
        title={productTitle}
        meal={editableMeal}
        openedIncreaseMealWeight={openedIncreaseMealWeight}
        setOpenedIncreaseMealWeight={setOpenedIncreaseMealWeight}
        setOpenedPopup={setOpenedPopup}
      />
      <EditMealWeight
        title={productTitle}
        meal={editableMeal}
        openedProductWeightPopup={openedProductWeightPopup}
        setOpenedProductWeightPopup={setOpenedProductWeightPopup}
        setOpenedPopup={setOpenedPopup}
      />
      <Transition appear show={openedPopup} as={Fragment}>
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
                    <div className="flex justify-between items-center">
                      <span className="select-none">
                        {productTitle}, {editableMeal.weight}
                        {GRAM}
                      </span>
                      <div className="flex items-center h-5 cursor-pointer select-none">
                        {/* {checked ? (
                          <Heart
                            style={{ fill: "#EF4444" }}
                            onClick={handleUpdate}
                            className="h-8 w-8 animate-scale"
                          />
                        ) : (
                          <HeartIcon
                            style={{ stroke: "#EF4444" }}
                            onClick={handleUpdate}
                            className="h-8 w-8"
                          />
                        )} */}
                        <input
                          id="favorite"
                          type="checkbox"
                          value=""
                          checked={checked}
                          onChange={(e) => setChecked(e.target.checked)}
                          className="hidden"
                        />
                      </div>
                    </div>
                  </Dialog.Title>

                  <div className="flex flex-col justify-center gap-2">
                    <div className="mt-6 flex justify-center">
                      <button
                        type="button"
                        className="btn rounded-3xl bg-blue-700 hover:bg-blue-700/90 text-xl py-5"
                        onClick={() => setOpenedIncreaseMealWeight(true)}
                      >
                        {ADD_AGAIN}
                      </button>
                    </div>
                    <div className="mt-2 flex gap-2">
                      <button
                        type="button"
                        className="btn rounded-3xl bg-red-500 hover:bg-red-500/90 flex flex-nowrap text-xl py-5"
                        onClick={() => onDelete(editableMeal.id)}
                      >
                        {DELETE}
                      </button>
                      <button
                        type="button"
                        className="btn rounded-3xl bg-yellow-500 hover:bg-yellow-500/90 active:hover:bg-yellow-800 text-xl py-5"
                        onClick={() => setOpenedProductWeightPopup(true)}
                      >
                        {EDIT_WEIGHT}
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
