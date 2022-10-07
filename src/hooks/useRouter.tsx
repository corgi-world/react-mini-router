import { useRecoilState } from "recoil";
import pathAtom from "../atoms/pathAtom";

export default function useRouter() {
  const [path, setPath] = useRecoilState(pathAtom);

  function push(path: string) {
    window.history.pushState({ path }, "", path);
    setPath(path);
  }

  return { path, push };
}
