import { useStyles } from './PageContainer.styles';

const PageContainer = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.PageContainer}>{children}</div>;
};
export default PageContainer;
