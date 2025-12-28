import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import SearchField from './SearchField';

const meta = {
  title: 'Components/SearchField',
  component: SearchField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outlined'],
    },
    disabled: {
      control: 'boolean',
    },
    showClearButton: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

const ControlledSearchField = (args: any, initialValue = '') => {
  const [value, setValue] = useState(initialValue);
  return (
    <SearchField
      {...args}
      value={value}
      onChange={(e, val) => setValue(val)}
      onSearch={(val) => alert(`검색: ${val}`)}
      onClear={() => setValue('')}
    />
  );
};

const ControlledSearchFieldWithoutClear = (args: any) => {
  const [value, setValue] = useState('');
  return (
    <SearchField
      {...args}
      value={value}
      onChange={(e, val) => setValue(val)}
      onSearch={(val) => alert(`검색: ${val}`)}
    />
  );
};

export const Default: Story = {
  args: {
    placeholder: '검색어를 입력하세요',
    size: 'medium',
  },
  render: (args) => <ControlledSearchField {...args} />,
};

export const WithValue: Story = {
  args: {
    placeholder: '검색어를 입력하세요',
    size: 'medium',
  },
  render: (args) => <ControlledSearchField {...args} initialValue="검색어" />,
};

export const Small: Story = {
  args: {
    placeholder: '검색어를 입력하세요',
    size: 'small',
  },
  render: (args) => <ControlledSearchField {...args} />,
};

export const Large: Story = {
  args: {
    placeholder: '검색어를 입력하세요',
    size: 'large',
  },
  render: (args) => <ControlledSearchField {...args} />,
};

export const WithoutClearButton: Story = {
  args: {
    placeholder: '검색어를 입력하세요',
    showClearButton: false,
    size: 'medium',
  },
  render: (args) => <ControlledSearchFieldWithoutClear {...args} />,
};

export const Disabled: Story = {
  args: {
    placeholder: '검색어를 입력하세요',
    value: '비활성화된 검색어',
    disabled: true,
    size: 'medium',
  },
};

export const Filled: Story = {
  args: {
    placeholder: '검색어를 입력하세요',
    variant: 'filled',
    size: 'medium',
  },
  render: (args) => <ControlledSearchField {...args} />,
};

export const Outlined: Story = {
  args: {
    placeholder: '검색어를 입력하세요',
    variant: 'outlined',
    size: 'medium',
  },
  render: (args) => <ControlledSearchField {...args} />,
};
