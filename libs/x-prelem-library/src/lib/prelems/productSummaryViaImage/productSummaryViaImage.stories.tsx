import React from "react";
import { Story, Meta } from "@storybook/react";
import ProductSummaryViaImage from "./productSummaryViaImage";

export default {
  title: "Prelems/Product Summary Via Image",
  component: ProductSummaryViaImage,
} as Meta;

const Template: Story = (args) => <ProductSummaryViaImage {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: ProductSummaryViaImage.defaultProps.content,
  authoringHelper: ProductSummaryViaImage.defaultProps.authoringHelper,
  analytics: ProductSummaryViaImage.defaultProps.analytics,
  secondaryArgs: ProductSummaryViaImage.defaultProps.secondaryArgs,
};
