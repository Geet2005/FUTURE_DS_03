export type CampaignPresetId = "saas_launch" | "ecommerce_summer" | "app_install";

export interface MarketingRow {
  id: string;
  date: string; // YYYY-MM-DD
  channel: string;
  impressions: number;
  clicks: number;
  visits: number;
  signups: number;
  purchases: number;
  isDuplicate?: boolean; // Used in the data cleaning section
  hasMissingValue?: boolean; // Used in the data cleaning section
}

export interface PresetCampaign {
  id: CampaignPresetId;
  name: string;
  description: string;
  rawRows: MarketingRow[];
}

export interface FunnelKPIs {
  totalImpressions: number;
  totalClicks: number;
  totalVisits: number;
  totalSignups: number;
  totalPurchases: number;
  ctr: number; // % Click Through Rate
  visitRate: number; // % Visit Rate (Visits / Clicks)
  signupRate: number; // % Signup Rate (Signups / Visits)
  purchaseRate: number; // % Purchase Rate (Purchases / Signups)
  overallConversionRate: number; // % Overall Conversion (Purchases / Impressions)
}

export interface ChannelPerformance {
  channel: string;
  impressions: number;
  clicks: number;
  visits: number;
  signups: number;
  purchases: number;
  ctr: number;
  visitRate: number;
  signupRate: number;
  purchaseRate: number;
  overallConversionRate: number;
}

export interface TimeBasedTrend {
  period: string; // e.g., Month or Week
  impressions: number;
  clicks: number;
  visits: number;
  signups: number;
  purchases: number;
  conversionRate: number;
}

export interface DropOffMetric {
  currentStage: string;
  nextStage: string;
  usersEntering: number;
  usersLost: number;
  dropOffRate: number;
}

export interface AIAnalysisResponse {
  summary: string;
  keyBottleneck: string;
  channelComparison: string;
  insights: Array<{
    title: string;
    description: string;
    metricAffected: string;
    impact: "HIGH" | "MEDIUM" | "LOW";
  }>;
  recommendations: Array<{
    title: string;
    actionableStep: string;
    channelAffected: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
  }>;
}
