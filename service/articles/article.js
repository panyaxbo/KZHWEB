var express = require('express');
var router = express.Router();
var Q = require('q');

router.get('/LoadArticle', function(req, res) {
    db.collection('Article')
        .find({})
        .toArray(function (err, items) {
        	if (err) {

        	} else {
	            console.log(items);
	            res.json(items);
	        }
        });

});
router.get('/LoadArticleById/:ArticleId', function(req, res) {
    var ArticleId = req.params.ArticleId;
    var o_id = bson.BSONPure.ObjectID(ArticleId.toString());
    db.collection('Article')
        .findOne({
            '_id': o_id
        }, function (err, doc) {
            if (err) {
                console.log(err);
                //       callback(err);
            } else {
                // call your callback with no error and the data
            //    console.log(doc);
                //     callback(null, doc);
                res.json(doc);
            }
        });

});
router.post('/CreateArticle', function(req, res) {
	var Article = req.body;
    console.log('create product ' + Article);
    var createDate = new Date ();
 //   createDate.setHours ( createDate.getHours() + 7 );// GMT Bangkok +7
    Article.CreateDate = createDate;
    Article.UpdateDate = createDate;
    
    db.collection('Article')
        .insert(Article,
            function (error, result) {
                if (error) throw error
                res.json(result);
            });
});



module.exports = router;