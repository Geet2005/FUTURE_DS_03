import { PresetCampaign, MarketingRow, FunnelKPIs, ChannelPerformance, DropOffMetric, TimeBasedTrend } from "./types";

// Generates simulated marketing campaign datasets with explicit, traceable anomalies
// so the user can interactively "clean" the data in Step 2 and observe the KPI impacts.

export const CAMPAIGN_PRESETS: PresetCampaign[] = [
  {
    id: "saas_launch",
    name: "SaaS Workflow Pro Launch",
    description: "Launch of a B2B productivity workspace. High impressions and signups, but major friction in getting users to upgrade from trials to purchases.",
    rawRows: [
      // Duplicate anomaly (identical date and channel)
      { id: "saas-1", date: "2026-03-01", channel: "Google Ads", impressions: 12000, clicks: 480, visits: 410, signups: 82, purchases: 4 },
      { id: "saas-2", date: "2026-03-01", channel: "Google Ads", impressions: 12000, clicks: 480, visits: 410, signups: 82, purchases: 4 }, // DUPLICATE

      // Non-standard channel names
      { id: "saas-3", date: "2026-03-02", channel: "google ads", impressions: 14500, clicks: 580, visits: 500, signups: 95, purchases: 5 }, // lowercase
      { id: "saas-4", date: "2026-03-03", channel: "Google Ads", impressions: 13200, clicks: 530, visits: 450, signups: 91, purchases: 3 },
      { id: "saas-5", date: "2026-03-04", channel: "GOOGLE ADS", impressions: 11000, clicks: 440, visits: 380, signups: 74, purchases: 6 }, // uppercase

      { id: "saas-6", date: "2026-03-01", channel: "Facebook Ads", impressions: 18000, clicks: 900, visits: 720, signups: 108, purchases: 2 },
      { id: "saas-7", date: "2026-03-02", channel: "FB Ads", impressions: 19500, clicks: 980, visits: 780, signups: 115, purchases: 3 }, // abbreviation
      { id: "saas-8", date: "2026-03-03", channel: "Facebook Ads", impressions: 22000, clicks: 1100, visits: 880, signups: 132, purchases: 4 },
      { id: "saas-9", date: "2026-03-04", channel: "Facbook Ads", impressions: 17500, clicks: 875, visits: 700, signups: 105, purchases: 1 }, // typo

      // Missing value anomaly (clicks, visits or signups are -1, meaning missing or corrupted)
      { id: "saas-10", date: "2026-03-05", channel: "Facebook Ads", impressions: 21000, clicks: 1050, visits: 820, signups: -1, purchases: 2 }, // MISSING SIGNUPS (-1)

      { id: "saas-11", date: "2026-03-01", channel: "Instagram Ads", impressions: 15400, clicks: 770, visits: 620, signups: 48, purchases: 1 },
      { id: "saas-12", date: "2026-03-02", channel: "Insta Ads", impressions: 16800, clicks: 840, visits: 660, signups: 53, purchases: 2 }, // abbreviation
      { id: "saas-13", date: "2023-03-03", channel: "Instagram Ads", impressions: 14200, clicks: -1, visits: 570, signups: 44, purchases: 1 }, // MISSING CLICKS (-1) & Out of range Date
      { id: "saas-14", date: "2026-03-04", channel: "Instagram Ads", impressions: 18500, clicks: 925, visits: 740, signups: 55, purchases: 3 },

      { id: "saas-15", date: "2026-03-01", channel: "Email Marketing", impressions: 5000, clicks: 750, visits: 700, signups: 350, purchases: 42 },
      { id: "saas-16", date: "2026-03-02", channel: "email marketing", impressions: 4800, clicks: 720, visits: 680, signups: 338, purchases: 38 }, // lowercase
      { id: "saas-17", date: "2026-03-03", channel: "Email Marketing", impressions: 5200, clicks: 780, visits: 740, signups: 362, purchases: 45 },
      
      // Negative value anomaly (invalid math)
      { id: "saas-18", date: "2026-03-04", channel: "Email Marketing", impressions: 4900, clicks: 735, visits: 690, signups: 340, purchases: -5 }, // NEGATIVE PURCHASES (-5)
      { id: "saas-19", date: "2026-03-05", channel: "Email Marketing", impressions: 5300, clicks: 795, visits: 750, signups: 375, purchases: 49 },
    ],
  },
  {
    id: "ecommerce_summer",
    name: "Summer Fashion Gala Sale",
    description: "An interactive consumer campaign. Heavy influencer drive and Google shopping ads. High click volume but extreme bounce rates on mobile landing pages.",
    rawRows: [
      { id: "eco-1", date: "2026-06-01", channel: "Google Ads", impressions: 45000, clicks: 2250, visits: 1350, signups: 202, purchases: 40 },
      { id: "eco-2", date: "2026-06-02", channel: "google ads", impressions: 48000, clicks: 2400, visits: 1440, signups: 216, purchases: 45 },
      { id: "eco-3", date: "2026-06-02", channel: "google ads", impressions: 48000, clicks: 2400, visits: 1440, signups: 216, purchases: 45 }, // DUPLICATE

      { id: "eco-4", date: "2026-06-03", channel: "Google Ads", impressions: 51000, clicks: 2550, visits: 1530, signups: 229, purchases: 52 },
      { id: "eco-5", date: "2026-06-04", channel: "Google Ads", impressions: 46000, clicks: 2300, visits: -1, signups: 207, purchases: 41 }, // MISSING VISITS (-1)

      { id: "eco-6", date: "2026-06-01", channel: "Facebook Ads", impressions: 85000, clicks: 5100, visits: 1980, signups: 297, purchases: 61 },
      { id: "eco-7", date: "2026-06-02", channel: "Facebook Ads", impressions: 92000, clicks: 5520, visits: 2150, signups: 322, purchases: 65 },
      { id: "eco-8", date: "2026-06-03", channel: "FB Ads", impressions: 89000, clicks: 5340, visits: 2080, signups: 312, purchases: 59 },
      { id: "eco-9", date: "2026-06-04", channel: "Facebook Ads", impressions: -10000, clicks: 5400, visits: 2100, signups: 315, purchases: 64 }, // NEGATIVE IMPRESSIONS

      { id: "eco-10", date: "2026-06-01", channel: "Instagram Ads", impressions: 110000, clicks: 7700, visits: 2210, signups: 331, purchases: 72 },
      { id: "eco-11", date: "2026-06-02", channel: "Instagram Ads", impressions: 125000, clicks: 8750, visits: 2520, signups: 378, purchases: 83 },
      { id: "eco-12", date: "2026-06-03", channel: "Insta Ads", impressions: 118000, clicks: 8260, visits: 2380, signups: 357, purchases: 79 },
      { id: "eco-13", date: "2026-06-04", channel: "Instagram Ads", impressions: 130000, clicks: 9100, visits: 2620, signups: 393, purchases: 90 },

      { id: "eco-14", date: "2026-06-01", channel: "Email Marketing", impressions: 12000, clicks: 1800, visits: 1650, signups: 825, purchases: 198 },
      { id: "eco-15", date: "2026-06-02", channel: "Email Marketing", impressions: 11500, clicks: 1725, visits: 1580, signups: 790, purchases: 181 },
      { id: "eco-16", date: "2026-06-03", channel: "Email Marketing", impressions: 13000, clicks: 1950, visits: 1790, signups: -1, purchases: 205 }, // MISSING SIGNUPS
    ],
  },
  {
    id: "app_install",
    name: "Mobile App Booster Campaign",
    description: "Multi-channel installer campaign for an mobile fitness app. High click-to-visit rates due to direct link app-stores, but low original click rates (CTR) on banners.",
    rawRows: [
      { id: "app-1", date: "2026-05-01", channel: "Google Ads", impressions: 200000, clicks: 600, visits: 580, signups: 174, purchases: 26 },
      { id: "app-2", date: "2026-05-02", channel: "Google Ads", impressions: 210000, clicks: 630, visits: 610, signups: 183, purchases: 27 },
      { id: "app-3", date: "2026-05-03", channel: "Google Ads", impressions: -500, clicks: 580, visits: 560, signups: 168, purchases: 25 }, // NEGATIVE IMPRESSIONS
      { id: "app-4", date: "2026-05-04", channel: "Google Ads", impressions: 190000, clicks: 570, visits: 550, signups: 165, purchases: 24 },

      { id: "app-5", date: "2026-05-01", channel: "Facebook Ads", impressions: 320000, clicks: 1280, visits: 1220, signups: 427, purchases: 43 },
      { id: "app-6", date: "2026-05-02", channel: "Facebook Ads", impressions: 340000, clicks: 1360, visits: 1300, signups: 455, purchases: 46 },
      { id: "app-7", date: "2026-05-02", channel: "Facebook Ads", impressions: 340000, clicks: 1360, visits: 1300, signups: 455, purchases: 46 }, // DUPLICATE
      { id: "app-8", date: "2026-05-03", channel: "FB Ads", impressions: 310000, clicks: 1240, visits: 1180, signups: 413, purchases: 41 },

      { id: "app-9", date: "2026-05-01", channel: "Instagram Ads", impressions: 280000, clicks: 1120, visits: 1070, signups: 321, purchases: 32 },
      { id: "app-10", date: "2026-05-02", channel: "Insta Ads", impressions: 300000, clicks: 1200, visits: 1150, signups: 345, purchases: 35 },
      { id: "app-11", date: "2026-05-03", channel: "Instagram Ads", impressions: 290000, clicks: 1160, visits: -1, signups: 333, purchases: 33 }, // MISSING VISITS

      { id: "app-12", date: "2026-05-01", channel: "Email Marketing", impressions: 15000, clicks: 1050, visits: 1010, signups: 454, purchases: 91 },
      { id: "app-13", date: "2026-05-02", channel: "Email Marketing", impressions: 16000, clicks: 1120, visits: 1080, signups: 486, purchases: 97 },
      { id: "app-14", date: "2026-05-03", channel: "email marketing", impressions: 14500, clicks: 1015, visits: 980, signups: 441, purchases: 88 },
    ],
  },
];

