import { clickAtom, dataAtom, nameAtom } from "@/utils/atoms";
import { ObjType } from "@/utils/types";
import axios from "axios";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { FaTemperatureHalf, FaTemperatureHigh, FaWind } from "react-icons/fa6";
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
          <div className="mt-24 space-y-16 bg-[#36363660] mx-5 py-5 rounded-lg px-3">
            <div className="flex flex-col justify-center items-center gap-5 text-2xl">
              <FaTemperatureHigh size={30} color="green" />

              <p>{data?.current.temp_c} °C</p>
            </div>
            <div className="flex justify-center items-center gap-10">
              <div className="text-lg space-y-3">
                <WiHumidity size={30} color="pink" />

                <p> {data?.current.humidity}%</p>
              </div>
              <div className="text-lg space-y-3">
                <FaWind size={25} color="purple" />

                <p> {data?.current.wind_kph} Kph</p>
              </div>
              <div className="text-lg space-y-3">
                <FaTemperatureHalf size={25} color="brown" />

                <p>{data?.current.feelslike_c} °C</p>
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
