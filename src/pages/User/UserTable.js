import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Pagination from "../../Components/Pagination/Pagination";
import Table from "../../Components/Table/Table";
import updateUserForm from "../../Components/UpdateUserForm/UpdateUserForm";
import { useNavigate } from "react-router-dom";
import DeletePopup from "../../Components/DeletePopup/DeletePopup";
import dummy_data from "../../MockData.json";

const User = () => {
  const Navigate = useNavigate();
  const [deleteId, setDeleteId]= useState();
  const [showPopup, setShowPopup] = useState(false);
  const [userList, setUserList] = useState(dummy_data);
  const [selectedField, setSelectField] = useState(""); // using for sorting
  const [sortOrder, setSortOrder] = useState("asc"); //using for asc desc order
  const [currentPage, setCurrentPage] = useState(1); //using for pagination
  const [find, setFind] = useState(""); // using for search the table value
  const itemsPerPage = 10;

  //function to handle pageNumber
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  //function for handle option field value
  const handleFieldSelection = (event) => {
    setSelectField(event.target.value);
  };
  //function for handle sorting value (asc,desc)
  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleCancelDelete = () => {
    setShowPopup(false);
  };
  const handleShowDelete = (id) => {
    setDeleteId(id);
    setShowPopup(true);
  };
  //function for delete user from userTable
  const handleDelete = () => {
    const deleteTask = userList.filter((task) => task.id !== deleteId);
    setUserList(deleteTask);
    setShowPopup(false);
  };
  //function for update user Detail
  const handleUpdateUser = () => {
    Navigate("/updateUserForm");
  };
  //searchbar logic start
  const handleSearch = (e) => {
    //getting searchbar value
    setFind(e.target.value);
  };
 
  const search = (data) => {
    return data.filter(
      (item) =>
        item.fullName.toLowerCase().includes(find) ||
        item.email.toLowerCase().includes(find)
    );
  };
  const searchData = search(userList); //passing dummy_data to search function for searching
  //searchbar logic end

  //pagination logic start
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = searchData.slice(startIndex, endIndex); // pass search data into pagination
  //pagination logic end

  //logic for sorting start
  const sortedData = currentData.sort((a, b) => {
    //pass current data to sorted data for sorting the table data
    if (sortOrder === "asc") {
      return a[selectedField]?.localeCompare(b[selectedField]) || 0;
    } else {
      return b[selectedField]?.localeCompare(a[selectedField]) || 0;
    }
  });
  //logic for sorting end

  return (
    <>
      <Navbar />
      <div className="flex justify-evenly flex-col md:flex-row ">
        {/* searchbar start */}
        <div className="mt-6 text-gray-600 z-0 flex xs:justify-center ">
          <input
            className="border-4  bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            type="search"
            name="search"
            placeholder="Search"
            value={find}
            onChange={handleSearch}
          />
          <button type="submit" className=" right-0 top-0 mt-5 mr-4"></button>
        </div>
        {/* searchbar end */}
        {/* filter section start*/}
        <div className="flex justify-center my-6 ml-6 ">
          <label className=" mb-2 text-lg font-medium text-gray-900 dark:text-white ">
            Sort By:
          </label>
          <select
            className="ml-2 font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block 
             p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={selectedField}
            onChange={handleFieldSelection}
          >
            <option defaultValue>select a value</option>
            <option value="fullName">fullName</option>
            <option value="email">Email</option>
            <option value="date">Date</option>
          </select>
        </div>
        {/* sorting direction */}
        <div className="my-6 xs:flex xs:justify-center ">
          <label className=" mb-2 text-lg font-medium text-gray-900 dark:text-white ">
            direction:
          </label>
          <select
            className="ml-2 font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block 
             p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={sortOrder}
            onChange={handleSortOrderChange}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        {/* sorting direction  */}
        {/* filter section end */}
      </div>

      <div className="flex justify-center ">
        <div
          className="my-4 mx-4 rounded overflow-x-auto sm:overflow-auto"
          data-theme="garden"
        >
          <Table
            data={sortedData}
            handleDelete={handleShowDelete}
            handleUpdateUser={handleUpdateUser}
          />
          <Pagination
            totalItems={userList.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      {showPopup && (
        <DeletePopup onDelete={handleDelete} onCancel={handleCancelDelete} />
      )}
    </>
  );
};

export default User;
