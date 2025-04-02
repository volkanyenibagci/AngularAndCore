import { moduleMetadata, Meta, StoryObj } from '@storybook/angular';
import { TodoComponent } from './todo.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TodoService } from '../../services/todo.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, Observable, throwError, NEVER, tap, catchError } from 'rxjs';
import { TodoDialogComponent } from './todo-dialog/todo-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { within, userEvent } from '@storybook/testing-library';

// Örnek veri
const sampleTodos = [
  { 
    id: 1, 
    title: 'Görev 1', 
    description: 'Bu bir test görevidir', 
    isCompleted: false
  },
  { 
    id: 2, 
    title: 'Görev 2', 
    description: 'Başka bir test görevidir', 
    isCompleted: true
  },
  { 
    id: 3, 
    title: 'Görev 3', 
    description: 'Üçüncü görev', 
    isCompleted: false
  }
];

// Gelişmiş HttpClient mock sınıfı
class HttpClientMock {
  private todos = [...sampleTodos];

  get() { 
    return of(this.todos); 
  }

  post(url: string, todo: any) { 
    const newTodo = { ...todo, id: this.todos.length + 1 };
    this.todos.push(newTodo);
    return of(newTodo); 
  }

  put(url: string, todo: any) { 
    const index = this.todos.findIndex(t => t.id === todo.id);
    if (index !== -1) {
      this.todos[index] = todo;
    }
    return of(todo); 
  }

  delete(url: string) { 
    const id = parseInt(url.split('/').pop() || '0');
    this.todos = this.todos.filter(t => t.id !== id);
    return of({}); 
  }

  patch(url: string) { 
    const id = parseInt(url.split('/')[0]);
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.isCompleted = !todo.isCompleted;
    }
    return of(todo); 
  }
}

// Gelişmiş Mock DialogRef
const mockDialogRef = {
  afterClosed: () => of({
    title: 'Yeni Test Görevi',
    description: 'Bu bir test görevidir',
    priority: 'medium',
    dueDate: new Date(),
    isCompleted: false
  }),
  close: () => {}
};

// Gelişmiş Mock Dialog
const mockDialog = {
  open: () => mockDialogRef,
  closeAll: () => {}
};

// Gelişmiş Mock SnackBar
const mockSnackBar = {
  open: (message: string, action: string, config: any) => ({
    onAction: () => of({ dismissedByAction: true }),
    afterDismissed: () => of({ dismissedByAction: false })
  })
};

export default {
  title: 'Components/Todo',
  component: TodoComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatSnackBarModule,
        HttpClientModule,
        MatDialogModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        TodoDialogComponent
      ],
      providers: [
        TodoService,
        { provide: HttpClient, useClass: HttpClientMock },
        { provide: MatDialog, useValue: mockDialog },
        { provide: MatSnackBar, useValue: mockSnackBar }
      ]
    })
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Todo bileşeni, yapılacaklar listesini yönetmek için kullanılır. Görev ekleme, düzenleme, silme ve tamamlama işlemlerini destekler.'
      }
    },
    actions: {
      argTypesRegex: '^on[A-Z].*'
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  },
  tags: ['autodocs'],
} as Meta<TodoComponent>;

type Story = StoryObj<TodoComponent>;

// Varsayılan durum
export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Varsayılan todo listesi görünümü. Tüm özellikler aktif ve örnek verilerle dolu.'
      }
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Yeni görev ekleme butonunu bul
    const addButton = canvas.getByRole('button', { name: /yeni görev/i });
    
    // Butona tıkla
    await userEvent.click(addButton);
    
    // Dialog'un açıldığını kontrol et
    const dialog = canvas.getByRole('dialog');
    expect(dialog).toBeTruthy();
  }
};

// Boş liste durumu
export const EmptyList: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        { 
          provide: HttpClient, 
          useClass: class {
            get() { return of([]); }
            post() { return of({ id: 1, title: 'Yeni Görev', isCompleted: false }); }
            put() { return of({}); }
            delete() { return of({}); }
            patch() { return of({}); }
          }
        }
      ]
    })
  ],
  parameters: {
    docs: {
      description: {
        story: 'Henüz hiç görev olmadığında görünen boş liste durumu.'
      }
    }
  }
};

// Yükleme durumu
export const Loading: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        { 
          provide: HttpClient, 
          useClass: class {
            get() { 
              // Asla tamamlanmayan bir observable
              return NEVER;
            }
            post() { return of({}); }
            put() { return of({}); }
            delete() { return of({}); }
            patch() { return of({}); }
          }
        }
      ]
    })
  ],
  parameters: {
    docs: {
      description: {
        story: 'Görevler yüklenirken görünen yükleme durumu.'
      }
    }
  }
};

// Hata durumu
export const Error: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        { 
          provide: HttpClient, 
          useClass: class {
            get() { 
              return of([]).pipe(
                catchError(() => throwError(() => new HttpErrorResponse({ error: 'API Hatası' })))
              );
            }
            post() { return of({}); }
            put() { return of({}); }
            delete() { return of({}); }
            patch() { return of({}); }
          }
        }
      ]
    })
  ],
  parameters: {
    docs: {
      description: {
        story: 'API hatası durumunda görünen hata mesajı.'
      }
    }
  }
}; 