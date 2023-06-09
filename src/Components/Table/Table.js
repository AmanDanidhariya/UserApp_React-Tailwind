import React from "react";
import { FaPen, FaTrash } from "react-icons/fa";

const Table = ({ data, handleUpdateUser, handleDelete }) => {
  return (
    <>
      <div className="relative overflow-x-auto">
        <table className="w-full">
          <thead data-theme="coffee" className="text-white">
            <tr>
              <th className="px-4 py-3 ">Id</th>
              <th className="px-4 py-3">Full Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">DOB</th>
              <th className="px-4 py-3">Gender</th>
              <th className="px-4 py-3">Country</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">Postal</th>
              <th className="px-4 py-3">Ph.</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((task, i) => {
                return (
                  <tr key={i}>
                    <td className=" px-4 py-3">{task.id}</td>
                    <td className=" px-4 py-3">{task.fullName}</td>
                    <td className=" px-4 py-3">{task.email}</td>
                    <td className=" px-4 py-3">{task.Dob}</td>
                    <td className="px-4 py-3 ">{task.gender}</td>
                    <td className="px-4 py-3">{task.country}</td>
                    <td className="px-4 py-3 ">{task.city}</td>
                    <td className="px-4 py-3 ">{task.postal}</td>
                    <td className="px-4 py-3  ">{task.ph}</td>
                    <td className="px-4 py-3 flex justify-between">
                      <span
                        title="delete"
                        className="cursor-pointer hover:text-red-500"
                        onClick={() => handleDelete(task.id)}
                      >
                        <FaTrash />
                      </span>
                      <span
                        title="update"
                        className="cursor-pointer hover:text-red-500"
                        onClick={() => handleUpdateUser()}
                      >
                        <FaPen />
                      </span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
