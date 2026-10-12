import axios from 'axios';

export class GeoMineService {
    async getCurrentWeather(latitude, longitude) {
        const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,relative_humidity_2m&timezone=auto`);
        return response.data.current;
    }
}