export const fakeData = {
  stats: {
    emailSent: 11361,
    salesObtained: 431225,
    newClients: 32441,
    trafficReceived: 1325134,
  },
  revenue: {
    labels: ['2025-07-01', '2025-07-02', '2025-07-03', '2025-07-04', '2025-07-05'],
    data: [500, 600, 450, 700, 550],
  },
  campaign: {
    labels: ['Active', 'Inactive'],
    data: [70, 30],
  },
  salesQuantity: {
    labels: ['AD', 'AE', 'AF', 'AG', 'AL'],
    data: [350, 250, 200, 300, 150],
  },
  geographyTraffic: {
    labels: ['US', 'France', 'Japan'],
    data: [40, 30, 20],
  },
  transactions: [
    { id: '01e4d5a', date: '2025-07-01', amount: 43.95 },
    { id: '0315d5aa', date: '2025-07-02', amount: 33.45 },
  ],
  interestRates: [{ id: 1, rate: 5.5, term: 12 }],
  emiCalculators: [{ id: 1, principal: 10000, rate: 5.5, tenure: 12 }],
  news: [{ id: 1, title: "New Loan Scheme", content: "Details...", date: "2025-07-10" }],
  gallery: [{ id: 1, title: "Branch Opening", url: "https://via.placeholder.com/150", description: "Event" }],
};