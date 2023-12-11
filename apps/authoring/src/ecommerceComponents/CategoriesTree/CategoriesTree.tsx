import './CategoriesTree.css';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ThemeConstants from '../../../../../libs/utilities/src/lib/themes/authoring/variable';
import { Box, Checkbox, Typography } from '@mui/material';
import { nullToArray } from '../../utils/helperFunctions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { nestArrayCateGories } from './helperEcomCategoriesPage';

type CategoriesTreeProps = {
  onNodeIdHandle: any;
  categoriesFilter: Array<any>;
};

const CategoriesTree = (_props: CategoriesTreeProps) => {
  const { categoriesFilter = [], onNodeIdHandle = () => {} } = _props;

  const handleExpandClick = (event, nodeId) => {
    event?.stopPropagation();
    onNodeIdHandle(nodeId);
  };

  const filterMap = nestArrayCateGories([...categoriesFilter]);

  return (
    <Box
      className="left-sidebar-tree"
      sx={{
        padding: { xs: '16px', em: '0px' },
        paddingTop: { xs: '6px', em: '0px' },
      }}
    >
      <style>{css}</style>
      {nullToArray(filterMap).length > 0 ? (
        <TreeView
          defaultCollapseIcon={
            <ExpandMoreIcon
              sx={{ position: 'absolute', right: '20px', marginTop: '-12px' }}
            />
          }
          defaultExpandIcon={
            <ChevronRightIcon
              sx={{ position: 'absolute', right: '20px', marginTop: '-12px' }}
            />
          }
          defaultExpanded={[filterMap[0].id]}
          className="all-categories"
          sx={{
            '& .Platform-x-Checkbox-root': {
              paddingLeft: '0px',
              paddingRight: '0px',
              color: ThemeConstants.LIGHT_GRAY_VARIENT1,
            },
            '& .Platform-x-Checkbox-colorPrimary svg': {
              fontSize: ThemeConstants.FONTSIZE_MD,
            },
          }}
        >
          {nullToArray(filterMap).map((ele: any) => {
            return (
              <Box key={ele?.id}>
                {/* parent */}
                <TreeItem
                  nodeId={ele?.id}
                  className="parent-menu"
                  label={
                    <Box className="parent-level-1">
                      <Checkbox
                        className="parent-checkbox"
                        checked={ele.isCheck}
                        tabIndex={-1}
                        disableRipple
                        onClick={(e) => handleExpandClick(e, ele?.id)}
                      />
                      <Typography
                        className="parent-title"
                        variant="h6regular"
                        color="textSecondary"
                      >
                        {ele?.name}
                      </Typography>
                    </Box>
                  }
                >
                  {/* child 1 */}
                  {ele?.children?.length > 0 ? (
                    <>
                      {ele?.children.map((elem: any) => {
                        return (
                          <TreeItem
                            key={elem?.id}
                            nodeId={elem?.id}
                            className="child-level"
                            label={
                              <Box className="ecommerce-tree-box">
                                <Checkbox
                                  checked={elem.isCheck}
                                  tabIndex={-1}
                                  disableRipple
                                  onClick={(e) =>
                                    handleExpandClick(e, elem?.id)
                                  }
                                />
                                <Typography
                                  variant="h6regular"
                                  color="textSecondary"
                                >
                                  {elem?.name}
                                </Typography>
                              </Box>
                            }
                          >
                            {/* child 2 */}
                            {elem?.children?.length > 0 ? (
                              <>
                                {elem?.children.map((elem1: any) => {
                                  return (
                                    <TreeItem
                                      key={elem1?.id}
                                      nodeId={elem1?.id}
                                      label={
                                        <Box className="ecommerce-tree-box">
                                          <Checkbox
                                            checked={elem1.isCheck}
                                            tabIndex={-1}
                                            disableRipple
                                            onClick={(e) =>
                                              handleExpandClick(e, elem1?.id)
                                            }
                                          />
                                          <Typography
                                            variant="h6regular"
                                            color="textSecondary"
                                          >
                                            {elem1?.name}
                                          </Typography>
                                        </Box>
                                      }
                                    ></TreeItem>
                                  );
                                })}
                              </>
                            ) : null}
                          </TreeItem>
                        );
                      })}
                    </>
                  ) : null}
                </TreeItem>
              </Box>
            );
          })}
        </TreeView>
      ) : (
        <Box>
          <Typography variant="h6regular"> No Data found..</Typography>
        </Box>
      )}
    </Box>
  );
};
const css = `
.left-sidebar-tree li.Platform-x-TreeItem-root .Platform-x-TreeItem-content.Mui-expanded .Platform-x-TreeItem-iconContainer > svg {
  color: ${ThemeConstants.BLACK_COLOR_VARIANT1};
  transform: rotate(180deg);
}
.left-sidebar-tree li.Platform-x-TreeItem-root.child-level .Platform-x-TreeItem-content.Mui-expanded .Platform-x-TreeItem-iconContainer > svg {
  color: ${ThemeConstants.LIGHT_GRAY_VARIENT2};
  transform: rotate(0deg);
}
.left-sidebar-tree .parent-level-1 .parent-title {
  font-size: ${ThemeConstants.FONTSIZE_H5};
  font-weight:${ThemeConstants.FONTWEIGHT_SEMIBOLD};
}
.left-sidebar-tree .Platform-x-TreeView-root > li > .Platform-x-TreeItem-content > .Platform-x-TreeItem-label > span:last-child {
      font - size:${ThemeConstants.FONTSIZE_DEFAULT};
      font-weight:${ThemeConstants.FONTWEIGHT_MEDIUM};
}
.left-sidebar-tree .Platform-x-TreeView-root > li > .Platform-x-TreeItem-content.Mui-expanded > .Platform-x-TreeItem-iconContainer > svg {
        color:${ThemeConstants.PRIMARY_MAIN_COLOR}
}
      .left-sidebar-tree .Platform-x-TreeView-root .Platform-x-TreeItem-content .Platform-x-Typography-root {
        color:${ThemeConstants.PRIMARY_MAIN_COLOR};
        margin-left: 6px;
        font-family: "Inter";
}
      .left-sidebar-tree .Platform-x-TreeView-root .Platform-x-TreeItem-content .Platform-x-Typography-root .item-count {
        color:${ThemeConstants.LIGHT_GRAY_VARIENT2};
}
.left-sidebar-tree .Platform-x-TreeView-root .Platform-x-TreeItem-iconContainer > svg {
        color: ${ThemeConstants.LIGHT_GRAY_VARIENT2}
}
      .left-sidebar-tree .Platform-x-TreeView-root .Platform-x-TreeItem-iconContainer:not(:empty) + .Platform-x-TreeItem-label .Mui-checked {
        color: ${ThemeConstants.LIGHT_GRAY_VARIENT1}
}
      `;
export default CategoriesTree;
