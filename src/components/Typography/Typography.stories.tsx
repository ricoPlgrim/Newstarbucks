import type { Meta, StoryObj } from '@storybook/react';
import Typography from './Typography';

const meta = {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body', 'caption', 'overline'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    color: {
      control: 'select',
      options: ['default', 'muted', 'accent', 'inherit'],
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const H1: Story = {
  args: {
    variant: 'h1',
    children: 'Heading 1',
  },
};

export const H2: Story = {
  args: {
    variant: 'h2',
    children: 'Heading 2',
  },
};

export const H3: Story = {
  args: {
    variant: 'h3',
    children: 'Heading 3',
  },
};

export const H4: Story = {
  args: {
    variant: 'h4',
    children: 'Heading 4',
  },
};

export const H5: Story = {
  args: {
    variant: 'h5',
    children: 'Heading 5',
  },
};

export const H6: Story = {
  args: {
    variant: 'h6',
    children: 'Heading 6',
  },
};

export const Body: Story = {
  args: {
    variant: 'body',
    children: 'Body text - 기본 본문 텍스트입니다.',
  },
};

export const Caption: Story = {
  args: {
    variant: 'caption',
    children: 'Caption text - 작은 설명 텍스트입니다.',
  },
};

export const Overline: Story = {
  args: {
    variant: 'overline',
    children: 'OVERLINE TEXT',
  },
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Typography variant="body" color="default">Default Color</Typography>
      <Typography variant="body" color="muted">Muted Color</Typography>
      <Typography variant="body" color="accent">Accent Color</Typography>
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Typography variant="body" weight="normal">Normal Weight</Typography>
      <Typography variant="body" weight="medium">Medium Weight</Typography>
      <Typography variant="body" weight="semibold">Semibold Weight</Typography>
      <Typography variant="body" weight="bold">Bold Weight</Typography>
    </div>
  ),
};

export const Alignments: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
      <Typography variant="body" align="left">Left Aligned Text</Typography>
      <Typography variant="body" align="center">Center Aligned Text</Typography>
      <Typography variant="body" align="right">Right Aligned Text</Typography>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Typography variant="body" size="small">Small Size</Typography>
      <Typography variant="body" size="medium">Medium Size</Typography>
      <Typography variant="body" size="large">Large Size</Typography>
    </div>
  ),
};

export const Truncate: Story = {
  args: {
    variant: 'body',
    truncate: true,
    children: 'This is a very long text that will be truncated with ellipsis when it exceeds the container width',
  },
  render: (args) => (
    <div style={{ width: '200px' }}>
      <Typography {...args} />
    </div>
  ),
};

export const LineClamp: Story = {
  args: {
    variant: 'body',
    lineClamp: 2,
    children: 'This is a very long text that will be clamped to 2 lines. This is a very long text that will be clamped to 2 lines. This is a very long text that will be clamped to 2 lines.',
  },
  render: (args) => (
    <div style={{ width: '200px' }}>
      <Typography {...args} />
    </div>
  ),
};

