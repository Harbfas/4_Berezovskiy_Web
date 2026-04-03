import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PostsProvider } from './contexts/PostsContext';
import { WeatherProvider } from './contexts/WeatherContext';
import Header from './components/Header';
import WeatherWidget from './components/WeatherWidget';
import ForumPage from './pages/ForumPage';
import WeatherPage from './pages/WeatherPage';

function App() {
  return (
    <BrowserRouter>
      <PostsProvider>
        <WeatherProvider>
          <div className="app">
            <Header />
            <main className="main">
              <div className="container">
                <WeatherWidget />
                <Routes>
                  <Route path="/" element={<ForumPage />} />
                  <Route path="/weather" element={<WeatherPage />} />
                </Routes>
              </div>
            </main>
            <footer className="footer">
              <div className="container">
                <p>Лабораторная работа №7 Березовский А. А. КС-20</p>
              </div>
            </footer>
          </div>
        </WeatherProvider>
      </PostsProvider>
    </BrowserRouter>
  );
}

export default App;