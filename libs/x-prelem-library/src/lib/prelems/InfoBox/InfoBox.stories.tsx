import React from "react";
import { Story, Meta } from "@storybook/react";
import InfoBox from "./InfoBox";

export default {
  title: "Prelems/Info Box",
  component: InfoBox,
} as Meta;

const Template: Story = (args) => <InfoBox {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: InfoBox.defaultProps.content,
  authoringHelper: InfoBox.defaultProps.authoringHelper,
  analytics: InfoBox.defaultProps.analytics,
  secondaryArgs: InfoBox.defaultProps.secondaryArgs,
};
