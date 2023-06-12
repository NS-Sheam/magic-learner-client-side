import React from 'react';

const SingleClassRow = ({ singleClass, i, handleDelete}) => {
    return (
        <tr>
            <td>{i + 1}</td>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={singleClass.image} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <p className="font-bold">{singleClass.title}</p>
                    </div>
                </div>
            </td>
            <td>
                <div className="flex items-center space-x-3">
                    <div>
                        <div className="font-bold">{singleClass.instructor}</div>
                    </div>
                </div>
            </td>
            <td>
                <p>${singleClass.price}</p>
            </td>

            <th className="">
                {/* TODO: payment page */}
                <label
                    onClick={() => handleDelete(singleClass._id)}
                    className="btn btn-xs border-none text-white bg-red-500 hover:bg-orange-secondary"
                >
                    Delete
                </label>
            </th>
        </tr>
    );
};

export default SingleClassRow;