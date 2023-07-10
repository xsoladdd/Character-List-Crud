"use client";
import React from "react";
import { ImSpinner2 } from "react-icons/im";
import { useQuery } from "react-query";
import { getWeapons, validationSchema } from "./helper";
import { useFormik } from "formik";
import { joinClass } from "@/utils/joinClass";

const AddingForm: React.FC = () => {
  const { data: weaponData, status: weaponStatus } = useQuery<{
    weapons: Array<string>;
  }>("weapons", getWeapons);

  const formik = useFormik<Omit<ICharacter, "id" | "combatStatus">>({
    initialValues: {
      name: "",
      description: "",
      weapon: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
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
          <form className="w-full px-14 py-4 " onSubmit={formik.handleSubmit}>
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
                  className={joinClass("input input-bordered w-full input-md" ,formik.errors.name ? 'select-error':'')}
                  id="name"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                {formik.errors.name && (
                  <span className="text-xs pt-1 text-red-400 italic pl-2">
                    {formik.errors.name}
                  </span>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-base">
                    Choice of weapon?
                  </span>
                </label>
                <select
                  className={joinClass('select select-bordered w-full max-w-xs', formik.errors.weapon ? 'select-error':'' )}
                  id="weapon"
                  name="weapon"
                  onChange={formik.handleChange}
                  value={formik.values.weapon}
                >
                  <option disabled selected value="">
                    Choose Weapon
                  </option>
                  {weaponData &&
                    weaponData.weapons.map((opt) => (
                      <option value={opt} key={opt}>
                        {opt}
                      </option>
                    ))}
                </select>
                {formik.errors.weapon && (
                  <span className="text-xs pt-1 text-red-400 italic pl-2">
                    {formik.errors.weapon}
                  </span>
                )}
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
                  id="description"
                  name="description"
                  onChange={formik.handleChange}
                  value={formik.values.description}
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
