export const FETCH_JOBS_REQUEST = 'FETCH_JOBS_REQUEST';
export const FETCH_JOBS_SUCCESS = 'FETCH_JOBS_SUCCESS';
export const FETCH_JOBS_FAILURE = 'FETCH_JOBS_FAILURE';
// detail
export const FETCH_JOB_DETAIL_REQUEST = 'FETCH_JOB_DETAIL_REQUEST';
export const FETCH_JOB_DETAIL_SUCCESS = 'FETCH_JOB_DETAIL_SUCCESS';
export const FETCH_JOB_DETAIL_FAILURE = 'FETCH_JOB_DETAIL_FAILURE';

export const fetchJobsRequest = () => ({ type: FETCH_JOBS_REQUEST });
export const fetchJobsSuccess = (jobs) => ({
    type: FETCH_JOBS_SUCCESS,
    payload: jobs,
});
export const fetchJobsFailure = (error) => ({
    type: FETCH_JOBS_FAILURE,
    payload: error,
});

export const fetchJobs = ({page, searchTerm, location, isFullTime, token}) => {
    console.log('Fetching jobs with:', { page, searchTerm, location, isFullTime, token });

    return async (dispatch) => {
        dispatch(fetchJobsRequest());

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/jobs?description=${searchTerm}&location=${location}&page=${page}&full_time=${isFullTime}`, {
            headers: {
                'Content-Type': 'application/json',
                'access_token': `${token}`,
            },
            });
        
            const data = await response.json();
              console.log(569, data);

            if (data && Array.isArray(data)) {
                dispatch(fetchJobsSuccess(data));
            } else {
                dispatch(fetchJobsSuccess([]));
            }
        } catch (error) {
            
            dispatch(fetchJobsFailure('Could not load jobs. Please try again.'));
        }
    };
};

export const fetchJobDetail = (jobId, token) => {
    return async (dispatch) => {
        dispatch({ type: FETCH_JOB_DETAIL_REQUEST });

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/jobs/${jobId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'access_token': `${token}`, // Include token in Authorization header
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch job detail');
            }

            const data = await response.json();
            dispatch({ type: FETCH_JOB_DETAIL_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: FETCH_JOB_DETAIL_FAILURE, payload: error.message });
        }
    };
};
