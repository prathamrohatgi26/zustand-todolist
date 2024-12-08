"use client";
import useTodoStore from "@/store/todoStore";
import React, { useMemo } from "react";

const Header = () => {
  const { selectedDate, setSelectedDate } = useTodoStore();
  const [day, month, year] = selectedDate.split("/").map(Number);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (day: number, month: number, year: number) => {
    console.log(day, month, year);
    return new Date(year, month, 0).getDate();
  };

  const getMonthDates = useMemo(() => {
    const daysInMonth = getDaysInMonth(month, year);
    const dates = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month - 1, i);
      dates.push({
        date: i,
        full: date.toLocaleDateString("en-GB"),
        isToday:
          new Date().toLocaleDateString("en-GB") ===
          date.toLocaleDateString("en-GB"),
        dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
      });
    }
    return dates;
  }, [month, year]);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(e.target.value) + 1;
    const newDate = new Date(year, newMonth - 1, 1);
    setSelectedDate(newDate.toLocaleDateString("en-GB"));
  };

  const handleYearChange = (increment: number) => {
    const newDate = new Date(year, month - 1, 1);
    newDate.setFullYear(newDate.getFullYear() + increment);
    setSelectedDate(newDate.toLocaleDateString("en-GB"));
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 py-4 px-2 sm:px-6">
      <span className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
        Todo List
      </span>
      <div className="w-full max-w-xs mb-4 sm:mb-6 flex items-center gap-2">
        <button
          onClick={() => handleYearChange(-1)}
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-200"
        >
          ←
        </button>

        <select
          value={month - 1}
          onChange={handleMonthChange}
          className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
        >
          {months.map((monthName, index) => (
            <option key={monthName} value={index}>
              {monthName} {year}
            </option>
          ))}
        </select>

        <button
          onClick={() => handleYearChange(1)}
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-200"
        >
          →
        </button>
      </div>

      <div className="w-full overflow-x-auto hide-scrollbar">
        <div className="flex space-x-2 sm:space-x-4 min-w-max px-2 sm:px-4 py-2">
          {getMonthDates.map((date, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-gray-500 text-xs sm:text-sm mb-1">
                {date.dayName}
              </div>
              <button
                onClick={() => setSelectedDate(date.full)}
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors text-sm sm:text-base
                  ${
                    date.full === selectedDate
                      ? "bg-black text-white"
                      : "hover:bg-gray-200"
                  }
                  ${date.isToday ? "font-bold ring-2 ring-black" : ""}
                `}
              >
                {date.date}
              </button>
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs sm:text-sm text-gray-500 mt-2">
        Tasks for {selectedDate}
      </p>
    </div>
  );
};

export default Header;
