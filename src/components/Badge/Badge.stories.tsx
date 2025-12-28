import type { Meta, StoryObj } from '@storybook/react';
import Badge from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    outlined: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
    size: 'medium',
  },
};

export const Success: Story = {
  args: {
    children: 'Success',
    variant: 'success',
    size: 'medium',
  },
};

export const Warning: Story = {
  args: {
    children: 'Warning',
    variant: 'warning',
    size: 'medium',
  },
};

export const Error: Story = {
  args: {
    children: 'Error',
    variant: 'error',
    size: 'medium',
  },
};

export const Info: Story = {
  args: {
    children: 'Info',
    variant: 'info',
    size: 'medium',
  },
};

export const Small: Story = {
  args: {
    children: 'Small',
    variant: 'default',
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    children: 'Medium',
    variant: 'default',
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    children: 'Large',
    variant: 'default',
    size: 'large',
  },
};

export const Outlined: Story = {
  args: {
    children: 'Outlined',
    variant: 'default',
    size: 'medium',
    outlined: true,
  },
};

export const OutlinedSuccess: Story = {
  args: {
    children: 'Outlined Success',
    variant: 'success',
    size: 'medium',
    outlined: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Badge size="small">Small</Badge>
      <Badge size="medium">Medium</Badge>
      <Badge size="large">Large</Badge>
    </div>
  ),
};

