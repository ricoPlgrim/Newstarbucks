import type { Meta, StoryObj } from '@storybook/react';
import PageTemplate from './PageTemplate';
import Typography from '../Typography/Typography';

const meta = {
  title: 'Components/PageTemplate',
  component: PageTemplate,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PageTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '페이지 제목',
    children: (
      <div style={{ padding: '20px' }}>
        <Typography variant="h2">콘텐츠 영역</Typography>
        <Typography variant="body">
          PageTemplate은 접근성 도우미와 테마 설정을 포함한 페이지 레이아웃을 제공합니다.
        </Typography>
      </div>
    ),
  },
};

export const WithContent: Story = {
  args: {
    title: '샘플 페이지',
    children: (
      <div style={{ padding: '20px' }}>
        <Typography variant="h1">제목</Typography>
        <Typography variant="body" style={{ marginTop: '16px' }}>
          이 페이지는 PageTemplate을 사용하여 만들어졌습니다.
        </Typography>
        <div style={{ marginTop: '24px', padding: '16px', background: '#f5f5f5', borderRadius: '8px' }}>
          <Typography variant="body">콘텐츠 영역입니다.</Typography>
        </div>
      </div>
    ),
  },
};

export const LongContent: Story = {
  args: {
    title: '긴 콘텐츠 페이지',
    children: (
      <div style={{ padding: '20px' }}>
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} style={{ marginBottom: '16px', padding: '16px', background: '#f5f5f5', borderRadius: '8px' }}>
            <Typography variant="h3">섹션 {i + 1}</Typography>
            <Typography variant="body">
              이것은 {i + 1}번째 섹션입니다. 스크롤을 내려보세요.
            </Typography>
          </div>
        ))}
      </div>
    ),
  },
};

