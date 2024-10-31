import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMatch } from '@tanstack/react-location';
import { fetchJobDetail } from '../store/action';
import Navbar from '../components/Navbar'
import Loading from '../components/Loading'


const JobDetailPage = () => {
    const match = useMatch();
    const { id } = match.params;
    const dispatch = useDispatch();    

    const { jobDetail, loading, error } = useSelector((state) => ({
        jobDetail: state.job.jobDetail,
        loading: state.job.loading,
        error: state.job.error,
    }));

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            dispatch(fetchJobDetail(id, token)); // Dispatch action to fetch job detail
        }
    }, [dispatch, id]);


    if (loading) {
        return <Loading />;
    }

    return (
        <div className="container mx-auto p-4">
            {/* Job Header */}
            <Navbar />

            {/* Back Button */}
            <div className="mb-6 mt-4">
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center bg-blue-500 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-600"
                >
                    <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                    Back
                </button>
            </div>

            <div className="p-6 border border-gray-300 rounded-md shadow-md">
            {/* Body */}
                <div className="mb-6">
                    <p className="text-gray-600 mb-2">{jobDetail?.type} / {jobDetail?.location}</p>
                    <h1 className="text-3xl font-bold mb-2">{jobDetail?.title}</h1>
                    <a href={jobDetail?.company_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mb-4 inline-block">
                        {jobDetail?.company}
                    </a>
                </div>

                <div className="flex">
                    {/* Job Description */}
                    <div className="flex-grow">
                        <div className="mt-4 mb-6" dangerouslySetInnerHTML={{ __html: (jobDetail?.description) }} />
                    </div>

                    {/* Company Info */}
                    <div className="ml-4">
                        <div className="flex items-center p-4 border rounded-md shadow-md mb-4">
                            <img src={jobDetail?.company_logo} alt={jobDetail?.company} className="w-16 h-16 mr-4" />
                            <div>
                                <h3 className="text-xl font-semibold">{jobDetail?.company}</h3>
                                <a 
                                    href={jobDetail?.company_url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-blue-500 hover:underline"
                                >
                                    {jobDetail?.company_url}
                                </a>
                            </div>
                        </div>

                        {/* How to Apply */}
                        <div className="p-4 border rounded-md max-h-64 overflow-y-auto">
                            <h2 className="text-2xl font-semibold mb-2">How to Apply</h2>
                            <div 
                                className="text-sm"
                                dangerouslySetInnerHTML={{ __html: jobDetail?.how_to_apply }} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ); 
};

export default JobDetailPage;
