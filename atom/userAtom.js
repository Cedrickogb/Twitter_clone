import { atom } from "recoil";
export const userState = atom({
  key: "userState", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (l s'agit de l'initialisation de la valeur à null)
});