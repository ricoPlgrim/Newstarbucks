import type { Meta, StoryObj } from '@storybook/react';
import Table from './Table';

const meta = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    scrollType: {
      control: 'select',
      options: ['horizontal', 'vertical', 'both'],
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleHeaders = ['번호', '제목', '등록일', '조회수'];
const sampleRows = [
  { id: 1, title: '첫 번째 게시글', date: '2025-01-23', views: 123 },
  { id: 2, title: '두 번째 게시글', date: '2025-01-22', views: 456 },
  { id: 3, title: '세 번째 게시글', date: '2025-01-21', views: 789 },
];

export const Default: Story = {
  args: {
    headers: sampleHeaders,
    rows: sampleRows,
  },
};

export const WideTable: Story = {
  args: {
    headers: ['번호', '제목', '등록일', '첨부', '조회수', '경쟁률', '상태', '분류', '담당자', '마감일', '비고'],
    rows: [
      {
        id: 1,
        title: '데이터 분석가 채용',
        date: '2025-01-07',
        attachment: 'jd.pdf',
        views: 3210,
        ratio: '15:1',
        status: '진행중',
        category: '채용',
        owner: '홍길동',
        deadline: '2025-02-01',
        note: '온라인 면접',
      },
      {
        id: 2,
        title: '프론트엔드 인턴 모집',
        date: '2025-01-15',
        attachment: 'apply.docx',
        views: 1880,
        ratio: '22:1',
        status: '접수중',
        category: '인턴',
        owner: '김개발',
        deadline: '2025-02-10',
        note: '리액트 과제 포함',
      },
    ],
    scrollType: 'horizontal',
  },
};

export const HorizontalScroll: Story = {
  args: {
    headers: ['번호', '제목', '등록일', '첨부', '조회수', '경쟁률', '상태', '분류'],
    rows: Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      title: `게시글 ${i + 1}`,
      date: `2025-01-${String(20 - i).padStart(2, '0')}`,
      attachment: 'file.pdf',
      views: (i + 1) * 100,
      ratio: `${i + 1}:1`,
      status: '진행중',
      category: '일반',
    })),
    scrollType: 'horizontal',
  },
};

export const VerticalScroll: Story = {
  args: {
    headers: sampleHeaders,
    rows: Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      title: `게시글 ${i + 1}`,
      date: `2025-01-${String(20 - i).padStart(2, '0')}`,
      views: (i + 1) * 50,
    })),
    scrollType: 'vertical',
  },
  render: (args) => (
    <div style={{ maxHeight: '400px' }}>
      <Table {...args} />
    </div>
  ),
};

export const BothScroll: Story = {
  args: {
    headers: ['번호', '제목', '등록일', '첨부', '조회수', '경쟁률', '상태', '분류'],
    rows: Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      title: `게시글 ${i + 1}`,
      date: `2025-01-${String(20 - i).padStart(2, '0')}`,
      attachment: 'file.pdf',
      views: (i + 1) * 100,
      ratio: `${i + 1}:1`,
      status: '진행중',
      category: '일반',
    })),
    scrollType: 'both',
  },
  render: (args) => (
    <div style={{ maxHeight: '400px', maxWidth: '600px' }}>
      <Table {...args} />
    </div>
  ),
};

