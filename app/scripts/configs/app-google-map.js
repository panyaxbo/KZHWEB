'use strict'
app.config([ 'uiGmapGoogleMapApiProvider', function( uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
	        key: 'AIzaSyBgZk4hnkU6RRnkY4ECBrp_C5Kd9YWJ5nU',
	        v: '3.20', //defaults to latest 3.X anyhow
	        libraries: 'weather,geometry,visualization'
   		 });
    }]
);