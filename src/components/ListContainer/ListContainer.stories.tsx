import type { Meta, StoryObj } from '@storybook/react';
import ListContainer from './ListContainer';
import List, { ListItem } from '../List/List';

const meta = {
  title: 'Components/ListContainer',
  component: ListContainer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    tag: {
      control: 'select',
      options: ['section', 'article'],
    },
    bordered: {
      control: 'boolean',
    },
    divided: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof ListContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tag: 'section',
    title: '리스트 제목',
    description: '리스트 설명입니다.',
    children: (
      <List>
        <ListItem>아이템 1</ListItem>
        <ListItem>아이템 2</ListItem>
        <ListItem>아이템 3</ListItem>
      </List>
    ),
  },
};

export const WithTitle: Story = {
  args: {
    title: '섹션 제목',
    children: (
      <List>
        <ListItem>아이템 1</ListItem>
        <ListItem>아이템 2</ListItem>
        <ListItem>아이템 3</ListItem>
      </List>
    ),
  },
};

export const WithDescription: Story = {
  args: {
    title: '섹션 제목',
    description: '이 섹션에 대한 설명입니다.',
    children: (
      <List>
        <ListItem>아이템 1</ListItem>
        <ListItem>아이템 2</ListItem>
        <ListItem>아이템 3</ListItem>
      </List>
    ),
  },
};

export const Bordered: Story = {
  args: {
    title: '테두리가 있는 리스트',
    description: '테두리가 표시됩니다.',
    bordered: true,
    children: (
      <List>
        <ListItem>아이템 1</ListItem>
        <ListItem>아이템 2</ListItem>
        <ListItem>아이템 3</ListItem>
      </List>
    ),
  },
};

export const Divided: Story = {
  args: {
    title: '구분선이 있는 리스트',
    description: '아이템 사이에 구분선이 표시됩니다.',
    divided: true,
    children: (
      <List>
        <ListItem>아이템 1</ListItem>
        <ListItem>아이템 2</ListItem>
        <ListItem>아이템 3</ListItem>
      </List>
    ),
  },
};

export const Article: Story = {
  args: {
    tag: 'article',
    title: '아티클 제목',
    description: 'article 태그를 사용합니다.',
    children: (
      <List>
        <ListItem>아이템 1</ListItem>
        <ListItem>아이템 2</ListItem>
        <ListItem>아이템 3</ListItem>
      </List>
    ),
  },
};

export const BorderedAndDivided: Story = {
  args: {
    title: '테두리와 구분선',
    description: '테두리와 구분선이 모두 표시됩니다.',
    bordered: true,
    divided: true,
    children: (
      <List>
        <ListItem>아이템 1</ListItem>
        <ListItem>아이템 2</ListItem>
        <ListItem>아이템 3</ListItem>
        <ListItem>아이템 4</ListItem>
      </List>
    ),
  },
};

