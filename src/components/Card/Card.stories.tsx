import type { Meta, StoryObj } from '@storybook/react';
import Card from './Card';
import Button from '../Button/Button';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['product', 'content'],
    },
    hoverable: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleImage = 'https://via.placeholder.com/300x200';

export const ContentCard: Story = {
  args: {
    variant: 'content',
    title: '카드 제목',
    description: '카드 설명 텍스트입니다.',
    hoverable: true,
  },
};

export const ContentCardWithImage: Story = {
  args: {
    variant: 'content',
    image: sampleImage,
    imageAlt: '카드 이미지',
    title: '카드 제목',
    description: '카드 설명 텍스트입니다.',
    hoverable: true,
  },
};

export const ProductCard: Story = {
  args: {
    variant: 'product',
    image: sampleImage,
    imageAlt: '상품 이미지',
    title: '상품명',
    description: '상품 설명입니다.',
    price: '15,000원',
    hoverable: true,
  },
};

export const ProductCardWithBadge: Story = {
  args: {
    variant: 'product',
    image: sampleImage,
    imageAlt: '상품 이미지',
    title: '상품명',
    description: '상품 설명입니다.',
    price: '15,000원',
    badge: 'NEW',
    badgeVariant: 'success',
    hoverable: true,
  },
};

export const ClickableCard: Story = {
  args: {
    variant: 'content',
    image: sampleImage,
    imageAlt: '카드 이미지',
    title: '클릭 가능한 카드',
    description: '클릭하면 상세 페이지로 이동합니다.',
    hoverable: true,
    onClick: () => alert('카드 클릭!'),
  },
};

export const CardWithChildren: Story = {
  args: {
    variant: 'content',
    image: sampleImage,
    imageAlt: '카드 이미지',
    title: '카드 제목',
    description: '카드 설명 텍스트입니다.',
    hoverable: true,
    children: (
      <div style={{ marginTop: '12px' }}>
        <Button variant="primary" size="small">
          자세히 보기
        </Button>
      </div>
    ),
  },
};

export const NonHoverable: Story = {
  args: {
    variant: 'content',
    title: '호버 효과 없는 카드',
    description: '호버 효과가 비활성화된 카드입니다.',
    hoverable: false,
  },
};

export const TextOnly: Story = {
  args: {
    variant: 'content',
    title: '텍스트만 있는 카드',
    description: '이미지 없이 텍스트만 표시되는 카드입니다.',
  },
};

