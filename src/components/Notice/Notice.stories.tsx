import type { Meta, StoryObj } from '@storybook/react';
import Notice from './Notice';

const meta = {
  title: 'Components/Notice',
  component: Notice,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: 'boolean',
    },
    skeletonCount: {
      control: { type: 'number', min: 1, max: 10 },
    },
  },
} satisfies Meta<typeof Notice>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
  { id: 1, title: '시스템 점검 안내 (1/25 02:00~04:00)', date: '2025-01-23', badge: '안내', href: '#' },
  { id: 2, title: '개인정보 처리방침 개정 사전 안내', date: '2025-01-20', badge: '중요', href: '#' },
  { id: 3, title: '겨울 한정 메뉴 출시 안내', date: '2025-01-15', href: '#' },
];

export const Default: Story = {
  args: {
    title: '공지사항',
    linkText: '더보기',
    items: sampleItems,
    onClickMore: () => alert('더보기 클릭'),
  },
};

export const CustomTitle: Story = {
  args: {
    title: '중요 공지',
    linkText: '전체보기',
    items: sampleItems,
    onClickMore: () => alert('전체보기 클릭'),
  },
};

export const WithBadges: Story = {
  args: {
    title: '공지사항',
    items: [
      { id: 1, title: '긴급 공지', date: '2025-01-23', badge: '긴급', href: '#' },
      { id: 2, title: '일반 공지', date: '2025-01-20', badge: '안내', href: '#' },
      { id: 3, title: '이벤트 공지', date: '2025-01-15', badge: '이벤트', href: '#' },
    ],
    onClickMore: () => alert('더보기 클릭'),
  },
};

export const Loading: Story = {
  args: {
    title: '공지사항',
    loading: true,
    skeletonCount: 3,
  },
};

export const Empty: Story = {
  args: {
    title: '공지사항',
    items: [],
    onClickMore: () => alert('더보기 클릭'),
  },
};

export const ManyItems: Story = {
  args: {
    title: '공지사항',
    items: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `공지사항 ${i + 1}`,
      date: `2025-01-${String(20 - i).padStart(2, '0')}`,
      href: '#',
    })),
    onClickMore: () => alert('더보기 클릭'),
  },
};

