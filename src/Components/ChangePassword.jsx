import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Logo } from "./index";
import { changePassword } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'; // Update this line
import * as yup from "yup";


function ChangePassword() {
    const authStatus = useSelector(state => state.auth.status);

  
    const schema = yup.object({

        password: yup
            .string()
            .required('Password is a required field'),

        newPassword: yup
            .string()
            .required('Confirm Password is a required')


    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange"
    });
    const [error, setError] = useState("");

    const handleLogin = async (data) => {
        try {
            const user = {
                "newPassword": data.newPassword,
                "oldPassword": data.password
            };

            if (Object.keys(user).length > 0) {
                dispatch(changePassword(user)).then((status) => {
                    if (status.payload.success === true) {
                        navigate('/login')
                    } else {
                        setError(status.payload.message);
                    }
                });
            } else {
                setError('password field is empty!');
            }
        } catch (error) {
            console.error(loginError);
            throw error;
        }
    };


    return authStatus? (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="flex justify-center w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Change your password</h2>
                {error && <p className="mt-2 text-center text-red-600">{error}</p>}

                {/* {errors && <p className="text-red-600 mt-8 text-center">{errors.message}</p>} */}
                <form onSubmit={handleSubmit(handleLogin)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Old Password: "
                            type="password"
                            placeholder="Enter your old password"
                            errorMessage={errors.password?.message}
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Input
                            label="New Password: "
                            type="password"
                            placeholder="Enter your new password"
                            errorMessage={errors.newPassword?.message}
                            {...register("newPassword", {
                                required: true,
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
    ) : <h1>Loading...</h1>
}

export default ChangePassword;
