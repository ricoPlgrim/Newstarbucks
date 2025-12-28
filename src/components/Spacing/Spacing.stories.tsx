import type { Meta, StoryObj } from '@storybook/react';
import Spacing, { SpacingScale, SpacingExample } from './Spacing';

const meta = {
  title: 'Components/Spacing',
  component: Spacing,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Spacing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 16,
    name: '기본 간격',
  },
};

export const Small: Story = {
  args: {
    value: 8,
    name: '작은 간격',
  },
};

export const Large: Story = {
  args: {
    value: 32,
    name: '큰 간격',
  },
};

export const Scale: Story = {
  render: () => (
    <SpacingScale
      title="간격 스케일"
      values={[
        { value: 4, name: 'XS' },
        { value: 8, name: 'S' },
        { value: 16, name: 'M' },
        { value: 24, name: 'L' },
        { value: 32, name: 'XL' },
        { value: 48, name: 'XXL' },
      ]}
    />
  ),
};

export const Example: Story = {
  render: () => (
    <SpacingExample
      title="간격 사용 예시"
      examples={[
        { label: '작은 간격', value: 8, code: 'gap: 8px' },
        { label: '기본 간격', value: 16, code: 'gap: 16px' },
        { label: '큰 간격', value: 32, code: 'gap: 32px' },
      ]}
    />
  ),
};

