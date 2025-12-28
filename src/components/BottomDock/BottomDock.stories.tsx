import type { Meta, StoryObj } from '@storybook/react';
import BottomDock from './BottomDock';

const meta = {
  title: 'Components/BottomDock',
  component: BottomDock,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BottomDock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultActive: 'home',
    onChange: (key) => console.log('Selected:', key),
  },
  render: (args) => (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, padding: '20px' }}>
        <h1>콘텐츠 영역</h1>
        <p>하단에 BottomDock이 고정되어 있습니다.</p>
      </div>
      <BottomDock {...args} />
    </div>
  ),
};

export const CustomItems: Story = {
  args: {
    items: [
      { key: 'home', label: '홈', icon: '🏠' },
      { key: 'search', label: '검색', icon: '🔍' },
      { key: 'favorite', label: '즐겨찾기', icon: '⭐' },
      { key: 'cart', label: '장바구니', icon: '🛒' },
      { key: 'profile', label: '프로필', icon: '👤' },
    ],
    defaultActive: 'home',
    onChange: (key) => console.log('Selected:', key),
  },
  render: (args) => (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, padding: '20px' }}>
        <h1>커스텀 아이템</h1>
        <p>5개의 아이템이 있는 BottomDock입니다.</p>
      </div>
      <BottomDock {...args} />
    </div>
  ),
};

export const ThreeItems: Story = {
  args: {
    items: [
      { key: 'home', label: '홈', icon: '🏠' },
      { key: 'search', label: '검색', icon: '🔍' },
      { key: 'profile', label: '프로필', icon: '👤' },
    ],
    defaultActive: 'search',
    onChange: (key) => console.log('Selected:', key),
  },
  render: (args) => (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, padding: '20px' }}>
        <h1>3개 아이템</h1>
        <p>3개의 아이템만 있는 BottomDock입니다.</p>
      </div>
      <BottomDock {...args} />
    </div>
  ),
};

