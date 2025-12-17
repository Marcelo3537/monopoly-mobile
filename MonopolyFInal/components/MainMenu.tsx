 
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Play,
  ShoppingBag,
  Package,
  Crown,
  Coins,
  Star,
  Trophy
} from 'lucide-react';
import type { User as UserType, Screen } from '../src/App.tsx';

interface MainMenuProps {
  user: UserType;
  onNavigate: (screen: Screen) => void;
}

export function MainMenu({ user, onNavigate }: MainMenuProps) {
  return (
    <div className="flex flex-col h-full p-4">
      {/* Header with User Info */}
      <div className="mb-6">
        <Card className="bg-black/60 border-amber-500/30 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16 border-2 border-amber-400">
                <AvatarImage src={user.avatar} alt={user.username} />
                <AvatarFallback className="bg-gradient-to-br from-amber-400 to-red-600 text-white">
                  {user.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h2 className="text-white text-lg">¡Hola, {user.username}!</h2>
                <div className="flex items-center space-x-2 text-amber-300 text-sm">
                  <Crown className="w-4 h-4" />
                  <span>{user.level}</span>
                </div>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center text-green-300 text-sm">
                    <Coins className="w-4 h-4 mr-1" />
                    <span>{user.totalMoney.toLocaleString()} pts</span>
                  </div>
                  <div className="flex items-center text-blue-300 text-sm">
                    <Trophy className="w-4 h-4 mr-1" />
                    <span>ELO: {user.elo}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center text-amber-300 text-sm">
                  <Star className="w-4 h-4 mr-1" />
                  <span>{user.gamesWon}/{user.gamesPlayed}</span>
                </div>
                <p className="text-xs text-white/60">victorias</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area - Flex Growing */}
      <div className="flex-1 flex flex-col justify-center space-y-6">
        {/* Main Play Button - Large and Centered */}
        <div className="px-2">
          <Button
            onClick={() => onNavigate('monopoly')}
            className="w-full h-56 bg-gradient-to-br from-red-600 via-amber-600 to-red-700 hover:from-red-700 hover:via-amber-700 hover:to-red-800 text-white shadow-2xl hover:shadow-3xl transform hover:scale-[1.02] transition-all duration-300 border-4 border-amber-400/50 rounded-3xl relative overflow-hidden"
          >
            {/* Decorative background pattern */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1647102256335-7a7370d99924?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGVycmFuZWFuJTIwcGF0dGVybiUyMHRpbGVzJTIwc3BhbmlzaHxlbnwxfHx8fDE3NTk5Mjk2OTV8MA&ixlib=rb-4.1.0&q=80&w=1080')] bg-cover bg-center"></div>
            
            <div className="relative flex flex-col items-center justify-center space-y-4">
              {/* Play icon with glow effect */}
              <div className="relative">
                <div className="absolute inset-0 bg-white/30 rounded-full blur-2xl animate-pulse"></div>
                <div className="relative w-24 h-24 bg-white/20 rounded-full flex items-center justify-center border-4 border-white/40 shadow-xl">
                  <Play className="w-12 h-12 text-white ml-1" />
                </div>
              </div>
              
              <div className="text-center space-y-1">
                <h2 className="text-2xl font-bold tracking-wide text-amber-100 drop-shadow-lg">CASINO Y TAPAS</h2>
                <h3 className="text-5xl font-bold tracking-wider drop-shadow-2xl">JUGAR</h3>
              </div>
            </div>
          </Button>
        </div>

        {/* Quick Access Cards - Shop and Inventory */}
        <div className="grid grid-cols-2 gap-4 px-2">
          <Card 
            className="bg-gradient-to-br from-purple-900/70 to-pink-900/70 border-purple-400/30 backdrop-blur-sm cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={() => onNavigate('shop')}
          >
            <CardContent className="p-5 text-center">
              <div className="w-12 h-12 bg-purple-500/30 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-purple-400/50">
                <ShoppingBag className="w-6 h-6 text-purple-300" />
              </div>
              <h3 className="text-white font-medium mb-1">Tienda</h3>
              <p className="text-purple-300 text-sm">Nuevos items</p>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-purple-400 hover:text-purple-300 text-xs mt-2 hover:bg-purple-500/20"
              >
                Explorar →
              </Button>
            </CardContent>
          </Card>

          <Card 
            className="bg-gradient-to-br from-blue-900/70 to-indigo-900/70 border-blue-400/30 backdrop-blur-sm cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={() => onNavigate('inventory')}
          >
            <CardContent className="p-5 text-center">
              <div className="w-12 h-12 bg-blue-500/30 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-blue-400/50">
                <Package className="w-6 h-6 text-blue-300" />
              </div>
              <h3 className="text-white font-medium mb-1">Inventario</h3>
              <p className="text-blue-300 text-sm">Tus objetos</p>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-blue-400 hover:text-blue-300 text-xs mt-2 hover:bg-blue-500/20"
              >
                Ver todo →
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer Stats */}
      <Card className="bg-black/40 border-amber-500/20 mt-4 backdrop-blur-sm">
        <CardContent className="p-3">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-amber-300 text-xs">Tiempo jugado</p>
              <p className="text-white">{user.timePlayedHours}h</p>
            </div>
            <div>
              <p className="text-green-300 text-xs">Ratio victoria</p>
              <p className="text-white">{Math.round((user.gamesWon / user.gamesPlayed) * 100)}%</p>
            </div>
            <div>
              <p className="text-blue-300 text-xs">Partidas</p>
              <p className="text-white">{user.gamesPlayed}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
