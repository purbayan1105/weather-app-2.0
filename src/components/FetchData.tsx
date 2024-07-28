import { clickAtom, dataAtom, nameAtom } from "@/utils/atoms";
import { ObjType } from "@/utils/types";
import axios from "axios";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { FaTemperatureHalf, FaTemperatureHigh, FaWind } from "react-icons/fa6";
import { FiCloudRain } from "react-icons/fi";
import { WiHumidity } from "react-icons/wi";

const FetchData = () => {
  const [data, setData] = useAtom(dataAtom);
  const [isLoading, setLoading] = useState(true);
  const [isFetched, setFetched] = useState(false);
  const [isClicked, setClick] = useAtom(clickAtom);
  const [name, setName] = useAtom(nameAtom);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=625256ded80b46f5849150644241205&q=${name}&aqi=no`
      );

      if (!response.ok) {
        throw new Error("No data found");
      }

      const info = await response.json();
      return info;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();
      console.log(data);
      setData(data);
      setLoading(false);
      setFetched(true);
    };
    getData();
  }, [setClick(true), name]);
  if (isLoading) {
    return (
      <>
        <div className="flex justify-center items-center">Loading...</div>
      </>
    );
  }

  if (isFetched) {
    return (
      <>
        {data ? (
          <div className="">
            <div className="bg-blue-600 pb-5">
              <div className="text-6xl px-8 pt-14 font-bold text-white italic">
                {data.current.temp_c}°C
              </div>
              <div className="px-8 pt-2 text-xl font-normal text-gray-200">
                {data.current.condition.text}
              </div>
            </div>

            <div className="pt-10 px-4 grid grid-cols-2 space-y-5 bg-gray-200 pb-10">
              <div className="flex items-center pt-5 gap-3">
                <FaTemperatureHigh
                  size={33}
                  className="px-2 bg-white rounded-full"
                />
                <div className="">
                  <div className="text-sm font-semibold text-gray-600">
                    Feels Like
                  </div>
                  <div className="text-2xl text-gray-700 font-bold">
                    {data.current.feelslike_c}°C
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <WiHumidity size={33} className="px-1 bg-white rounded-full" />
                <div className="">
                  <div className="text-sm font-semibold text-gray-600">
                    Humidity
                  </div>
                  <div className="text-2xl text-gray-700 font-bold">
                    {data.current.humidity}%
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FiCloudRain size={33} className="px-1 bg-white rounded-full" />
                <div className="">
                  <div className="text-sm font-semibold text-gray-600">
                    Precipitation
                  </div>
                  <div className="text-2xl text-gray-700 font-bold">
                    {data.current.precip_mm} mm
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaWind size={33} className="px-1 bg-white rounded-full" />
                <div className="">
                  <div className="text-sm font-semibold text-gray-600">
                    Wind Speed
                  </div>
                  <div className="text-2xl text-gray-700 font-bold">
                    {data.current.wind_kph} mm
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className=""> No Data Found</div>
        )}
      </>
    );
  }
};

export default FetchData;
