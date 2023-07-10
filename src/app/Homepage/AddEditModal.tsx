import { editFormAtom } from "@/Store/Atoms";
import { queryClient } from "@/config/react-query-config";
import { Transition, Dialog } from "@headlessui/react";
import { useFormik } from "formik";
import { useAtom } from "jotai";
import React, { Fragment } from "react";
import { useQuery, useMutation } from "react-query";
import { getWeapons, addUpdateCharacter, validationSchema } from "./helper";
import { joinClass } from "@/utils/joinClass";

interface IAddEditModalProps {
  status: boolean;
  handleClose: () => void;
}

const AddEditModal: React.FC<IAddEditModalProps> = ({
  handleClose,
  status,
}) => {
  const { data: weaponData, status: weaponStatus } = useQuery<{
    weapons: Array<string>;
  }>("weapons", getWeapons);

  const [form, setForm] = useAtom(editFormAtom);

  const mutation = useMutation(addUpdateCharacter, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["characters"] });
      resetForm();
      formik.setSubmitting(false);
      handleClose();
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
      <Transition appear show={status} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => handleClose()}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <form onSubmit={formik.handleSubmit}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-gray-900 p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-xl  leading-6 text-primary uppercase font-semibold "
                    >
                      Create new character
                    </Dialog.Title>

                    <div className="grid grid-cols-2 gap-5 mt-3">
                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text text-sm">
                            What is your name?
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className={joinClass(
                            "input input-bordered w-full input-sm",
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
                          <span className="label-text text-sm">
                            Choice of weapon?
                          </span>
                        </label>
                        <select
                          className={joinClass(
                            "select select-bordered w-full select-sm",
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
                          <span className="label-text text-sm">
                            Description
                          </span>
                        </label>
                        <textarea
                          className="textarea textarea-bordered resize-none textarea-sm"
                          placeholder="Character Description"
                          id="description"
                          name="description"
                          onChange={formik.handleChange}
                          value={formik.values.description}
                        ></textarea>
                      </div>
                    </div>
                    <div className="mt-8 flex gap-2 justify-between">
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
                      <div className="flex gap-2">
                        <button
                          className="btn btn-ghost btn-sm"
                          disabled={formik.isSubmitting}
                          type="button"
                          onClick={() => handleClose()}
                        >
                          Close
                        </button>
                        <button
                          className="btn btn-accent btn-sm"
                          disabled={formik.isSubmitting}
                          type="submit"
                        >
                          {formik.isSubmitting ? "Saving" : "Save"}
                        </button>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </form>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default AddEditModal;
