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
import { Todo } from '../todo.component';

@Component({
  selector: 'app-todo-dialog',
  templateUrl: './todo-dialog.component.html',
  styleUrls: ['./todo-dialog.component.css'],
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
  ]
})
export class TodoDialogComponent {
  todoForm: FormGroup;
  priorities = ['low', 'medium', 'high'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Todo
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