"use strict";
app.controller("TechnicianController", [ "$scope", "$http", "$location", "$filter", "$routeParams", "$geolocation","$timeout", "bsLoadingOverlayService",
	"Upload", "DataModelFactory", "TechnicianService", "GeolocationService", "UtilService", "ServiceService",
  function ($scope, $http, $location, $filter, $routeParams, $geolocation,$timeout,bsLoadingOverlayService,
  	Upload, DataModelFactory, TechnicianService,GeolocationService ,UtilService, ServiceService) {
  
  	$scope.Technicians = [];
  	$scope.Technician = {
      Services:[]
    };
    $scope.NearestDistance = 100;
    $scope.Page = {
        Mode: 'view'
    };
    $scope.HourStep = 1;
    $scope.MinuteStep = 5;
  	$scope.ClientCurrentLocation = {
  		Coords: {
  			Lat :0,
  			Long:0
  		},
  		Date: ''
  	};
    $scope.$on('$routeChangeSuccess', function() {
        ServiceService.LoadTechnicianService()
        .then(function(data) {
          $scope.SelectServiceList = data;
        });
        if (UtilService.isEmpty($routeParams)) {
        //    $scope.CreateArticle();
            $scope.Page.Mode = 'new';
            $scope.Technician = {
              Lat : 0,
              Long: 0
            }

            var newLatLng = new google.maps.LatLng(14.0840727, 100.8126563);
            var newOptions = {
                zoom: 6,
                center: newLatLng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            $timeout(function(){
               $scope.map = new google.maps.Map(document.getElementById('new-technician-map-canvas'),
                    newOptions);
            });
            
        /*    $scope.TechnicianMap = new google.maps.Map($.find('#new-technician-map-canvas')[0], {
                center: new google.maps.LatLng(13.21, 94.38),
                zoom: 5,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });*/
        } else {
          console.log( $routeParams.technicianId);
            var technicianId = $routeParams.technicianId;
            $scope.Page.Mode = 'view';
            $scope.ViewTechnician(technicianId);
        }
    });

    if ($.find('#map-canvas')[0] != null || $.find('#map-canvas')[0] !== undefined) {
        $scope.map = new google.maps.Map($.find('#map-canvas')[0], {
          center: new google.maps.LatLng(14.0840727, 100.8126563),
          zoom: 5,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });
    }
    if ($.find('#technician-map-canvas')[0] != null || $.find('#technician-map-canvas')[0] !== undefined) {
        $scope.map = new google.maps.Map($.find('#technician-map-canvas')[0], {
          center: new google.maps.LatLng(13.21, 94.38),
          zoom: 5,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        console.log('set the map');
    }
  	$scope.LoadTechnicians = function() {
  		console.log('LoadTechnicians ');
	  	TechnicianService.LoadTechnicians()
	  	.then(function(data) {
	  		$scope.Technicians = data;
	  	});
  	};
    $scope.UseTechnicianCurrentLocation = function(referenceId) {
      bsLoadingOverlayService.start({
        referenceId: referenceId
      });
      $geolocation.getCurrentPosition({
            timeout: 60000
         })
      .then(function(position) {
          $scope.map = new google.maps.Map($.find('#new-technician-map-canvas')[0], {
            center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
            zoom: 17,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          });
          // Setting marker for currenct position
          var current_marker = new google.maps.Marker({
            position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
            animation: google.maps.Animation.DROP,
            icon: '/images/blue_marker.png',
            map: $scope.map
          });
          $scope.Technician.Lat = position.coords.latitude;
            $scope.Technician.Long = position.coords.longitude;
          google.maps.event.addListener(current_marker, 'dragend', function (data) {
           //   updateMarkerStatus('Drag ended');
          //    geocodePosition(marker.getPosition());
          console.log('dragend', data.latLng.lat(), data.latLng.lng());
            new_lat = data.latLng.lat();
            new_lng = data.latLng.lng();
            $scope.Technician.Lat = new_lat;
            $scope.Technician.Long = new_lng;
            $scope.$apply();
            console.log('tech new ', $scope.Technician.Lat, $scope.Technician.Long);
          });
          
      });
      bsLoadingOverlayService.stop({
        referenceId: referenceId
      });
    }
  	$scope.GetCurrentClientGeoLocation = function() {
      $scope.markers = [];
  		$geolocation.getCurrentPosition({
            timeout: 60000
         })
  		.then(function(position) {
             $scope.map = new google.maps.Map($.find('#map-canvas')[0], {
              center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
              zoom: 17,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            // Setting marker for currenct position
            var current_marker = new google.maps.Marker({
              position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
              animation: google.maps.Animation.DROP,
              icon: '/images/blue_marker.png',
              map: $scope.map
            });
            var current_infoWindow = new google.maps.InfoWindow();
            google.maps.event.addListener(current_marker, 'click', (function(current_marker) {
              return function() {
                var content = '<h4>Your Location</h4>';
                current_infoWindow.setContent(content);
                current_infoWindow.open($scope.map, current_marker);
              }
            })(current_marker));
            $scope.markers.push(current_marker);
            angular.forEach($scope.Technicians, function(technician) {
                console.log(technician);
                var marker;
                var i = 0;
                var latitude = parseFloat(technician.Lat);
                var longitude = parseFloat(technician.Long);
                marker = new google.maps.Marker({
                  position: new google.maps.LatLng(latitude, longitude),
                  animation: google.maps.Animation.DROP,
                  map: $scope.map
                });
                $scope.markers.push(marker);
                console.log(UtilService.getDistanceFromLatLonInKm(position.coords.latitude, position.coords.longitude, latitude,longitude));
                var infoWindow = new google.maps.InfoWindow();
                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                  return function() {
                    var direction = '<a target=\'_blank\' href=\'https://maps.google.com/?saddr=Current+Location&daddr='+
                    latitude+','+longitude+'\'> <i class="fa fa-location-arrow" aria-hidden="true"></i> Get Direction</a>'
                    var profile = '<a href=\'/technician/'+technician._id+'\'><i class="fa fa-user" aria-hidden="true"></i> View Profile</a>';
                    var content = '<h4>'+technician.Name +'</h4>'+ 
                     UtilService.generateServiceHTMLStrFromTechnicianServices(technician.Services) +
                      profile +
                      direction;
                    infoWindow.setContent(content);
                    infoWindow.open($scope.map, marker);
                  }
                })(marker, i));
                i++;
            });
        //    $scope.map.zoom = 15;
            $scope.map = $scope.markers;
      });
            
/*
            $scope.map = new google.maps.Map($.find('#map-canvas')[0], {
                center: new google.maps.LatLng(latitude, longitude),
                zoom: 17,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            $scope.marker = new google.maps.Marker({
                animation: google.maps.Animation.DROP,
                title: 'Your location',
                position: new google.maps.LatLng(latitude, longitude),
                map: $scope.map
            });*/

  	};

    $scope.SelectNearestDistance = function() {
      console.log($scope.NearestDistance);
    };

    
    $scope.ViewTechnician = function(technicianId) {
      TechnicianService.LoadTechnicianById(technicianId)
      .then(function(data) {
        $scope.Technician = data;
        $scope.SelectServiceList = data.Services;
        $scope.map = new google.maps.Map($.find('#technician-map-canvas')[0], {
            center: new google.maps.LatLng(data.Lat, data.Long),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
    
       
        // Setting marker for currenct position
        var technician_marker = new google.maps.Marker({
          position: new google.maps.LatLng(data.Lat, data.Long),
          animation: google.maps.Animation.DROP,
          draggable: true,
          map: $scope.map
        });
        var new_lat = 0;
        var new_lng = 0;
        // Add dragging event listeners.
        google.maps.event.addListener(technician_marker, 'dragstart', function (data) {
        //    updateMarkerAddress('Dragging...');
        });
        google.maps.event.addListener(technician_marker, 'drag', function (data) {
          //  updateMarkerStatus('Dragging...');
          //  updateMarkerPosition(marker.getPosition());
        });
        google.maps.event.addListener(technician_marker, 'dragend', function (data) {
           //   updateMarkerStatus('Drag ended');
          //    geocodePosition(marker.getPosition());
          console.log('dragend', data.latLng.lat(), data.latLng.lng());
          new_lat = data.latLng.lat();
          new_lng = data.latLng.lng();
          $scope.Technician.Lat = new_lat;
          $scope.Technician.Long = new_lng;
          $scope.$apply();
          console.log('tech new ', $scope.Technician.Lat, $scope.Technician.Long);
        });
      });
    }; // Eng ViewTechnician

    $scope.ChangeTechnicianProfileImage = function(files) {
      console.log('ChangeTechnicianProfileImage');
      if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload
                .upload({
                    url: ENV.apiEndpoint + '/aws/uploadProductCategoryImage/' + ProductCategoryId + '/' + ProductCategoryCode + '/admin',
                    file: file
                })
                .progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                })
                .success(function (data, status, headers, config) {
                    var downloadUrl = ENV.apiEndpoint + '/aws/downloadProductCategoryImageThumbnail/' + ProductCategoryId + '/' + ProductCategoryCode;
                    $http.get(downloadUrl)
                    .success(function (data, status, headers, config) {
                        document.getElementById('ViewProductCategoryImageNotReady').style.display = 'none';
                        $('#ThumbnailProductCategoryImage').children("img").remove();
                        $('#ThumbnailProductCategoryImage').append(data);

                    })
                    .error(function (data, status, headers, config) {
                        console.log(data);
                        document.getElementById('ViewProductCategoryImageNotReady').style.display = 'none';
                    });
                })
                .error(function (data, status, headers, config) {
                    console.log('error ' + data + ' status ' + status);
                });
            }
        }

    };

    $scope.ChangeTechnicianBackgroundImage = function(files) {
      console.log('ChangeTechnicianBackgroundImage');
      if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload
                .upload({
                    url: ENV.apiEndpoint + '/aws/uploadTechnicianBackgroundImage/' + ProductCategoryId + '/' + ProductCategoryCode + '/admin',
                    file: file
                })
                .progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                })
                .success(function (data, status, headers, config) {
                    var downloadUrl = ENV.apiEndpoint + '/aws/downloadProductCategoryImageThumbnail/' + ProductCategoryId + '/' + ProductCategoryCode;
                    $http.get(downloadUrl)
                    .success(function (data, status, headers, config) {
                        document.getElementById('ViewProductCategoryImageNotReady').style.display = 'none';
                        $('#ThumbnailProductCategoryImage').children("img").remove();
                        $('#ThumbnailProductCategoryImage').append(data);

                    })
                    .error(function (data, status, headers, config) {
                        console.log(data);
                        document.getElementById('ViewProductCategoryImageNotReady').style.display = 'none';
                    });
                })
                .error(function (data, status, headers, config) {
                    console.log('error ' + data + ' status ' + status);
                });
            }
        }
    };
    $scope.AddTechnicianService = function() {
      console.log($scope.SelectService);
      console.log($scope.SelectServiceModel);
      var service = {
        ServiceNameTh: $scope.SelectService
      }
      if ($scope.Technician.Services === undefined) {
        $scope.Technician.Services = new Array();
      }
      $scope.Technician.Services.push(service);
    }
    $scope.Print = function() {
      console.log($scope.Technician);
    }
}]);