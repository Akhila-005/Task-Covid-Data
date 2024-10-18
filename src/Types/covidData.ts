export interface CovidData {
  statewise: {
    state: string;
    confirmed: number;
    active: number;
    recovered: number;
    deaths: number;
    lat: number; // Assuming you have latitude and longitude in your data
    lon: number;
  }[];
  history: { date: string; cases: number }[]; // Adjust as per actual structure
}
