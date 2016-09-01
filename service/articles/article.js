var express = require('express');
var router = express.Router();
var Q = require('q');

router.get('/LoadArticle', function(req, res) {
    db.collection('Article')
        .find({
         //   $query: {} ,
       //     $sort: { CreateDate : -1 } // Last create date show before if 1 Last createdate go to the bottom
        })
        .sort({
            CreateDate : -1
        })
        .toArray(function (err, items) {
        	if (err) {
                console.log(err, err.stack.split("\n"));
                res.status(500).send('err occur');
            } else if (!items) {
                res.status(404).send('not found !!');
            } else {
                res.json(items);
            }
        });

});
router.get('/LoadArticleById/:ArticleId', function(req, res) {
    var ArticleId = req.params.ArticleId;
    var o_id = bson.BSONPure.ObjectID(ArticleId.toString());
    var LoadArticleById = function() {
        var defer = Q.defer();
        db.collection('Article')
        .findOne({
            '_id': o_id
        }, function (err, article) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(article);
            }
        });
        return defer.promise;
    }
    var LoadUserById = function(userId) {
        var defer = Q.defer();
        var user_id = bson.BSONPure.ObjectID(userId.toString());
        db.collection('AppUser')
            .findOne({
                '_id' : user_id
            }, function (err, appuser) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(appuser);
                }
            });
        return defer.promise;
    };

    var article = {};
    LoadArticleById()
    .then(function(data, status) {
        if (!data) {
            console.log('not found article');
        } else {
            article = data;
            var userId = article.UserId;
            return LoadUserById(userId);
        }
    }, function(err, status) {
        console.log('1',err, err.stack.split("\n"));
    })
    .then(function(user, status) {
        console.log('chain user ', user);
        if (!user) {
            res.json(article);
        } else {
            article.User = user;
            console.log('artcile ', article);
            res.json(article);
        }
    }, function(err, status) {
        console.log('2', err, err.stack.split("\n"));
        res.status(500).send('err occur when load article by Id ');
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
            function (err, result) {
                if (err) {
                    console.log(err, err.stack.split("\n"));
                    res.status(500).send('err occur', err.stack.split("\n"));
                } else if (!result) {
                    res.status(404).send('not found !!');
                } else {
                    res.json(result);
                }
            });
});



module.exports = router;