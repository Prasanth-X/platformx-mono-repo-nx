import React from "react";
import { Story, Meta } from "@storybook/react";
import Sponsor from "./Sponsor";

export default {
  title: "Prelems/Sponsor",
  component: Sponsor,
} as Meta;

const Template: Story = (args) => <Sponsor {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: Sponsor.defaultProps.content,
  authoringHelper: Sponsor.defaultProps.authoringHelper,
  analytics: Sponsor.defaultProps.analytics,
  secondaryArgs: Sponsor.defaultProps.secondaryArgs,
};
