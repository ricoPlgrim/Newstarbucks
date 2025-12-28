import type { Meta, StoryObj } from '@storybook/react';
import Tabs from './Tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['default', 'scroll', 'swiper'],
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = [
  { id: 'tab1', label: '탭 1', description: '첫 번째 탭입니다.' },
  { id: 'tab2', label: '탭 2', description: '두 번째 탭입니다.' },
  { id: 'tab3', label: '탭 3', description: '세 번째 탭입니다.' },
];

export const Default: Story = {
  args: {
    items: defaultItems,
    type: 'default',
    showContent: true,
  },
};

export const Scroll: Story = {
  args: {
    items: Array.from({ length: 10 }, (_, i) => ({
      id: `tab${i + 1}`,
      label: `탭 ${i + 1}`,
      description: `${i + 1}번째 탭입니다.`,
    })),
    type: 'scroll',
    showContent: true,
  },
};

export const Swiper: Story = {
  args: {
    items: Array.from({ length: 8 }, (_, i) => ({
      id: `tab${i + 1}`,
      label: `탭 ${i + 1}`,
      description: `${i + 1}번째 탭입니다.`,
    })),
    type: 'swiper',
    showContent: true,
  },
};

export const WithoutContent: Story = {
  args: {
    items: defaultItems,
    type: 'default',
    showContent: false,
  },
};

export const WithOnChange: Story = {
  args: {
    items: defaultItems,
    type: 'default',
    showContent: true,
    onChange: (activeTabId) => alert(`탭 변경: ${activeTabId}`),
  },
};

