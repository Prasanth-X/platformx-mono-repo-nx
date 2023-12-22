// Create storybook stories for PageHeader
import { UserListing } from './user-listing';
export default {
  title: 'UserListing',
};
export const primary = () => {
  /* eslint-disable-next-line */
  const props = {
    title: 'hello',
  };
  return <UserListing title={props.title} />;
};
export const secondary = () => {
  /* eslint-disable-next-line */
  const props = {
    title: 'hello',
  };
  return <UserListing title={props.title} />;
};
