'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CraftingCalculator } from '@/components/game/CraftingCalculator';
import { CombatSimulator } from '@/components/game/CombatSimulator';
import MiniGame from '@/components/game/MiniGame';
import { cn } from '@/lib/utils';

type TabValue = 'crafting' | 'combat' | 'minigame';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabValue>('crafting');

  return (
    <div className="min-h-screen paper-texture">
      {/* Header */}
      <header className="paper-card border-b-4 border-primary sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col items-center gap-2">
            {/* Title Banner */}
            <div className="text-center">
              <h1 className="section-title text-2xl md:text-4xl tracking-wide">
                🏠 Guerra de Quintal
              </h1>
              <p className="text-primary font-medium text-sm md:text-base handwritten mt-1">
                Mestres da Sucata
              </p>
            </div>
            
            {/* Subtitle */}
            <p className="text-muted-foreground text-xs md:text-sm text-center max-w-lg">
              Defenda seu quintal das criaturas do folclore brasileiro usando armas feitas de sucata!
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabValue)} className="w-full">
          {/* Tab Navigation */}
          <TabsList className="grid w-full grid-cols-3 mb-6 paper-card rounded-lg p-1">
            <TabsTrigger 
              value="crafting" 
              className={cn(
                'rounded-md transition-all text-sm md:text-base',
                activeTab === 'crafting' && 'tab-active'
              )}
            >
              <span className="flex items-center gap-2">
                <span>🔧</span>
                <span className="hidden sm:inline">Calculadora de</span> Crafting
              </span>
            </TabsTrigger>
            <TabsTrigger 
              value="combat" 
              className={cn(
                'rounded-md transition-all text-sm md:text-base',
                activeTab === 'combat' && 'tab-active'
              )}
            >
              <span className="flex items-center gap-2">
                <span>⚔️</span>
                <span className="hidden sm:inline">Simulador de</span> Combate
              </span>
            </TabsTrigger>
            <TabsTrigger 
              value="minigame" 
              className={cn(
                'rounded-md transition-all text-sm md:text-base',
                activeTab === 'minigame' && 'tab-active'
              )}
            >
              <span className="flex items-center gap-2">
                <span>🎮</span>
                Mini <span className="hidden sm:inline">Jogo</span>
              </span>
            </TabsTrigger>
          </TabsList>

          {/* Tab Contents */}
          <div className="paper-card rounded-lg p-4 md:p-6">
            <TabsContent value="crafting" className="mt-0 focus-visible:outline-none">
              <CraftingCalculator />
            </TabsContent>

            <TabsContent value="combat" className="mt-0 focus-visible:outline-none">
              <CombatSimulator />
            </TabsContent>

            <TabsContent value="minigame" className="mt-0 focus-visible:outline-none">
              <MiniGame />
            </TabsContent>
          </div>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="paper-card border-t-4 border-primary mt-8">
        <div className="container mx-auto px-4 py-4">
          <div className="text-center">
            <p className="text-muted-foreground text-xs">
              🎲 Guerra de Quintal: Mestres da Sucata - Um jogo de tabuleiro sobre criatividade e folclore brasileiro
            </p>
            <div className="flex justify-center gap-4 mt-2 text-xs text-muted-foreground">
              <span>🃏 23 Receitas de Armas</span>
              <span>•</span>
              <span>👹 6 Monstros</span>
              <span>•</span>
              <span>🎲 Sistema d6</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
