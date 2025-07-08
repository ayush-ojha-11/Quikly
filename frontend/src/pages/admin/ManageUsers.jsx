import { useEffect } from "react";
import Swal from "sweetalert2";
import { useAdminStore } from "../../store/useAdminStore";
const ManageUsers = () => {
  const { stats, loading, users, fetchUsers, deleteUser } = useAdminStore();

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete user!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(user);
      }
    });
  };
  return (
    <div>
      <h2 className="text-3xl font-bold">Total registered users</h2>
      <p className="text-2xl ml-2">
        {stats?.totalSellers + stats?.totalBuyers}
      </p>

      {loading ? (
        <h1 className="text-center">Loading all users...</h1>
      ) : (
        <div className="mt-6">
          <div className="space-y-4">
            {users?.map((user) => (
              <div
                key={user._id}
                className="flex justify-between items-center p-4 rounded-lg shadow-lg bg-base-100"
              >
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-base-content/50">{user.email}</p>
                </div>
                <button
                  onClick={() => handleDeleteUser(user)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default ManageUsers;
