import React from "react";
import { Story, Meta } from "@storybook/react";
import ProductSummaryViaImage2 from "./ProductSummaryViaImage2";

export default {
  title: "Prelems/ProductSummaryViaImage2",
  component: ProductSummaryViaImage2,
} as Meta;

const Template: Story = (args) => <ProductSummaryViaImage2 {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: ProductSummaryViaImage2.defaultProps.content,
  authoringHelper: ProductSummaryViaImage2.defaultProps.authoringHelper,
  analytics: ProductSummaryViaImage2.defaultProps.analytics,
  secondaryArgs: ProductSummaryViaImage2.defaultProps.secondaryArgs,
};
