import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Package, 
  ArrowLeft,
  Check
} from 'lucide-react';
import type { Screen } from '../src/App.tsx';

interface InventoryScreenProps {
  onNavigate: (screen: Screen) => void;
}

interface InventoryItem {
  id: string;
  name: string;
  description: string;
  category: 'avatars' | 'themes';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  preview: string;
  equipped: boolean;
}

export function InventoryScreen({ onNavigate }: InventoryScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<'avatars' | 'themes'>('avatars');
  const [equippedItems, setEquippedItems] = useState<Set<string>>(new Set(['1', '4']));

  const inventoryItems: InventoryItem[] = [
    // Avatars
    {
      id: '1',
      name: 'Avatar Clásico',
      description: 'Tu avatar por defecto',
      category: 'avatars',
      rarity: 'common',
      preview: '👤',
      equipped: true
    },
    {
      id: '2',
      name: 'Avatar Torero',
      description: 'Luce como un auténtico torero español',
      category: 'avatars',
      rarity: 'rare',
      preview: '🐂',
      equipped: false
    },
    {
      id: '3',
      name: 'Avatar Flamenca',
      description: 'Baila por el tablero con elegancia',
      category: 'avatars',
      rarity: 'epic',
      preview: '💃',
      equipped: false
    },
    
    // Themes
    {
      id: '4',
      name: 'Tema Clásico',
      description: 'Tablero tradicional español',
      category: 'themes',
      rarity: 'common',
      preview: '🏛️',
      equipped: true
    },
    {
      id: '5',
      name: 'Tema Andaluz',
      description: 'Tablero con estilo andaluz clásico',
      category: 'themes',
      rarity: 'legendary',
      preview: '🌸',
      equipped: false
    }
  ];

  const rarityColors = {
    common: 'border-gray-400 text-gray-400',
    rare: 'border-blue-400 text-blue-400',
    epic: 'border-purple-400 text-purple-400',
    legendary: 'border-amber-400 text-amber-400'
  };

  const filteredItems = inventoryItems.filter(item => item.category === selectedCategory);

  const handleEquip = (itemId: string, category: string) => {
    const newEquipped = new Set(equippedItems);
    
    // Desequipar otros items de la misma categoría
    inventoryItems.forEach(item => {
      if (item.category === category && item.id !== itemId) {
        newEquipped.delete(item.id);
      }
    });
    
    // Equipar/desequipar el item seleccionado
    if (newEquipped.has(itemId)) {
      newEquipped.delete(itemId);
    } else {
      newEquipped.add(itemId);
    }
    
    setEquippedItems(newEquipped);
  };

  return (
    <div className="flex flex-col h-full p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onNavigate('menu')}
          className="text-white hover:text-amber-400"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver
        </Button>
        
        <h1 className="text-white text-xl flex items-center">
          <Package className="w-6 h-6 mr-2 text-amber-400" />
          Mi Inventario
        </h1>
        
        <div className="flex items-center text-white/60 text-sm">
          <span>{inventoryItems.length} items</span>
        </div>
      </div>

      {/* Categories Tabs */}
      <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as any)} className="flex-1">
        <TabsList className="grid w-full grid-cols-2 bg-black/40 border border-amber-500/30">
          <TabsTrigger value="avatars" className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-400 text-white/60">
            👤 Avatars
          </TabsTrigger>
          <TabsTrigger value="themes" className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-400 text-white/60">
            🎨 Temas
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedCategory} className="flex-1 mt-4">
          <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-200px)]">
            {filteredItems.map((item) => (
              <Card key={item.id} className="bg-black/60 border-amber-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    {/* Item Preview */}
                    <div className={`w-16 h-16 bg-gradient-to-br from-amber-400/20 to-red-600/20 rounded-xl flex items-center justify-center text-2xl border-2 relative ${
                      equippedItems.has(item.id) ? 'border-amber-400 shadow-amber-400/50 shadow-lg' : 'border-amber-500/30'
                    }`}>
                      {item.preview}
                      {equippedItems.has(item.id) && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-black" />
                        </div>
                      )}
                    </div>
                    
                    {/* Item Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-white font-medium">{item.name}</h3>
                        <Badge 
                          variant="outline" 
                          className={`text-xs px-2 py-0 ${rarityColors[item.rarity]}`}
                        >
                          {item.rarity}
                        </Badge>
                      </div>
                      <p className="text-white/60 text-sm mb-2">{item.description}</p>
                      
                      <div className="flex items-center justify-between">
                        {equippedItems.has(item.id) ? (
                          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                            <Check className="w-3 h-3 mr-1" />
                            Equipado
                          </Badge>
                        ) : (
                          <div />
                        )}
                        
                        <Button 
                          size="sm"
                          variant={equippedItems.has(item.id) ? "outline" : "default"}
                          onClick={() => handleEquip(item.id, item.category)}
                          className={
                            equippedItems.has(item.id) 
                              ? "border-amber-400 text-amber-400 hover:bg-amber-500/20" 
                              : "bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700 text-white"
                          }
                        >
                          {equippedItems.has(item.id) ? 'Desequipar' : 'Equipar'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {filteredItems.length === 0 && (
              <Card className="bg-black/40 border-amber-500/20">
                <CardContent className="p-8 text-center">
                  <Package className="w-12 h-12 text-white/40 mx-auto mb-4" />
                  <p className="text-white/60">No tienes items en esta categoría</p>
                  <p className="text-white/40 text-sm mt-1">¡Visita la tienda para conseguir más!</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
