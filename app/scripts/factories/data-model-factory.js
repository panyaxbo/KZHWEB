"use strict";

app.factory('DataModelFactory', ['$q', '$http', 'ENV', ($q, $http, ENV) => {
    var DataModel =  {
        user :{},
        company :{},
        browser_key :{},
        receipt :{}

    };

    DataModel.setUser = (data) => {
        DataModel.user = data;
    };

    DataModel.getUser = () => {
        return DataModel.user;
    };

    DataModel.setCompany = (data) => {
        DataModel.company = data;
    };

    DataModel.getCompany = () => {
        return DataModel.company;
    }
    
    DataModel.setBrowserKey = (data) => {
         DataModel.browser_key = data;
    };

    DataModel.getBrowserKey = () => {
        return DataModel.browser_key;
    }
    DataModel.setReceipt = (data) => {
         DataModel.receipt = data;
    };

    DataModel.getReceipt = () => {
        return DataModel.receipt;
    }
    return DataModel;
}]);