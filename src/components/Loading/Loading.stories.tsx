import type { Meta, StoryObj } from '@storybook/react';
import Loading from './Loading';

const meta = {
  title: 'Components/Loading',
  component: Loading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'number', min: 16, max: 128, step: 4 },
    },
    thickness: {
      control: { type: 'number', min: 1, max: 10, step: 1 },
    },
  },
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 48,
    thickness: 4,
    label: '로딩 중...',
  },
};

export const Small: Story = {
  args: {
    size: 24,
    thickness: 2,
    label: '로딩 중...',
  },
};

export const Large: Story = {
  args: {
    size: 64,
    thickness: 6,
    label: '로딩 중...',
  },
};

export const WithoutLabel: Story = {
  args: {
    size: 48,
    thickness: 4,
    label: '',
  },
};

export const CustomLabel: Story = {
  args: {
    size: 48,
    thickness: 4,
    label: '데이터를 불러오는 중입니다...',
  },
};

export const Thin: Story = {
  args: {
    size: 48,
    thickness: 2,
    label: '로딩 중...',
  },
};

export const Thick: Story = {
  args: {
    size: 48,
    thickness: 8,
    label: '로딩 중...',
  },
};

