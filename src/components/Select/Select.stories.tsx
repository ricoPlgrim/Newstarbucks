import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Select from './Select';

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2' },
  { value: 'option3', label: '옵션 3' },
  { value: 'option4', label: '옵션 4' },
];

const ControlledSelect = (args: any, initialValue = '') => {
  const [value, setValue] = useState(initialValue);
  return (
    <Select
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const Default: Story = {
  args: {
    options,
    placeholder: '선택하세요',
    size: 'medium',
  },
  render: (args) => <ControlledSelect {...args} />,
};

export const WithLabel: Story = {
  args: {
    label: '카테고리',
    options,
    placeholder: '카테고리를 선택하세요',
    size: 'medium',
  },
  render: (args) => <ControlledSelect {...args} />,
};

export const WithSelectedValue: Story = {
  args: {
    label: '카테고리',
    options,
    value: 'option2',
    size: 'medium',
  },
  render: (args) => <ControlledSelect {...args} initialValue="option2" />,
};

export const WithError: Story = {
  args: {
    label: '카테고리',
    options,
    error: '필수 선택 항목입니다',
    size: 'medium',
  },
  render: (args) => <ControlledSelect {...args} />,
};

export const WithHelp: Story = {
  args: {
    label: '카테고리',
    options,
    help: '원하는 카테고리를 선택하세요',
    size: 'medium',
  },
  render: (args) => <ControlledSelect {...args} />,
};

export const Small: Story = {
  args: {
    options,
    placeholder: 'Small Select',
    size: 'small',
  },
  render: (args) => <ControlledSelect {...args} />,
};

export const Large: Story = {
  args: {
    options,
    placeholder: 'Large Select',
    size: 'large',
  },
  render: (args) => <ControlledSelect {...args} />,
};

export const Disabled: Story = {
  args: {
    label: '카테고리',
    options,
    value: 'option1',
    disabled: true,
    size: 'medium',
  },
};

export const ManyOptions: Story = {
  args: {
    label: '도시 선택',
    options: Array.from({ length: 20 }, (_, i) => ({
      value: `city${i + 1}`,
      label: `도시 ${i + 1}`,
    })),
    placeholder: '도시를 선택하세요',
    size: 'medium',
  },
  render: (args) => <ControlledSelect {...args} />,
};
