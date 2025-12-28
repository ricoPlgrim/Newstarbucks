import type { Meta, StoryObj } from '@storybook/react';
import BorderAnimation from './BorderAnimation';
import Button from '../Button/Button';

const meta = {
  title: 'Components/BorderAnimation',
  component: BorderAnimation,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['rotate', 'shimmer', 'pulse', 'gradient'],
    },
  },
} satisfies Meta<typeof BorderAnimation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Rotate: Story = {
  args: {
    variant: 'rotate',
    children: <Button>Rotate Animation</Button>,
  },
};

export const Shimmer: Story = {
  args: {
    variant: 'shimmer',
    children: <Button>Shimmer Animation</Button>,
  },
};

export const Pulse: Story = {
  args: {
    variant: 'pulse',
    children: <Button>Pulse Animation</Button>,
  },
};

export const Gradient: Story = {
  args: {
    variant: 'gradient',
    children: <Button>Gradient Animation</Button>,
  },
};

export const WithCard: Story = {
  args: {
    variant: 'rotate',
    children: (
      <div style={{ padding: '20px', background: '#fff', borderRadius: '8px' }}>
        <h3>카드 제목</h3>
        <p>애니메이션 보더가 있는 카드입니다.</p>
      </div>
    ),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <BorderAnimation variant="rotate">
        <div style={{ padding: '16px', background: '#fff', borderRadius: '8px' }}>
          Rotate Animation
        </div>
      </BorderAnimation>
      <BorderAnimation variant="shimmer">
        <div style={{ padding: '16px', background: '#fff', borderRadius: '8px' }}>
          Shimmer Animation
        </div>
      </BorderAnimation>
      <BorderAnimation variant="pulse">
        <div style={{ padding: '16px', background: '#fff', borderRadius: '8px' }}>
          Pulse Animation
        </div>
      </BorderAnimation>
      <BorderAnimation variant="gradient">
        <div style={{ padding: '16px', background: '#fff', borderRadius: '8px' }}>
          Gradient Animation
        </div>
      </BorderAnimation>
    </div>
  ),
};

