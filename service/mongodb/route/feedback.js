var express = require('express');
var router = express.Router();
var Q = require('q');

// Create Product Category
router.post('/CreateFeedback', (req, res) => {
    var Feedback = req.body;

    var createDate = new Date ();
    createDate.setHours ( createDate.getHours() + 7 );// GMT Bangkok +7
    Feedback.CreateDate = createDate;

    db.collection('Feedback')
        .insert(Feedback, (err, result) => {
                if (err) {
                    console.log(err, err.stack.split("\n"));
                    res.status(500).json('There is error occur');
                } else {
                    res.status(200).json(result);
                }
            });
});

module.exports = router;