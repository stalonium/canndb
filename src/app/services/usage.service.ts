import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsageService {
  constructor(private http: HttpClient) {}

  recordUsage(strainId: number, amount: number): Observable<any> {
    return this.http.post('/api/usage', { strainId, amount });
  }

  getUsageStats(): Observable<any> {
    return this.http.get('/api/usage/stats');
  }
}