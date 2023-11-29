import { useStyles } from './PageContainer.styles';

const RightBox = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.rightBox}>{children}</div>;
};
export default RightBox;
