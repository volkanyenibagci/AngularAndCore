import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoDialogComponent } from './todo-dialog/todo-dialog.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule
  ]
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [
    {
      id: 1,
      title: 'Angular Projesi Geliştirme',
      description: 'Angular ve .NET Core entegrasyonlu proje geliştirme',
      completed: false,
      dueDate: new Date('2024-03-20'),
      priority: 'high'
    },
    {
      id: 2,
      title: 'Dokümantasyon Hazırlama',
      description: 'Proje dokümantasyonunu hazırla ve güncelle',
      completed: true,
      dueDate: new Date('2024-03-18'),
      priority: 'medium'
    }
  ];

  displayedColumns: string[] = ['title', 'description', 'dueDate', 'priority', 'completed', 'actions'];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void { }

  openDialog(todo?: Todo): void {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      width: '500px',
      data: todo || {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (todo) {
          // Güncelleme
          const index = this.todos.findIndex(t => t.id === todo.id);
          if (index !== -1) {
            this.todos[index] = { ...todo, ...result };
          }
        } else {
          // Yeni ekleme
          const newTodo: Todo = {
            ...result,
            id: this.todos.length + 1,
            completed: false
          };
          this.todos.push(newTodo);
        }
      }
    });
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  toggleComplete(todo: Todo): void {
    todo.completed = !todo.completed;
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'high':
        return '#f44336';
      case 'medium':
        return '#ff9800';
      case 'low':
        return '#4caf50';
      default:
        return '#757575';
    }
  }
} 