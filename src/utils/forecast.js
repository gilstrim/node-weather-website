const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/f1a978a9d59d58b5827eee0cc1f350a4/${latitude},${longitude}?units=si`;

    request({
        url,
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            const data = body.currently;
            const dailyData = body.daily.data[0].summary;
            const highTemperature = body.daily.data[0].temperatureHigh;
            const lowTemperature = body.daily.data[0].temperatureLow;
            callback(undefined, `${dailyData} It is currently ${data.temperature} degrees out. There is a ${data.precipProbability}% chance of rain. It will be a high of ${highTemperature} degrees and a low of ${lowTemperature} degrees`);
        }
    })
}

module.exports = forecast;