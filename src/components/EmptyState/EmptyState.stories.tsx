import type { Meta, StoryObj } from '@storybook/react';
import EmptyState from './EmptyState';
import Button from '../Button/Button';

const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'minimal', 'illustration'],
    },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '데이터가 없습니다',
    description: '표시할 데이터가 없습니다.',
  },
};

export const WithIcon: Story = {
  args: {
    title: '데이터가 없습니다',
    description: '표시할 데이터가 없습니다.',
    icon: '📭',
  },
};

export const WithAction: Story = {
  args: {
    title: '데이터가 없습니다',
    description: '표시할 데이터가 없습니다.',
    icon: '📭',
    action: <Button variant="primary">새로 만들기</Button>,
  },
};

export const Minimal: Story = {
  args: {
    title: '데이터가 없습니다',
    description: '표시할 데이터가 없습니다.',
    variant: 'minimal',
  },
};

export const Illustration: Story = {
  args: {
    title: '데이터가 없습니다',
    description: '표시할 데이터가 없습니다.',
    variant: 'illustration',
    icon: '🎨',
  },
};

export const SearchEmpty: Story = {
  args: {
    title: '검색 결과가 없습니다',
    description: '다른 검색어로 시도해보세요.',
    icon: '🔍',
  },
};

export const ListEmpty: Story = {
  args: {
    title: '목록이 비어있습니다',
    description: '아직 등록된 항목이 없습니다.',
    icon: '📋',
    action: <Button variant="primary">항목 추가</Button>,
  },
};

