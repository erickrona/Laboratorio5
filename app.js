

const mapBox = require('./weather.js')


//mapBox.mapBoxCity('')

mapBox.mapBoxCity('Acapulco', function(error, data) {
  if (error) {
    console.log(error)
  } else {
      if ( data.features ) {
        mapBox.weatherCity(data.features, function(error, data){
          var summary = data.Currently.summary
          var temperature = data.Currently.temperature
          var precipProbability = data.Currently.precipProbability
          temperature = (temperature - 32) * (5/9)
          precipProbability = precipProbability * 100
          //console.log(summary)
          //console.log(temperature)
          //console.log(precipProbability)
          //console.log(data)
          console.log('The weather is: ' + summary + '. The current temperature is ' + temperature + 'ºC. There is ' + precipProbability + '% chance of rain.')
        })
      } else {
          console.log(data)
        }
    }
})
