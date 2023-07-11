import React from "react";
import { ImSpinner2 } from "react-icons/im";

const TableLoader: React.FC = () => {
  return (
    <>
      <tr test-id="table-loader">
        <td className="w-full  " colSpan={6}>
          <div className="flex place-content-center">
            <ImSpinner2 className="animate-spin " size={30} />
          </div>
        </td>
      </tr>
    </>
  );
};
export default TableLoader;
