const { Router } = require("express");
const {User, Course} = require("../db")
const router = Router();
const userMiddleware = require("../middleware/user");


// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic
    const {username} = req.body;
    const {password} = req.body;

    await User.create({
        username,
        password
    })
    res.json({
        message: "user create successfully"
    })
});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
 const response = await Course.find({})
 res.json({
    courses: response
 })
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const {username} = req.headers;

   await User.updateOne({
        username
    },  {
        "$push": {
            purchasedCourse: courseId 
        }
    })
    res.json({
        message: "purchase complete succesfully"
    })
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
         username :  req.headers.username
    })
    const courses = await Course.find({
        _id:{
            "$in": user.purchasedCourse
        }
    })
    res.json({
        courses: courses
    })
});

module.exports = router