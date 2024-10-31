import {
    FETCH_JOBS_REQUEST,
    FETCH_JOBS_SUCCESS,
    FETCH_JOBS_FAILURE,
    FETCH_JOB_DETAIL_REQUEST,
    FETCH_JOB_DETAIL_SUCCESS,
    FETCH_JOB_DETAIL_FAILURE,
} from './action';

const initialState = {
    jobs: [],
    jobDetail: {},
    loading: false,
    error: '',
};

const jobReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_JOB_DETAIL_REQUEST:
            return { ...state, loading: true, error: '' };
        case FETCH_JOB_DETAIL_SUCCESS:
            return { ...state, loading: false, jobDetail: action.payload };
        case FETCH_JOB_DETAIL_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case FETCH_JOBS_REQUEST:
            return { ...state, loading: true, error: '' };
        case FETCH_JOBS_SUCCESS:
            return { ...state, loading: false, jobs: action.payload };
        case FETCH_JOBS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default jobReducer;
