import SectionTitle from "../../../components/SectionTitle";
import useAdmin from "../../../hooks/useAdmin";
import useAllUsers from "../../../hooks/useAllUsers";

const AllUsers = () => {
    const [allUsers] = useAllUsers();
    const [userRole, isAdminLoading] = useAdmin();
    const { isAdmin, role } = userRole;
    console.log(allUsers);
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
                                            {user.role}
                                        </td>

                                        <th className="space-x-2">
                                            {
                                                !isAdmin &&
                                                <label
                                                    htmlFor="my-modal-5"
                                                    className="btn btn-xs border-none text-white bg-bandOrange hover:bg-orange-secondary"
                                                >
                                                    Make Admin
                                                </label>
                                            }
                                            {
                                                role == "student" &&
                                                <label
                                                    htmlFor="my-modal-5"
                                                    className="btn btn-xs border-none text-white bg-bandOrange hover:bg-orange-secondary"
                                                >
                                                    Make Instructor
                                                </label>
                                            }
                                            <label
                                                    htmlFor="my-modal-5"
                                                    className="btn btn-xs border-none text-white bg-bandOrange hover:bg-orange-secondary"
                                                >
                                                    Delete
                                                </label>
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