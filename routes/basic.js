let express = require("express"),
    router = express.Router(),
    verifyToken = require('../middlewares/authJWT'),
    {
        signup,
        signin
    } = require("../controllers/auth.controller.js");


router.post("/register", signup, function (req, res) {

});

router.post("/login", signin, function (req, res) {

});

module.exports = router;
