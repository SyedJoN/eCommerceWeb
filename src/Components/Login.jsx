import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Logo } from "./index";
import { loginUser } from "../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'; // Update this line
import * as yup from "yup";


function Login() {
    const schema = yup.object({
        name: yup
            .string()
            .required('Name is a required field'),

        password: yup
            .string()
            .required('Password is a required field')

    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginError = useSelector(state => state.auth.error);
    const loading = useSelector((state) => state.auth.isLoading); // Add loading state
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange"
    });
    const [error, setError] = useState("");

    const handleLogin = async (data) => {
        console.log('Form Data:', data);
        try {
            const user = {
                "password": data.password,
                "username": data.name
            };

            if (Object.keys(user).length > 0) {
                dispatch(loginUser(user)).then((status) => {
                    if (status.payload.success === true) {
                        navigate('/')
                    } else {
                        setError(status.payload.message)

                    }
                })
            } else {
                setError('No records found! Signup');
            }
        } catch (error) {
            console.error(loginError);
            throw error;
        }
    };


    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-black md:rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="flex justify-center w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                {error && <p className="mt-2 text-center text-red-600">{error}</p>}
                <p className="mt-2 text-center text-base text-white">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
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
                        {/* <Input
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
                        /> */}
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
                            {loading ? "Signing in..." : "Sign in"}
                        </Button>
                        <Link to='/forget-password'>
                            <p
                                className="mt-2 cursor-pointer text-white hover:text-gray-400">
                                Forgot password?
                            </p>
                        </Link>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;
