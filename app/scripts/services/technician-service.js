app.service("TechnicianService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
    return {
    	
        LoadTechnicians: function() {
            var defer = $q.defer();
            var url = ENV.apiEndpoint + "/technicians/LoadTechnicians";
            $http.get(url)
            .success(function (technicians) {
                console.log(' ser ', technicians);
                defer.resolve(technicians);
            })
            .error(function (err) {
                defer.reject(err);
            });
            return defer.promise; 
        },
        LoadTechnicianById: function(technicianId) {
            var defer = $q.defer();
            var url = ENV.apiEndpoint + "/technicians/LoadTechnicianById/" + technicianId;
            $http.get(url)
            .success(function (technician) {
                defer.resolve(technician);
            })
            .error(function (err) {
                defer.reject(err);
            });
            return defer.promise; 
        }
    };
}]);