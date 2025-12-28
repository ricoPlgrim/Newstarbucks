import type { Meta, StoryObj } from '@storybook/react';
import Color from './Color';

const meta = {
  title: 'Components/Color',
  component: Color,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['swatch', 'palette', 'theme'],
    },
    showVariable: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Color>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Swatch: Story = {
  args: {
    variant: 'swatch',
    name: 'Primary',
    value: '#007bff',
    description: '주요 색상',
    showVariable: true,
  },
};

export const Palette: Story = {
  args: {
    variant: 'palette',
    name: 'Blue Palette',
    value: '#007bff',
    description: '파란색 팔레트',
  },
};

export const Theme: Story = {
  args: {
    variant: 'theme',
    name: 'Light Theme',
    value: '#ffffff',
    description: '라이트 테마',
  },
};

export const WithoutVariable: Story = {
  args: {
    variant: 'swatch',
    name: 'Custom Color',
    value: '#ff6b6b',
    showVariable: false,
  },
};

