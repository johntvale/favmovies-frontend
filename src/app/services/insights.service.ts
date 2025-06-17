import { Injectable } from '@angular/core';
import { iResponseInsights } from '../interfaces/insights.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class insightsService {
  apiUrl: string = 'http://localhost:3001/insights';

  constructor(private http: HttpClient) { }

  getInsightsData() {
    return this.http.get<iResponseInsights>(`${this.apiUrl}`, { withCredentials: true });
  }
}
