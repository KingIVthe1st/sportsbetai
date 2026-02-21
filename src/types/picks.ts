export type PickConfidence = "HIGH" | "MEDIUM" | "LOW";

export type EnginePick = {
  home_team: string;
  away_team: string;
  home_name: string;
  away_name: string;
  game_time: string;
  model_spread: number;
  xgb_prob: number;
  elo_prob: number;
  models_agree: boolean;
  factors: string[];
  pick_score: number;
  confidence: PickConfidence;
  recommended_pick: string;
  market_spread: number;
  market_total: number;
  ml_home: number;
  ml_away: number;
};

export type PicksPayload = {
  date: string;
  generated_at: string;
  engine: string;
  total_games: number;
  picks: EnginePick[];
};
