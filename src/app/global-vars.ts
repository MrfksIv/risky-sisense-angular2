'use strict';

export const GlobalVars = Object.freeze({

    BASE_API_URL: 'http://myzoom.retailzoom.net/api',
    QUERY_API_URL: 'http://myzoom.retailzoom.net/api/datasources',

    ELASTICUBE_NAME: 'CCP',
    RISKY_TABLE_NAME: 'Risky_Fresh',

    RISKY_TABLE_RECENCY_COLUMN: 'Recency',
    RISKY_TABLE_FREQUENCY_COLUMN: 'Frequency',
    RISKY_TABLE_MONETARY_COLUMN: 'Monetary',
    RISKY_TABLE_SALES_COLUMN: 'sales_exclvat',
    RISKY_TABLE_MEAT_COLUMN: 'Meat_Current',
    RISKY_TABLE_BAKERY_COLUMN: 'Bakery_Current',
    RISKY_TABLE_FRUIT_COLUMN: 'Fruit_Current',
    RISKY_TABLE_FISH_COLUMN: 'Fish_Current',
    RISKY_TABLE_AVGSALES_COLUMN: 'Avg_Sales',
    RISKY_TABLE_TOTALSALES_COLUMN: 'TotSales',
    RISKY_TABLE_FRESHSALES_COLUMN: 'Total_sales_Current',
    TABLE_DATA_QUERY_COLUMNS: ['cardcode', 'RC_stores', 'TotSales', 'TotVisits',
        'Meat_Current', 'Bakery_Current', 'Fruit_Current', 'Fish_Current',
        'RFM_Current']
});