import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { Todo } from '../../../models/todo.model';

interface TodoDialogData extends Todo {
  description?: string;
  dueDate?: Date;
  priority?: 'low' | 'medium' | 'high';
}

@Component({
  selector: 'app-todo-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data.id ? 'Görevi Düzenle' : 'Yeni Görev' }}</h2>
    <form [formGroup]="todoForm" (ngSubmit)="onSubmit()">
      <mat-dialog-content>
        <mat-form-field appearance="fill">
          <mat-label>Başlık</mat-label>
          <input matInput formControlName="title" placeholder="Görev başlığı">
          <mat-error *ngIf="todoForm.get('title')?.hasError('required')">
            Başlık zorunludur
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Açıklama</mat-label>
          <textarea matInput formControlName="description" rows="3" placeholder="Görev açıklaması"></textarea>
          <mat-error *ngIf="todoForm.get('description')?.hasError('required')">
            Açıklama zorunludur
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Bitiş Tarihi</mat-label>
          <input matInput [matDatepicker]="picker" formControlName="dueDate">
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
          <mat-error *ngIf="todoForm.get('dueDate')?.hasError('required')">
            Bitiş tarihi zorunludur
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Öncelik</mat-label>
          <mat-select formControlName="priority">
            <mat-option *ngFor="let priority of priorities" [value]="priority">
              {{ priority | titlecase }}
            </mat-option>
          </mat-select>
          <mat-error *ngIf="todoForm.get('priority')?.hasError('required')">
            Öncelik zorunludur
          </mat-error>
        </mat-form-field>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button (click)="onCancel()">İptal</button>
        <button mat-raised-button color="primary" type="submit" [disabled]="!todoForm.valid">
          {{ data.id ? 'Güncelle' : 'Ekle' }}
        </button>
      </mat-dialog-actions>
    </form>
  `,
  styles: [`
    mat-dialog-content {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      min-width: 400px;
    }

    mat-form-field {
      width: 100%;
    }

    mat-dialog-actions {
      padding: 16px 0;
    }
  `]
})
export class TodoDialogComponent {
  todoForm: FormGroup;
  priorities = ['low', 'medium', 'high'] as const;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TodoDialogData
  ) {
    this.todoForm = this.fb.group({
      title: [data.title || '', [Validators.required]],
      description: [data.description || '', [Validators.required]],
      dueDate: [data.dueDate || new Date(), [Validators.required]],
      priority: [data.priority || 'medium', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.todoForm.valid) {
      this.dialogRef.close(this.todoForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
} 