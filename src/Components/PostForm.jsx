import React, { useCallback, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import RTE from './RTE'
import { Input, Button, Select } from "./index";
import { createProduct, updateProduct, fetchCategories, removeSubImages, getProductById } from "../store/productSlice";

function PostForm({ product }) {

    const dispatch = useDispatch();
    const specificProduct = useSelector(state => state.product.specificProduct)
    const navigate = useNavigate();
    const categories = useSelector(state => state.product.categories);
    const [processedSubImages, setProcessedSubImages] = useState(product?.subImages || []);
    const [processedMainImage, setProcessedMainImage] = useState(product?.mainImage.url);
    const fileRef = useRef();
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleMainImageChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const imageUrl = URL.createObjectURL(selectedFile);
            setProcessedMainImage(imageUrl);
        }
    };
    const handleSubImageChange = (e) => {
        const files = e.target.files;
        if (files.length + processedSubImages?.length > 4) {
            alert('You can select a maximum of 4 images.');
            return;
        }

        processImages(Array.from(files));
        // Clear previously selected files by resetting the input
        fileRef.current.value = null;
    };

    // Use a useEffect to process files and create object URLs
    useEffect(() => {
        if (selectedFiles.length > 0) {
            processImages(selectedFiles);
        }
    }, [selectedFiles]);

    // Function to process images and limit their count
    const processImages = (files) => {
        const uniqueImages = files.reduce((unique, file) => {
            const existing = processedSubImages?.some(existingImage => existingImage.localPath === file.name);
            if (!existing) {
                unique.push({
                    url: URL.createObjectURL(file),
                    localPath: `local/path/${file.name}`,
                    file // Add the 'file' property to indicate it's already a file
                });
            }
            return unique;
        }, []);

        const remainingSpace = 4 - processedSubImages?.length;
        const newImages = uniqueImages.slice(0, remainingSpace);
        if (product) {
          
            setProcessedSubImages((prevProcessedImages) => [...prevProcessedImages, ...newImages]);

        } else {
            setProcessedSubImages((prevProcessedImages) => [...prevProcessedImages, ...newImages]);

        }
    };





    const { register, handleSubmit, watch, setValue, control, getValues } = useForm();
    useEffect(() => {
        if (product) {
            const { name, category, description, mainImage, price, stock, subImages } = product;
            setValue('name', name || '');
            setValue('category', category || '');
            setValue('description', description || '');
            setValue('mainImage', mainImage.url || '');
            setValue('price', price || '');
            setValue('stock', stock || '');
            setValue('subImage', subImages.url || '');
        }
        dispatch(fetchCategories())

    }, [product])
    useEffect(() => {
        dispatch(getProductById(product?._id));

    }, [])
    const deleteHandler = async (subImageId) => {
        try {
            if (subImageId?.length) {
                // Dispatch action and wait for response
                dispatch(removeSubImages({ productId: product._id, subImageId })).then((status) => {
                    if (status.payload.statusCode === 200) {
                        setProcessedSubImages(status.payload.data.subImages);
                        setSelectedFiles((prevSelectedFiles) =>
                            prevSelectedFiles.filter((file, index) => index !== subImageId)
                        );
                        console.log({
                            payload: status.payload.data.subImages,
                            processedSubImages,
                            specificProduct: specificProduct.subImages,
                        });
                    }
                })

            } else {
                // Update state locally if ID is not an array
                const updatedProcessedImages = [...processedSubImages];
                updatedProcessedImages.splice(subImageId, 1);
                setProcessedSubImages(updatedProcessedImages);
                setSelectedFiles((prevSelectedFiles) =>
                    prevSelectedFiles.filter((file, index) => index !== subImageId)
                );
            }
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };



    const appendFilesToFormData = async (formData, imagesArray) => {
        for (const image of imagesArray) {
            try {
                const isExistingImage = specificProduct?.subImages.some(
                    existingImage => existingImage.localPath === image.localPath
                );

                if (!isExistingImage) {
                    if (image.file instanceof File) {
                        formData.append('subImages', image.file);
                        console.log('appended')
                    } else {
                        const response = await fetch(image.url);
                        if (!response.ok) {
                            throw new Error(`Failed to fetch image: ${image.url}`);
                        }

                        const blob = await response.blob();
                        if (!blob.size) {
                            throw new Error(`Invalid blob for image: ${image.url}`);
                        }

                        const file = new File([blob], image.localPath, { type: blob.type });
                        formData.append('subImages', file);
                        console.log('appended')

                    }
                }
            } catch (error) {
                console.error('Error processing image:', error);
            }
        }
    };






    const submit = async (data) => {

        try {

            if (!processedSubImages || processedSubImages.length === 0) {
                alert('Please add at least one sub-image.');
                return;
            }
            const formData = new FormData();


            if (product) {
                formData.append('name', data.name);
                formData.append('category', data.category);
                formData.append('description', data.description);
                formData.append('price', data.price);
                formData.append('stock', data.stock);
                formData.append('mainImage', data.mainImage[0]);

                await appendFilesToFormData(formData, processedSubImages);





                dispatch(updateProduct({ id: product._id, userData: formData })).then((action) => {
                    const dbProduct = action.payload.data;
                    if (dbProduct && action.payload.statusCode === 200) {
                        console.log(formData, 'formData')
                        navigate(`/product/${dbProduct._id}`);
                    }
                });
            } else {
                // For creating a new product
                formData.append('name', data.name);
                formData.append('category', data.category);
                formData.append('description', data.description);
                formData.append('price', data.price);
                formData.append('stock', data.stock);
                formData.append('mainImage', data.mainImage[0]);


                await appendFilesToFormData(formData, processedSubImages);


                dispatch(createProduct(formData)).then((action) => {
                    const dbProduct = action.payload.data;
                    if (dbProduct) {
                        console.log(dbProduct)
                        navigate(`/product/${dbProduct._id}`);
                    }
                });
            }
        } catch (error) {
            console.error('Form Submission Error:', error.message);

        }
    };


    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Name :"
                    placeholder="Name"
                    className="mb-4"
                    {...register("name", { required: true })}
                />
                <Input
                    label="Price :"
                    placeholder="Price"
                    className="mb-4"
                    {...register("price", { required: true })}

                />
                <Input
                    label="Stock :"
                    placeholder="Stock"
                    className="mb-4"
                    {...register("stock", { required: true })}

                />
                <RTE
                    label="Description :"
                    name="description"
                    control={control}
                    defaultValue={product ? product.description : ''}
                />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Product Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif, image/webp"
                    {...register("mainImage", { required: !product })}
                    onChange={handleMainImageChange}

                />
                {product ? (
                    <div className="w-full mb-4">
                        <img
                            src={processedMainImage}
                            alt={product?.title}
                            className="rounded-lg h-64"
                        />
                    </div>
                ) : processedMainImage ? (
                    <div className="w-full mb-4">
                        <img
                            src={processedMainImage}
                            alt={processedMainImage}
                            className="rounded-lg h-64"
                        />
                    </div>
                ) : null}

                <Input
                    label="Sub Images :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif, image/webp"
                    {...register("subImage", { required: false })}
                    multiple={true}
                    onChange={handleSubImageChange}
                    ref={fileRef}
                    value={selectedFiles}
                // style={{ display: 'none' }}
                />
                {product
                    ? processedSubImages?.map((subImage, index) => (
                        <div className="productSubImages relative inline-block m-1 mb-4" key={index}>
                            <img
                                src={subImage.url}
                                alt={subImage.localPath}
                                className="rounded-lg w-32"
                            />
                            <div
                                onClick={() => { deleteHandler(subImage._id) }}
                                className="absolute top-0 right-0 bg-white cursor-pointer w-4">&#10060;
                            </div>
                        </div>
                    ))
                    : processedSubImages?.map((subImage, index) => (
                        <div className="processedSubImages relative inline-block m-1 mb-4" key={index}>
                            <img
                                src={subImage.url}
                                alt={subImage.localPath}
                                className="rounded-lg w-32"
                            />
                            <div
                                onClick={() => deleteHandler(index)}
                                className="absolute top-0 right-0 bg-white cursor-pointer w-4">&#10060;
                            </div>
                        </div>
                    ))
                }

                <Select
                    options={categories}
                    label="Status"
                    className="mb-4"
                    {...register("category", { required: true })}
                />
                <Button
                    type="submit"
                    bgColor={product ? "bg-green-500" : undefined}
                    className="w-full"
                >
                    {product ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
export default PostForm;
