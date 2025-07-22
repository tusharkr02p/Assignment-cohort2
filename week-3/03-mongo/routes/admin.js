const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course} = require("../db");
const router = Router();

// Admin Routes
router.post('/signup', async(req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    // Implement admin signup logic
    await Admin.create({
        username: username,
        password: password
    })
    res.json({
        message: "Admin create successfully"
    })
});

router.post('/courses', adminMiddleware, async(req, res) => {
    // Implement course creation logic
    const { title  } = req.body;
    const { description } = req.body;
    const { imageLink } = req.body;
    const { price } = req.body;

      const newCourse = await Course.create({
        title,
        description,
        price,
        imageLink
     })
     res.json({
        msg: "Course created successfully", Course_id : newCourse._id
     })

});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic

    const response = await Course.find({})
    res.json({
        courses: response
    })
});

module.exports = router;