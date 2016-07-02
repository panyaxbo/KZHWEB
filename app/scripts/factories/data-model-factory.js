'use strict';

app.factory('DataModelFactory', ['$q', '$http', 'ENV', 
    function ($q, $http, ENV) {
    var DataModel =  {
        user :{},
        company :{},
        browser_key :{},
        receipt :{}

    };

    DataModel.setUser = function (data) {
        DataModel.user = data;
    };

    DataModel.getUser = function () {
        return DataModel.user;
    };

    DataModel.setCompany = function (data) {
        DataModel.company = data;
    };

    DataModel.getCompany = function() {
        return DataModel.company;
    }
    
    DataModel.setBrowserKey = function (data) {
         DataModel.browser_key = data;
    };

    DataModel.getBrowserKey = function() {
        return DataModel.browser_key;
    }
    DataModel.setReceipt = function (data) {
         DataModel.receipt = data;
    };

    DataModel.getReceipt = function() {
        return DataModel.receipt;
    }
    return DataModel;
}]);