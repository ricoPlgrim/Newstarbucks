import { useState, useEffect } from "react";
import Typography from "../Typography/Typography";
import Card from "../Card/Card";
import Loading from "../Loading/Loading";
import ErrorState from "../ErrorState/ErrorState";
import "./Weather.scss";

/**
 * 날씨 데이터 타입
 * 
 * @property {number} temperature - 온도 (섭씨)
 * @property {string} condition - 날씨 상태 설명 (예: "일부 맑음", "맑음", "비", "눈" 등)
 * @property {string} icon - 날씨 상태를 나타내는 이모지 아이콘
 * @property {string} [location] - 지역 이름 (GPS로 가져온 경우에만 표시)
 */
type WeatherData = {
  temperature: number;
  condition: string;
  icon: string;
  location?: string;
};

/**
 * Weather 컴포넌트 Props
 * 
 * @property {string} [city="Seoul"] - 날씨 정보를 조회할 도시 이름 (기본값: "Seoul")
 * @property {string} [apiKey] - OpenWeatherMap API 키 (환경 변수 REACT_APP_WEATHER_API_KEY가 없을 경우 사용)
 * @property {boolean} [useMock=true] - 목업 데이터 사용 여부 (기본값: true)
 * @property {boolean} [useGPS=false] - GPS 위치 기반 날씨 조회 여부 (기본값: false)
 * @property {string} [className=""] - 추가 CSS 클래스명
 */
type WeatherProps = {
  city?: string;
  apiKey?: string;
  useMock?: boolean;
  useGPS?: boolean;
  className?: string;
};

/**
 * 영문 도시명을 한글 도시명으로 변환하는 함수
 * 
 * OpenWeatherMap API에서 반환하는 영문 도시명을 한글로 변환합니다.
 * "-si", "-gun", "-do" 같은 접미사를 제거하고 매핑을 시도합니다.
 * 
 * @param {string} cityName - 영문 도시명
 * @returns {string} 한글 도시명 (매핑되지 않은 경우 원본 반환)
 * 
 * @example
 * getKoreanCityName("Seoul") // "서울"
 * getKoreanCityName("Gimpo-si") // "김포시"
 * getKoreanCityName("Busan") // "부산"
 */
