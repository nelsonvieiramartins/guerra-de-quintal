import { NextRequest, NextResponse } from 'next/server';
import { getWeaponById } from '@/data/recipes';
import { getMonsterById } from '@/data/monsters';
import { performCombat, CombatResult } from '@/lib/gameLogic';

interface CombatRequest {
  weaponId: string;
  monsterId: string;
  currentMonsterHp?: number;
}

interface CombatResponse {
  success: boolean;
  result?: CombatResult;
  error?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<CombatResponse>> {
  try {
    const body: CombatRequest = await request.json();
    const { weaponId, monsterId, currentMonsterHp } = body;

    if (!weaponId || !monsterId) {
      return NextResponse.json(
        { success: false, error: 'Weapon ID and Monster ID are required' },
        { status: 400 }
      );
    }

    const weapon = getWeaponById(weaponId);
    const monster = getMonsterById(monsterId);

    if (!weapon) {
      return NextResponse.json(
        { success: false, error: 'Weapon not found' },
        { status: 404 }
      );
    }

    if (!monster) {
      return NextResponse.json(
        { success: false, error: 'Monster not found' },
        { status: 404 }
      );
    }

    // Use current HP if provided, otherwise use max HP
    const monsterWithHp = {
      ...monster,
      hp: currentMonsterHp ?? monster.hp,
    };

    const result = performCombat(weapon, monsterWithHp);

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error('Combat API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
