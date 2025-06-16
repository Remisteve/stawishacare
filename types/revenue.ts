// types/revenue.ts

// Revenue types for RevenueAdsCenter
export interface RevenueStream {
  id: number;
  source: string;
  type: string;
  status: string;
  monthlyRevenue: number;
  impressions: number;
  clicks: number;
  ctr: number;
  demographics: string;
  regions: string;
}

export interface AdCampaign {
  id: number;
  name: string;
  advertiser: string;
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  status: string;
  category: string;
  targetAudience: string;
  placement: string;
  performance: number;
}

export interface Donor {
  name: string;
  amount: number;
  category: string;
}

export interface RevenueStats {
  totalRevenue: number;
  totalImpressions: number;
  totalClicks: number;
  totalAdSpend: number;
  avgCTR: number;
  revenuePerClick: number;
  roi: number;
  activeCampaigns: number;
  monthlyGrowth: number;
  newAdvertisers: number;
  retentionRate: number;
  avgCampaignBudget: number;
  countriesReached: number;
  healthcareProviders: number;
  patientsReached: number;
  livesImpacted: number;
}