const getKoreanCityName = (cityName: string): string => {
  // 접미사 제거 (예: "Gimpo-si" -> "Gimpo")
  const normalizedName = cityName.replace(/-si$|-gun$|-do$|-gu$|-dong$|-eup$|-myeon$|-ri$/i, "").trim();
  
  const cityMap: Record<string, string> = {
    // 특별시/광역시
    "Seoul": "서울",
    "Busan": "부산",
    "Daegu": "대구",
    "Incheon": "인천",
    "Gwangju": "광주",
    "Daejeon": "대전",
    "Ulsan": "울산",
    "Sejong": "세종",
    
    // 경기도
    "Gyeonggi": "경기",
    "Gimpo": "김포",
    "Goyang": "고양",
    "Gwangmyeong": "광명",
    "Gwangju-si": "광주시",
    "Gunpo": "군포",
    "Guri": "구리",
    "Gwacheon": "과천",
    "Namyangju": "남양주",
    "Bucheon": "부천",
    "Seongnam": "성남",
    "Siheung": "시흥",
    "Ansan": "안산",
    "Anseong": "안성",
    "Anyang": "안양",
    "Yangju": "양주",
    "Yangpyeong": "양평",
    "Yeoju": "여주",
    "Yeoncheon": "연천",
    "Osan": "오산",
    "Yongin": "용인",
    "Uiwang": "의왕",
    "Uijeongbu": "의정부",
    "Icheon": "이천",
    "Paju": "파주",
    "Pyeongtaek": "평택",
    "Pocheon": "포천",
    "Hanam": "하남",
    "Hwaseong": "화성",
    
    // 강원도
    "Gangwon": "강원",
    "Gangneung": "강릉",
    "Goseong-gangwon": "고성",
    "Donghae": "동해",
    "Samcheok": "삼척",
    "Sokcho": "속초",
    "Wonju": "원주",
    "Inje": "인제",
    "Jeongseon": "정선",
    "Cheorwon": "철원",
    "Chuncheon": "춘천",
    "Taebaek": "태백",
    "Pyeongchang": "평창",
    "Hongcheon": "홍천",
    "Hwacheon": "화천",
    "Hoengseong": "횡성",
    "Yanggu": "양구",
    "Yangyang": "양양",
    "Yeongwol": "영월",
    
    // 충청북도
    "Chungbuk": "충북",
    "Goesan": "괴산",
    "Danyang": "단양",
    "Boeun": "보은",
    "Yeongdong": "영동",
    "Okcheon": "옥천",
    "Eumseong": "음성",
    "Jecheon": "제천",
    "Jeungpyeong": "증평",
    "Jincheon": "진천",
    "Cheongju": "청주",
    "Chungju": "충주",
    
    // 충청남도
    "Chungnam": "충남",
    "Gyeryong": "계룡",
    "Gongju": "공주",
    "Geumsan": "금산",
    "Nonsan": "논산",
    "Dangjin": "당진",
    "Boryeong": "보령",
    "Buyeo": "부여",
    "Seosan": "서산",
    "Seocheon": "서천",
    "Asan": "아산",
    "Yeongi": "연기",
    "Yesan": "예산",
    "Cheonan": "천안",
    "Cheongyang": "청양",
    "Taean": "태안",
    "Hongseong": "홍성",
    
    // 전라북도
    "Jeonbuk": "전북",
    "Gochang": "고창",
    "Gunsan": "군산",
    "Gimje": "김제",
    "Namwon": "남원",
    "Muju": "무주",
    "Buan": "부안",
    "Sunchang": "순창",
    "Wanju": "완주",
    "Iksan": "익산",
    "Imsil": "임실",
    "Jangsu": "장수",
    "Jeonju": "전주",
    "Jeongeup": "정읍",
    "Jinan": "진안",
    
    // 전라남도
    "Jeonnam": "전남",
    "Gangjin": "강진",
    "Goheung": "고흥",
    "Gokseong": "곡성",
    "Gwangyang": "광양",
    "Gurye": "구례",
    "Naju": "나주",
    "Damyang": "담양",
    "Mokpo": "목포",
    "Muan": "무안",
    "Boseong": "보성",
    "Suncheon": "순천",
    "Shinan": "신안",
    "Yeosu": "여수",
    "Yeonggwang": "영광",
    "Yeongam": "영암",
    "Wando": "완도",
    "Jangseong": "장성",
    "Jangheung": "장흥",
    "Jindo": "진도",
    "Hampyeong": "함평",
    "Haenam": "해남",
    "Hwasun": "화순",
    
    // 경상북도
    "Gyeongbuk": "경북",
    "Gyeongju": "경주",
    "Goryeong": "고령",
    "Gumi": "구미",
    "Gunwi": "군위",
    "Gimcheon": "김천",
    "Mungyeong": "문경",
    "Bonghwa": "봉화",
    "Sangju": "상주",
    "Seongju": "성주",
    "Andong": "안동",
    "Yeongdeok": "영덕",
    "Yeongyang": "영양",
    "Yeongju": "영주",
    "Yeongcheon": "영천",
    "Yecheon": "예천",
    "Uljin": "울진",
    "Ulleung": "울릉",
    "Uiseong": "의성",
    "Cheongdo": "청도",
    "Cheongsong": "청송",
    "Chilgok": "칠곡",
    "Pohang": "포항",
    
    // 경상남도
    "Gyeongnam": "경남",
    "Geoje": "거제",
    "Geochang": "거창",
    "Goseong-gyeongnam": "고성",
    "Gimhae": "김해",
    "Namhae": "남해",
    "Miryang": "밀양",
    "Sacheon": "사천",
    "Sancheong": "산청",
    "Yangsan": "양산",
    "Uiryeong": "의령",
    "Jinju": "진주",
    "Changnyeong": "창녕",
    "Changwon": "창원",
    "Tongyeong": "통영",
    "Haman": "함안",
    "Hamyang": "함양",
    "Hadong": "하동",
    "Hapcheon": "합천",
    
    // 제주도
    "Jeju": "제주",
    "Jeju City": "제주시",
    "Seogwipo": "서귀포",
  };
  
  // 정규화된 이름으로 먼저 검색
  if (cityMap[normalizedName]) {
    // 접미사가 있었던 경우 접미사 추가
    if (cityName.match(/-si$/i)) {
      return cityMap[normalizedName] + "시";
    } else if (cityName.match(/-gun$/i)) {
      return cityMap[normalizedName] + "군";
    } else if (cityName.match(/-do$/i)) {
      return cityMap[normalizedName] + "도";
    } else if (cityName.match(/-gu$/i)) {
      return cityMap[normalizedName] + "구";
    }
    return cityMap[normalizedName];
  }
  
  // 원본 이름으로 검색
  if (cityMap[cityName]) {
    return cityMap[cityName];
  }
  
  // 매핑되지 않은 경우 원본 반환
  return cityName;
};

