"use strict";
app.service("TechnicianService", ["$q", "$http", "ENV", ($q, $http, ENV) => {
    return {
    	
        LoadTechnicians: () => {
            var defer = $q.defer();
            var url = ENV.apiEndpoint + "/technicians/LoadTechnicians";
            $http.get(url)
            .success((technicians) => {
                console.log(' ser ', technicians);
                defer.resolve(technicians);
            })
            .error((err) => {
                defer.reject(err);
            });
            return defer.promise; 
        },
        LoadTechnicianById: (technicianId) => {
            var defer = $q.defer();
            var url = ENV.apiEndpoint + "/technicians/LoadTechnicianById/" + technicianId;
            $http.get(url)
            .success((technician) => {
                defer.resolve(technician);
            })
            .error((err) => {
                defer.reject(err);
            });
            return defer.promise; 
        }
    };
}]);