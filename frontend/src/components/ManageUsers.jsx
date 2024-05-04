import React from "react";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../rtk/slices/userApiSlice";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const { data: users, isLoading } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();
  const deleteHandler = async (id) => {
    try {
      await deleteUser(id);
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Error deleting user");
    }
  };

  if (isLoading)
    return <h1 className="min-h-[90dvh] text-center mt-8">Loading...</h1>;
  return (
    <div className="container mx-auto px-4 py-32 min-h-[90dvh] ">
      <h1 className="text-3xl font-bold mb-8 text-center">Manage Users</h1>

      <table className="w-full text-center">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">NAME</th>
            <th className="py-2">EMAIL</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td className="text-secondary">{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td className="flex items-center justify-center">
                <Link
                  to={`/admin/edit-user/${user.id}`}
                  className="text-blue-500 mr-2 hover:text-blue-600 px-2 py-1 rounded bg-gray-100"
                >
                  <FaEdit />
                </Link>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  onClick={() => deleteHandler(user.id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
