import { dataAtom, locationAtom, nameAtom, searchAtom } from "@/utils/atoms";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";

export type LocationProps = {
  latitude: number;
  longitude: number;
};

const DisplayName = () => {
  const [name, setName] = useAtom(nameAtom);
  const [location, setLocation] = useAtom<any>(locationAtom);
  const [data, setData] = useAtom(dataAtom);

  // // const getLocation = () => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     // console.log(position.coords.latitude);
  //     // console.log(position.coords.longitude);

  //     setLocation({
  //       latitude: position.coords.latitude,
  //       longitude: position.coords.longitude,
  //     });

  //   });
  // };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      console.log(location);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      if (location.latitude && location.longitude) {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=625256ded80b46f5849150644241205&q=${location.latitude},${location.longitude}&aqi=no`
        );
        const info = await response.json();
        setData(info);
      }
    };

    fetchData();
  }, [location]);

  const date = new Date();
  const newDate = date.toString().split(" ");

  console.log(date);
  console.log(newDate);
  const toDay =
    newDate[0] + ", " + newDate[1] + " " + newDate[2] + " " + newDate[3];
  console.log(toDay);

  return (
    <>
      <div className="italic mx-8 mt-5 text-gray-400">{toDay}</div>
      <div className="mt-2 mx-8 flex  justify-between">
        <div className="text-3xl text-white font-bold">
          {data?.location.name}
        </div>
        <FaLocationDot
          onClick={getLocation}
          size={33}
          className="bg-white px-2 rounded-full"
        />
      </div>
      <div className="flex justify-center items-center mt-6">
        <img src={data?.current.condition.icon} alt="" width={100} />
      </div>
    </>
  );
};

export default DisplayName;
