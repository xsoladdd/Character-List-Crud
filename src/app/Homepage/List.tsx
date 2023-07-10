"use client";
import { editFormAtom } from "@/Store/Atoms";
import { useAtom } from "jotai";
import React, { useState } from "react";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { ImSpinner2 } from "react-icons/im";
import { useMutation, useQuery } from "react-query";
import DeleteModal from "../components/DeleteModal";
import TableMessage from "../components/TableMessage";
import { deleteCharacter, getCharacters, toggleCharacterCombatStatus } from "./helper";
import TableLoader from "../components/TableLoader";
import { queryClient } from "@/config/react-query-config";

const List: React.FC = () => {
  const { data, status, isLoading } = useQuery<{
    characters: Array<ICharacter>;
  }>("characters", getCharacters);

  const mutation = useMutation(deleteCharacter,{
    onSuccess:() => {
      queryClient.invalidateQueries({ queryKey: ["characters"] });
      setModalStatus(false)
    }
  });
  const deleteMutation = useMutation(toggleCharacterCombatStatus,{
    onSuccess:() => {
      queryClient.invalidateQueries({ queryKey: ["characters"] });
    }
  });

  const [modalStatus, setModalStatus] = useState(false);
  const [deleteId, setDeleteId] = useState<string|undefined>('')

  const [_, setForm] = useAtom(editFormAtom);


  const handleOpenModal = (id:string|undefined) => {
   if(id){
    setDeleteId(id)
    setModalStatus(true)
   }
  }


  const dataMap = (character: ICharacter, key: number) => (
      <tr className="align-top" key={key}>
        <td className="align-top">{character.id}</td>
        <td className="align-top">{character.name}</td>
        <td className="align-top">{character.weapon}</td>
        <td className="align-top">{character.description}</td>
        <td className="align-top text-center">
          <div className="tooltip" data-tip={`Toggle ${character.combatStatus?'OFF':'ON'} combat status`}>
            <input
              type="checkbox"
              className="toggle toggle-success toggle-md"
              checked={character.combatStatus}
              disabled={deleteMutation.isLoading}
              onClick={() => deleteMutation.mutate({...character,combatStatus:!character.combatStatus})}
            />
          </div>
        </td>
        <td className="flex gap-2">
          <div className="tooltip" data-tip="Delete">
            <button className="btn btn-sm btn-error" onClick={() => handleOpenModal(character.id)} >
              <HiOutlineTrash size="18" />
            </button>
          </div>
          <div className="tooltip" data-tip="Edit">
            <button
              className="btn btn-sm btn-warning"
              onClick={() => setForm({ ...character })}
            >
              <HiOutlinePencilSquare size="18" />
            </button>
          </div>
        </td>
      </tr>
  );

  const handleCloseModal = () => {
    setModalStatus(false)
    setDeleteId(undefined)
  }

  const handleSubmitModal = () => {
    if(typeof deleteId ==='string' ){
      mutation.mutate(deleteId)
    }
  }

  return (
    <>
      <DeleteModal
        handleClose={handleCloseModal}
        handleSubmit={handleSubmitModal}
        status={modalStatus}
      />
      <div className="flex flex-col place-items-center gap-5">
        <h2 className="text-primary text-2xl font-bold uppercase">
          characters
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
              {isLoading && <TableLoader />}
              {status === "error" && (
                <TableMessage message="Something went wrong" />
              )}
              {status === "success" &&
              data?.characters &&
              data?.characters.length === 0 ? (
                <TableMessage message="No data found" />
              ) : (
                data?.characters.map((character, key) =>
                  dataMap(character, key)
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default List;
