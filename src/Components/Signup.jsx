import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Logo } from "./index";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'; // Update this line
import { registerUser } from "../store/authSlice";
import * as yup from "yup";

function Signup() {

    const schema = yup.object({
        name: yup
            .string()
            .required('Name is a required field'),

        email: yup
            .string()
            .required('Email is a required field')
            .email('Email is not valid'),

        password: yup
            .string()
            .required('Password is a required field')

    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const loading = useSelector((state) => state.auth.isLoading); // Add loading state
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange"
    });

    const handleLogin = async (data) => {
        try {
            const user = {
                "email": data.email,
                "password": data.password,
                "role": "USER",
                "username": data.name // Use the name field as the username
            };

            // Ensure the user object is not empty before dispatching
            if (Object.keys(user).length > 0) {
                dispatch(registerUser(user)).then((status) => {
                    if (status.payload.success === true) {
                        navigate('/login')
                    } else {
                        setError(status.payload.message)
                    }
                });
                ;
            }
        } catch (error) {
            throw error;
        }


    };

    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-black md:rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up an account</h2>
                {error && <p className="mt-2 text-center text-red-600">{error}</p>}
                <p className="mt-2 text-center text-base text-white">
                    Already have any account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Login
                    </Link>
                </p>
                {/* {errors && <p className="text-red-600 mt-8 text-center">{errors.message}</p>} */}
                <form onSubmit={handleSubmit(handleLogin)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            labelColor='text-white'
                            label="Username: "
                            placeholder="Enter your name"
                            type="text"
                            errorMessage={errors.name?.message}
                            {...register("name", {
                                required: true,
                            })}
                        />
                        <Input
                            labelColor='text-white'
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            errorMessage={errors.email?.message}
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
                                        .test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            labelColor='text-white'
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            errorMessage={errors.password?.message}
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button
                            textColor='text-black'
                            bgColor="bg-white"
                            type="submit"
                            className="w-full"
                            disabled={loading} // Disable the button while loading
                        >
                            {loading ? "Signing up..." : "Sign up"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;
