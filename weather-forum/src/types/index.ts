export interface Post {
  id: string;
  title: string;
  body: string;
  userId: number;
  createdAt: string;
}

export interface Comment {
  id: string;
  postId: number;
  name: string;
  body: string;
}

export interface WeatherData {
  temp: number;
  description: string;
  city: string;
  country: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
}
