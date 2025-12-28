import type { Meta, StoryObj } from '@storybook/react';
import Header from './Header';

const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['main', 'sub'],
    },
    sticky: {
      control: 'boolean',
    },
    showUtilities: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MainHeader: Story = {
  args: {
    variant: 'main',
    currentPage: 'menu1',
    onPageChange: (page) => console.log('Page changed:', page),
    onCartClick: () => alert('장바구니 클릭'),
    onUtilityClick: (key) => alert(`Utility clicked: ${key}`),
  },
};

export const SubHeader: Story = {
  args: {
    variant: 'sub',
    categoryName: '카테고리명',
    onBack: () => alert('뒤로가기'),
    onCartClick: () => alert('장바구니 클릭'),
    onUtilityClick: (key) => alert(`Utility clicked: ${key}`),
  },
};

export const SubHeaderWithoutUtilities: Story = {
  args: {
    variant: 'sub',
    categoryName: '보고작성',
    onBack: () => alert('뒤로가기'),
    showUtilities: false,
  },
};

export const StickyHeader: Story = {
  args: {
    variant: 'main',
    currentPage: 'menu1',
    sticky: true,
    onPageChange: (page) => console.log('Page changed:', page),
    onCartClick: () => alert('장바구니 클릭'),
    onUtilityClick: (key) => alert(`Utility clicked: ${key}`),
  },
  render: (args) => (
    <div>
      <Header {...args} />
      <div style={{ height: '200vh', padding: '40px' }}>
        <h1>스크롤을 내려보세요</h1>
        <p>헤더가 상단에 고정되어 있습니다.</p>
        <div style={{ marginTop: '100vh' }}>
          <h2>더 아래로 스크롤하세요</h2>
        </div>
      </div>
    </div>
  ),
};

export const StickySubHeader: Story = {
  args: {
    variant: 'sub',
    categoryName: '카테고리명',
    sticky: true,
    onBack: () => alert('뒤로가기'),
    showUtilities: false,
  },
  render: (args) => (
    <div>
      <Header {...args} />
      <div style={{ height: '200vh', padding: '40px' }}>
        <h1>스크롤을 내려보세요</h1>
        <p>서브 헤더가 상단에 고정되어 있습니다.</p>
        <div style={{ marginTop: '100vh' }}>
          <h2>더 아래로 스크롤하세요</h2>
        </div>
      </div>
    </div>
  ),
};

