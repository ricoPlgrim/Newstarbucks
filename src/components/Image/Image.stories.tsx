import type { Meta, StoryObj } from '@storybook/react';
import Image from './Image';

const meta = {
  title: 'Components/Image',
  component: Image,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: 'text',
    },
    height: {
      control: 'text',
    },
    showFallback: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleImage = 'https://via.placeholder.com/300x200';

export const Default: Story = {
  args: {
    src: sampleImage,
    alt: '샘플 이미지',
  },
};

export const WithSize: Story = {
  args: {
    src: sampleImage,
    alt: '샘플 이미지',
    width: 300,
    height: 200,
  },
};

export const WithFallback: Story = {
  args: {
    src: 'invalid-url.jpg',
    alt: '이미지 로드 실패',
    fallbackSrc: '/no_image.png',
    showFallback: true,
  },
};

export const Square: Story = {
  args: {
    src: sampleImage,
    alt: '정사각형 이미지',
    width: 200,
    height: 200,
  },
};

export const Circle: Story = {
  args: {
    src: sampleImage,
    alt: '원형 이미지',
    width: 100,
    height: 100,
    style: { borderRadius: '50%', objectFit: 'cover' },
  },
};

export const Responsive: Story = {
  args: {
    src: sampleImage,
    alt: '반응형 이미지',
    width: '100%',
    height: 'auto',
  },
  render: (args) => (
    <div style={{ width: '300px' }}>
      <Image {...args} />
    </div>
  ),
};

export const WithOnLoad: Story = {
  args: {
    src: sampleImage,
    alt: '로드 이벤트 이미지',
    onLoad: () => console.log('이미지 로드 완료'),
  },
};

export const WithOnError: Story = {
  args: {
    src: 'invalid-url.jpg',
    alt: '에러 이미지',
    onError: () => console.log('이미지 로드 실패'),
    showFallback: true,
  },
};

