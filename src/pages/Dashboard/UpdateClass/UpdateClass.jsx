import { useLocation } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle";

const UpdateClass = () => {
    const location = useLocation();
    const classData = location?.state?.singleClass;
  const handleUpdateClass = () =>{

  }
    return (
        <div className="hero bg-base-200 min-h-screen px-4 lg:px-10 py-5">
            <SectionTitle heading={"Update your Class"}
                description={"Update and edit the class"} />
                <form onSubmit={handleUpdateClass} className="card w-4/5 shadow-2xl bg-base-100 mx-auto my-4 ">
                    <div className="card-body grid lg:grid-cols-3">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Class Name</span>
                            </label>
                            <input type="text" defaultValue={classData?.title} placeholder="Class Name" name="title" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Available Seat</span>
                            </label>
                            <input type="number" defaultValue={classData?.availableSeat} placeholder="Available Seat" name="availableseat" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Capacity</span>
                            </label>
                            <input type="number" defaultValue={classData?.capacity} placeholder="Capacity" name="capacity" className="input input-bordered" />
                        </div>
                        
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input type="number" defaultValue={+classData?.price} placeholder="Price $" name="price" className="input input-bordered" />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Class Photo</span>
                            </label>
                            <input type="file" name="photo" className="file-input file-input-bordered w-full max-w-xs" />
                        </div>
                        <div className="form-control lg:col-span-3">
                            <label className="label">
                                <span className="label-text">Class Details</span>
                            </label>
                            <textarea placeholder="Class Details" defaultValue={classData?.description} name="description" className="textarea textarea-bordered textarea-md w-full" ></textarea>
                        </div>
                        <div className="form-control mt-6 lg:col-span-3 lg:w-1/5 lg:ms-auto">
                            <button type="submit" className="btn bg-orange-primary hover:bg-orange-secondary border-none font-bold">Update Class</button>
                        </div>
                    </div>
                </form>
        </div>
    );
};

export default UpdateClass;