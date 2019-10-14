

const credentials = require('./credentials.js')

const request = require('request')

const mapBoxCity = function (ciudad, callback){
	//console.log('https://api.mapbox.com/geocoding/v5/mapbox.places/' + ciudad + '.json?access_token=' + credentials.MAPBOX_TOKEN)
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + ciudad + '.json?access_token=' + credentials.MAPBOX_TOKEN

	request({url, json: true}, function(message, response){
		if(message){
			callback(message, undefined)
		} else {
			const data = response.body
			if ( data.message ) {
        		callback(data.message, undefined)
      		} else if(data.features[0] == undefined) {			
				
					callback(data.query + ' was not found', undefined)
				}
				else
				{
					const info = {
				 		features : []
					}
					info.features.push(data.features[0].center)
					callback(undefined, info)
				}
		}
	})
}

const weatherCity = function(features, callback) {
	//var lat = features
	//console.log(lat)
	var variable = features.toString()
	var datos = variable.split(',');
	var longitud = datos[0]
	var latitud = datos[1]
	//console.log('https://api.darksky.net/forecast/' + credentials.DARK_SKY_SECRET_KEY + '/' + latitud + ',' + longitud)
	const url = 'https://api.darksky.net/forecast/' + credentials.DARK_SKY_SECRET_KEY + '/' + latitud + ',' + longitud
	request({url, json: true}, function(error, response) {
		if (error) {
      		callback('Unable to connect to MAPBOX service', undefined)
    	} else {
    		const data = response.body
    		if ( data.response ) {
        		callback(data.response, undefined)
      		} else {
      			if(data.currently == undefined)
				{
					callback(data.error, undefined)
				}
				else
				{
					const info = {
						Currently: data.currently
					}
					callback(undefined, info)
				}
      		}
    	}
	})
}

module.exports = {
	mapBoxCity : mapBoxCity,
	weatherCity : weatherCity
}

