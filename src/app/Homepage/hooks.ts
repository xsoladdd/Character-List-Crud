import { useMutation, useQuery } from "react-query";
import {
  addUpdateCharacter,
  deleteCharacter,
  deleteCharacters,
  getCharacters,
  getWeapons,
  toggleCharacterCombatStatus,
} from "./helper";
import { queryClient } from "@/config/react-query-config";

export const useGetCharacters = () => {
  return useQuery<{
    characters: Array<ICharacter>;
  }>("characters", getCharacters);
};

export const useToggleMutation = () => {
  const { mutate, isLoading } = useMutation(toggleCharacterCombatStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["characters"] });
    },
  });
  return { mutate, isLoading };
};

export const useGetWeapons = () => {
  return useQuery<{
    weapons: Array<string>;
  }>("weapons", getWeapons);
};

export const useDeleteCharacter = (successCallback: () => void) => {
  return useMutation(deleteCharacter, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["characters"] });
      successCallback();
    },
  });

};

export const useDeleteCharacters = (successCallback: () => void) => {
  return useMutation(deleteCharacters, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["characters"] });
      successCallback();
    },
  });
}

export const useUpdateCharacter = (successCallback: () => void) => {
  return useMutation(addUpdateCharacter, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["characters"] });
      successCallback()
    },
  });
}