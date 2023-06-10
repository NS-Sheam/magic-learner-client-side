

import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
const img_hosting_token = import.meta.env.VITE_IMAGE_HOSTING_TOKEN;
const AddClass = () => {
    const { user } = useAuth();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`
    console.log(img_hosting_url);

    const handleAddClass = (event) => {
        event.preventDefault();
        const form = event.target;
        const instructor = form.instructor.value;
        const email = form.email.value;
        const title = form.title.value;
        const imageFile = form.photo.files[0];
        const capacity = form.capacity.value;
        const price = form.price.value;
        const description = form.description.value;
        
        const formData = new FormData();
        formData.append("image", imageFile);
        
        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imgData => {
            if (imgData.success) {
                const imgURL = imgData.data.display_url;
                const addedClassDetails = {
                    instructor,
                    email,
                    title,
                    image: imgURL,
                    capacity,
                    price,
                    description, 
                    status: "pending"
                };
                
                fetch("http://localhost:5000/classes", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(addedClassDetails)
                })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    if (data.insertedId) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Class Added',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
    };

    return (
        <div className="hero bg-base-200 min-h-screen px-4 lg:px-10 py-5">
            <div className="">
                <div className="text-center my-10 space-x-4">
                    <h1 className="text-2xl lg:text-4xl font-bold my-4 lg:my-8 text-center text-orange-primary">Add Toys</h1>
                    <p className=" text-blue-dark">Attention Toy Sellers! Start showcasing your amazing collection of toys on our platform and connect with toy enthusiasts from all over the world. Adding your toys to our website is quick and easy.</p>
                </div>
                <form onSubmit={handleAddClass} className="card w-4/5 shadow-2xl bg-base-100 mx-auto my-4 ">
                    <div className="card-body grid lg:grid-cols-3">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Instructor Name</span>
                            </label>
                            <input readOnly type="text" placeholder="Instructor Name" name="instructor" className="input input-bordered" defaultValue={user?.displayName} />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input readOnly type="email" placeholder="email" name="email" className="input input-bordered" defaultValue={user?.email} />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Class Name</span>
                            </label>
                            <input type="text" placeholder="Class Name" name="title" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Available Seat</span>
                            </label>
                            <input type="text" placeholder="Available Seat" name="availableSeat" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Capacity</span>
                            </label>
                            <input type="text" placeholder="Capacity" name="capacity" className="input input-bordered" />
                        </div>
                        
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input type="text" placeholder="Price $" name="price" className="input input-bordered" />
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
                            <textarea placeholder="Class Details" name="description" className="textarea textarea-bordered textarea-md w-full" ></textarea>
                        </div>
                        <div className="form-control mt-6 lg:col-span-3 lg:w-1/5 lg:ms-auto">
                            <button type="submit" className="btn bg-orange-primary hover:bg-orange-secondary border-none font-bold">Add Class</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddClass;