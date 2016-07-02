var express = require('express');
var router = express.Router();
var Q = require('q');

// Create Product Category
router.post('/CreateFeedback', function (req, res) {
    var Feedback = req.body;

    var createDate = new Date ();
    createDate.setHours ( createDate.getHours() + 7 );// GMT Bangkok +7
    Feedback.CreateDate = createDate;

    db.collection(mongodbConfig.mongodb.feedback.name)
        .insert(Feedback,
            function (error, result) {
                if (error) throw error
                res.json(result);
            });
});

module.exports = router;