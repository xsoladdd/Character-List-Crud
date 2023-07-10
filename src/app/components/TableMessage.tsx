import React  from 'react'

interface ITableMessageProps {
  colspan?:number;
  message:string;
}

 const TableMessage: React.FC<ITableMessageProps> = ({message,colspan = 6}) => {
    return (<>
     <tr className="">
        <td className="align-top text-center " colSpan={colspan}>
          {message}
        </td>
      </tr></>);
}
export default TableMessage