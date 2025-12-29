import { useState, useEffect } from "react";
import Typography from "../Typography/Typography";
import Card from "../Card/Card";
import Loading from "../Loading/Loading";
import ErrorState from "../ErrorState/ErrorState";
import "./Weather.scss";

type WeatherData = {
  temperature: number;
  condition: string;
  icon: string;
};

type WeatherProps = {
  city?: string;
  apiKey?: string;
  useMock?: boolean;
  className?: string;
};

// 날씨 아이콘 매핑 함수
const getWeatherIcon = (condition: string): string => {
  const conditionLower = condition.toLowerCase();
  if (conditionLower.includes("맑음") || conditionLower.includes("clear")) {
    return "☀️";
  } else if (conditionLower.includes("구름") || conditionLower.includes("cloud")) {
    if (conditionLower.includes("일부") || conditionLower.includes("partly")) {
      return "☁️";
    }
    return "☁️";
  } else if (conditionLower.includes("비") || conditionLower.includes("rain")) {
    return "🌧️";
  } else if (conditionLower.includes("눈") || conditionLower.includes("snow")) {
    return "❄️";
  } else if (conditionLower.includes("안개") || conditionLower.includes("fog")) {
    return "🌫️";
  }
  return "☁️☀️"; // 기본값: 일부 맑음
};

// 목업 날씨 데이터
const mockWeatherData: WeatherData = {
  temperature: 20,
  condition: "일부 맑음",
  icon: "☁️☀️",
};

const Weather = ({ city = "Seoul", apiKey, useMock = true, className = "" }: WeatherProps) => {
  // 환경 변수에서 API 키 가져오기 (없으면 prop으로 전달된 키 사용)
  const weatherApiKey = apiKey || process.env.REACT_APP_WEATHER_API_KEY;
  
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        if (useMock || !weatherApiKey) {
          // 목업 데이터 사용
          await new Promise((resolve) => setTimeout(resolve, 500)); // 로딩 시뮬레이션
          setWeather(mockWeatherData);
        } else {
          // 실제 OpenWeatherMap API 호출
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric&lang=kr`
          );

          // 응답 본문을 먼저 파싱 (에러 메시지 확인용)
          const responseData = await response.json().catch(() => ({}));

          if (!response.ok) {
            throw new Error("api 호출 안됌");
          }

          setWeather({
            temperature: Math.round(responseData.main.temp),
            condition: responseData.weather[0].description,
            icon: getWeatherIcon(responseData.weather[0].description),
          });
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "api 호출 안됌";
        setError(errorMessage);
        // API 호출 실패 시 목업 데이터로 폴백하지 않고 에러 상태 유지
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city, weatherApiKey, useMock]);

  if (loading) {
    return (
      <Card variant="content" className={`weather ${className}`}>
        <div className="weather__loading">
          <Loading size={32} label="날씨 정보를 불러오는 중..." />
        </div>
      </Card>
    );
  }

  if (error && !weather) {
    return (
      <Card variant="content" className={`weather ${className}`}>
        <ErrorState message={error} />
      </Card>
    );
  }

  if (!weather) {
    return null;
  }

  return (
    <Card variant="content" className={`weather ${className}`}>
      <div className="weather__content">
        <div className="weather__top">
          <div className="weather__icon">{weather.icon}</div>
          <Typography variant="h4" size="medium" weight="bold" className="weather__temp">
            {weather.temperature}°
          </Typography>
        </div>
        <Typography variant="body" size="small" color="muted" className="weather__text">
          {weather.condition}
        </Typography>
      </div>
    </Card>
  );
};

export default Weather;

