import type { Meta, StoryObj } from '@storybook/react';
import LottieAnimation from './Lottie';

const meta = {
  title: 'Components/Lottie',
  component: LottieAnimation,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    loop: {
      control: 'boolean',
    },
    autoplay: {
      control: 'boolean',
    },
    speed: {
      control: { type: 'number', min: 0.1, max: 3, step: 0.1 },
    },
  },
} satisfies Meta<typeof LottieAnimation>;

export default meta;
type Story = StoryObj<typeof meta>;

// 샘플 Lottie JSON 데이터 (간단한 예시)
const sampleAnimationData = {
  v: '5.5.7',
  fr: 30,
  ip: 0,
  op: 60,
  w: 100,
  h: 100,
  nm: 'Sample',
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: 'Circle',
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 1, k: [{ i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [0] }, { t: 60, s: [360] }] },
        p: { a: 0, k: [50, 50, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      ao: 0,
      shapes: [
        {
          ty: 'el',
          p: { a: 0, k: [0, 0] },
          s: { a: 0, k: [30, 30] },
        },
        {
          ty: 'fl',
          c: { a: 0, k: [0.2, 0.4, 0.8, 1] },
        },
      ],
      ip: 0,
      op: 60,
      st: 0,
      bm: 0,
    },
  ],
  markers: [],
};

export const Default: Story = {
  args: {
    animationData: sampleAnimationData,
    loop: true,
    autoplay: true,
    speed: 1,
    width: 200,
    height: 200,
  },
};

export const NoLoop: Story = {
  args: {
    animationData: sampleAnimationData,
    loop: false,
    autoplay: true,
    speed: 1,
    width: 200,
    height: 200,
  },
};

export const NoAutoplay: Story = {
  args: {
    animationData: sampleAnimationData,
    loop: true,
    autoplay: false,
    speed: 1,
    width: 200,
    height: 200,
  },
};

export const FastSpeed: Story = {
  args: {
    animationData: sampleAnimationData,
    loop: true,
    autoplay: true,
    speed: 2,
    width: 200,
    height: 200,
  },
};

export const SlowSpeed: Story = {
  args: {
    animationData: sampleAnimationData,
    loop: true,
    autoplay: true,
    speed: 0.5,
    width: 200,
    height: 200,
  },
};

export const Small: Story = {
  args: {
    animationData: sampleAnimationData,
    loop: true,
    autoplay: true,
    width: 100,
    height: 100,
  },
};

export const Large: Story = {
  args: {
    animationData: sampleAnimationData,
    loop: true,
    autoplay: true,
    width: 400,
    height: 400,
  },
};

export const WithCallbacks: Story = {
  args: {
    animationData: sampleAnimationData,
    loop: true,
    autoplay: true,
    width: 200,
    height: 200,
    onComplete: () => console.log('Animation completed'),
    onLoopComplete: () => console.log('Loop completed'),
  },
};

