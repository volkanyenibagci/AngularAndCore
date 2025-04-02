import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatTreeModule } from '@angular/material/tree';
import { MatTableDataSource } from '@angular/material/table';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';
import { TodoDialogComponent } from './todo-dialog/todo-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

interface TodoViewModel extends Todo {
  description?: string;
  dueDate?: Date;
  priority?: 'low' | 'medium' | 'high';
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatTooltipModule,
    MatSortModule,
    MatPaginatorModule,
    MatMenuModule,
    MatDividerModule,
    MatListModule,
    MatChipsModule,
    MatBadgeModule,
    MatExpansionModule,
    MatStepperModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSidenavModule,
    MatToolbarModule,
    MatGridListModule,
    MatRadioModule,
    MatProgressBarModule,
    MatRippleModule,
    MatBottomSheetModule,
    MatTreeModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ],
  template: `
    <div class="todo-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Görevlerim</mat-card-title>
          <mat-card-subtitle>Yapılacak işlerin listesi</mat-card-subtitle>
          <button mat-raised-button color="primary" (click)="openDialog()">
            <mat-icon>add</mat-icon>
            Yeni Görev
          </button>
        </mat-card-header>

        <mat-card-content>
          <div class="table-container">
            <table mat-table [dataSource]="dataSource" matSort>
              <!-- Başlık Sütunu -->
              <ng-container matColumnDef="title">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Başlık </th>
                <td mat-cell *matCellDef="let todo"> {{todo.title}} </td>
              </ng-container>

              <!-- Açıklama Sütunu -->
              <ng-container matColumnDef="description">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Açıklama </th>
                <td mat-cell *matCellDef="let todo"> {{todo.description}} </td>
              </ng-container>

              <!-- Bitiş Tarihi Sütunu -->
              <ng-container matColumnDef="dueDate">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Bitiş Tarihi </th>
                <td mat-cell *matCellDef="let todo">
                  {{todo.dueDate | date:'dd.MM.yyyy'}}
                </td>
              </ng-container>

              <!-- Öncelik Sütunu -->
              <ng-container matColumnDef="priority">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Öncelik </th>
                <td mat-cell *matCellDef="let todo">
                  <mat-chip [color]="getPriorityColor(todo.priority)" selected>
                    {{todo.priority}}
                  </mat-chip>
                </td>
              </ng-container>

              <!-- Durum Sütunu -->
              <ng-container matColumnDef="isCompleted">
                <th mat-header-cell *matHeaderCellDef> Durum </th>
                <td mat-cell *matCellDef="let todo">
                  <mat-checkbox
                    [checked]="todo.isCompleted"
                    (change)="toggleComplete(todo)"
                    color="primary">
                  </mat-checkbox>
                </td>
              </ng-container>

              <!-- İşlemler Sütunu -->
              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef> İşlemler </th>
                <td mat-cell *matCellDef="let todo">
                  <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="İşlemler">
                    <mat-icon>more_vert</mat-icon>
                  </button>
                  <mat-menu #menu="matMenu">
                    <button mat-menu-item (click)="openDialog(todo)">
                      <mat-icon>edit</mat-icon>
                      <span>Düzenle</span>
                    </button>
                    <button mat-menu-item (click)="deleteTodo(todo)">
                      <mat-icon>delete</mat-icon>
                      <span>Sil</span>
                    </button>
                  </mat-menu>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>

            <mat-paginator
              [pageSizeOptions]="[5, 10, 25, 100]"
              [pageSize]="10"
              [length]="totalItems"
              (page)="onPageChange($event)">
            </mat-paginator>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .todo-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    mat-card {
      margin-bottom: 20px;
    }

    mat-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .table-container {
      position: relative;
      min-height: 200px;
      max-height: 400px;
      overflow: auto;
    }

    table {
      width: 100%;
    }

    .mat-column-actions {
      width: 120px;
      text-align: center;
    }

    .mat-column-isCompleted {
      width: 100px;
      text-align: center;
    }

    .mat-column-priority {
      width: 120px;
    }

    .mat-column-dueDate {
      width: 120px;
    }

    .loading-shade {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.15);
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .error-message {
      color: #f44336;
      padding: 16px;
      text-align: center;
    }
  `]
})
export class TodoComponent implements OnInit {
  todos: TodoViewModel[] = [];
  displayedColumns: string[] = ['title', 'description', 'dueDate', 'priority', 'isCompleted', 'actions'];
  dataSource: MatTableDataSource<TodoViewModel>;
  isLoading = false;
  totalItems = 0;
  currentPage = 0;
  pageSize = 10;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private todoService: TodoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {
    this.dataSource = new MatTableDataSource<TodoViewModel>();
  }

  ngOnInit(): void {
    this.loadTodos();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  loadTodos(): void {
    this.isLoading = true;
    this.todoService.getTodos().pipe(
      map(todos => {
        return todos.map(todo => ({
          ...todo,
          description: todo.description || '',
          dueDate: todo.dueDate ? new Date(todo.dueDate) : new Date(),
          priority: todo.priority || 'medium'
        }));
      }),
      tap(todos => {
        this.todos = todos;
        this.dataSource.data = todos;
        this.totalItems = todos.length;
      }),
      catchError(error => {
        console.error('Görevler yüklenirken hata oluştu:', error);
        this.showNotification('Görevler yüklenirken bir hata oluştu', 'error');
        return of([]);
      }),
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe();
  }

  openDialog(todo?: TodoViewModel): void {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      width: '500px',
      data: todo || {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (todo?.id) {
          this.updateTodo(todo.id, result);
        } else {
          this.createTodo(result);
        }
      }
    });
  }

  createTodo(todo: TodoViewModel): void {
    this.todoService.createTodo(todo).subscribe({
      next: () => {
        this.showNotification('Görev başarıyla oluşturuldu', 'success');
        this.loadTodos();
      },
      error: (error) => {
        console.error('Görev oluşturulurken hata:', error);
        this.showNotification('Görev oluşturulurken bir hata oluştu', 'error');
      }
    });
  }

  updateTodo(id: number, todo: TodoViewModel): void {
    this.todoService.updateTodo(id, todo).subscribe({
      next: () => {
        this.showNotification('Görev başarıyla güncellendi', 'success');
        this.loadTodos();
      },
      error: (error) => {
        console.error('Görev güncellenirken hata:', error);
        this.showNotification('Görev güncellenirken bir hata oluştu', 'error');
      }
    });
  }

  deleteTodo(todo: TodoViewModel): void {
    if (confirm('Bu görevi silmek istediğinizden emin misiniz?')) {
      this.todoService.deleteTodo(todo.id).subscribe({
        next: () => {
          this.showNotification('Görev başarıyla silindi', 'success');
          this.loadTodos();
        },
        error: (error) => {
          console.error('Görev silinirken hata:', error);
          this.showNotification('Görev silinirken bir hata oluştu', 'error');
        }
      });
    }
  }

  toggleComplete(todo: TodoViewModel): void {
    this.todoService.toggleTodoStatus(todo.id).subscribe({
      next: () => {
        this.showNotification('Görev durumu güncellendi', 'success');
        this.loadTodos();
      },
      error: (error) => {
        console.error('Görev durumu güncellenirken hata:', error);
        this.showNotification('Görev durumu güncellenirken bir hata oluştu', 'error');
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadTodos();
  }

  getPriorityColor(priority: string): string {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'warn';
      case 'medium':
        return 'accent';
      case 'low':
        return 'primary';
      default:
        return '';
    }
  }

  showNotification(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Kapat', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: type === 'success' ? ['success-snackbar'] : ['error-snackbar']
    });
  }
} 