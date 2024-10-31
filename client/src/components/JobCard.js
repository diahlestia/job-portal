import React from 'react';

const calculateDaysAgo = (dateString) => {
  const createdDate = new Date(dateString);
  const currentDate = new Date();
  const timeDifference = currentDate - createdDate; // Time difference in milliseconds
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert to days
  return daysDifference;
};

const JobCard = ({ job }) => (
  <div className="job-card">
    <div className="flex justify-between mb-2">
        <span className="font-bold text-blue-600">{job?.title}</span>
        <span className="text-gray-500">{job?.location}</span>
    </div>
    <p className="flex justify-between">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-800">{job?.company}</span>
        <span className="mx-1">-</span>
        <span className="text-green-600 font-bold">{job?.type}</span>
      </div>
      <span className="text-gray-500">{calculateDaysAgo(job.created_at)} days ago</span>
    </p>
  </div>
);

export default JobCard;
