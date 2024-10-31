const axios = require('axios');

class JobController {
    static async getJobs(req, res, next) {
        const { description, location, full_time, page } = req.query;

        try {
            const response = await axios.get(`${process.env.DANS_API_URL}.json`, {
                params: { description, location, full_time, page },
            });
            const jobs = response?.data ? response.data.filter(job => job !== null) : [];

            return res.status(200).json(jobs);
        } catch (err) {
            console.error("Error fetching job list:", err);
            return next({
                name: "JobListError",
                msg: { message: "Failed to fetch job list!" },
            });
        }
    }

    static async getJobDetail(req, res, next) {
        const jobId = req.params.id;

        try {
            const response = await axios.get(`${process.env.DANS_API_URL}/${jobId}`);
            const jobDetail = response.data;

            if (!jobDetail) {
                return next({
                    name: "JobNotFound",
                    msg: { message: "Job not found!" },
                });
            }

            return res.status(200).json(jobDetail);
        } catch (err) {
            console.error("Error fetching job detail:", err);
            return next({
                name: "JobDetailError",
                msg: { message: "Failed to fetch job detail!" },
            });
        }
    }
}

module.exports = JobController;
