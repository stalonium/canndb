import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Strain } from '../models/strain.model';

@Injectable({
  providedIn: 'root'
})
export class StrainService {
  constructor(private http: HttpClient) {}

  getStrains(): Observable<Strain[]> {
    return this.http.get<Strain[]>('/api/strains');
  }

  getStrain(id: number): Observable<Strain> {
    return this.http.get<Strain>(`/api/strains/${id}`);
  }

  addStrain(strain: Strain): Observable<Strain> {
    return this.http.post<Strain>('/api/strains', strain);
  }

  updateStrain(strain: Strain): Observable<Strain> {
    return this.http.put<Strain>(`/api/strains/${strain.id}`, strain);
  }

  deleteStrain(id: number): Observable<void> {
    return this.http.delete<void>(`/api/strains/${id}`);
  }
}