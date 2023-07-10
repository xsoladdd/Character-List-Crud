"use client";
import React from "react";
import { ImSpinner2 } from 'react-icons/im';
import { useQuery } from "react-query";

const AddingForm: React.FC = () => {
  const { data: weaponData, status: weaponStatus } = useQuery<{
    weapons: Array<string>;
  }>("weapons", async () => {
    const response = await fetch("/api/weapons");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });

  return (
    <>
      <div className="flex flex-col place-items-center gap-5">
        <h2 className="text-secondary text-2xl font-bold uppercase">
          Add new character
        </h2>

        {weaponStatus === "loading" ? (
         <ImSpinner2 className="animate-spin my-9" size={30} />
        ) : (
          <form className="w-full px-14 py-4 ">
            {/* First Row */}
            <div className="grid grid-cols-2 gap-5">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-base">
                    What is your name?
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full  input-md"
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-base">
                    Choice of weapon?
                  </span>
                </label>
                <select className="select select-bordered w-full max-w-xs">
                  <option disabled selected>
                    Choose Weapon
                  </option>
                  {weaponData &&
                    weaponData.weapons.map((opt) => (
                      <option value={opt} key={opt}>
                        {opt}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base">Description</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-24 resize-none"
                  placeholder="Character Description"
                ></textarea>
              </div>
            </div>
            <div className="flex place-content-end py-4">
              <button className="btn btn-secondary btn-sm">Save</button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};
export default AddingForm;
