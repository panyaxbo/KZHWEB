app.service("UserService", function () {
    this.User = {};
    return {User : {
    	Username: '',
    	Password: '',
    	Email: '',
    	IsActivate :false
    }};
});