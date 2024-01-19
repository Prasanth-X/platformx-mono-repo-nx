import React from "react";
import { Story, Meta } from "@storybook/react";
import CoreHighlights from "./CoreHighlights";

export default {
  title: "Prelems/CoreHighlights",
  component: CoreHighlights,
} as Meta;

const Template: Story = (args) => <CoreHighlights {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: CoreHighlights.defaultProps.content,
  authoringHelper: CoreHighlights.defaultProps.authoringHelper,
  analytics: CoreHighlights.defaultProps.analytics,
  secondaryArgs: CoreHighlights.defaultProps.secondaryArgs,
};