// Helper to flag raw duplicate rows, missing fields and value errors for preview in UI
export function getAnomalies(rows: MarketingRow[]) {
  const anomalies: {
    duplicates: string[];
    missing: string[];
    negatives: string[];
    nonStandard: string[];
  } = {
    duplicates: [],
    missing: [],
    negatives: [],
    nonStandard: [],
  };

  const seenMap = new Set<string>();

  rows.forEach((row, idx) => {
    // 1. Duplicate check (Date + Channel + Impressions + Clicks is identical to another row)
    const key = `${row.date}_${row.channel.toLowerCase().trim()}_${row.impressions}_${row.clicks}`;
    if (seenMap.has(key)) {
      anomalies.duplicates.push(row.id);
    } else {
      seenMap.add(key);
    }

    // 2. Missing value check (-1 triggers missing)
    if (
      row.impressions === -1 ||
      row.clicks === -1 ||
      row.visits === -1 ||
      row.signups === -1 ||
      row.purchases === -1
    ) {
      anomalies.missing.push(row.id);
    }

    // 3. Negatives check (excluding the -1 indicator)
    if (
      (row.impressions < -1 && row.impressions !== -1) ||
      (row.clicks < -1 && row.clicks !== -1) ||
      (row.visits < -1 && row.visits !== -1) ||
      (row.signups < -1 && row.signups !== -1) ||
      (row.purchases < -1 && row.purchases !== -1) ||
      row.impressions < 0 && row.impressions !== -1 ||
      row.clicks < 0 && row.clicks !== -1 ||
      row.visits < 0 && row.visits !== -1 ||
      row.signups < 0 && row.signups !== -1 ||
      row.purchases < 0 && row.purchases !== -1
    ) {
      anomalies.negatives.push(row.id);
    }

    // 4. Non-standard channel names
    const legitimateNames = ["Google Ads", "Facebook Ads", "Instagram Ads", "Email Marketing"];
    if (!legitimateNames.includes(row.channel)) {
      anomalies.nonStandard.push(row.id);
    }
  });

  return anomalies;
}

