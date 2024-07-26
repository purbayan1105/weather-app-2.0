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
  return (
    <>
      <div className="flex justify-center items-center mt-8 gap-5 text-2xl font-semibold pb-5">
        <div className="">{data?.location.name}</div>
        <FaLocationDot onClick={getLocation} />
      </div>
      <div className="flex justify-center items-center mt-6">
        <img src={data?.current.condition.icon} alt="" />
      </div>
      <div className="flex justify-center mx-auto mt-3 space-x-2 items-center">
        <span className="font-semibold text-lg">
          {" "}
          {data?.current.condition.text}{" "}
        </span>
      </div>
    </>
  );
};

export default DisplayName;
