import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { MapPin, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Home } from "lucide-react";
import boardImage from "../casino.png";
import { toast } from "sonner";
import type { Screen } from "../src/App";

interface MonopolyScreenProps {
  onNavigate?: (screen: Screen) => void;
}

export function MonopolyScreen({ onNavigate }: MonopolyScreenProps = {}) {
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState(1);

  // Jugadores: todos empiezan en la casilla 0 (ARRANCA)
  const [playersInGame, setPlayersInGame] = useState([
    { id: 1, name: "Raúl", color: "bg-red-500", money: 1500, position: 0 },
    { id: 2, name: "Dayron", color: "bg-blue-500", money: 1500, position: 0 },
    { id: 3, name: "Anna", color: "bg-green-500", money: 1500, position: 0 },
    { id: 4, name: "Marcelo", color: "bg-yellow-500", money: 1500, position: 0 },
  ]);

  // Coordenadas del tablero (40 casillas)
  // Coordenadas reales del tablero (40 casillas)
const boardPositions = [
  { left: "92.6%", top: "92.0%" },
  { left: "81.8%", top: "92.7%" },
  { left: "73.1%", top: "92.8%" },
  { left: "65.2%", top: "93.1%" },
  { left: "57.4%", top: "92.8%" },
  { left: "49.1%", top: "93.3%" },
  { left: "42.2%", top: "93.2%" },
  { left: "33.4%", top: "92.8%" },
  { left: "25.2%", top: "93.3%" },
  { left: "16.6%", top: "93.3%" },
  { left: "6.3%", top: "92.8%" },
  { left: "6.1%", top: "83.1%" },
  { left: "5.8%", top: "74.5%" },
  { left: "5.3%", top: "67.1%" },
  { left: "5.1%", top: "58.0%" },
  { left: "5.1%", top: "50.7%" },
  { left: "6.6%", top: "41.1%" },
  { left: "5.8%", top: "33.5%" },
  { left: "5.8%", top: "26.1%" },
  { left: "6.3%", top: "17.3%" },
  { left: "6.6%", top: "6.6%" },
  { left: "16.9%", top: "6.2%" },
  { left: "24.9%", top: "6.3%" },
  { left: "34.2%", top: "6.6%" },
  { left: "41.4%", top: "6.6%" },
  { left: "49.4%", top: "6.6%" },
  { left: "57.3%", top: "6.3%" },
  { left: "65.8%", top: "5.6%" },
  { left: "73.9%", top: "6.5%" },
  { left: "82.4%", top: "6.2%" },
  { left: "92.8%", top: "7.3%" },
  { left: "93.0%", top: "17.6%" },
  { left: "93.8%", top: "25.7%" },
  { left: "93.2%", top: "33.7%" },
  { left: "92.5%", top: "42.6%" },
  { left: "92.0%", top: "50.2%" },
  { left: "92.3%", top: "66.9%" },
  { left: "92.3%", top: "75.4%" },
  { left: "91.9%", top: "82.9%" },
];


  // Tirar dado
  const rollDice = async () => {
    try {
        const res = await fetch("http://127.0.0.1:3001/tirar-dado", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: playersInGame[currentPlayer - 1].name }),
      });
      const data = await res.json();

      if (!res.ok || !data) throw new Error("Error al tirar los dados");

      setDiceValue(data.dado);
      toast.success(data.mensaje);

      setPlayersInGame((prev) =>
        prev.map((player) =>
          player.id === currentPlayer
            ? {
                ...player,
                position: data.jugador?.posicion ?? player.position,
                money: data.jugador?.dinero ?? player.money,
              }
            : player
        )
      );

      setTimeout(() => setCurrentPlayer((prev) => (prev % playersInGame.length) + 1), 1000);
    } catch (error) {
      toast.error("⚠️ No se pudo conectar con el backend");
      console.error(error);
    }
  };

  // Icono del dado
  const getDiceIcon = (value: number) => {
    const diceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];
    const DiceIcon = diceIcons[value - 1];
    return <DiceIcon className="w-8 h-8 text-amber-400" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-amber-900 p-2 flex flex-col">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-amber-500/30 p-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <MapPin className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="text-white font-bold">Monopoly Casino y Tapas</h2>
              <p className="text-amber-400 text-sm">
                Turno de {playersInGame[currentPlayer - 1]?.name}
              </p>
            </div>
          </div>
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Ronda 1</Badge>
        </div>
      </div>

      {/* Tablero */}
      <div className="flex-1 flex items-center justify-center px-2">
        <div className="relative w-full max-w-md">
          <img
            src={boardImage}
            alt="Tablero Casino y Tapas"
            className="w-full h-auto rounded-lg shadow-2xl border-4 border-amber-500/40"
          />

          {playersInGame.map((player, idx) => {
            const pos = boardPositions[player.position] || boardPositions[0];
            const offsetX = (idx % 2) * 10 - 5;
            const offsetY = Math.floor(idx / 2) * 10 - 5;

            return (
              <div
                key={player.id}
                className="absolute transition-all duration-700"
                style={{
                  ...pos,
                  transform: `translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px)`,
                }}
              >
                <div
                  className={`w-4 h-4 rounded-full ${player.color} border border-white shadow-md flex items-center justify-center`}
                  title={player.name}
                >
                  <span className="text-white text-[9px] font-bold">{player.name.charAt(0)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Panel inferior */}
      <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-amber-500/30 p-3 space-y-3">
        {/* Jugadores */}
        <div className="grid grid-cols-4 gap-2">
          {playersInGame.map((p) => (
            <div
              key={p.id}
              className={`p-2 rounded-lg border text-center ${
                currentPlayer === p.id
                  ? "border-amber-500 bg-amber-500/20"
                  : "border-gray-600/30 bg-black/20"
              }`}
            >
              <div className={`w-4 h-4 rounded-full ${p.color} mx-auto mb-1`} />
              <p className="text-white text-xs font-medium">{p.name}</p>
              <p className="text-amber-400 text-xs">{p.money} pts</p>
            </div>
          ))}
        </div>

        {/* Botones */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              onClick={rollDice}
              className="bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white"
            >
              <Dice1 className="w-4 h-4 mr-2" />
              Lanzar Dados
            </Button>
            {diceValue && getDiceIcon(diceValue)}
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="border-amber-600/30 text-amber-400 hover:bg-amber-600/10"
              onClick={() => onNavigate?.("menu")}
            >
              <Home className="w-4 h-4 mr-1" />
              Inicio
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