// Clean data function implementing Step 2 requirements
export function cleanMarketingData(rows: MarketingRow[]): { cleaned: MarketingRow[]; log: string[] } {
  const log: string[] = [];
  const cleaned: MarketingRow[] = [];
  const seenKeys = new Set<string>();

  // Helper to map and standardize names
  const standardizeChannel = (chan: string): string => {
    const c = chan.toLowerCase().replace(/\s+/g, " ").trim();
    if (c.includes("google") || c === "google" || c === "googleads") return "Google Ads";
    if (c.includes("facebook") || c.includes("fb") || c === "facebookads") return "Facebook Ads";
    if (c.includes("instagram") || c.includes("insta")) return "Instagram Ads";
    if (c.includes("email")) return "Email Marketing";
    return chan; // Fallback
  };

  rows.forEach((row) => {
    // A. Standardize channel name first so duplicates and calculations are aligned
    const standardized = standardizeChannel(row.channel);
    if (standardized !== row.channel) {
      log.push(`Standardized channel '${row.channel}' to '${standardized}' on row ${row.date}.`);
    }

    let impressions = row.impressions;
    let clicks = row.clicks;
    let visits = row.visits;
    let signups = row.signups;
    let purchases = row.purchases;

    // B. Out of range / negative checks
    if (impressions < 0 && impressions !== -1) {
      log.push(`Corrected negative impressions count (${impressions}) to absolute value (${Math.abs(impressions)}) on ${row.date}.`);
      impressions = Math.abs(impressions);
    }
    if (clicks < 0 && clicks !== -1) {
      log.push(`Corrected negative clicks (${clicks}) to 0 on ${row.date}.`);
      clicks = Math.abs(clicks);
    }
    if (visits < 0 && visits !== -1) {
      log.push(`Corrected negative visits (${visits}) to 0 on ${row.date}.`);
      visits = Math.abs(visits);
    }
    if (signups < 0 && signups !== -1) {
      log.push(`Corrected negative signups (${signups}) to 0 on ${row.date}.`);
      signups = Math.abs(signups);
    }
    if (purchases < 0 && purchases !== -1) {
      log.push(`Corrected negative purchases (${purchases}) to 0 on ${row.date}.`);
      purchases = Math.abs(purchases);
    }

    // C. Handle missing values (-1 indicator)
    // We can impute based on average conversion ratios of remaining accurate records, or general averages:
    // ctr ~= 2.5%, visitRate ~= 80%, signupRate ~= 20%, purchaseRate = 12%
    if (impressions === -1) {
      impressions = clicks > 0 ? Math.round(clicks / 0.025) : 10000;
      log.push(`Imputed missing impressions (${impressions}) from click volume on ${row.date}.`);
    }
    if (clicks === -1) {
      clicks = impressions > 0 ? Math.round(impressions * 0.025) : 300;
      log.push(`Imputed missing clicks (${clicks}) based on 2.5% benchmark CTR on ${row.date}.`);
    }
    if (visits === -1) {
      visits = clicks > 0 ? Math.round(clicks * 0.82) : 250;
      log.push(`Imputed missing visits (${visits}) based on 82% standard visit rate on ${row.date}.`);
    }
    if (signups === -1) {
      signups = visits > 0 ? Math.round(visits * 0.18) : 40;
      log.push(`Imputed missing signups (${signups}) based on 18% standard signup rate on ${row.date}.`);
    }
    if (purchases === -1) {
      purchases = signups > 0 ? Math.round(signups * 0.12) : 5;
      log.push(`Imputed missing purchases (${purchases}) based on 12% standard purchase rate on ${row.date}.`);
    }

    // D. Correct erroneous date years (e.g., 2023 back to 2026 to ensure time-series correctness)
    let date = row.date;
    if (date.startsWith("2023")) {
      date = date.replace("2023", "2026");
      log.push(`Corrected outlier Year '2023' to campaign year '2026' on ${row.date}.`);
    }

    // E. Eliminate duplicate check
    const duplicateKey = `${date}_${standardized}_${impressions}_${clicks}_${visits}_${signups}_${purchases}`;
    if (seenKeys.has(duplicateKey)) {
      log.push(`Removed duplicate entry for channel '${standardized}' on ${date}.`);
      return; // Skip adding duplicates
    }
    seenKeys.add(duplicateKey);

    cleaned.push({
      id: row.id,
      date,
      channel: standardized,
      impressions,
      clicks,
      visits,
      signups,
      purchases,
    });
  });

  return { cleaned, log };
}

