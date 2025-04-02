import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from '../todo/todo.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-todo-page',
  standalone: true,
  imports: [CommonModule, TodoComponent, MatCardModule],
  template: `
    <div class="todo-page-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Görevlerim</mat-card-title>
          <mat-card-subtitle>Yapılacak işlerin listesi</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <app-todo></app-todo>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .todo-page-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    mat-card {
      margin-bottom: 20px;
    }

    mat-card-header {
      margin-bottom: 20px;
    }
  `]
})
export class TodoPageComponent {} 