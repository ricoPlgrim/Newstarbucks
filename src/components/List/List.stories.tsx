import type { Meta, StoryObj } from '@storybook/react';
import List, { ListItem } from './List';
import Icon from '../Icon/Icon';

const meta = {
  title: 'Components/List',
  component: List,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <List>
      <ListItem>리스트 아이템 1</ListItem>
      <ListItem>리스트 아이템 2</ListItem>
      <ListItem>리스트 아이템 3</ListItem>
    </List>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <List>
      <ListItem icon="📁">문서</ListItem>
      <ListItem icon="🖼️">이미지</ListItem>
      <ListItem icon="🎵">음악</ListItem>
      <ListItem icon="📹">비디오</ListItem>
    </List>
  ),
};

export const Clickable: Story = {
  render: () => (
    <List>
      <ListItem onClick={() => alert('클릭됨!')}>클릭 가능한 아이템 1</ListItem>
      <ListItem onClick={() => alert('클릭됨!')}>클릭 가능한 아이템 2</ListItem>
      <ListItem onClick={() => alert('클릭됨!')}>클릭 가능한 아이템 3</ListItem>
    </List>
  ),
};

export const WithSuffix: Story = {
  render: () => (
    <List>
      <ListItem suffix={<Icon name="chevron-right">→</Icon>}>아이템 1</ListItem>
      <ListItem suffix={<Icon name="chevron-right">→</Icon>}>아이템 2</ListItem>
      <ListItem suffix={<Icon name="chevron-right">→</Icon>}>아이템 3</ListItem>
    </List>
  ),
};

export const WithPrefixAndSuffix: Story = {
  render: () => (
    <List>
      <ListItem prefix={<Icon name="check">✓</Icon>} suffix={<Icon name="chevron-right">→</Icon>}>
        완료된 항목
      </ListItem>
      <ListItem prefix={<Icon name="check">✓</Icon>} suffix={<Icon name="chevron-right">→</Icon>}>
        완료된 항목
      </ListItem>
      <ListItem prefix={<Icon name="circle">○</Icon>} suffix={<Icon name="chevron-right">→</Icon>}>
        미완료 항목
      </ListItem>
    </List>
  ),
};

export const Disabled: Story = {
  render: () => (
    <List>
      <ListItem>일반 아이템</ListItem>
      <ListItem disabled>비활성화된 아이템</ListItem>
      <ListItem>일반 아이템</ListItem>
    </List>
  ),
};

export const Mixed: Story = {
  render: () => (
    <List>
      <ListItem icon="📧" onClick={() => alert('이메일 클릭')}>
        이메일 보내기
      </ListItem>
      <ListItem icon="📞" onClick={() => alert('전화 클릭')}>
        전화하기
      </ListItem>
      <ListItem icon="💬" disabled>
        메시지 (비활성화)
      </ListItem>
      <ListItem icon="⚙️" suffix={<Icon name="chevron-right">→</Icon>}>
        설정
      </ListItem>
    </List>
  ),
};

