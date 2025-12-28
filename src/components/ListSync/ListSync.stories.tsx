import type { Meta, StoryObj } from '@storybook/react';
import ListSync from './ListSync';

const meta = {
  title: 'Components/ListSync',
  component: ListSync,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ListSync>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
  { value: '서울', label: '서울' },
  { value: '부산', label: '부산' },
  { value: '대구', label: '대구' },
  { value: '광주', label: '광주' },
  { value: '제주', label: '제주' },
];

export const Default: Story = {
  args: {
    options: defaultOptions,
  },
  render: (args) => {
    return (
      <ListSync
        {...args}
        onChange={(items) => {
          console.log('Selected items:', items);
        }}
      />
    );
  },
};

export const CustomOptions: Story = {
  args: {
    options: [
      { value: 'option1', label: '옵션 1' },
      { value: 'option2', label: '옵션 2' },
      { value: 'option3', label: '옵션 3' },
      { value: 'option4', label: '옵션 4' },
      { value: 'option5', label: '옵션 5' },
    ],
  },
  render: (args) => {
    return (
      <ListSync
        {...args}
        onChange={(items) => {
          console.log('Selected items:', items);
        }}
      />
    );
  },
};

export const ManyOptions: Story = {
  args: {
    options: Array.from({ length: 20 }, (_, i) => ({
      value: `option${i + 1}`,
      label: `옵션 ${i + 1}`,
    })),
  },
  render: (args) => {
    return (
      <ListSync
        {...args}
        onChange={(items) => {
          console.log('Selected items:', items);
        }}
      />
    );
  },
};

