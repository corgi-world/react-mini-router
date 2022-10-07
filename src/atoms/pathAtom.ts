import { atom } from "recoil";

const pathAtom = atom({
  key: "pathAtom",
  default: "/",
});

export default pathAtom;
