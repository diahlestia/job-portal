const express = require('express');
const router = express.Router();
const Authentication = require("../middlewares/authentication");

const UserController = require('../controllers/user.controller')
const JobController = require('../controllers/job.controller')

router.post("/login", UserController.login);
router.post("/register", UserController.register);

router.use(Authentication);

router.get("/jobs", JobController.getJobs);
router.get("/jobs/:id", JobController.getJobDetail);
 

module.exports = router