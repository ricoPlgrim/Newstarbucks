import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { BasicPopup } from './Popup';
import Button from '../Button/Button';

const meta = {
  title: 'Components/Popup',
  component: BasicPopup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof BasicPopup>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultWrapper = (args: any) => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>팝업 열기</Button>
      <BasicPopup {...args} open={open} onClose={() => setOpen(false)} />
    </>
  );
};

const WithImageWrapper = (args: any) => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>이미지 팝업 열기</Button>
      <BasicPopup {...args} open={open} onClose={() => setOpen(false)} />
    </>
  );
};

const WithImageCarouselWrapper = (args: any) => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>이미지 캐러셀 팝업 열기</Button>
      <BasicPopup {...args} open={open} onClose={() => setOpen(false)} />
    </>
  );
};

const SingleActionWrapper = (args: any) => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>단일 액션 팝업 열기</Button>
      <BasicPopup {...args} open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export const Default: Story = {
  args: {
    open: true,
    icon: '🔒',
    title: '팝업 제목',
    description: '팝업 설명 텍스트입니다.',
    actions: [
      { label: '확인', variant: 'primary', onClick: () => alert('확인 클릭') },
      { label: '취소', variant: 'ghost', onClick: () => alert('취소 클릭') },
    ],
  },
  render: (args) => <DefaultWrapper {...args} />,
};

export const WithImage: Story = {
  args: {
    open: true,
    images: ['https://via.placeholder.com/400x300'],
    title: '이미지 팝업',
    description: '이미지가 포함된 팝업입니다.',
    actions: [{ label: '확인', variant: 'primary', onClick: () => {} }],
  },
  render: (args) => <WithImageWrapper {...args} />,
};

export const WithImageCarousel: Story = {
  args: {
    open: true,
    images: [
      'https://via.placeholder.com/400x300?text=Image+1',
      'https://via.placeholder.com/400x300?text=Image+2',
      'https://via.placeholder.com/400x300?text=Image+3',
    ],
    title: '이미지 캐러셀 팝업',
    description: '여러 이미지를 슬라이드로 볼 수 있는 팝업입니다.',
    actions: [{ label: '확인', variant: 'primary', onClick: () => {} }],
  },
  render: (args) => <WithImageCarouselWrapper {...args} />,
};

export const SingleAction: Story = {
  args: {
    open: true,
    icon: '✅',
    title: '성공',
    description: '작업이 완료되었습니다.',
    actions: [{ label: '확인', variant: 'primary', onClick: () => {} }],
  },
  render: (args) => <SingleActionWrapper {...args} />,
};
