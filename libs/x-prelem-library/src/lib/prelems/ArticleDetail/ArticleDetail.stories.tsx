import React from "react";
import { Story, Meta } from "@storybook/react";
import ArticleDetail from "./ArticleDetail";

export default {
  title: "Prelems/Article Detail",
  component: ArticleDetail,
} as Meta;

const Template: Story = (args) => <ArticleDetail {...args} />;

export const Default = Template.bind({});
Default.args = {
  content: ArticleDetail.defaultProps.content,
  authoringHelper: ArticleDetail.defaultProps.authoringHelper,
  analytics: ArticleDetail.defaultProps.analytics,
  secondaryArgs: ArticleDetail.defaultProps.secondaryArgs,
};
