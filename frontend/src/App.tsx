import { useEffect, useState } from 'react';
import { WeatherDisplay, type WeatherLog } from './WeatherDisplay';

function App() {
  const [logs, setLogs] = useState<WeatherLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRefreshTime, setLastRefreshTime] = useState<number>(0);
  const [refreshError, setRefreshError] = useState<string>('');

  const fetchWeather = async (isManual: boolean = false) => {
    const now = Date.now();
    const timeSinceLastRefresh = now - lastRefreshTime;
    const REFRESH_COOLDOWN = 60000; // 60 segundos

    if (isManual && lastRefreshTime > 0 && timeSinceLastRefresh < REFRESH_COOLDOWN) {
      const secondsRemaining = Math.ceil((REFRESH_COOLDOWN - timeSinceLastRefresh) / 1000);
      setRefreshError(`Aguarde ${secondsRemaining} segundo${secondsRemaining !== 1 ? 's' : ''} antes de atualizar novamente`);
      setTimeout(() => setRefreshError(''), 3000); // Clear error after 3 seconds
      return;
    }

    setRefreshError('');
    setLoading(true);
    try {
      const response = await fetch('/api/weather');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('✅ Dados atualizados:', data);
      setLogs(data);
      setLastRefreshTime(now);
    } catch (error) {
      console.error("❌ Erro ao buscar clima:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const performFetch = async () => {
      const now = Date.now();
      setRefreshError('');
      setLoading(true);
      try {
        const response = await fetch('/api/weather');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('✅ Dados atualizados:', data);
        setLogs(data);
        setLastRefreshTime(now);
      } catch (error) {
        console.error("❌ Erro ao buscar clima:", error);
      } finally {
        setLoading(false);
      }
    };

    performFetch();
    
    const interval = setInterval(performFetch, 60000); // 60 segundos, sincronizado com producer
    return () => clearInterval(interval);
  }, []);

  return (
    <WeatherDisplay 
      logs={logs} 
      loading={loading} 
      onRefresh={() => fetchWeather(true)} 
      refreshError={refreshError}
    />
  );
}

export default App;