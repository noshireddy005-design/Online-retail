// Retail Customer Segmentation Project Data
// Based on UCI Online Retail Dataset (541K+ transactions, Dec 2010 - Dec 2011)

const retailDashboardData = {
  summary: {
    totalRevenue: 8928628.75,
    totalTransactions: 541909,
    activeCustomers: 4372,
    topCountry: "United Kingdom",
    topCountryRevenue: 8187806.36,
    topCountryPercentage: 91.7
  },

  countryRevenue: [
    { country: "United Kingdom", revenue: 8187806.36, percentage: 91.7 },
    { country: "Netherlands", revenue: 285446.34, percentage: 3.2 },
    { country: "EIRE", revenue: 263276.82, percentage: 2.9 },
    { country: "Germany", revenue: 228867.14, percentage: 2.6 },
    { country: "France", revenue: 197403.90, percentage: 2.2 },
    { country: "Australia", revenue: 137077.27, percentage: 1.5 },
    { country: "Spain", revenue: 54774.58, percentage: 0.6 },
    { country: "Others", revenue: 357423.66, percentage: 4.0 }
  ],

  monthlyRevenue: [
    { month: "Dec 2010", revenue: 748957.02 },
    { month: "Jan 2011", revenue: 560000.26 },
    { month: "Feb 2011", revenue: 498061.43 },
    { month: "Mar 2011", revenue: 683262.77 },
    { month: "Apr 2011", revenue: 589744.33 },
    { month: "May 2011", revenue: 723333.51 },
    { month: "Jun 2011", revenue: 691167.31 },
    { month: "Jul 2011", revenue: 681300.11 },
    { month: "Aug 2011", revenue: 682680.83 },
    { month: "Sep 2011", revenue: 1017596.22 },
    { month: "Oct 2011", revenue: 1070242.77 },
    { month: "Nov 2011", revenue: 1461756.25 },
    { month: "Dec 2011", revenue: 598630.00 } // Partial month (up to Dec 9)
  ],

  segments: [
    { name: "Champions", count: 650, percentage: 14.9, description: "Bought recently, buy often, and spend the most.", color: "#10b981", strategy: "Reward them. Introduce new products early. Exclusives." },
    { name: "Loyal Customers", count: 980, percentage: 22.4, description: "Spend good money and buy regularly. Responsive to promotions.", color: "#3b82f6", strategy: "Upsell premium products. Implement loyalty program. Ask for reviews." },
    { name: "Potential Loyalists", count: 1100, percentage: 25.2, description: "Recent customers with average frequency and decent spend.", color: "#f59e0b", strategy: "Recommend related products. Offer trial of loyalty programs. Keep engaged." },
    { name: "At Risk", count: 830, percentage: 19.0, description: "Spent big and purchased often, but it was a long time ago.", color: "#ef4444", strategy: "Send personalized emails. Win-back offers. Survey customer feedback." },
    { name: "Lost Customers", count: 812, percentage: 18.5, description: "Lowest recency, frequency, and monetary scores.", color: "#6b7280", strategy: "Re-engage with massive discounts or standard automated newsletters. Else sunset." }
  ],

  // Representative subset of customers for exploration
  customers: [
    { id: 14646, country: "Netherlands", recency: 1, frequency: 74, monetary: 280206.02, segment: "Champions" },
    { id: 18102, country: "United Kingdom", recency: 0, frequency: 60, monetary: 259657.30, segment: "Champions" },
    { id: 17450, country: "United Kingdom", recency: 8, frequency: 46, monetary: 194550.79, segment: "Champions" },
    { id: 14911, country: "EIRE", recency: 1, frequency: 201, monetary: 143825.06, segment: "Champions" },
    { id: 12415, country: "Australia", recency: 24, frequency: 21, monetary: 124914.53, segment: "Champions" },
    { id: 14156, country: "EIRE", recency: 9, frequency: 55, monetary: 117379.63, segment: "Champions" },
    { id: 17511, country: "United Kingdom", recency: 2, frequency: 31, monetary: 91062.38, segment: "Champions" },
    { id: 16029, country: "United Kingdom", recency: 38, frequency: 63, monetary: 81024.84, segment: "Champions" },
    { id: 12346, country: "United Kingdom", recency: 325, frequency: 1, monetary: 77183.60, segment: "At Risk" },
    { id: 16684, country: "United Kingdom", recency: 4, frequency: 28, monetary: 66653.56, segment: "Champions" },
    { id: 14096, country: "United Kingdom", recency: 4, frequency: 17, monetary: 65164.79, segment: "Champions" },
    { id: 13694, country: "United Kingdom", recency: 3, frequency: 50, monetary: 65039.62, segment: "Champions" },
    { id: 15311, country: "United Kingdom", recency: 0, frequency: 91, monetary: 60767.90, segment: "Champions" },
    { id: 13089, country: "United Kingdom", recency: 2, frequency: 97, monetary: 58825.83, segment: "Champions" },
    { id: 17949, country: "United Kingdom", recency: 1, frequency: 45, monetary: 58510.48, segment: "Champions" },
    { id: 15769, country: "United Kingdom", recency: 7, frequency: 26, monetary: 56252.70, segment: "Champions" },
    { id: 15061, country: "United Kingdom", recency: 3, frequency: 48, monetary: 54534.14, segment: "Champions" },
    { id: 14298, country: "United Kingdom", recency: 8, frequency: 44, monetary: 51527.30, segment: "Champions" },
    { id: 14088, country: "United Kingdom", recency: 10, frequency: 13, monetary: 50553.41, segment: "Champions" },
    { id: 17841, country: "United Kingdom", recency: 3, frequency: 124, monetary: 40991.57, segment: "Loyal Customers" },
    { id: 13777, country: "United Kingdom", recency: 0, frequency: 33, monetary: 25977.16, segment: "Loyal Customers" },
    { id: 12748, country: "United Kingdom", recency: 0, frequency: 210, monetary: 33719.73, segment: "Loyal Customers" },
    { id: 15838, country: "United Kingdom", recency: 11, frequency: 20, monetary: 33352.76, segment: "Loyal Customers" },
    { id: 12731, country: "France", recency: 23, frequency: 12, monetary: 18895.91, segment: "Loyal Customers" },
    { id: 12536, country: "Germany", recency: 15, frequency: 18, monetary: 12601.89, segment: "Loyal Customers" },
    { id: 15299, country: "United Kingdom", recency: 67, frequency: 11, monetary: 4596.52, segment: "Loyal Customers" },
    { id: 15555, country: "United Kingdom", recency: 12, frequency: 15, monetary: 4812.30, segment: "Loyal Customers" },
    { id: 14382, country: "United Kingdom", recency: 25, frequency: 8, monetary: 3512.90, segment: "Loyal Customers" },
    { id: 13090, country: "United Kingdom", recency: 8, frequency: 14, monetary: 8812.45, segment: "Loyal Customers" },
    { id: 13408, country: "United Kingdom", recency: 1, frequency: 62, monetary: 28117.04, segment: "Loyal Customers" },
    { id: 16333, country: "United Kingdom", recency: 7, frequency: 11, monetary: 26626.80, segment: "Loyal Customers" },
    { id: 16210, country: "United Kingdom", recency: 1, frequency: 18, monetary: 21086.30, segment: "Loyal Customers" },
    { id: 12471, country: "Germany", recency: 2, frequency: 30, monetary: 19824.05, segment: "Loyal Customers" },
    { id: 13798, country: "United Kingdom", recency: 4, frequency: 16, monetary: 37188.11, segment: "Loyal Customers" },
    { id: 15640, country: "United Kingdom", recency: 3, frequency: 12, monetary: 9286.00, segment: "Potential Loyalists" },
    { id: 12433, country: "Germany", recency: 0, frequency: 7, monetary: 13375.87, segment: "Potential Loyalists" },
    { id: 12477, country: "Germany", recency: 22, frequency: 6, monetary: 13219.74, segment: "Potential Loyalists" },
    { id: 13901, country: "United Kingdom", recency: 70, frequency: 5, monetary: 2843.10, segment: "Potential Loyalists" },
    { id: 14730, country: "United Kingdom", recency: 3, frequency: 8, monetary: 2154.34, segment: "Potential Loyalists" },
    { id: 15005, country: "United Kingdom", recency: 15, frequency: 28, monetary: 6316.22, segment: "Potential Loyalists" },
    { id: 15039, country: "United Kingdom", recency: 9, frequency: 47, monetary: 19786.47, segment: "Potential Loyalists" },
    { id: 12362, country: "Belgium", recency: 3, frequency: 11, monetary: 5220.05, segment: "Potential Loyalists" },
    { id: 12395, country: "Canada", recency: 15, frequency: 12, monetary: 3018.63, segment: "Potential Loyalists" },
    { id: 12451, country: "Switzerland", recency: 10, frequency: 10, monetary: 9112.23, segment: "Potential Loyalists" },
    { id: 12484, country: "Spain", recency: 30, frequency: 7, monetary: 4850.12, segment: "Potential Loyalists" },
    { id: 12540, country: "Spain", recency: 19, frequency: 17, monetary: 13410.03, segment: "Potential Loyalists" },
    { id: 12753, country: "Japan", recency: 22, frequency: 6, monetary: 21425.30, segment: "Potential Loyalists" },
    { id: 14527, country: "United Kingdom", recency: 2, frequency: 55, monetary: 8504.11, segment: "Potential Loyalists" },
    { id: 17850, country: "United Kingdom", recency: 372, frequency: 34, monetary: 5391.21, segment: "Lost Customers" },
    { id: 13047, country: "United Kingdom", recency: 31, frequency: 10, monetary: 3210.45, segment: "Potential Loyalists" },
    { id: 12347, country: "Iceland", recency: 2, frequency: 7, monetary: 4310.00, segment: "Potential Loyalists" },
    { id: 12348, country: "Finland", recency: 75, frequency: 4, monetary: 1797.24, segment: "Potential Loyalists" },
    { id: 12350, country: "Norway", recency: 310, frequency: 1, monetary: 334.40, segment: "Lost Customers" },
    { id: 12352, country: "Norway", recency: 36, frequency: 8, monetary: 2506.04, segment: "Potential Loyalists" },
    { id: 12359, country: "Cyprus", recency: 57, frequency: 4, monetary: 6372.58, segment: "Potential Loyalists" },
    { id: 12370, country: "Cyprus", recency: 51, frequency: 4, monetary: 3545.69, segment: "Potential Loyalists" },
    { id: 12373, country: "Austria", recency: 311, frequency: 1, monetary: 364.60, segment: "Lost Customers" },
    { id: 12377, country: "Switzerland", recency: 315, frequency: 2, monetary: 1628.12, segment: "Lost Customers" },
    { id: 12380, country: "Belgium", recency: 21, frequency: 4, monetary: 2721.40, segment: "Potential Loyalists" },
    { id: 12383, country: "Belgium", recency: 184, frequency: 5, monetary: 1807.06, segment: "At Risk" },
    { id: 12403, country: "Canada", recency: 49, frequency: 1, monetary: 409.90, segment: "Potential Loyalists" },
    { id: 12413, country: "France", recency: 66, frequency: 3, monetary: 758.10, segment: "Potential Loyalists" },
    { id: 12423, country: "Denmark", recency: 0, frequency: 8, monetary: 1859.31, segment: "Potential Loyalists" },
    { id: 12428, country: "Finland", recency: 26, frequency: 12, monetary: 7956.46, segment: "Potential Loyalists" },
    { id: 12431, country: "Australia", recency: 35, frequency: 15, monetary: 6475.90, segment: "Potential Loyalists" },
    { id: 12437, country: "France", recency: 1, frequency: 18, monetary: 4951.41, segment: "Potential Loyalists" },
    { id: 12441, country: "United Kingdom", recency: 366, frequency: 1, monetary: 173.55, segment: "Lost Customers" },
    { id: 12452, country: "Switzerland", recency: 16, frequency: 5, monetary: 431.10, segment: "Potential Loyalists" },
    { id: 12453, country: "Austria", recency: 134, frequency: 1, monetary: 707.09, segment: "Lost Customers" },
    { id: 12454, country: "Spain", recency: 53, frequency: 6, monetary: 3528.34, segment: "Potential Loyalists" },
    { id: 12455, country: "Spain", recency: 73, frequency: 4, monetary: 2461.66, segment: "Potential Loyalists" },
    { id: 12468, country: "Germany", recency: 143, frequency: 2, monetary: 729.55, segment: "At Risk" },
    { id: 12472, country: "Germany", recency: 32, frequency: 7, monetary: 6472.04, segment: "Potential Loyalists" },
    { id: 12473, country: "Germany", recency: 29, frequency: 5, monetary: 2012.30, segment: "Potential Loyalists" },
    { id: 12474, country: "Germany", recency: 17, frequency: 18, monetary: 7124.50, segment: "Potential Loyalists" },
    { id: 12476, country: "Germany", recency: 15, frequency: 11, monetary: 6512.90, segment: "Potential Loyalists" },
    { id: 12480, country: "Germany", recency: 27, frequency: 4, monetary: 3210.88, segment: "Potential Loyalists" },
    { id: 12481, country: "Germany", recency: 22, frequency: 5, monetary: 5431.10, segment: "Potential Loyalists" },
    { id: 12483, country: "Germany", recency: 18, frequency: 6, monetary: 2311.20, segment: "Potential Loyalists" },
    { id: 12490, country: "France", recency: 4, frequency: 10, monetary: 5410.23, segment: "Potential Loyalists" },
    { id: 12500, country: "Germany", recency: 8, frequency: 11, monetary: 4210.90, segment: "Potential Loyalists" },
    { id: 12501, country: "Germany", recency: 336, frequency: 1, monetary: 2169.39, segment: "Lost Customers" },
    { id: 12503, country: "Spain", recency: 337, frequency: 1, monetary: 1126.00, segment: "Lost Customers" },
    { id: 12504, country: "Germany", recency: 35, frequency: 4, monetary: 1412.30, segment: "Potential Loyalists" },
    { id: 12507, country: "Spain", recency: 14, frequency: 8, monetary: 4321.10, segment: "Potential Loyalists" },
    { id: 12510, country: "Spain", recency: 300, frequency: 1, monetary: 981.20, segment: "Lost Customers" },
    { id: 12515, country: "Italy", recency: 286, frequency: 1, monetary: 382.10, segment: "Lost Customers" },
    { id: 12516, country: "Germany", recency: 120, frequency: 2, monetary: 1102.50, segment: "At Risk" },
    { id: 12517, country: "Germany", recency: 2, frequency: 11, monetary: 2412.80, segment: "Potential Loyalists" },
    { id: 12518, country: "Germany", recency: 0, frequency: 5, monetary: 2012.30, segment: "Potential Loyalists" },
    { id: 12520, country: "Germany", recency: 77, frequency: 4, monetary: 1302.20, segment: "Potential Loyalists" },
    { id: 12522, country: "Germany", recency: 2, frequency: 2, monetary: 312.40, segment: "Potential Loyalists" },
    { id: 12523, country: "France", recency: 7, frequency: 11, monetary: 1802.10, segment: "Potential Loyalists" },
    { id: 12524, country: "Germany", recency: 8, frequency: 8, monetary: 4431.10, segment: "Potential Loyalists" },
    { id: 12528, country: "Germany", recency: 11, frequency: 6, monetary: 1012.30, segment: "Potential Loyalists" },
    { id: 12530, country: "Germany", recency: 64, frequency: 4, monetary: 1612.40, segment: "Potential Loyalists" },
    { id: 12535, country: "United Kingdom", recency: 320, frequency: 1, monetary: 721.40, segment: "Lost Customers" },
    { id: 12541, country: "Spain", recency: 9, frequency: 12, monetary: 9812.30, segment: "Potential Loyalists" },
    { id: 12544, country: "Spain", recency: 37, frequency: 4, monetary: 1361.20, segment: "Potential Loyalists" },
    { id: 12545, country: "Spain", recency: 77, frequency: 2, monetary: 928.10, segment: "Potential Loyalists" },
    { id: 12546, country: "Spain", recency: 46, frequency: 5, monetary: 1312.40, segment: "Potential Loyalists" },
    { id: 12547, country: "Spain", recency: 366, frequency: 1, monetary: 321.40, segment: "Lost Customers" },
    { id: 12548, country: "Spain", recency: 132, frequency: 1, monetary: 198.20, segment: "Lost Customers" },
    { id: 12550, country: "Germany", recency: 15, frequency: 3, monetary: 941.20, segment: "Potential Loyalists" },
    { id: 12551, country: "United Kingdom", recency: 350, frequency: 1, monetary: 168.00, segment: "Lost Customers" },
    { id: 12552, country: "Germany", recency: 12, frequency: 2, monetary: 721.40, segment: "Potential Loyalists" },
    { id: 12553, country: "Germany", recency: 4, frequency: 10, monetary: 3210.90, segment: "Potential Loyalists" },
    { id: 12556, country: "Germany", recency: 25, frequency: 5, monetary: 1210.40, segment: "Potential Loyalists" },
    { id: 12557, country: "Spain", recency: 16, frequency: 5, monetary: 11982.00, segment: "Potential Loyalists" },
    { id: 12558, country: "USA", recency: 7, frequency: 5, monetary: 3210.40, segment: "Potential Loyalists" },
    { id: 12559, country: "USA", recency: 255, frequency: 1, monetary: 468.20, segment: "Lost Customers" },
    { id: 12560, country: "Germany", recency: 7, frequency: 5, monetary: 1410.90, segment: "Potential Loyalists" },
    { id: 12561, country: "Germany", recency: 320, frequency: 1, monetary: 350.20, segment: "Lost Customers" },
    { id: 12562, country: "Germany", recency: 7, frequency: 8, monetary: 3212.10, segment: "Potential Loyalists" },
    { id: 12564, country: "Germany", recency: 255, frequency: 1, monetary: 412.30, segment: "Lost Customers" },
    { id: 12565, country: "Germany", recency: 180, frequency: 2, monetary: 310.20, segment: "At Risk" },
    { id: 12566, country: "Germany", recency: 300, frequency: 1, monetary: 512.40, segment: "Lost Customers" },
    { id: 12567, country: "Germany", recency: 10, frequency: 10, monetary: 8812.30, segment: "Potential Loyalists" },
    { id: 12569, country: "Germany", recency: 1, frequency: 15, monetary: 4321.10, segment: "Loyal Customers" },
    { id: 12571, country: "Germany", recency: 220, frequency: 2, monetary: 510.40, segment: "At Risk" },
    { id: 12572, country: "Germany", recency: 3, frequency: 18, monetary: 11012.30, segment: "Loyal Customers" },
    { id: 12573, country: "Germany", recency: 150, frequency: 1, monetary: 168.20, segment: "Lost Customers" },
    { id: 12574, country: "Germany", recency: 280, frequency: 1, monetary: 218.40, segment: "Lost Customers" },
    { id: 12576, country: "Germany", recency: 35, frequency: 6, monetary: 3210.40, segment: "Potential Loyalists" },
    { id: 12577, country: "Germany", recency: 35, frequency: 4, monetary: 612.30, segment: "Potential Loyalists" },
    { id: 12578, country: "Germany", recency: 1, frequency: 10, monetary: 3312.40, segment: "Potential Loyalists" },
    { id: 12579, country: "Germany", recency: 120, frequency: 2, monetary: 512.30, segment: "At Risk" },
    { id: 12580, country: "Germany", recency: 180, frequency: 1, monetary: 321.40, segment: "Lost Customers" },
    { id: 12581, country: "Germany", recency: 17, frequency: 3, monetary: 928.10, segment: "Potential Loyalists" },
    { id: 12582, country: "Germany", recency: 15, frequency: 4, monetary: 1912.40, segment: "Potential Loyalists" },
    { id: 12583, country: "France", recency: 2, frequency: 15, monetary: 7281.40, segment: "Loyal Customers" },
    { id: 12584, country: "Italy", recency: 8, frequency: 8, monetary: 3210.40, segment: "Potential Loyalists" },
    { id: 12585, country: "Germany", recency: 310, frequency: 1, monetary: 681.40, segment: "Lost Customers" },
    { id: 12586, country: "Germany", recency: 17, frequency: 3, monetary: 981.20, segment: "Potential Loyalists" },
    { id: 12587, country: "Germany", recency: 250, frequency: 1, monetary: 144.00, segment: "Lost Customers" },
    { id: 12588, country: "Germany", recency: 0, frequency: 4, monetary: 1812.30, segment: "Potential Loyalists" },
    { id: 12589, country: "Germany", recency: 180, frequency: 1, monetary: 320.10, segment: "Lost Customers" },
    { id: 12590, country: "Germany", recency: 211, frequency: 2, monetary: 928.40, segment: "At Risk" },
    { id: 12591, country: "Germany", recency: 320, frequency: 1, monetary: 281.30, segment: "Lost Customers" }
  ],

  // Code snippets for the developer/analyst showcase tabs
  codeShowcase: {
    pythonCleaning: `import pandas as pd
import numpy as np

# Load transaction data
df = pd.read_csv('Online_Retail.csv', encoding='ISO-8859-1')

# 1. Clean missing Values
print("Missing values per column before:")
print(df.isnull().sum())

# Drop rows without CustomerID
df.dropna(subset=['CustomerID'], inplace=True)
df['CustomerID'] = df['CustomerID'].astype(int)

# Fill description nulls (if any remain)
df['Description'] = df['Description'].fillna("UNKNOWN")

# 2. Filter Returns and Corrections (Invoice starts with 'C')
df = df[~df['InvoiceNo'].astype(str).str.startswith('C')]

# 3. Clean anomalous values (Quantity or UnitPrice <= 0)
df = df[(df['Quantity'] > 0) & (df['UnitPrice'] > 0)]

# 4. Create TotalSpend feature
df['TotalSum'] = df['Quantity'] * df['UnitPrice']

print(f"Data cleaned. Total transactions: {len(df):,}")
# Data cleaned. Total transactions: 397,924 (with valid CustomerIDs)`,

    pythonRfm: `import pandas as pd
from datetime import datetime

# Reference date is set to one day after the max invoice date in the dataset
reference_date = df['InvoiceDate'].max() + pd.Timedelta(days=1)

# Aggregate customer transactions
rfm = df.groupby('CustomerID').agg({
    'InvoiceDate': lambda x: (reference_date - x.max()).days, # Recency
    'InvoiceNo': 'nunique',                                  # Frequency
    'TotalSum': 'sum'                                        # Monetary Value
})

rfm.rename(columns={
    'InvoiceDate': 'Recency',
    'InvoiceNo': 'Frequency',
    'TotalSum': 'Monetary'
}, inplace=True)

# Calculate scores on 1-5 scale (Quantile-based)
rfm['R_score'] = pd.qcut(rfm['Recency'], 5, labels=[5, 4, 3, 2, 1])
rfm['F_score'] = pd.qcut(rfm['Frequency'].rank(method='first'), 5, labels=[1, 2, 3, 4, 5])
rfm['M_score'] = pd.qcut(rfm['Monetary'], 5, labels=[1, 2, 3, 4, 5])

# RFM Segment Mapping
def map_rfm_segment(row):
    r, f, m = int(row['R_score']), int(row['F_score']), int(row['M_score'])
    
    # Simple RFM heuristic segmentation mapping
    if r >= 4 and f >= 4 and m >= 4:
        return 'Champions'
    elif r >= 3 and f >= 3 and m >= 3:
        return 'Loyal Customers'
    elif r >= 4 and f >= 1 and m >= 2:
        return 'Potential Loyalists'
    elif r <= 2 and (f >= 3 or m >= 3):
        return 'At Risk'
    else:
        return 'Lost Customers'

rfm['Segment'] = rfm.apply(map_rfm_segment, axis=1)
print(rfm['Segment'].value_counts())`,

    sqlAnalysis: `-- 1. Extract Customer Aggregated Metrics (Recency, Frequency, Monetary)
WITH CustomerTransactions AS (
    SELECT 
        CustomerID,
        MAX(InvoiceDate) AS LastPurchaseDate,
        COUNT(DISTINCT InvoiceNo) AS Frequency,
        SUM(Quantity * UnitPrice) AS Monetary
    FROM 
        online_retail
    WHERE 
        CustomerID IS NOT NULL
        AND InvoiceNo NOT LIKE 'C%'  -- Exclude cancellations
        AND Quantity > 0
        AND UnitPrice > 0
    GROUP BY 
        CustomerID
),
RFM_Raw AS (
    SELECT
        CustomerID,
        -- Calculate Recency relative to the maximum date in the database
        DATEDIFF(day, LastPurchaseDate, (SELECT MAX(InvoiceDate) FROM online_retail)) AS Recency,
        Frequency,
        Monetary
    FROM 
        CustomerTransactions
)
SELECT 
    CustomerID,
    Recency,
    Frequency,
    Monetary,
    -- Simple quintile ranking in SQL
    NTILE(5) OVER (ORDER BY Recency DESC) AS R_Score,  -- Note: NTILE is sorted ascending, we invert Recency so smaller Recency gets NTILE 5
    NTILE(5) OVER (ORDER BY Frequency ASC) AS F_Score,
    NTILE(5) OVER (ORDER BY Monetary ASC) AS M_Score
FROM 
    RFM_Raw
ORDER BY 
    Monetary DESC;`,

    excelPrep: `### Excel Data Preparation & Visual Quick-Wins

Before scaling into Python and SQL for deeper automation, the dataset was explored in Excel:
1. **Handling Inconsistencies**:
   - Filtered out negative quantities (\`Quantity < 0\`) corresponding to customer returns.
   - Identified and handled \`#N/A\` customer IDs using Pivot Table counts.
2. **Feature Engineering**:
   - Added column \`LineTotal\` = \`Quantity * UnitPrice\` to quickly calculate order values.
   - Used \`TEXT(InvoiceDate, "YYYY-MM")\` to extract Year-Month groupings for monthly performance tracking.
3. **KPI Mockups**:
   - Built a raw KPI list to sanity check downstream aggregation results.
   - Drafted conditional formatting maps to locate high-frequency transaction density.
4. **RFM Proof of Concept**:
   - Built a small subset Pivot Table evaluating maximum \`InvoiceDate\` and total spend per client as a logic check for the Python clustering.
`
  }
};
