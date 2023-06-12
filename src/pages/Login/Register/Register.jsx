
import { AiFillGoogleCircle } from "react-icons/ai";
import { Link, json, useNavigate } from 'react-router-dom';
import "./Register.css"
import logo from "../../../assets/logo.png"
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import { useState } from "react";
const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useAuth();
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const onSubmit = data => {
        const { name, email, password, photo , confirm} = data;
        if (password != confirm) {
            setError("password have to match with confirm password")
            return
        }
        setError("")
        createUser(email, password)
        .then(async (result) => {
            const loggedUser = result.user;
            updateUserProfile(name, photo)
            .then(() =>{
                const saveUser = {name, email, role: "student", isAdmin: false}
                fetch("https://summer-camp-server-side-alpha.vercel.app/users", {
                    method: "POST",
                    headers: {
                        "content-type" : "application/json"
                    },
                    body: JSON.stringify(saveUser)
                })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                })
                navigate("/");
            })
            // console.log(loggedUser);
        })
        .catch(error=>{
            setError(error.message)
            console.log(error);
        })
    }
    return (
        <div className="hero min-h-screen bg-secondaryB py-6">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="lg:w-1/2 text-center lg:text-left text-black">
                    <Link to="" className="logo-anim text-5xl my-8 font-bold flex">
                        <img className="h-16" src={logo} alt="" />
                    </Link>
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="wlg:-1/2 card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" {...register("name", { required: true })} placeholder="name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="url" {...register("photo", { required: true })} placeholder="PhotoURL" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password"  {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 20,
                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                            })} placeholder="password" className="input input-bordered" />
                            {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                            {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                            {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                            {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>
                            }
                            {
                                error && <p className="text-red-600">{error}</p>
                            }
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            {/* TODO: Confirm Functionality */}
                            <input type="password"  {...register("confirm", { required: true })} placeholder="confirm password" className="input input-bordered" />
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn bg-bandOrange hover:bg-orange-300">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;