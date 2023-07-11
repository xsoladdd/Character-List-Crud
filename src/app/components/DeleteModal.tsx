import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment } from "react";

interface DeleteModalProps {
  status: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
  text?:string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  handleClose,
  handleSubmit,
  status,
  text = ''
}) => {
  return (
    <>
      <Transition appear show={status} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleClose}>
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
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Delete Warning
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {text}
                    </p>
                  </div>

                  <div className="mt-4 flex gap-2 place-content-end">
                    <button
                      type="button"
                      className="btn btn-neutral btn-sm"
                      onClick={() => handleClose()}
                    >
                      Close
                    </button>
                    <button
                      className="btn btn-error btn-sm"
                      id="confirm-delete-button"
                      type="button"
                      onClick={() => handleSubmit()}
                    >
                      Delete
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default DeleteModal;
