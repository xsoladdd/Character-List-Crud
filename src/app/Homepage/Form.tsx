"use client";
import { editFormAtom } from "@/Store/Atoms";
import { queryClient } from "@/config/react-query-config";
import { joinClass } from "@/utils/joinClass";
import { useFormik } from "formik";
import { useAtom } from "jotai";
import React from "react";
import { ImSpinner2 } from "react-icons/im";
import { useMutation, useQuery } from "react-query";
import { addUpdateCharacter, getWeapons, validationSchema } from "./helper";

const AddingForm: React.FC = () => {
  const { data: weaponData, status: weaponStatus } = useQuery<{
    weapons: Array<string>;
  }>("weapons", getWeapons);

  const [form, setForm] = useAtom(editFormAtom);


  const mutation = useMutation(addUpdateCharacter, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["characters"] });
      resetForm();
      formik.setSubmitting(false);
    },
  });

  const formik = useFormik<Omit<ICharacter, "combatStatus">>({
    // Setting shared state as default value and allow reinitalize so when i
    // Press edit, it will reinitalize
    initialValues: {
      id: form.id ? form.id : "",
      name: form.name ? form.name : "",
      description: form.description ? form.description : "",
      weapon: form.weapon ? form.weapon : "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      mutation.mutate({
        combatStatus: false,
        description: values.description,
        name: values.name,
        weapon: values.weapon,
        id: values.id,
      });
    },
  });

  const resetForm = () => {
    setForm({
      name: "",
      weapon: "",
      description: "",
      id: "",
    });
    formik.resetForm();
  };

  return (
    <>

      <div className="flex flex-col place-items-center gap-5">
        <h2 className="text-primary text-2xl font-bold uppercase">
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
                  className={joinClass(
                    "input input-bordered w-full input-md",
                    formik.errors.name && formik.touched.name
                      ? "select-error"
                      : ""
                  )}
                  id="name"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                {formik.errors.name && formik.touched.name && (
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
                  className={joinClass(
                    "select select-bordered w-full max-w-xs",
                    formik.errors.weapon && formik.touched.weapon
                      ? "select-error"
                      : ""
                  )}
                  id="weapon"
                  name="weapon"
                  onChange={formik.handleChange}
                  value={formik.values.weapon}
                >
                  <option disabled value="">
                    Choose Weapon
                  </option>
                  {weaponData &&
                    weaponData.weapons.map((opt) => (
                      <option value={opt} key={opt}>
                        {opt}
                      </option>
                    ))}
                </select>
                {formik.errors.weapon && formik.touched.weapon && (
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
            <div className="flex place-content-end py-4 gap-2">
              <button
                className="btn btn-outline btn-sm"
                disabled={formik.isSubmitting}
                type="button"
                onClick={() => {
                  resetForm();
                }}
              >
                Reset
              </button>
              <button
                className="btn btn-secondary btn-sm"
                disabled={formik.isSubmitting}
                type="submit"
              >
                {formik.isSubmitting ? "Saving" : "Save"}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};
export default AddingForm;
