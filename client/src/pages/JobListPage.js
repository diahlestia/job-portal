import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import JobCard from '../components/JobCard';
import Pagination from '../components/Pagination';
import { fetchJobs } from '../store/action';
import { useNavigate, Link } from '@tanstack/react-location';
import Navbar from '../components/Navbar'
import Loading from '../components/Loading'

function JobListPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [isFullTime, setIsFullTime] = React.useState(true);
    const [page, setPage] = React.useState(1);
    const [shouldFetch, setShouldFetch] = React.useState(true);

    const { jobs, loading, error } = useSelector((state) => ({        
        jobs: state.job.jobs,
        loading: state.job.loading,
        error: state.job.error,
      }));      
      
    const token = localStorage?.getItem('authToken');
    
    useEffect(() => {
        
        if (shouldFetch) {
          // Fetch jobs only if shouldFetch is true
          dispatch(fetchJobs({ page, searchTerm, location, isFullTime, token }));
          setShouldFetch(false); // Reset the flag
        }
      }, [dispatch, page, shouldFetch, searchTerm, location, isFullTime, token, navigate]);
    
    if (loading) {
        return <Loading />;
    }
    
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    const handleFullTimeChange = (e) => {
        setIsFullTime(e.target.checked); // Set state based on checkbox
    };

    const handleSearchClick = () => {
        setShouldFetch(true); // Trigger the fetch on button click
    };

    return (
        <div className="p-4">
            {/* Job Header */}
            <Navbar />

            {/* Job Search */}
            <div className="mb-4 flex items-center mt-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Filter by Job Description"
                    className="border p-2 rounded w-2/5 mb-2 mr-2"
                />
                <input
                    type="text"
                    value={location}
                    onChange={handleLocationChange}
                    placeholder="Filter by Job Location"
                    className="border p-2 rounded w-2/5 mb-2 mr-2"
                />
                <div className="mb-2 mr-2">
                    <label>
                        <input
                            type="checkbox"
                            checked={isFullTime}
                            onChange={handleFullTimeChange}
                        />
                        Full Time
                    </label>
                </div>
                <button
                    onClick={handleSearchClick}
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Search
                </button>
            </div>

            {/* Body */}
            {/* Job List Wrapper with border */}
            <div className="border border-gray-300 rounded-lg p-4">
                {loading ? (
                    <p>Loading jobs...</p>
                    // TODO: Create loading component
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <ul className="space-y-2">
                        <h1 className="py-4 text-2xl font-bold mb-4 border-b border-gray-300">Job List</h1>

                        {jobs?.map((job, index) => (
                            <li key={job?.id} className={`py-4 border-b ${index !== jobs.length - 1 ? 'border-gray-300' : ''}`}>
                                <Link to={`/jobss/${job.id}`}>
                                    <JobCard job={job} />
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <Pagination
                currentPage={page}
                onPageChange={(newPage) => {
                    setPage(newPage);
                    setShouldFetch(true);
                }}
            />

        </div>
    );
}

export default JobListPage;