/**
 * 날씨 상태 문자열을 기반으로 적절한 이모지 아이콘을 반환하는 함수
 * 
 * 날씨 상태 문자열을 분석하여 다음 아이콘을 매핑합니다:
 * - 맑음/clear → ☀️
 * - 구름/cloud → ☁️
 * - 일부 맑음/partly → ☁️
 * - 비/rain → 🌧️
 * - 눈/snow → ❄️
 * - 안개/fog → 🌫️
 * - 기본값 → ☁️☀️
 * 
 * @param {string} condition - 날씨 상태 설명 문자열 (한글 또는 영어)
 * @returns {string} 날씨 상태에 맞는 이모지 아이콘
 * 
 * @example
 * getWeatherIcon("맑음") // "☀️"
 * getWeatherIcon("rain") // "🌧️"
 * getWeatherIcon("일부 맑음") // "☁️"
 */
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

/**
 * 목업 날씨 데이터
 * 
 * API 호출이 실패하거나 useMock이 true일 때 사용되는 기본 날씨 데이터입니다.
 * 
 * @constant {WeatherData}
 */
const mockWeatherData: WeatherData = {
  temperature: 20,
  condition: "일부 맑음",
  icon: "☁️☀️",
};

/**
 * Weather 컴포넌트
 * 
 * 날씨 정보를 표시하는 컴포넌트입니다. OpenWeatherMap API를 사용하여 실제 날씨 데이터를 가져오거나,
 * 목업 데이터를 사용하여 날씨 정보를 표시할 수 있습니다.
 * 
 * ## 주요 기능
 * - OpenWeatherMap API를 통한 실시간 날씨 정보 조회
 * - GPS 위치 기반 날씨 정보 조회 (useGPS prop 사용)
 * - 목업 데이터를 사용한 개발/테스트 모드 지원
 * - 로딩 상태 표시 (Loading 컴포넌트 사용)
 * - 에러 상태 표시 (ErrorState 컴포넌트 사용)
 * - 날씨 상태에 따른 이모지 아이콘 자동 매핑
 * 
 * ## 사용 방법
 * 
 * ### 기본 사용 (목업 데이터)
 * ```tsx
 * <Weather />
 * ```
 * 
 * ### 특정 도시 지정 (목업 데이터)
 * ```tsx
 * <Weather city="Busan" useMock={true} />
 * ```
 * 
 * ### 실제 API 사용
 * ```tsx
 * <Weather 
 *   city="Seoul" 
 *   apiKey="your-api-key" 
 *   useMock={false} 
 * />
 * ```
 * 
 * ### 환경 변수 사용
 * .env 파일에 `REACT_APP_WEATHER_API_KEY=your-api-key`를 설정하면
 * apiKey prop 없이도 사용할 수 있습니다.
 * ```tsx
 * <Weather city="Seoul" useMock={false} />
 * ```
 * 
 * ### GPS 위치 기반 날씨 조회
 * GPS 신호를 사용하여 현재 위치의 날씨 정보를 가져옵니다.
 * 브라우저에서 위치 권한을 요청하며, 허용 시 현재 위치의 날씨 정보가 표시됩니다.
 * ```tsx
 * <Weather useGPS={true} useMock={false} />
 * ```
 * 
 * ## 컴포넌트 구조
 * 
 * ```
 * Weather
 * └── Card (variant="content")
 *     ├── 로딩 상태: Loading 컴포넌트
 *     ├── 에러 상태: ErrorState 컴포넌트
 *     └── 날씨 정보
 *         ├── weather__top
 *         │   ├── weather__icon (이모지 아이콘)
 *         │   └── weather__temp (온도)
 *         └── weather__text (날씨 상태 설명)
 * ```
 * 
 * ## 상태 관리
 * 
 * - `weather`: 현재 날씨 데이터 (WeatherData | null)
 * - `loading`: 로딩 상태 (boolean)
 * - `error`: 에러 메시지 (string | null)
 * 
 * ## API 호출
 * 
 * OpenWeatherMap API를 사용합니다:
 * - 엔드포인트: `https://api.openweathermap.org/data/2.5/weather`
 * - 도시 이름 기반 파라미터:
 *   - `q`: 도시 이름
 *   - `appid`: API 키
 *   - `units`: 온도 단위 (metric = 섭씨)
 *   - `lang`: 언어 (kr = 한국어)
 * - GPS 위치 기반 파라미터:
 *   - `lat`: 위도
 *   - `lon`: 경도
 *   - `appid`: API 키
 *   - `units`: 온도 단위 (metric = 섭씨)
 *   - `lang`: 언어 (kr = 한국어)
 * 
 * ## 에러 처리
 * 
 * - API 호출 실패 시 ErrorState 컴포넌트로 에러 메시지 표시
 * - 목업 데이터로 자동 폴백하지 않음 (에러 상태 유지)
 * - 에러 메시지는 "api 호출 안됌"으로 표시
 * 
 * ## 주의사항
 * 
 * 1. **API 키 필요**: 실제 날씨 데이터를 사용하려면 OpenWeatherMap API 키가 필요합니다.
 * 2. **CORS 정책**: 브라우저에서 직접 API를 호출할 경우 CORS 정책에 의해 차단될 수 있습니다.
 *    이 경우 프록시 서버를 사용하거나 백엔드 API를 통해 호출해야 합니다.
 * 3. **목업 모드**: 개발 중에는 `useMock={true}`를 사용하여 API 호출 없이 테스트할 수 있습니다.
 * 4. **로딩 시간**: 목업 데이터도 500ms의 로딩 시간을 시뮬레이션합니다.
 * 5. **에러 상태**: API 호출 실패 시 목업 데이터로 폴백하지 않고 에러 상태를 유지합니다.
 * 
 * ## 의존성
 * 
 * - `Typography`: 날씨 정보 텍스트 표시
 * - `Card`: 날씨 정보를 담는 카드 컨테이너
 * - `Loading`: 로딩 상태 표시
 * - `ErrorState`: 에러 상태 표시
 * 
 * @param {WeatherProps} props - Weather 컴포넌트 props
 * @returns {JSX.Element | null} Weather 컴포넌트 또는 null (날씨 데이터가 없을 경우)
 * 
 * @example
 * // 기본 사용 (목업 데이터)
 * <Weather />
 * 
 * @example
 * // 실제 API 사용
 * <Weather 
 *   city="Seoul" 
 *   apiKey="your-api-key" 
 *   useMock={false} 
 * />
 * 
 * @example
 * // 환경 변수 사용
 * // .env: REACT_APP_WEATHER_API_KEY=your-api-key
 * <Weather city="Busan" useMock={false} />
 */
