import type { Meta, StoryObj } from "@storybook/react";

import { Typography } from "./";

const meta = {
  title: "Components/Typography",
  component: Typography,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: [
        "large",
        "h1",
        "h2",
        "h3",
        "body1",
        "body2",
        "subtitle1",
        "subtitle2",
        "caption",
        "overline",
        "link1",
        "link2",
      ],
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = {
  args: {
    variant: "large",
    children: "large text example",
  },
};

export const H1: Story = {
  args: {
    variant: "h1",
    children: "h1 text example",
  },
};
export const H2: Story = {
  args: {
    variant: "h2",
    children: "h2 text example",
  },
};
export const H3: Story = {
  args: {
    variant: "h3",
    children: "h3 text example",
  },
};

export const Body1: Story = {
  args: {
    variant: "body1",
    children: "body1 text example",
  },
};
export const Body2: Story = {
  args: {
    variant: "body2",
    children: "body2 text example",
  },
};
export const Subtitle1: Story = {
  args: {
    variant: "subtitle1",
    children: "subtitle1 text example",
  },
};
export const Subtitle2: Story = {
  args: {
    variant: "subtitle2",
    children: "subtitle2 text example",
  },
};
export const Caption: Story = {
  args: {
    variant: "caption",
    children: "caption text example",
  },
};
export const Overline: Story = {
  args: {
    variant: "overline",
    children: "overline text example",
  },
};
export const Link1: Story = {
  args: {
    variant: "link1",
    children: "link1 text example",
    color: "link",
  },
};
export const Link2: Story = {
  args: {
    variant: "link2",
    children: "link2 text example",
    color: "link",
  },
};
