import React from "react";
import { Story, Meta } from "@storybook/react";
import ProductSummaryViaVideo2 from "./ProductSummaryViaVideo2";

export default {
  title: "Prelems/Product Summary",
  component: ProductSummaryViaVideo2,
} as Meta;

const Template: Story = (args) => <ProductSummaryViaVideo2 {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: ProductSummaryViaVideo2.defaultProps.content,
  authoringHelper: ProductSummaryViaVideo2.defaultProps.authoringHelper,
  analytics: ProductSummaryViaVideo2.defaultProps.analytics,
  secondaryArgs: ProductSummaryViaVideo2.defaultProps.secondaryArgs,
};
