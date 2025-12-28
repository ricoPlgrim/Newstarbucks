import type { Meta, StoryObj } from '@storybook/react';
import Icon from './Icon';

const meta = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'xlarge'],
    },
    color: {
      control: 'select',
      options: ['default', 'muted', 'accent', 'success', 'warning', 'error', 'info'],
    },
    clickable: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '⭐',
    name: '별 아이콘',
    size: 'medium',
    color: 'default',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <Icon name="작은 아이콘" size="small">⭐</Icon>
      <Icon name="중간 아이콘" size="medium">⭐</Icon>
      <Icon name="큰 아이콘" size="large">⭐</Icon>
      <Icon name="매우 큰 아이콘" size="xlarge">⭐</Icon>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <Icon name="기본" color="default">⭐</Icon>
      <Icon name="뮤트" color="muted">⭐</Icon>
      <Icon name="액센트" color="accent">⭐</Icon>
      <Icon name="성공" color="success">✅</Icon>
      <Icon name="경고" color="warning">⚠️</Icon>
      <Icon name="에러" color="error">❌</Icon>
      <Icon name="정보" color="info">ℹ️</Icon>
    </div>
  ),
};

export const Clickable: Story = {
  args: {
    children: '🔔',
    name: '알림',
    size: 'medium',
    clickable: true,
    onClick: () => alert('아이콘 클릭!'),
  },
};

export const EmojiIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Icon name="홈">🏠</Icon>
      <Icon name="검색">🔍</Icon>
      <Icon name="즐겨찾기">⭐</Icon>
      <Icon name="프로필">👤</Icon>
      <Icon name="설정">⚙️</Icon>
      <Icon name="알림">🔔</Icon>
      <Icon name="메시지">💬</Icon>
      <Icon name="좋아요">❤️</Icon>
    </div>
  ),
};

export const TextIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Icon name="체크">✓</Icon>
      <Icon name="엑스">✕</Icon>
      <Icon name="플러스">+</Icon>
      <Icon name="마이너스">−</Icon>
      <Icon name="화살표">→</Icon>
    </div>
  ),
};

