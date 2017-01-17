"use strict";
app.service("UtilService", ["$q", "$http", "ENV", ($q, $http, ENV) => {
	return {
		isEmpty : (obj) => {
			for(var prop in obj) {
	            if(obj.hasOwnProperty(prop))
	                return false;
	        }
	        return true && JSON.stringify(obj) === JSON.stringify({});
		},
		validateEmail: (email) => {
			var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        	return re.test(email);
		},
		validateTelNo: (telNo) => {
			var re =/\d\-/g;
        	return re.test(telNo);
		},
		zeroPad: (num, places) => {
			var zero = places - num.toString().length + 1;
      		return Array(+(zero > 0 && zero)).join("0") + num;
		},
		addFormFields: (form, data) => {
			if (data != null) { 
		        $.each(data, (name, value) => { 
		            if (value != null) { 
		            	var input = $("<input></input>").attr("type", "hidden").attr("name", name).val(value); 
		            	form.append(input); 
		            } 
		        }); 
		    } 

		    return form;
		},
		replaceASCIICharacter: (encodeUrl) => {
			var asciiString = encodeUrl
                .replace(/%2F/g, "/")
                .replace(/%2B/g,"+")
                .replace(/%3D/g ,"=")
                .replace(/%24/g, "$")
                .replace(/%26/g,"&")
                .replace(/%2C/g ,",")
                .replace(/%3A/g ,":")
                .replace(/%3B/g, ";")
                .replace(/%3F/g,"?")
                .replace(/%20/g,"+")
                .replace(/%40/g ,"@");
    
        	return asciiString;
		},
		generateServiceHTMLStrFromTechnicianServices: (Services) => {
			var html_str = '';
			if (Services !== undefined || Services.length > 0) {
				html_str += '<ul>';
				angular.forEach(Services, (Service) => {
					html_str += '<li>' + Service.Service + '</li>';
				});
				html_str += '</ul>';
			}
			return html_str;
		},
		getDistanceFromLatLonInKm: (lat1,lon1,lat2,lon2) => {
		  var R = 6371; // Radius of the earth in km
		  var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
		  var dLon = this.deg2rad(lon2-lon1); 
		  var a = 
		    Math.sin(dLat/2) * Math.sin(dLat/2) +
		    Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
		    Math.sin(dLon/2) * Math.sin(dLon/2)
		    ; 
		  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		  var d = R * c; // Distance in km
		  return d;
		},

		deg2rad: (deg) => {
		  return deg * (Math.PI/180)
		}
	};
}]);