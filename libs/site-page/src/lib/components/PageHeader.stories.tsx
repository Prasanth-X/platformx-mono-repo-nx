// Create storybook stories for PageHeader
import { PageHeader } from './PageHeader';
export default {
  title: 'PageHeader',
};
export const primary = () => {
  /* eslint-disable-next-line */
  const props = {
    title: 'hello',
  };
  return <PageHeader title={props.title} />;
};
export const secondary = () => {
  /* eslint-disable-next-line */
  const props = {
    title: 'hello',
  };
  return <PageHeader title={props.title} />;
};
