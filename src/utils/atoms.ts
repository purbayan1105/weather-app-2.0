import { atom } from "jotai";
import { ObjType } from "./types";
import { LocationProps } from "@/components/DisplayName";

export const searchAtom = atom("");
export const nameAtom = atom("India");
export const dataAtom = atom<null | ObjType>(null);
export const clickAtom = atom(false);
export const locationAtom = atom<any>({
  latitude: null,
  longitude: null,
});
