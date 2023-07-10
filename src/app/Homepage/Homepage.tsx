"use client";
import React, { useState } from "react";
import { editFormAtom } from "@/Store/Atoms";
import { queryClient } from "@/config/react-query-config";
import { useAtom } from "jotai";
import { HiOutlineTrash, HiOutlinePencilSquare } from "react-icons/hi2";
import { useQuery, useMutation } from "react-query";
import DeleteModal from "../components/DeleteModal";
import TableLoader from "../components/TableLoader";
import TableMessage from "../components/TableMessage";
import {
  getCharacters,
  deleteCharacter,
  toggleCharacterCombatStatus,
  deleteCharacters,
} from "./helper";
import AddEditModal from "./AddEditModal";

const Home: React.FC = () => {
  const { data, status, isLoading } = useQuery<{
    characters: Array<ICharacter>;
  }>("characters", getCharacters);

  const deleteMutation = useMutation(deleteCharacter, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["characters"] });
      setDeleteModalStatus(false);
    },
  });
  const toggleMutation = useMutation(toggleCharacterCombatStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["characters"] });
    },
  });

  const massDeleteMutation = useMutation(deleteCharacters, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["characters"] });
    },
  });

  const [deleteIds, setDeleteIds] = useState<Array<string>>([]);

  const handleSelectClick = (id: string) => {
    const isClicked = deleteIds.includes(id);
    if (isClicked) {
      setDeleteIds(deleteIds.filter((delId) => delId !== id));
    } else {
      setDeleteIds([...deleteIds, id]);
    }
  };

  const [deleteModalStatus, setDeleteModalStatus] = useState(false);
  const [massDeletedModalStatus, setMassDeletedModalStatus] = useState(false);
  const [deleteId, setDeleteId] = useState<string | undefined>("");

  const [statusFilter, setStatusFilter] = useState("all");
  const [nameFilter, setNameFilter] = useState("");

  const [_, setForm] = useAtom(editFormAtom);

  const handleOpenModal = (id: string | undefined) => {
    if (id) {
      setDeleteId(id);
      setDeleteModalStatus(true);
    }
  };

  const [addEditModalStatus, setAddEditModalStatus] = useState(false);

  const dataMap = (character: ICharacter, key: number) => (
    <tr className="align-top text-center" key={key}>
      <td className="align-top">
        <input
          type="checkbox"
          checked={deleteIds.includes(character.id as string)}
          onClick={() => handleSelectClick(character.id as string)}
          className="checkbox checkbox-sm checkbox-accent"
        />
      </td>
      <td className="align-top">{character.id}</td>
      <td className="align-top">{character.name}</td>
      <td className="align-top">{character.weapon}</td>
      <td className="align-top">{character.description}</td>
      <td className="align-top ">
        <div
          className="tooltip"
          data-tip={`Toggle ${
            character.combatStatus ? "OFF" : "ON"
          } combat status`}
        >
          <input
            type="checkbox"
            className="toggle toggle-success toggle-md"
            checked={character.combatStatus}
            disabled={toggleMutation.isLoading}
            onClick={() =>
              toggleMutation.mutate({
                ...character,
                combatStatus: !character.combatStatus,
              })
            }
          />
        </div>
      </td>
      <td className="flex gap-2 place-content-center">
        <div className="tooltip" data-tip="Delete">
          <button
            className="btn btn-sm btn-error"
            onClick={() => handleOpenModal(character.id)}
          >
            <HiOutlineTrash size="18" />
          </button>
        </div>
        <div className="tooltip" data-tip="Edit">
          <button
            className="btn btn-sm btn-warning"
            onClick={() => {
              setAddEditModalStatus(true);
              setForm({ ...character });
            }}
          >
            <HiOutlinePencilSquare size="18" />
          </button>
        </div>
      </td>
    </tr>
  );

  const handleDeleteModalClose = () => {
    setDeleteModalStatus(false);
    setDeleteId(undefined);
  };

  const handleDeleteModalSubmit = () => {
    if (typeof deleteId === "string") {
      deleteMutation.mutate(deleteId);
    }
  };

  return (
    <section className="text-gray-100 body-font w-full pt-24 gap-16 ">
      <AddEditModal
        status={addEditModalStatus}
        handleClose={() => setAddEditModalStatus(false)}
      />
      <DeleteModal
        handleClose={handleDeleteModalClose}
        handleSubmit={handleDeleteModalSubmit}
        status={deleteModalStatus}
        text={"Are you sure that you want to delete a record?"}
      />
      <DeleteModal
        handleClose={() => setMassDeletedModalStatus(false)}
        handleSubmit={() => {
          massDeleteMutation.mutate(deleteIds);
          setMassDeletedModalStatus(false);
        }}
        status={massDeletedModalStatus}
        text={"Are you sure that you want to delete the selected records?"}
      />
      <div className="flex flex-col place-items-center gap-5">
        <h2 className="text-primary text-2xl font-bold uppercase">
          characters
        </h2>

        <div className="w-full flex justify-between">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search by name"
              className="input input-bordered w-full max-w-xs input-sm"
              onChange={(e) => setNameFilter(e.target.value)}
            />
            <select
              className="select w-full max-w-xs select-sm select-bordered"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Combat Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex gap-5">
            <button
              className="btn btn-sm btn-error"
              disabled={deleteIds.length === 0}
              onClick={() => setMassDeletedModalStatus(true)}
            >
              Delete Selected
            </button>
            <button
              className="btn btn-sm btn-info"
              onClick={() => setAddEditModalStatus(true)}
            >
              Add new character
            </button>
          </div>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="table table-md">
            <thead>
              <tr className="text-center">
                <th></th>
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
                data?.characters
                  .filter(({ name }) =>
                    name.toLowerCase().includes(nameFilter.toLowerCase())
                  )
                  .filter(({ combatStatus }) =>
                    statusFilter === "all"
                      ? combatStatus || !combatStatus
                      : statusFilter === "active"
                      ? combatStatus
                      : !combatStatus
                  )
                  .map((character, key) => dataMap(character, key))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
export default Home;
