import { moduleMetadata, Meta, StoryObj } from '@storybook/angular';
import { HeaderComponent } from './header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/Layout/Header',
  component: HeaderComponent,
  decorators: [
    moduleMetadata({
      imports: [
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        BrowserAnimationsModule
      ]
    })
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} as Meta<HeaderComponent>;

type Story = StoryObj<HeaderComponent>;

// Temel header görünümü
export const Default: Story = {
  args: {},
};

// Event emitter'ı gösteren hikaye
export const WithSidebarToggleAction: Story = {
  args: {},
  play: async ({ component }) => {
    component.sidebarToggle.subscribe(action('sidebarToggle'));
  }
}; 