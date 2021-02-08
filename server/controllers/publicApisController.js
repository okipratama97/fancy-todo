const axios = require("axios")

class PublicApisController {
  static async weather(req, res, next) {
    try {
      const city = req.query.city || "bandung"

      const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.OPEN_WEATHER_APIKEY}`)
      const localweather = {
        weather: response.data.weather[0].main,
        temp: response.data.main.temp,
        city: response.data.name
      }

      res.status(200).json(localweather)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = PublicApisController