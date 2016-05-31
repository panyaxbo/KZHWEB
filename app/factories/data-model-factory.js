app.factory("DataModelFactory", ["$q", "$http", "ENV", function ($q, $http, ENV) {
	var data = {
        FirstName: ''
    };
    var User = {
    	Id :"",
        RoleNameEn: "",
        Username: "",
        Password: "",
        Role: {
            RoleCode: "",
            RoleNameEn: "",
            RoleNameTh: "",
        },
        Staff: {
            Firstname: "Guest",
            Lastname: ""
        }
    };
    var Menu = {
    	SelectedMenu: ''
    };
    var Locale = {
    	SelectedLocale: ''
    };
    var ROHead = {
    	RONo: '',
    	ROLineList : []
    };
    var Page = {
    	Page : ''
    };
    User.getUser = function() {
    	return User;
    }
    User.setUser = function(data) {
    	User = data;
    }
    return {
        User
    }; 
}]);