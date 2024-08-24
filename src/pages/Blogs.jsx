import React, { useState } from 'react';
import useRandomProducts from '../Hooks/RandomProducts';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Search from '../Components/Search';

function Blogs() {
    const authStatus = useSelector(state => state.auth.status);
    const { data } = useRandomProducts();


    return authStatus ? (
        <div className='w-full h-screen overflow-auto'>
       
            <div className='flex flex-wrap justify-center'>
                {
                    data?.map((data) => (
                        <div key={data.items.id} className='rounded-2xl m-4 p-4 border lg:w-1/4 h-min'>
                            <img
                                className='rounded-2xl w-full md:w-72 m-auto h-48 object-cover'
                                width='250px' src={data.items.snippet.thumbnails.standard.url} alt="" />

                            <div
                                className='m-4 text-center hover:text-blue-500'>
                                <h1 className='text-xl underline'>{data.items.snippet.title}</h1>


                                <p className='font-bold'>{data.items.snippet.description}</p>
                            </div>
                            <div className="flex flex-wrap justify-center space-x-2">
                                <p className='text-base text-center mt-2 italic'>Likes: {data.items.statistics.likeCount}</p>
                                <p className='text-base  text-center mt-2 italic'>Views: {data.items.statistics.viewCount}</p>
                                <p className='text-base text-center mt-2 italic'>Comments: {data.items.statistics.commentCount}</p>
                            </div>


                        </div>
                    ))}
            </div>
        </div>
    ) : <Link to='/login'><h1 className='text-center'>Login to see blogs</h1>
    </Link>;
}

export default Blogs;
