import React from "react";
import { HiOutlineTrash, HiOutlinePencilSquare } from "react-icons/hi2";

const List: React.FC = () => {
  return (
    <>
      <div className="flex flex-col place-items-center gap-5">
        <h2 className="text-primary text-2xl font-bold uppercase">
          List of characters
        </h2>

        <div className="overflow-x-auto w-full">
          <table className="table table-md">
            <thead>
              <tr className="text-center">
                <th>ID</th>
                <th>Name</th>
                <th>Weapon</th>
                <th>Description</th>
                <th>Combat Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr className="align-top">
                <td className="align-top">03397j</td>
                <td className="align-top">John Doe</td>
                <td className="align-top">Bow and Arrow</td>
                <td className="align-top">Lorem ipsum dolor sit amet consectetur, adipisicing elit. itaxe nisi, maxime id, assumenda ea animi amet nemo tempora suscipit voluptatibus repellat quae magni architecto optio dolore ipsa labore! Iusto eaque maxime distinctio quas in.</td>
                <td className="align-top text-center">
                <div className="tooltip" data-tip="Toggle on combat status">
                  <input
                    type="checkbox"
                    className="toggle toggle-primary toggle-md"
                    checked
                    />
                    </div>
                </td>
                <td className="flex gap-2">
                  <div className="tooltip" data-tip="Delete">
                    <button className="btn btn-sm btn-error" ><HiOutlineTrash size="18" /></button>
                  </div>
                  <div className="tooltip" data-tip="Edit">
                    <button className="btn btn-sm btn-warning"><HiOutlinePencilSquare size="18" /></button>
                  </div>
                </td>
              </tr>

              <tr>
                <td>03397j</td>
                <td>John Doe</td>
                <td>Bow and Arrow</td>
                <td>Quality Control Specialist</td>
                <td className="text-center">
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked
                  />
                </td>
              </tr>

              <tr>
                <td>03397j</td>
                <td>John Doe</td>
                <td>Bow and Arrow</td>
                <td>Quality Control Specialist</td>
                <td className="text-center">
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default List;
