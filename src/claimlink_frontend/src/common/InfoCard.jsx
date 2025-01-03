import React from "react";
import { IoSettingsOutline } from "react-icons/io5";

const InfoCard = ({ data }) => {
  const timestamp = data.createdAt;
  console.log(data);

  // Convert nanoseconds to milliseconds by dividing by 1,000,000
  const milliseconds = Number(timestamp / 1000000n);

  // Create a new Date object with the milliseconds
  const date = new Date(milliseconds);

  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Format the date as "Month Day, Year Hour:Minute"
  const formattedDate = `${month} ${day}, ${year}, ${hours}:${minutes}`;

  // Output the formatted date
  console.log(formattedDate);
  return (
    <div>
      {" "}
      <div className="max-w-sm sm:hidden mx-auto bg-white rounded-lg   p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="px-4">
            <h2 className="text-lg font-semibold">{data?.title}</h2>
          </div>
          <div>
            <button className="p-2 rounded-full hover:bg-gray-200">
              <IoSettingsOutline className="text-gray-400" size={24} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-0">
          <div className="flex flex-col border p-4 border-l-0  border-gray-300">
            <span className="text-sm text-gray-500">Status</span>
            <p
              className={`text-xs font-bold mt-2 ${
                Object.keys(data?.status || {})[0] === "Expired"
                  ? "text-red-600" // For expired
                  : Object.keys(data?.status || {})[0] === "Ongoing"
                  ? "text-blue-600" // For complete
                  : "text-green-600" // Default for ongoing
              }`}
            >
              {Object.keys(data?.status || {})[0]}{" "}
            </p>
          </div>
          <div className="flex flex-col border p-4  border-r-0 border-gray-300">
            <span className="text-sm text-gray-500">Additional</span>
            <span className="font-medium">sent to printer</span>
          </div>
          <div className="flex flex-col border p-4 border-l-0 border-gray-300">
            <span className="text-sm text-gray-500">Start date</span>
            <span className="font-medium"> {formattedDate}</span>
          </div>
          <div className="flex flex-col border p-4 border-r-0 border-gray-300">
            <span className="text-sm text-gray-500">Quantity</span>
            <span className="font-medium">{parseInt(data.quantity)}</span>
          </div>
        </div>
        <div className="   p-4">
          <span className="text-sm text-gray-500">Linked campaign</span>
          <p className="font-medium">e-cards</p>
        </div>
      </div>
      {/* new card for desktop */}
      <div className="p-6 max-w-xs hidden sm:block mx-auto bg-white rounded-xl   space-y-4">
        <div className="">
          <h1 className="text-xl font-bold">{data?.title}</h1>
          <p className="text-gray-500">
            {month} {day},{hours}:{minutes}
          </p>
        </div>
        <div className="border border-gra-200"></div>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500">Status</span>
            <p
              className={`text-xs font-bold  ${
                Object.keys(data?.status || {})[0] === "Expired"
                  ? "text-red-600" // For expired
                  : Object.keys(data?.status || {})[0] === "Ongoing"
                  ? "text-blue-600" // For complete
                  : "text-green-600" // Default for ongoing
              }`}
            >
              {Object.keys(data?.status || {})[0]}{" "}
            </p>
          </div>
          <div className="flex justify-between gap-7">
            <span className="text-gray-500">Additional</span>
            <span className="text-gray-800 font-semibold truncate	">
              Sent to printer
            </span>
          </div>
          <div className="flex justify-between gap">
            <span className="text-gray-500 ">Start date</span>
            <span className="text-gray-800  text-xs font-semibold">
              {formattedDate}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Quantity</span>
            <span className="text-gray-800 font-semibold">
              {parseInt(data?.quantity)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Linked campaign</span>
            <span className="text-gray-800 truncate w-24 font-semibold">
              {data?.campaignId}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
