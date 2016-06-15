app.service("UtilService", ["$q", "$http", "ENV", function ($q, $http, ENV) {
	return {
		isEmpty : function(obj) {
			for(var prop in obj) {
	            if(obj.hasOwnProperty(prop))
	                return false;
	        }

	        return true && JSON.stringify(obj) === JSON.stringify({});
		},
		validateEmail: function(email) {
			var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        	return re.test(email);
		},
		validateTelNo: function(telNo) {
			var re =/\d\-/g;
        	return re.test(telNo);
		},
		/**
		 * Adds two numbers
		 * @param {Number} a 
		 * @param {Number} b
		 * @return {Number} sum
		 */
		zeroPad: function(num, places) {
			var zero = places - num.toString().length + 1;
      		return Array(+(zero > 0 && zero)).join("0") + num;
		},
		addFormFields: function(form, data) {
			if (data != null) { 
		        $.each(data, function (name, value) { 
		            if (value != null) { 
		            	var input = $("<input></input>").attr("type", "hidden").attr("name", name).val(value); 
		            	form.append(input); 
		            } 
		        }); 
		    } 
		},
		replaceASCIICharacter: function(encodeUrl) {
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
		}
	};
}]);