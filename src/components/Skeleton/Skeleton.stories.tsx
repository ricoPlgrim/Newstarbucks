import type { Meta, StoryObj } from '@storybook/react';
import Skeleton from './Skeleton';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: 'text',
    },
    height: {
      control: 'text',
    },
    circle: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: '100%',
    height: 16,
  },
};

export const Text: Story = {
  args: {
    width: '200px',
    height: 16,
  },
};

export const Title: Story = {
  args: {
    width: '300px',
    height: 24,
  },
};

export const Avatar: Story = {
  args: {
    width: 48,
    height: 48,
    circle: true,
  },
};

export const Button: Story = {
  args: {
    width: 120,
    height: 40,
  },
};

export const Card: Story = {
  render: () => (
    <div style={{ width: '300px', padding: '16px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
      <Skeleton width={280} height={180} style={{ marginBottom: '12px' }} />
      <Skeleton width="80%" height={20} style={{ marginBottom: '8px' }} />
      <Skeleton width="60%" height={16} />
    </div>
  ),
};

export const List: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'center' }}>
          <Skeleton width={40} height={40} circle />
          <div style={{ flex: 1 }}>
            <Skeleton width="70%" height={16} style={{ marginBottom: '8px' }} />
            <Skeleton width="50%" height={14} />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const CustomSize: Story = {
  args: {
    width: 150,
    height: 20,
  },
};