// Perform Step 4 & 5 calculations over a dataset
export function calculateKPIs(rows: MarketingRow[]): FunnelKPIs {
  let totalImpressions = 0;
  let totalClicks = 0;
  let totalVisits = 0;
  let totalSignups = 0;
  let totalPurchases = 0;

  rows.forEach((r) => {
    totalImpressions += r.impressions;
    totalClicks += r.clicks;
    totalVisits += r.visits;
    totalSignups += r.signups;
    totalPurchases += r.purchases;
  });

  const ctr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
  const visitRate = totalClicks > 0 ? (totalVisits / totalClicks) * 100 : 0;
  const signupRate = totalVisits > 0 ? (totalSignups / totalVisits) * 100 : 0;
  const purchaseRate = totalSignups > 0 ? (totalPurchases / totalSignups) * 100 : 0;
  const overallConversionRate = totalImpressions > 0 ? (totalPurchases / totalImpressions) * 100 : 0;

  return {
    totalImpressions,
    totalClicks,
    totalVisits,
    totalSignups,
    totalPurchases,
    ctr,
    visitRate,
    signupRate,
    purchaseRate,
    overallConversionRate,
  };
}

export function calculateChannelPerformance(rows: MarketingRow[]): ChannelPerformance[] {
  const group: { [channel: string]: MarketingRow[] } = {};
  rows.forEach((r) => {
    if (!group[r.channel]) group[r.channel] = [];
    group[r.channel].push(r);
  });

  return Object.keys(group).map((ch) => {
    const kpi = calculateKPIs(group[ch]);
    return {
      channel: ch,
      impressions: kpi.totalImpressions,
      clicks: kpi.totalClicks,
      visits: kpi.totalVisits,
      signups: kpi.totalSignups,
      purchases: kpi.totalPurchases,
      ctr: kpi.ctr,
      visitRate: kpi.visitRate,
      signupRate: kpi.signupRate,
      purchaseRate: kpi.purchaseRate,
      overallConversionRate: kpi.overallConversionRate,
    };
  });
}

