import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle";
import useAdmin from "../../../hooks/useAdmin";
import useAllUsers from "../../../hooks/useAllUsers";

const AllUsers = () => {
    const [allUsers, refetch] = useAllUsers();
    // console.log(allUsers);
    const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure want to delete this user?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete User'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/users/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
                        if (data?.deletedCount > 0) {
                            Swal.fire({
                                icon: 'success',
                                title: 'User deleted successfully',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            refetch();
                        }
                    })
            }
        })


    }
    const handleMakeAdmin = email => {
        fetch(`http://localhost:5000/users?email=${email}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ isAdmin: true })
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.modifiedCount > 0) {
                    refetch();
                }
            })
    }

    const handleMakeInstructor = email => {
        fetch(`http://localhost:5000/users?email=${email}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ role: "instructor" })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    refetch();
                }
            })
    }

    return (
        <div>
            <SectionTitle heading={"All Users"}
                description={"All Users are Here"} />
            <div>
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <td>User Name</td>
                            <td>Email</td>
                            <td>Role</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {/* table row */}
                        {
                            allUsers?.map((user, i) => {
                                return (
                                    <tr key={i}>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={user.image} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="font-bold">{user.name}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div>
                                                    <div className="font-bold">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p>{user.role}</p>
                                            {
                                                user.isAdmin && <p>Admin</p>
                                            }
                                        </td>

                                        <th className="flex flex-col gap-3">
                                            {
                                                !user.isAdmin &&
                                                <>
                                                    <label
                                                        onClick={() => handleMakeAdmin(user.email)}
                                                        className="btn btn-xs border-none text-white bg-green-500 hover:bg-orange-secondary"
                                                    >
                                                        Make Admin
                                                    </label>
                                                    <label
                                                        onClick={() => handleDelete(user._id)}
                                                        className="btn btn-xs border-none text-white bg-red-500 hover:bg-orange-secondary"
                                                    >
                                                        Delete
                                                    </label>
                                                </>
                                            }
                                            {
                                                user.role == "student" &&
                                                <label
                                                    onClick={() => handleMakeInstructor(user.email)}
                                                    className="btn btn-xs border-none text-white bg-bandOrange hover:bg-orange-secondary"
                                                >
                                                    Make Instructor
                                                </label>
                                            }

                                        </th>
                                    </tr>
                                )
                            })
                        }
                        {/* table row finished */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;