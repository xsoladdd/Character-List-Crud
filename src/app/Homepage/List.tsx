"use client";
import React from "react";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { ImSpinner2 } from "react-icons/im";
import { useQuery } from "react-query";
import { getCharacters } from "./helper";

const List: React.FC = () => {
  const { data, status, isLoading } = useQuery<{
    characters: Array<ICharacter>;
  }>("characters", getCharacters);

  const tableMessage = (message: string) => (
      <tr className="">
        <td className="align-top text-center " colSpan={6}>
          {message}
        </td>
      </tr>
  );

  const tableLoader = (
      <tr >
        <td className="w-full  " colSpan={6}>
          <div className="flex place-content-center">
          <ImSpinner2 className="animate-spin " size={30} />
          </div>
        </td>
      </tr>
  );

  const dataMap = (character: ICharacter, key: number) => (
    <>
      <tr className="align-top" key={key}>
        <td className="align-top">{character.id}</td>
        <td className="align-top">{character.name}</td>
        <td className="align-top">{character.weapon}</td>
        <td className="align-top">{character.description}</td>
        <td className="align-top text-center">
          <div className="tooltip" data-tip="Toggle on combat status">
            <input
              type="checkbox"
              className="toggle toggle-success toggle-md"
              checked
            />
          </div>
        </td>
        <td className="flex gap-2">
          <div className="tooltip" data-tip="Delete">
            <button className="btn btn-sm btn-error">
              <HiOutlineTrash size="18" />
            </button>
          </div>
          <div className="tooltip" data-tip="Edit">
            <button className="btn btn-sm btn-warning">
              <HiOutlinePencilSquare size="18" />
            </button>
          </div>
        </td>
      </tr>
    </>
  );

  return (
    <>
      <div className="flex flex-col place-items-center gap-5">
        <h2 className="text-secondary text-2xl font-bold uppercase">
          List of characters
        </h2>
        <div className="overflow-x-auto w-full">
          <table className="table table-md">
            <thead>
              <tr className="text-center">
                <th>ID</th>
                <th>Name</th>
                <th>Weapon</th>
                <th className="hidden sm:block"> Description</th>
                <th>Combat Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && tableLoader}
              {status === "error" && tableMessage("Something went wrong")}
              {status === "success" &&
              data?.characters &&
              data?.characters.length === 0
                ? tableMessage("No data found")
                : data?.characters.map((character, key) =>
                    dataMap(character, key)
                  )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default List;
