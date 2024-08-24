import React, { useCallback, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input, Button, Select } from "./index";
import { createCoupon, getCoupons, setCouponStatus, updateCoupon } from "../store/productSlice";

function CouponForm({ coupon }) {

  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { register, handleSubmit, watch, setValue, control, getValues } = useForm();
  const currentDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (coupon) {
      const { name, couponCode, discountValue, minimumCartValue, startDate, expiryDate, isActive } = coupon;
      setValue('name', name || '');
      setValue('type', 'FLAT');
      setValue('couponCode', couponCode || '');
      setValue('discountValue', discountValue || '');
      setValue('minimumCartValue', minimumCartValue || '');

      const formattedStartDate = startDate ? new Date(startDate).toISOString().slice(0, 10) : '';
      const formattedExpiryDate = expiryDate ? new Date(expiryDate).toISOString().slice(0, 10) : '';

      setValue('startDate', formattedStartDate || '');
      setValue('expiryDate', formattedExpiryDate || '');
      setValue('status', isActive ? 'Active' : 'Inactive');
    } else {
      setValue('startDate', currentDate)
    }
  }, [coupon])

  const cancelHandler = () => {
    navigate('/database/coupons')
  }

  const submit = async (data) => {

    const inputStartDate = new Date(data.startDate);
    const inputExpiry = new Date(data.expiryDate);

    const startDateOutput = inputStartDate.toISOString();
    const expiryDateOutput = inputExpiry.toISOString();

    const couponData = {
      "name": data.name,
      "couponCode": data.couponCode,
      "type": 'FLAT',
      "discountValue": data.discountValue,
      "minimumCartValue": data.minimumCartValue,
      "expiryDate": expiryDateOutput,
      "startDate": startDateOutput
    };

    const activeStatus = {
      "isActive": data.status === 'Active' ? true : false
    };

    try {
      if (coupon) {
        // If coupon exists, update it
        await dispatch(updateCoupon({ couponId: id, couponData }));
        const status = await dispatch(setCouponStatus({ couponId: id, couponData: activeStatus }));

        if (status.meta.requestStatus === 'fulfilled') {
          navigate('/database/coupons');
          dispatch(getCoupons());
        } else {
          console.error('Failed to update coupon status');
        }
      } else {

        dispatch(createCoupon(couponData)).then((status) => {

          if (status.meta.requestStatus === 'fulfilled') {

            navigate('/database/coupons');
            dispatch(getCoupons());
          } else {

            console.error('Failed to create coupon');
          }
        });

      }
    } catch (error) {
      console.error('Error:', error);
    }
  };




  return (
    <div className="grid  gap-4 p-4">
      <div>
        <h1 className="text-lg font-bold m-2">Manage Coupons</h1>
        <form onSubmit={handleSubmit(submit)} id="checkoutForm" className="flex flex-wrap">
          <div className="w-full px-2 mb-4">
            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2 mb-4">
                <Input
                  label="Name "
                  placeholder=""
                  required="true"

                  {...register("name", { required: true })}
                />
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                {/* Hidden input for submitting the value */}
                <input
                  type="hidden"
                  value="FLAT"
                  {...register("type", { required: true })}
                />

                {/* Disabled input for displaying to the user */}
                <Input
                  label="Type "
                  placeholder=""
                  required={true}
                  disabled={true}
                  value='FLAT'
                  className="bg-gray-200 text-gray-500 cursor-not-allowed"
                />
              </div>

            </div>

            <Input
              label="Coupon Code"
              placeholder=""
              className="mb-4"
              {...register("couponCode", { required: true })}
            />

            <div className="flex flex-wrap -mx-2  mt-2">
              <div className="w-full md:w-1/2 px-2 mb-4">
                <Input
                  label="Discount Value "
                  placeholder=""
                  required="true"
                  {...register("discountValue", { required: true })}
                />
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <Input
                  label="Minimum cart value"
                  placeholder=""
                  required="true"
                  {...register("minimumCartValue", { required: true })}
                />
              </div>
            </div>


            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/3 px-2 mb-4">
                <Input
                  type="date"
                  label="Start Date"
                  placeholder=""
                  disabled={coupon ? false : true}
                  required="true"
                  className={`${!coupon ? 'text-gray-500 cursor-not-allowed' : ''}`}
                  {...register("startDate", { required: true })}
                />
              </div>
              <div className="w-full md:w-1/3 px-2 mb-4">
                <Input
                  type="date"
                  label="Expiry Date "
                  required="true"
                  placeholder=""
                  {...register("expiryDate", { required: true })}
                />
              </div>
              {coupon && (
                <div className="w-full md:w-1/3 px-2">
                  <Select
                    required={true}
                    options={['Active', 'Inactive']}
                    label="Is Active "
                    placeholder=""
                    {...register("status", { required: true })}
                  />
                </div>
              )}

            </div>
            <div className="flex flex-row-reverse">
              <Button
                type="submit"
                bgColor='bg-black'
                className="mt-6 hover:bg-black/80 inline-flex flex-row-reverse"
              >
                {coupon ? 'Save' : 'Submit'}
              </Button>
              <Button
                type="button"
                bgColor=''
                onClick={cancelHandler}
                textColor="text-black"
                className="mt-6 hover:text-black/80 ml-2"
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>




    </div>
  );

}
export default CouponForm;
