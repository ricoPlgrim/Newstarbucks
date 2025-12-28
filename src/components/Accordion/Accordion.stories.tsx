import type { Meta, StoryObj } from '@storybook/react';
import Accordion from './Accordion';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['exclusive', 'independent'],
    },
    defaultOpenFirst: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = [
  {
    id: 'item1',
    label: '아코디언 아이템 1',
    content: '첫 번째 아코디언 아이템의 내용입니다. 여기에 상세한 정보를 표시할 수 있습니다.',
  },
  {
    id: 'item2',
    label: '아코디언 아이템 2',
    content: '두 번째 아코디언 아이템의 내용입니다. 여러 줄의 텍스트를 포함할 수 있습니다.',
  },
  {
    id: 'item3',
    label: '아코디언 아이템 3',
    content: '세 번째 아코디언 아이템의 내용입니다.',
  },
];

export const Exclusive: Story = {
  args: {
    items: defaultItems,
    type: 'exclusive',
    defaultOpenFirst: false,
  },
};

export const Independent: Story = {
  args: {
    items: defaultItems,
    type: 'independent',
    defaultOpenFirst: false,
  },
};

export const DefaultOpenFirst: Story = {
  args: {
    items: defaultItems,
    type: 'exclusive',
    defaultOpenFirst: true,
  },
};

export const ManyItems: Story = {
  args: {
    items: Array.from({ length: 10 }, (_, i) => ({
      id: `item${i + 1}`,
      label: `아코디언 아이템 ${i + 1}`,
      content: `${i + 1}번째 아코디언 아이템의 내용입니다.`,
    })),
    type: 'exclusive',
    defaultOpenFirst: false,
  },
};

