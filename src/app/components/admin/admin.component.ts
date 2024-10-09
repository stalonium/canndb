import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { AccessToken } from '../../models/access-token.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-admin',
  template: `
    <div class="admin">
      <h2>{{ 'ADMIN.TITLE' | translate }}</h2>
      
      <div class="access-tokens">
        <h3>{{ 'ADMIN.ACCESS_TOKENS' | translate }}</h3>
        <button (click)="generateAccessToken()">{{ 'ADMIN.GENERATE_TOKEN' | translate }}</button>
        <table>
          <thead>
            <tr>
              <th>{{ 'ADMIN.TOKEN' | translate }}</th>
              <th>{{ 'ADMIN.STATUS' | translate }}</th>
              <th>{{ 'ADMIN.CREATED_AT' | translate }}</th>
              <th>{{ 'ADMIN.USED_AT' | translate }}</th>
              <th>{{ 'ADMIN.ACTIONS' | translate }}</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let token of accessTokens">
              <td>{{ token.token }}</td>
              <td>{{ token.status }}</td>
              <td>{{ token.createdAt | date }}</td>
              <td>{{ token.usedAt | date }}</td>
              <td>
                <button *ngIf="token.status !== 'revoked'" (click)="revokeAccessToken(token.id)">
                  {{ 'ADMIN.REVOKE' | translate }}
                </button>
                <button *ngIf="token.status === 'revoked'" (click)="reactivateAccessToken(token.id)">
                  {{ 'ADMIN.REACTIVATE' | translate }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="user-management">
        <h3>{{ 'ADMIN.USER_MANAGEMENT' | translate }}</h3>
        <table>
          <thead>
            <tr>
              <th>{{ 'ADMIN.USERNAME' | translate }}</th>
              <th>{{ 'ADMIN.EMAIL' | translate }}</th>
              <th>{{ 'ADMIN.IS_ADMIN' | translate }}</th>
              <th>{{ 'ADMIN.ACTIONS' | translate }}</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of users">
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>
                <input type="checkbox" [checked]="user.isAdmin" (change)="toggleAdminStatus(user)">
              </td>
              <td>
                <button (click)="deleteUser(user.id)">{{ 'ADMIN.DELETE' | translate }}</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class AdminComponent implements OnInit {
  accessTokens: AccessToken[] = [];
  users: User[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadAccessTokens();
    this.loadUsers();
  }

  loadAccessTokens() {
    this.adminService.getAccessTokens().subscribe(
      tokens => this.accessTokens = tokens,
      error => console.error('Error loading access tokens', error)
    );
  }

  loadUsers() {
    this.adminService.getUsers().subscribe(
      users => this.users = users,
      error => console.error('Error loading users', error)
    );
  }

  generateAccessToken() {
    this.adminService.generateAccessToken().subscribe(
      token => {
        this.accessTokens.push(token);
      },
      error => console.error('Error generating access token', error)
    );
  }

  revokeAccessToken(id: number) {
    this.adminService.revokeAccessToken(id).subscribe(
      () => this.loadAccessTokens(),
      error => console.error('Error revoking access token', error)
    );
  }

  reactivateAccessToken(id: number) {
    this.adminService.reactivateAccessToken(id).subscribe(
      () => this.loadAccessTokens(),
      error => console.error('Error reactivating access token', error)
    );
  }

  toggleAdminStatus(user: User) {
    user.isAdmin = !user.isAdmin;
    this.adminService.updateUser(user).subscribe(
      () => this.loadUsers(),
      error => console.error('Error updating user', error)
    );
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.adminService.deleteUser(id).subscribe(
        () => this.loadUsers(),
        error => console.error('Error deleting user', error)
      );
    }
  }
}