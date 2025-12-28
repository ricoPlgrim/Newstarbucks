import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Dropdown from './Dropdown';

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outline', 'filled', 'ghost'],
    },
    disabled: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
  { value: 'opt1', label: '옵션 1' },
  { value: 'opt2', label: '옵션 2' },
  { value: 'opt3', label: '옵션 3' },
];

export const Default: Story = {
  args: {
    options: defaultOptions,
    variant: 'outline',
    placeholder: '선택하세요',
  },
  render: (args) => {
    return (
      <Dropdown
        {...args}
        onChange={(opt) => {
          console.log('Selected:', opt);
        }}
      />
    );
  },
};

export const Filled: Story = {
  args: {
    options: defaultOptions,
    variant: 'filled',
    placeholder: '선택하세요',
  },
  render: (args) => {
    return (
      <Dropdown
        {...args}
        onChange={(opt) => {
          console.log('Selected:', opt);
        }}
      />
    );
  },
};

export const Ghost: Story = {
  args: {
    options: defaultOptions,
    variant: 'ghost',
    placeholder: '선택하세요',
  },
  render: (args) => {
    return (
      <Dropdown
        {...args}
        onChange={(opt) => {
          console.log('Selected:', opt);
        }}
      />
    );
  },
};

export const FullWidth: Story = {
  args: {
    options: defaultOptions,
    variant: 'outline',
    placeholder: '선택하세요',
    fullWidth: true,
  },
  render: (args) => {
    return (
      <div style={{ width: '300px' }}>
        <Dropdown
          {...args}
          onChange={(opt) => {
            console.log('Selected:', opt);
          }}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    options: defaultOptions,
    variant: 'outline',
    placeholder: '선택하세요',
    disabled: true,
  },
};

export const ManyOptions: Story = {
  args: {
    options: Array.from({ length: 20 }, (_, i) => ({
      value: `opt${i + 1}`,
      label: `옵션 ${i + 1}`,
    })),
    variant: 'outline',
    placeholder: '선택하세요',
  },
  render: (args) => {
    return (
      <Dropdown
        {...args}
        onChange={(opt) => {
          console.log('Selected:', opt);
        }}
      />
    );
  },
};

