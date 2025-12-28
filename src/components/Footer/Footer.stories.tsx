import type { Meta, StoryObj } from '@storybook/react';
import Footer from './Footer';

const meta = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomNav: Story = {
  args: {
    nav: [
      { label: '회사소개', href: '#' },
      { label: '이용약관', href: '#' },
      { label: '개인정보처리방침', href: '#' },
      { label: '고객센터', href: '#' },
      { label: 'FAQ', href: '#' },
    ],
  },
};

export const CustomInfo: Story = {
  args: {
    info: {
      address: '서울특별시 강남구 테헤란로 123',
      contact: '고객센터 1588-1234 | 이메일: support@example.com',
    },
  },
};

export const CustomSns: Story = {
  args: {
    sns: ['Instagram', 'Facebook', 'Youtube', 'Twitter', 'LinkedIn'],
  },
};

export const CustomLogo: Story = {
  args: {
    logo: 'STARBUCKS',
  },
};

export const FullCustom: Story = {
  args: {
    logo: 'STARBUCKS',
    nav: [
      { label: '회사소개', href: '#' },
      { label: '이용약관', href: '#' },
      { label: '개인정보처리방침', href: '#' },
      { label: '고객센터', href: '#' },
    ],
    info: {
      address: '서울특별시 강남구 테헤란로 123',
      contact: '고객센터 1588-1234 | 이메일: support@example.com',
    },
    sns: ['Instagram', 'Facebook', 'Youtube'],
  },
};

