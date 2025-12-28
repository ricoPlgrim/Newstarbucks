import type { Meta, StoryObj } from '@storybook/react';
import DataList from './DataList';
import Card from '../Card/Card';

const meta = {
  title: 'Components/DataList',
  component: DataList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DataList>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockData = [
  { id: 1, title: '아이템 1', description: '설명 1' },
  { id: 2, title: '아이템 2', description: '설명 2' },
  { id: 3, title: '아이템 3', description: '설명 3' },
];

const fetchSuccess = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockData;
};

const fetchEmpty = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [];
};

const fetchError = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  throw new Error('데이터를 불러오는데 실패했습니다.');
};

export const Default: Story = {
  args: {
    fetchData: fetchSuccess,
    renderItem: (item: any) => (
      <div key={item.id} style={{ padding: '12px', border: '1px solid #e0e0e0', marginBottom: '8px', borderRadius: '4px' }}>
        <h4>{item.title}</h4>
        <p>{item.description}</p>
      </div>
    ),
  },
};

export const WithCards: Story = {
  args: {
    fetchData: fetchSuccess,
    renderItem: (item: any) => (
      <Card
        key={item.id}
        variant="content"
        title={item.title}
        description={item.description}
        hoverable={true}
      />
    ),
    containerProps: {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '16px',
      },
    },
  },
};

export const Empty: Story = {
  args: {
    fetchData: fetchEmpty,
    renderItem: (item: any) => <div key={item.id}>{item.title}</div>,
    emptyMessage: '데이터가 없습니다.',
  },
};

export const Error: Story = {
  args: {
    fetchData: fetchError,
    renderItem: (item: any) => <div key={item.id}>{item.title}</div>,
    errorMessage: '데이터를 불러오는데 실패했습니다.',
  },
};

export const CustomLoading: Story = {
  args: {
    fetchData: fetchSuccess,
    renderItem: (item: any) => <div key={item.id}>{item.title}</div>,
    renderLoading: () => <div style={{ padding: '20px', textAlign: 'center' }}>커스텀 로딩...</div>,
  },
};

export const CustomEmpty: Story = {
  args: {
    fetchData: fetchEmpty,
    renderItem: (item: any) => <div key={item.id}>{item.title}</div>,
    renderEmpty: () => <div style={{ padding: '40px', textAlign: 'center' }}>커스텀 빈 상태</div>,
  },
};

export const CustomError: Story = {
  args: {
    fetchData: fetchError,
    renderItem: (item: any) => <div key={item.id}>{item.title}</div>,
    renderError: (error) => (
      <div style={{ padding: '40px', textAlign: 'center', color: 'red' }}>
        커스텀 에러: {error}
      </div>
    ),
  },
};

