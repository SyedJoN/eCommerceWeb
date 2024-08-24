import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button, Logo } from "./index";
import { resetPassword } from "../store/authSlice";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'; // Update this line
import * as yup from "yup";


function ResetPassword() {
    const schema = yup.object({

        password: yup
            .string()
            .required('Password is a required field'),

    });
    const { token } = useParams();

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
                "newPassword": data.password,
            };

            if (Object.keys(user).length > 0) {
                if (token) {
                    dispatch(resetPassword({ userData: user, token })).then((status) => {
                        if (status.payload.success === true) {
                            setSuccessMsg(status.payload.message);
                            setError('')

                        } else {
                            setError(status.payload.message)
                            setSuccessMsg('')
                        }
                    })
                } else {
                    console.log('no token defined');
                }

            } else {
                setError('password is empty');
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
                <h2 className="text-center text-2xl font-bold leading-tight">Reset your password</h2>
                {successMsg && (
                    <p className="mt-2 text-center text-green-600">{successMsg}! To Login 
                    <Link to='/login'><p className="text-black underline hover:text-gray-500">Click here</p></Link>
                    </p>
                )}
                {error && (
                    <p className="mt-2 text-center text-red-600">{error}</p>
                )}

                {/* {errors && <p className="text-red-600 mt-8 text-center">{errors.message}</p>} */}
                <form onSubmit={handleSubmit(handleLogin)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="New Password: "
                            placeholder="Enter your new password"
                            type="password"
                            errorMessage={errors.password?.message}
                            {...register("password", {
                                required: true

                            })}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading} // Disable the button while loading
                        >
                            {loading ? "Confirming..." : "Confirm"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword;
