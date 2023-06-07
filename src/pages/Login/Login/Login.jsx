
import { AiFillGoogleCircle } from "react-icons/ai";
import { Link } from 'react-router-dom';
import "./Login.css"
import logo from "../../../assets/logo.png"
import { useForm } from "react-hook-form";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data =>{
        console.log(data);
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
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input {...register("name", { required: true })} type="text" placeholder="password" className="input input-bordered" />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn bg-bandOrange hover:bg-orange-300">Login</button>
                        </div>
                        <div className="flex text-xl justify-center items-center py-2 px-3 btn btn-outline">
                            <AiFillGoogleCircle className="text-2xl"/> <p className="text-xl">Login with Google</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;