const Weather = ({ city = "Seoul", apiKey, useMock = true, useGPS = false, className = "" }: WeatherProps) => {
  /**
   * API 키 결정 로직
   * 
   * 1. prop으로 전달된 apiKey가 있으면 사용
   * 2. 없으면 환경 변수 REACT_APP_WEATHER_API_KEY 사용
   * 3. 둘 다 없으면 undefined (목업 모드로 동작)
   */
  const weatherApiKey = apiKey || process.env.REACT_APP_WEATHER_API_KEY;
  
  /**
   * 날씨 데이터 상태
   * - null: 데이터가 없거나 로딩 중
   * - WeatherData: 날씨 정보가 로드됨
   */
  const [weather, setWeather] = useState<WeatherData | null>(null);
  
  /**
   * 로딩 상태
   * - true: 날씨 정보를 불러오는 중
   * - false: 로딩 완료
   */
  const [loading, setLoading] = useState(true);
  
  /**
   * 에러 상태
   * - null: 에러 없음
   * - string: 에러 메시지
   */
  const [error, setError] = useState<string | null>(null);

  /**
   * GPS 위치 상태
   * - null: 위치 정보 없음
   * - { latitude: number, longitude: number }: 현재 위치 좌표
   */
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  /**
   * GPS 위치 가져오기
   * 
   * useGPS가 true일 때 현재 위치를 가져옵니다.
   * navigator.geolocation API를 사용하여 위도와 경도를 얻습니다.
   * 
   * @dependencies [useGPS]
   */
  useEffect(() => {
    if (!useGPS || !navigator.geolocation) {
      if (useGPS && !navigator.geolocation) {
        setError("이 브라우저는 위치 정보를 지원하지 않습니다.");
        setLoading(false);
      }
      return;
    }

    /**
     * 위치 정보 가져오기 성공 핸들러
     * 
     * @param {GeolocationPosition} position - 위치 정보 객체
     */
    const handleSuccess = (position: GeolocationPosition) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    };

    /**
     * 위치 정보 가져오기 실패 핸들러
     * 
     * @param {GeolocationPositionError} error - 에러 객체
     */
    const handleError = (error: GeolocationPositionError) => {
      let errorMessage = "위치 정보를 가져올 수 없습니다.";
      
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = "위치 권한이 거부되었습니다.";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = "위치 정보를 사용할 수 없습니다.";
          break;
        case error.TIMEOUT:
          errorMessage = "위치 정보 요청 시간이 초과되었습니다.";
          break;
      }
      
      setError(errorMessage);
      setLoading(false);
    };

    /**
     * 위치 정보 요청 옵션
     * 
     * - enableHighAccuracy: 높은 정확도 사용 (배터리 소모 증가)
     * - timeout: 요청 타임아웃 (10초)
     * - maximumAge: 캐시된 위치 정보 사용 가능 시간 (1분)
     */
    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000,
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options);
  }, [useGPS]);

  /**
   * 날씨 정보를 가져오는 useEffect
   * 
   * city, weatherApiKey, useMock이 변경될 때마다 실행됩니다.
   * 
   * 동작 흐름:
   * 1. 로딩 상태를 true로 설정
   * 2. 에러 상태를 null로 초기화
   * 3. useMock이 true이거나 API 키가 없으면 목업 데이터 사용
   * 4. 그렇지 않으면 OpenWeatherMap API 호출
   * 5. 성공 시 날씨 데이터 설정, 실패 시 에러 상태 설정
   * 6. 로딩 상태를 false로 설정
   * 
   * @dependencies [city, weatherApiKey, useMock]
   */
  useEffect(() => {
    /**
     * 날씨 정보를 가져오는 비동기 함수
     * 
     * @async
     * @function fetchWeather
     */
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        if (useMock || !weatherApiKey) {
          /**
           * 목업 데이터 사용 모드
           * 
           * - 500ms 지연을 추가하여 로딩 상태를 시뮬레이션
           * - mockWeatherData를 사용하여 날씨 정보 설정
           */
          await new Promise((resolve) => setTimeout(resolve, 500));
          setWeather(mockWeatherData);
        } else if (useGPS && location) {
          /**
           * GPS 위치 기반 OpenWeatherMap API 호출
           * 
           * API 엔드포인트: https://api.openweathermap.org/data/2.5/weather
           * 파라미터:
           * - lat: 위도
           * - lon: 경도
           * - appid: API 키
           * - units: metric (섭씨 온도)
           * - lang: kr (한국어 응답)
           */
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${weatherApiKey}&units=metric&lang=kr`
          );

          /**
           * 응답 본문 파싱
           * 
           * JSON 파싱 실패 시 빈 객체로 폴백하여 에러 처리
           */
          const responseData = await response.json().catch(() => ({}));

          /**
           * 응답 상태 확인
           * 
           * HTTP 상태 코드가 200이 아니면 에러 발생
           */
          if (!response.ok) {
            throw new Error("api 호출 안됌");
          }

          /**
           * 날씨 데이터 설정 (GPS 위치 기반)
           * 
           * API 응답에서 필요한 정보를 추출하여 WeatherData 형식으로 변환:
           * - temperature: main.temp를 반올림하여 정수로 변환
           * - condition: weather[0].description (한국어 설명)
           * - icon: getWeatherIcon 함수를 사용하여 이모지 아이콘 매핑
           * - location: name 필드를 한글로 변환하여 저장 (GPS로 가져온 경우 지역 이름 표시)
           */
          setWeather({
            temperature: Math.round(responseData.main.temp),
            condition: responseData.weather[0].description,
            icon: getWeatherIcon(responseData.weather[0].description),
            location: responseData.name ? getKoreanCityName(responseData.name) : undefined,
          });
        } else {
          /**
           * 도시 이름 기반 OpenWeatherMap API 호출
           * 
           * API 엔드포인트: https://api.openweathermap.org/data/2.5/weather
           * 파라미터:
           * - q: 도시 이름
           * - appid: API 키
           * - units: metric (섭씨 온도)
           * - lang: kr (한국어 응답)
           */
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric&lang=kr`
          );

          /**
           * 응답 본문 파싱
           * 
           * JSON 파싱 실패 시 빈 객체로 폴백하여 에러 처리
           */
          const responseData = await response.json().catch(() => ({}));

          /**
           * 응답 상태 확인
           * 
           * HTTP 상태 코드가 200이 아니면 에러 발생
           */
          if (!response.ok) {
            throw new Error("api 호출 안됌");
          }

          /**
           * 날씨 데이터 설정
           * 
           * API 응답에서 필요한 정보를 추출하여 WeatherData 형식으로 변환:
           * - temperature: main.temp를 반올림하여 정수로 변환
           * - condition: weather[0].description (한국어 설명)
           * - icon: getWeatherIcon 함수를 사용하여 이모지 아이콘 매핑
           */
          setWeather({
            temperature: Math.round(responseData.main.temp),
            condition: responseData.weather[0].description,
            icon: getWeatherIcon(responseData.weather[0].description),
          });
        }
      } catch (err) {
        /**
         * 에러 처리
         * 
         * - Error 객체인 경우 message 사용
         * - 그렇지 않으면 기본 에러 메시지 사용
         * - 목업 데이터로 폴백하지 않고 에러 상태 유지
         */
        const errorMessage = err instanceof Error ? err.message : "api 호출 안됌";
        setError(errorMessage);
        setWeather(null);
      } finally {
        /**
         * 로딩 완료
         * 
         * 성공/실패 여부와 관계없이 로딩 상태를 false로 설정
         */
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city, weatherApiKey, useMock, location]);

  /**
   * 로딩 상태 렌더링
   * 
   * 날씨 정보를 불러오는 중일 때 Loading 컴포넌트를 표시합니다.
   * 
   * @returns {JSX.Element} 로딩 상태 UI
   */
  if (loading) {
    return (
      <div className={`weather__container ${className}`}>
        <Card variant="content" className="weather">
          <div className="weather__loading" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Loading size={32} label="날씨 정보를 불러오는 중..." />
          </div>
        </Card>
      </div>
    );
  }

  /**
   * 에러 상태 렌더링
   * 
   * API 호출 실패 또는 기타 에러가 발생했을 때 ErrorState 컴포넌트를 표시합니다.
   * 날씨 데이터가 없을 때만 에러를 표시합니다 (에러가 발생했지만 목업 데이터가 있는 경우는 제외).
   * 
   * @returns {JSX.Element} 에러 상태 UI
   */
  if (error && !weather) {
    return (
      <div className={`weather__container ${className}`}>
        <Card variant="content" className="weather">
          <ErrorState message={error} />
        </Card>
      </div>
    );
  }

  /**
   * 날씨 데이터 없음
   * 
   * 로딩도 완료되었고 에러도 없지만 날씨 데이터가 없는 경우 null을 반환합니다.
   * 이는 일반적으로 발생하지 않는 경우이지만, 타입 안전성을 위해 포함되었습니다.
   * 
   * @returns {null}
   */
  if (!weather) {
    return null;
  }

  /**
   * 날씨 정보 렌더링
   * 
   * 날씨 데이터가 성공적으로 로드되었을 때 날씨 정보를 표시합니다.
   * 
   * UI 구조:
   * - weather__container: 카드와 지역명을 나란히 표시하는 flex container
   *   - Card: 날씨 정보 카드
   *     - weather__top: 아이콘과 온도를 나란히 표시
   *       - weather__icon: 날씨 상태 이모지 아이콘
   *       - weather__temp: 온도 (섭씨, Typography h4 variant)
   *     - weather__text: 날씨 상태 설명 (Typography body variant, small size, muted color)
   *   - weather__location: 지역 이름 (GPS로 가져온 경우에만 표시, 카드 오른쪽)
   * 
   * @returns {JSX.Element} 날씨 정보 UI
   */
  return (
    <div className={`weather__container ${className}`}>
      <Card variant="content" className="weather">
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
      {weather.location && (
        <Typography variant="body" size="medium" weight="medium" className="weather__location">
          📍 {weather.location}
        </Typography>
      )}
    </div>
  );
};

export default Weather;
