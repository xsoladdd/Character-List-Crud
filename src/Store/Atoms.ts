import { atom } from "jotai";

export const editFormAtom = atom<Omit<ICharacter, "combatStatus">>({
  id: "",
  weapon: "",
  description: "",
  name: "",
});
