import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Logo } from "./index";
import { forgotPassword } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'; // Update this line
import * as yup from "yup";


function ForgetPassword() {
    const schema = yup.object({

        email: yup
            .string()
            .required('Email is a required field')
            .email('Email is not valid'),

    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginError = useSelector(state => state.auth.error);
    const loading = useSelector(state => state.auth.isLoading);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange"
    });
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleLogin = async (data) => {
        try {
            const user = {
                "email": data.email,
            };

            if (Object.keys(user).length > 0) {
                dispatch(forgotPassword(user)).then((status) => {
                    if (status.payload.success === true) {
                        setSuccessMsg(status.payload.message);
                        setError('')
                    } else {
                        setError(status.payload.message);
                        setSuccessMsg('')
                    }
                });
            } else {
                setError('email is empty');
            }
        } catch (error) {
            console.error(loginError);
            throw error;
        }
    };


    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="flex justify-center w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Retrieve your password</h2>
            
                {!error && successMsg && (
                    <p className="mt-2 text-center text-green-600">{successMsg}</p>
                )}
                {!successMsg && error && (
                    <p className="mt-2 text-center text-red-600">{error}</p>
                )}


                {/* {errors && <p className="text-red-600 mt-8 text-center">{errors.message}</p>} */}
                <form onSubmit={handleSubmit(handleLogin)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
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
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading} // Disable the button while loading
                        >
                            {loading ? "Submitting..." : "Submit"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgetPassword;
