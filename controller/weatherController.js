import axios from "axios";


 const getWeather = async (req, res) => {
    const city = req.params.city;
    const apiKey = process.env.WEATHER_KEY;

    try{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await axios.get(url);
        const data = response.data;

        const weatherDetails = {
            temp: Math.floor(data.main.temp),
            humidity: data.main.humidity,
            wind: data.wind.speed,
            city: data.name,
            country: data.sys.country,
            lat: data.coord.lat,
            lon: data.coord.lon,
            icon: data.weather[0].icon
        };

        res.json(weatherDetails);
    }catch (error) {
        console.error(error);
    if (error.response && error.response.data.cod === "404") {
      return res.status(404).json({ message: "City not found" });
    }
    res.status(500).json({ message: "Something went wrong" });
    }
};

export default getWeather;