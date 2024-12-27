import React, { useCallback, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input, Button, Select } from "./index";
import {
  createCategory,
  fetchCategories,
  updateCategory,
} from "../store/productSlice";

function CategoryForm({ category }) {
  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (category) {
      const { name } = category;
      setValue("name", name || "");
    }
  }, [category]);

  const cancelHandler = () => {
    navigate("/database/categories");
  };

  const submit = async (data) => {
    const categoryData = {
      name: data.name,
    };

    try {
      if (category) {
        // If cat exists, update it
        const status = await dispatch(
          updateCategory({ categoryId: id, categoryData })
        );
        console.log(status)
        if (status.payload.statusCode === 200) {
          navigate("/database/categories");
          dispatch(fetchCategories());
        } else {
          console.error("Failed to update category");
        }
      } else {
        dispatch(createCategory(categoryData)).then((status) => {
          if (status.payload.statusCode === 200) {
            navigate("/database/categories");
            dispatch(fetchCategories());
          } else {
            console.error("Failed to create category");
          }
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="grid  gap-4 p-4">
      <div>
        <h1 className="text-lg font-bold m-2">Manage Category</h1>
        <form
          onSubmit={handleSubmit(submit)}
          id="checkoutForm"
          className="flex flex-wrap"
        >
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
            </div>
            <div className="flex flex-row-reverse">
              <Button
                type="submit"
                bgColor="bg-black"
                className="mt-6 hover:bg-black/80 inline-flex flex-row-reverse"
              >
                {category ? "Save" : "Submit"}
              </Button>
              <Button
                type="button"
                bgColor=""
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
export default CategoryForm;
