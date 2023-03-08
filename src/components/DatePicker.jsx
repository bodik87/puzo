import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDate, today } from "../store/dateSlice";
import { add, addDays, format } from "date-fns";
import { uk } from "date-fns/locale";
import { TODAY, TOMORROW, YESTERDAY } from "../assets/CONSTANTS";

export default function DatePicker() {
  const dispatch = useDispatch();
  const { date } = useSelector((state) => state.date);
  const yesterday = format(add(new Date(), { days: -1 }), "yyyy-MM-dd");
  const tomorrow = format(add(new Date(), { days: 1 }), "yyyy-MM-dd");

  const [currentDate, setCurrentDate] = useState(date);

  const handleDateChange = (e) => {
    if (e.target.value === "") {
      setCurrentDate(today);
      dispatch(changeDate(today));
    } else {
      setCurrentDate(e.target.value);
      dispatch(changeDate(e.target.value));
    }
  };

  const increaseDate = (dateValue) => {
    const updatedDate = addDays(new Date(dateValue), 1);
    const updatedAndFormatedDate = format(updatedDate, "yyyy-MM-dd");
    setCurrentDate(updatedAndFormatedDate);
    dispatch(changeDate(updatedAndFormatedDate));
  };

  const decreaseDate = (dateValue) => {
    const updatedDate = addDays(new Date(dateValue), -1);
    const updatedAndFormatedDate = format(updatedDate, "yyyy-MM-dd");
    setCurrentDate(updatedAndFormatedDate);
    dispatch(changeDate(updatedAndFormatedDate));
  };

  // const formatedDate = format(new Date(currentDate), "dd MMM", { locale: ru });
  const formatedDay = format(new Date(currentDate), "eeee", { locale: uk });
  const textFormatedDay = getTextFormatedDay(currentDate);

  function getTextFormatedDay(date) {
    switch (date) {
      case today:
        return TODAY;
      case yesterday:
        return YESTERDAY;
      case tomorrow:
        return TOMORROW;
      default:
        return formatedDay;
    }
  }

  return (
    <div className="max-w-lg w-full mx-auto mt-12 px-2 flex justify-between items-center">
      <button
        onClick={() => decreaseDate(currentDate)}
        className="datePickerBtn"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      <div className="flex justify-center items-center text-sm font-semibold relative">
        <span>{textFormatedDay.toUpperCase()}</span>

        <input
          type="date"
          value={currentDate}
          className="bg-transparent p-2 rounded-full outline-none"
          onChange={handleDateChange}
        />
      </div>

      <button
        onClick={() => increaseDate(currentDate)}
        className="datePickerBtn"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
}
