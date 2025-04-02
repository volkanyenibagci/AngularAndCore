import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, RouterModule],
  template: `
    <mat-nav-list>
      <a mat-list-item routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
        <mat-icon matListItemIcon>home</mat-icon>
        <span matListItemTitle>Ana Sayfa</span>
      </a>
      <a mat-list-item routerLink="/todos" routerLinkActive="active">
        <mat-icon matListItemIcon>checklist</mat-icon>
        <span matListItemTitle>Görevlerim</span>
      </a>
      <a mat-list-item routerLink="/products" routerLinkActive="active">
        <mat-icon matListItemIcon>inventory_2</mat-icon>
        <span matListItemTitle>Ürünler</span>
      </a>
      <a mat-list-item routerLink="/users" routerLinkActive="active">
        <mat-icon matListItemIcon>people</mat-icon>
        <span matListItemTitle>Kullanıcılar</span>
      </a>
      <a mat-list-item routerLink="/settings" routerLinkActive="active">
        <mat-icon matListItemIcon>settings</mat-icon>
        <span matListItemTitle>Ayarlar</span>
      </a>
      <a mat-list-item routerLink="/about" routerLinkActive="active">
        <mat-icon matListItemIcon>info</mat-icon>
        <span matListItemTitle>Hakkında</span>
      </a>
      <a mat-list-item routerLink="/contact" routerLinkActive="active">
        <mat-icon matListItemIcon>contact_mail</mat-icon>
        <span matListItemTitle>İletişim</span>
      </a>
    </mat-nav-list>
  `,
  styles: [`
    .active {
      background-color: rgba(0, 0, 0, 0.04);
    }
  `]
})
export class SidebarComponent {}
