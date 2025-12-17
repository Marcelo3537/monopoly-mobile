import { useState } from 'react';
import { LoginScreen } from '../components/LoginScreen';
import { MainMenu } from '../components/MainMenu';
import { RankingScreen } from '../components/RankingScreen';
import { ProfileScreen } from '../components/ProfileScreen';
import { EventosScreen } from '../components/EventosScreen';
import { MonopolyScreen } from '../components/MonopolyScreen';
import { ShopScreen } from '../components/ShopScreen';
import { InventoryScreen } from '../components/InventoryScreen';
import { SettingsScreen } from '../components/SettingsScreen';
import { Navigation } from '../components/Navigation';

export type Screen = 'login' | 'menu' | 'ranking' | 'profile' | 'events' | 'monopoly' | 'shop' | 'inventory' | 'settings';



export interface User {
  id: string;
  username: string;
  avatar: string;
  level: string;
  gamesPlayed: number;
  gamesWon: number;
  totalMoney: number;
  timePlayedHours: number;
  elo: number;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>({
    id: '1',
    username: 'Raúl Bañó',
    avatar: 'https://images.unsplash.com/photo-1759319326200-e522b7d1c02d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWJ1YnUlMjB0b3klMjBjaGFyYWN0ZXJ8ZW58MXx8fHwxNzYwNjI4MzM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    level: 'Tapa Master',
    gamesPlayed: 47,
    gamesWon: 23,
    totalMoney: 15420,
    timePlayedHours: 32,
    elo: 1847
  });

  const handleLogin = (username: string) => {
    setCurrentUser({
      ...currentUser,
      username: username || 'Jugador'
    });
    setIsLoggedIn(true);
    setCurrentScreen('menu');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('login');
  };

  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-amber-900 flex flex-col max-w-md mx-auto relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1647102256335-7a7370d99924?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGVycmFuZWFuJTIwcGF0dGVybiUyMHRpbGVzJTIwc3BhbmlzaHxlbnwxfHx8fDE3NTk5Mjk2OTV8MA&ixlib=rb-4.1.0&q=80&w=1080')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      {/* Banner temporal para verificar Tailwind */}
      <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-emerald-600 text-white px-3 py-1 rounded-md shadow-lg border border-emerald-300/50">
          Tailwind activo
        </div>
      </div>
      
      <div className="flex-1 relative z-10">
        {currentScreen === 'menu' && (
          <MainMenu user={currentUser} onNavigate={navigateToScreen} />
        )}
        {currentScreen === 'ranking' && (
          <RankingScreen currentUser={currentUser} />
        )}
        {currentScreen === 'profile' && (
          <ProfileScreen user={currentUser} onLogout={handleLogout} />
        )}
        {currentScreen === 'events' && (
          <EventosScreen />
        )}
        {currentScreen === 'monopoly' && (
          <MonopolyScreen onNavigate={navigateToScreen} />
        )}
        {currentScreen === 'shop' && (
          <ShopScreen onNavigate={navigateToScreen} />
        )}
        {currentScreen === 'inventory' && (
          <InventoryScreen onNavigate={navigateToScreen} />
        )}
        {currentScreen === 'settings' && (
          <SettingsScreen onNavigate={navigateToScreen} onLogout={handleLogout} />
        )}
      </div>

      {currentScreen !== 'login' && !['shop', 'inventory', 'monopoly'].includes(currentScreen) && (
        <Navigation currentScreen={currentScreen} onNavigate={navigateToScreen} />
      )}
    </div>
  );
}
