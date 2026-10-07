export type SceneId = 
  | 'intro'
  | 'gameplay'
  | 'voice_chat'
  | 'game_modes'
  | 'global_room'
  | 'rewards'
  | 'vip'
  | 'cta';

export type AspectRatioType = '9:16' | '1:1' | '16:9';

export interface SceneMeta {
  id: SceneId;
  label: string;
  badge: string;
  durationMs: number;
  headline: string;
  subheadline: string;
}

export type PlayableGameType = 'ludo' | 'domino' | 'jackaroo';

export interface LudoPlayer {
  id: 'p1' | 'p2' | 'p3' | 'p4';
  name: string;
  color: 'yellow' | 'red' | 'blue' | 'green';
  colorHex: string;
  avatarBg: string;
  flag: string;
  isHuman: boolean;
  pawns: number[]; // -1 = in base, 0-51 = on main track, 52-56 = home path, 57 = finished
  homeCount: number;
  speechText?: string;
}

export type GameCategory = 'ludo' | 'domino' | 'jackaroo';

export interface LudoModeInfo {
  id: string;
  name: string;
  players: string;
  features: string[];
  icon: string;
}

export interface DominoModeInfo {
  id: string;
  name: string;
  players: string;
  features: string[];
  icon: string;
}

export interface JackarooModeInfo {
  id: string;
  name: string;
  features: string[];
  icon: string;
}

export interface VirtualGift {
  id: string;
  name: string;
  icon: string;
  priceGold: number;
  tier: 'special' | 'epic' | 'legendary';
  description: string;
}

export interface VoiceUser {
  id: string;
  name: string;
  country: string;
  flag: string;
  avatar: string;
  role?: string;
  isSpeaking: boolean;
  level: number;
}
