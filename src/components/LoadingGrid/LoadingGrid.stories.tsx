import type { Meta, StoryObj } from '@storybook/react';
import LoadingGrid from './LoadingGrid';

const meta = {
  title: 'Components/LoadingGrid',
  component: LoadingGrid,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    count: {
      control: { type: 'number', min: 1, max: 50 },
    },
    columns: {
      control: { type: 'number', min: 1, max: 10 },
    },
  },
} satisfies Meta<typeof LoadingGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    count: 12,
    columns: 5,
  },
};

export const Small: Story = {
  args: {
    count: 6,
    columns: 3,
  },
};

export const Large: Story = {
  args: {
    count: 20,
    columns: 5,
  },
};

export const TwoColumns: Story = {
  args: {
    count: 8,
    columns: 2,
  },
};

export const ThreeColumns: Story = {
  args: {
    count: 9,
    columns: 3,
  },
};

export const FourColumns: Story = {
  args: {
    count: 12,
    columns: 4,
  },
};

export const ManyItems: Story = {
  args: {
    count: 30,
    columns: 5,
  },
};