export function calculateDropOffs(kpi: FunnelKPIs): DropOffMetric[] {
  return [
    {
      currentStage: "Impressions",
      nextStage: "Clicks",
      usersEntering: kpi.totalImpressions,
      usersLost: kpi.totalImpressions - kpi.totalClicks,
      dropOffRate: kpi.totalImpressions > 0 ? ((kpi.totalImpressions - kpi.totalClicks) / kpi.totalImpressions) * 100 : 0,
    },
    {
      currentStage: "Clicks",
      nextStage: "Visits",
      usersEntering: kpi.totalClicks,
      usersLost: kpi.totalClicks - kpi.totalVisits,
      dropOffRate: kpi.totalClicks > 0 ? ((kpi.totalClicks - kpi.totalVisits) / kpi.totalClicks) * 100 : 0,
    },
    {
      currentStage: "Visits",
      nextStage: "Signups",
      usersEntering: kpi.totalVisits,
      usersLost: kpi.totalVisits - kpi.totalSignups,
      dropOffRate: kpi.totalVisits > 0 ? ((kpi.totalVisits - kpi.totalSignups) / kpi.totalVisits) * 100 : 0,
    },
    {
      currentStage: "Signups",
      nextStage: "Purchases",
      usersEntering: kpi.totalSignups,
      usersLost: kpi.totalSignups - kpi.totalPurchases,
      dropOffRate: kpi.totalSignups > 0 ? ((kpi.totalSignups - kpi.totalPurchases) / kpi.totalSignups) * 100 : 0,
    },
  ];
}

export function calculateMonthlyTrends(rows: MarketingRow[]): TimeBasedTrend[] {
  // Sort rows chronologically
  const sorted = [...rows].sort((a, b) => a.date.localeCompare(b.date));
  
  // Group by YYYY-MM
  const group: { [month: string]: MarketingRow[] } = {};
  sorted.forEach((r) => {
    const month = r.date.substring(0, 7); // YYYY-MM
    if (!group[month]) group[month] = [];
    group[month].push(r);
  });

  return Object.keys(group).sort().map((month) => {
    const kpi = calculateKPIs(group[month]);
    
    // Convert YYYY-MM to word, eg. "2026-03" -> "March"
    const parsed = new Date(month + "-02"); // avoid local timezone rolling back
    const label = parsed.toLocaleString("en-US", { month: "long" }) + " " + parsed.getFullYear();

    return {
      period: label,
      impressions: kpi.totalImpressions,
      clicks: kpi.totalClicks,
      visits: kpi.totalVisits,
      signups: kpi.totalSignups,
      purchases: kpi.totalPurchases,
      conversionRate: kpi.overallConversionRate,
    };
  });
}
