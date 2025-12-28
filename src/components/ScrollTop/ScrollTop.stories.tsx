import type { Meta, StoryObj } from '@storybook/react';
import ScrollTop from './ScrollTop';

const meta = {
  title: 'Components/ScrollTop',
  component: ScrollTop,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    showAfter: {
      control: { type: 'number', min: 0, max: 1000, step: 50 },
    },
    smooth: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof ScrollTop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    showAfter: 100,
    smooth: true,
  },
  render: (args) => (
    <div>
      <div style={{ height: '200vh', padding: '40px' }}>
        <h1>스크롤을 내려보세요</h1>
        <p>스크롤을 내리면 우측 하단에 버튼이 나타납니다.</p>
        <div style={{ marginTop: '100vh' }}>
          <h2>더 아래로 스크롤하세요</h2>
        </div>
      </div>
      <ScrollTop {...args} />
    </div>
  ),
};

export const ShowAfter200: Story = {
  args: {
    showAfter: 200,
    smooth: true,
  },
  render: (args) => (
    <div>
      <div style={{ height: '200vh', padding: '40px' }}>
        <h1>200px 이상 스크롤해야 버튼이 나타납니다</h1>
        <div style={{ marginTop: '100vh' }}>
          <h2>더 아래로 스크롤하세요</h2>
        </div>
      </div>
      <ScrollTop {...args} />
    </div>
  ),
};

export const InstantScroll: Story = {
  args: {
    showAfter: 100,
    smooth: false,
  },
  render: (args) => (
    <div>
      <div style={{ height: '200vh', padding: '40px' }}>
        <h1>즉시 스크롤 (smooth: false)</h1>
        <p>버튼을 클릭하면 즉시 상단으로 이동합니다.</p>
        <div style={{ marginTop: '100vh' }}>
          <h2>더 아래로 스크롤하세요</h2>
        </div>
      </div>
      <ScrollTop {...args} />
    </div>
  ),
};

