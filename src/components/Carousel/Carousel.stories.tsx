import type { Meta, StoryObj } from '@storybook/react';
import Carousel from './Carousel';

const meta = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    showOptionsPanel: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleSlides = [
  {
    id: 1,
    title: '배너 1',
    desc: '이곳에 주요 메시지를 노출하세요.',
    image: 'https://via.placeholder.com/800x400',
  },
  {
    id: 2,
    title: '배너 2',
    desc: '슬라이드를 넘겨 다양한 정보를 전달합니다.',
    image: 'https://via.placeholder.com/800x400',
  },
  {
    id: 3,
    title: '배너 3',
    desc: '모바일/데스크탑 반응형 지원.',
    image: 'https://via.placeholder.com/800x400',
  },
];

export const Default: Story = {
  args: {
    slides: sampleSlides,
    showOptionsPanel: false,
  },
};

export const WithOptionsPanel: Story = {
  args: {
    slides: sampleSlides,
    showOptionsPanel: true,
  },
};

export const TextOnly: Story = {
  args: {
    slides: [
      { id: 1, title: '배너 1', desc: '텍스트만 있는 슬라이드입니다.' },
      { id: 2, title: '배너 2', desc: '이미지 없이 텍스트만 표시됩니다.' },
      { id: 3, title: '배너 3', desc: '간단한 정보 전달에 적합합니다.' },
    ],
    showOptionsPanel: false,
  },
};

export const SingleSlide: Story = {
  args: {
    slides: [{ id: 1, title: '단일 슬라이드', desc: '슬라이드가 하나만 있을 때는 스와이퍼가 비활성화됩니다.' }],
    showOptionsPanel: false,
  },
};

export const ManySlides: Story = {
  args: {
    slides: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `배너 ${i + 1}`,
      desc: `${i + 1}번째 슬라이드입니다.`,
      image: `https://via.placeholder.com/800x400?text=Banner+${i + 1}`,
    })),
    showOptionsPanel: false,
  },
};

