import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card";

import LightModeIcon from '@mui/icons-material/LightMode';
import CloudIcon from '@mui/icons-material/Cloud';
import CloudySnowingIcon from '@mui/icons-material/CloudySnowing';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import StormIcon from '@mui/icons-material/Storm';
import FoggyIcon from '@mui/icons-material/Foggy';
import GrainIcon from '@mui/icons-material/Grain';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AirIcon from '@mui/icons-material/Air';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';

// Assets
import clearImg from '../assets/clear.jpeg';
import cloudsImg from '../assets/clouds.jpg';
import rainImg from '../assets/rain.png';
import snowImg from '../assets/snow.jpeg';
import stormImg from '../assets/storm.jpeg';
import dustImg from '../assets/dust.jpeg';
import tornadoImg from '../assets/tornado.jpeg';
import fogImg from '../assets/fog.jpeg';

export default function WeatherInfo({ info }) {
  if (!info || !info.weather) {
    return (
      <div className="info-box text-white text-font-semibold text-lg">
        <h2>No weather data available</h2>
      </div>
    );
  }

  const getImage = () => {
    const main = (info.weatherMain || '');
    switch (main) {
      case 'clear':
        return { image: clearImg, icon: <LightModeIcon /> };
      case 'clouds':
        return { image: cloudsImg, icon: <CloudIcon /> };
      case 'rain':
      case 'drizzle':
        return { image: rainImg, icon: <WaterDropIcon /> };
      case 'snow':
        return { image: snowImg, icon: <CloudySnowingIcon /> };
      case 'thunderstorm':
      case 'squall':
        return { image: stormImg, icon: <ThunderstormIcon /> };
      case 'dust':
      case 'sand':
        return { image: dustImg, icon: <GrainIcon /> };
      case 'tornado':
        return { image: tornadoImg, icon: <StormIcon /> };
      case 'fog':
      case 'mist':
      case 'haze':
      case 'smoke':
      case 'atmosphere':
        return { image: fogImg, icon: <FoggyIcon /> };
      default:
        return { image: clearImg, icon: <LightModeIcon /> };
    }
  };

  const getCurrentDate = () =>
    new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const weatherImage = getImage();

  return (
    <div className="space-y-6 w-[90%] max-w-[1200px] mx-auto">
      {/* Main Weather Card */}
      <Card className="p-0 overflow-hidden shadow-2xl backdrop-blur-lg bg-white/10 border-white/20 ">
        {/* Photo Display Section */}
        <div className="relative h-96 overflow-hidden">
          <img
            src={weatherImage.image}
            alt="Weather Background"
            className="absolute inset-0 w-full h-full object-cover opacity-70 rounded-xl"
          />

          {/* Weather Info Overlay */}
          <div className="absolute top-6 left-6 right-6 flex flex-wrap justify-between items-start gap-4 text-white">
            {/* Left Block (Icon + City Info) */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-4 rounded-full bg-white/20 backdrop-blur-sm">{weatherImage.icon}</div>
              <div className="text-left">
                <h2 className="text-xl sm:text-3xl font-bold truncate">{info.city}</h2>
                <div className="flex items-center gap-2 text-white/90 text-sm sm:text-base">
                  <LocationOnOutlinedIcon className="w-4 h-4" />
                  <span>{info.country}</span>
                </div>
              </div>
            </div>

            {/* Right Block (Temperature Info) */}
            <div className="text-right">
              <div className="text-3xl sm:text-5xl font-bold mb-1">{info.temp}°</div>
              <div className="text-sm sm:text-lg font-medium">{info.weather}</div>
              <div className="text-xs sm:text-sm text-white/80">Feels like {info.feelsLike}°</div>
              <div className="text-xs sm:text-sm text-white/80">H: {info.tempMax}° L: {info.tempMin}°</div>
            </div>
          </div>


          {/* Bottom block: Date */}
          <div className="absolute bottom-6 left-6 text-white">
            <div className="flex items-center gap-2 text-sm">
              <CalendarTodayOutlinedIcon className="w-4 h-4" />
              <span>{getCurrentDate()}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Weather Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="backdrop-blur-lg bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 rounded-full bg-blue-500/20">
                <WaterDropIcon className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{info.humidity}%</div>
            <div className="text-sm text-white/70">Humidity</div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-lg bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 rounded-full bg-green-500/20">
                <AirIcon className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{info.windSpeed}</div>
            <div className="text-sm text-white/70">km/h Wind</div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-lg bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 rounded-full bg-purple-500/20">
                <VisibilityIcon className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{info.visibility}</div>
            <div className="text-sm text-white/70">km Visibility</div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-lg bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 rounded-full bg-orange-500/20">
                <ThermostatIcon className="w-6 h-6 text-orange-400" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{info.pressure} hPa</div>
            <div className="text-sm text-white/70">Pressure</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
