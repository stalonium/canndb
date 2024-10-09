import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccessToken } from '../models/access-token.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) {}

  generateAccessToken(): Observable<AccessToken> {
    return this.http.post<AccessToken>('/api/admin/access-tokens', {});
  }

  getAccessTokens(): Observable<AccessToken[]> {
    return this.http.get<AccessToken[]>('/api/admin/access-tokens');
  }

  revokeAccessToken(id: number): Observable<void> {
    return this.http.put<void>(`/api/admin/access-tokens/${id}/revoke`, {});
  }

  reactivateAccessToken(id: number): Observable<void> {
    return this.http.put<void>(`/api/admin/access-tokens/${id}/reactivate`, {});
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/admin/users');
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`/api/admin/users/${user.id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`/api/admin/users/${id}`);
  }
}