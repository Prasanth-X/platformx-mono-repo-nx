import './DamCategory.css';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import { ThemeConstants } from '@platformx/utilities';
import { Box, Checkbox, Typography } from '@mui/material';
import { nullToArray } from '../../../../utils/helperFunctions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DescriptionsubIcon from '../../../../assets/svg/descriptionsubicon.svg';
import ExpandmoreIcon from '../../../../assets/svg/expandmoreiconn.svg';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { nestArrayCateGories } from '../../../../ecommerceComponents/CategoriesTree/helperEcomCategoriesPage';

type CategoriesTreeProps = {
  onNodeIdHandle: any;
  categoriesFilter: Array<any>;
};

const DamCategory = (_props: CategoriesTreeProps) => {
  const { categoriesFilter = [], onNodeIdHandle = () => {} } = _props;

  const handleExpandClick = (event, nodeId) => {
    event?.stopPropagation();
    onNodeIdHandle(nodeId);
  };
  const mockData = [
    {
      id: 'f25309c3-320d-4cc0-bc39-fa68885806a5',
      docType: 'category',
      name: 'Men',
      description: 'Men',
      slug: 'men',
      parent_id: '',
    },
    {
      id: '20519929-9fd7-4776-84e0-33e9e997b72a',
      docType: 'category',
      name: 'Clothing',
      description: 'Clothing',
      slug: 'menfashion',
      parent_id: '',
    },
    {
      id: '65737b8b-67a7-42a6-b363-e86e759f971f',
      docType: 'category',
      name: 'Shoes',
      description: '',
      slug: 'Mobile-Accessories',
      parent_id: 'f25309c3-320d-4cc0-bc39-fa68885806a5',
    },
    {
      id: '9ba88276-3c9d-4b7b-ae2c-dd7aa2faf99b',
      docType: 'category',
      name: 'Sneakar',
      description: '',
      slug: 'Cables-and-Adapters',
      parent_id: '65737b8b-67a7-42a6-b363-e86e759f971f',
    },
    {
      id: '40617ba2-c88e-48b4-b5cd-4b7026d51380',
      docType: 'category',
      name: 'Formal',
      description: '',
      slug: 'Adhesive-Card-Holder',
      parent_id: '65737b8b-67a7-42a6-b363-e86e759f971f',
    },
    {
      id: '956df35e-7fd7-4398-83a7-5accc44433af',
      docType: 'category',
      name: 'Crocs',
      description: '',
      slug: 'Camera-Privacy-Cover',
      parent_id: '65737b8b-67a7-42a6-b363-e86e759f971f',
    },
    {
      id: 'ae50d48e-859d-4a68-9401-c57e2842a6b2',
      docType: 'category',
      name: 'Shirts',
      description: '',
      slug: 'shirts',
      parent_id: '20519929-9fd7-4776-84e0-33e9e997b72a',
    },
    {
      id: '0de084ee-fd3c-4970-9a95-d360eea8356a',
      docType: 'category',
      name: 'Formal Shirts',
      description: '',
      slug: 'formalshirts',
      parent_id: 'ae50d48e-859d-4a68-9401-c57e2842a6b2',
    },
    {
      id: '436a66a0-f05c-4dff-b10b-1568787e045e',
      docType: 'category',
      name: 'Jeans',
      description: '',
      slug: 'jeans',
      parent_id: '20519929-9fd7-4776-84e0-33e9e997b72a',
    },
    {
      id: '73ce2820-af12-446c-a70b-63872eb47f8c',
      docType: 'category',
      name: 'Accessories',
      description: 'Women Fashion',
      slug: 'womenfashion',
      parent_id: '',
    },
    {
      id: '09d7e2b8-2ebf-4777-aff0-f40f43939fea',
      docType: 'category',
      name: 'Western Wear',
      description: '',
      slug: 'westernwear',
      parent_id: '73ce2820-af12-446c-a70b-63872eb47f8c',
    },
    {
      id: '9e349ef6-b830-41f1-a64d-c5814b699311',
      docType: 'category',
      name: 'Dresses & Jumpsuit',
      description: '',
      slug: 'dresses_jumpsuits',
      parent_id: '09d7e2b8-2ebf-4777-aff0-f40f43939fea',
    },
    {
      id: '36b483f6-cb83-4885-9ca7-420e0a98abcf',
      docType: 'category',
      name: 'Casual Shirts',
      description: '',
      slug: 'casualshirts',
      parent_id: 'ae50d48e-859d-4a68-9401-c57e2842a6b2',
    },
    {
      id: '3e4ad976-821f-4226-a263-ff197a2e42c5',
      docType: 'category',
      name: 'Trouser',
      description: '',
      slug: 'trouser',
      parent_id: '09d7e2b8-2ebf-4777-aff0-f40f43939fea',
    },
    {
      id: 'cd4f6639-b5f0-4ddc-a669-0e28c4145378',
      docType: 'category',
      name: 'Data Card & Dongles',
      description: '',
      slug: 'data-card-dongles',
      parent_id: 'ee61a259-cbee-45f4-9627-c112852544fd',
    },
    {
      id: '40abc39b-9c66-442f-afa3-9ee20b88b6d3',
      docType: 'category',
      name: 'Bags',
      description: 'Mobiles',
      slug: 'mobiles',
      parent_id: '',
    },
    {
      id: '455646a8-c64f-4248-81ad-958580f57575',
      docType: 'category',
      name: 'Sleepwear',
      description: 'Men Fashion',
      slug: 'menfashion',
      parent_id: '',
    },
    {
      id: '9bb24f89-71e8-4cfa-8ff8-da49a51cc4fc',
      docType: 'category',
      name: 'Women',
      description: 'Women Fashion',
      slug: 'womenfashion',
      parent_id: '',
    },
    {
      id: '2',
      docType: 'category',
      name: 'Western Wear',
      description: '',
      slug: 'westernwear',
      parent_id: '1',
    },
    {
      id: '1',
      docType: 'category',
      name: 'kids',
      description: 'Women Fashion',
      slug: 'womenfashion',
      parent_id: '',
    },
    {
      id: '3',
      docType: 'category',
      name: 'Home',
      description: 'Women Fashion',
      slug: 'womenfashion',
      parent_id: '',
    },
    {
      id: '4',
      docType: 'category',
      name: 'Garden',
      description: 'Women Fashion',
      slug: 'womenfashion',
      parent_id: '',
    },
    {
      id: '3',
      docType: 'category',
      name: 'Home',
      description: 'Women Fashion',
      slug: 'womenfashion',
      parent_id: '4',
    },
    {
      id: '2',
      docType: 'category',
      name: 'Western Wear',
      description: '',
      slug: 'westernwear',
      parent_id: '3',
    },

    {
      id: '51b5ea42-41c5-4b07-8b14-1300ea81ab10',
      docType: 'category',
      name: 'Western Wear',
      description: '',
      slug: 'westernwear',
      parent_id: '9bb24f89-71e8-4cfa-8ff8-da49a51cc4fc',
    },
    {
      id: '0da4b279-4ec0-4f6d-8d87-8ac027abf56c',
      docType: 'category',
      name: 'Mobile Accessories',
      description: '',
      slug: 'Mobile-Accessories',
      parent_id: '40abc39b-9c66-442f-afa3-9ee20b88b6d3',
    },
    {
      id: '499e7ca2-79d2-4ff4-a5ef-e9ae957f16cc',
      docType: 'category',
      name: 'Jeans',
      description: '',
      slug: 'jeans',
      parent_id: '455646a8-c64f-4248-81ad-958580f57575',
    },
    {
      id: 'ef0ee39c-608b-4041-b1f7-dfd771dfa6fb',
      docType: 'category',
      name: 'Mobile Phones',
      description: '',
      slug: 'mobile-phones',
      parent_id: '40abc39b-9c66-442f-afa3-9ee20b88b6d3',
    },
    {
      id: '418f7273-2b46-41d0-a3f3-d86e36cd660f',
      docType: 'category',
      name: 'Shirts',
      description: '',
      slug: 'shirts',
      parent_id: '455646a8-c64f-4248-81ad-958580f57575',
    },
    {
      id: '6065c6dd-5907-49d4-b6de-2fde6e5512e7',
      docType: 'category',
      name: 'Formal Shirts',
      description: '',
      slug: 'formalshirts',
      parent_id: '418f7273-2b46-41d0-a3f3-d86e36cd660f',
    },
    {
      id: 'f96bcec7-4109-447e-a741-ad77c36c55de',
      docType: 'category',
      name: 'Casual Shirts',
      description: '',
      slug: 'casualshirts',
      parent_id: '418f7273-2b46-41d0-a3f3-d86e36cd660f',
    },
    {
      id: '5dfe2ea0-7e9a-488a-b1dc-00b94703197e',
      docType: 'category',
      name: 'Trouser',
      description: '',
      slug: 'trouser',
      parent_id: '51b5ea42-41c5-4b07-8b14-1300ea81ab10',
    },
    {
      id: '16b53059-1e98-4d77-845d-d85466933d16',
      docType: 'category',
      name: 'Dresses & Jumpsuits',
      description: '',
      slug: 'dresses_jumpsuits',
      parent_id: '51b5ea42-41c5-4b07-8b14-1300ea81ab10',
    },
    {
      id: '3bc96b0b-c3c1-41e6-8b13-8504620fdb00',
      docType: 'category',
      name: 'Data Card & Dongles',
      description: '',
      slug: 'data-card-dongles',
      parent_id: '7228ba6b-8975-45f9-8c71-619a860ce9d0',
    },
    {
      id: '1c928190-4ec3-4c96-89f8-6ebf26b41276',
      docType: 'category',
      name: 'Adhesive Card Holder',
      description: '',
      slug: 'Adhesive-Card-Holder',
      parent_id: '0da4b279-4ec0-4f6d-8d87-8ac027abf56c',
    },
    {
      id: 'fc9ae453-3659-418e-8b7d-9d97cbe85b9d',
      docType: 'category',
      name: 'Cables & Adapters',
      description: '',
      slug: 'Cables-and-Adapters',
      parent_id: '0da4b279-4ec0-4f6d-8d87-8ac027abf56c',
    },
    {
      id: 'a34a8257-446f-4aa3-8567-3d8f0a99f128',
      docType: 'category',
      name: 'Camera Privacy Cover',
      description: '',
      slug: 'Camera-Privacy-Cover',
      parent_id: '0da4b279-4ec0-4f6d-8d87-8ac027abf56c',
    },
  ];
  const filterMap = nestArrayCateGories([...mockData]);
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
            <>
              <img
                className="img"
                src={DescriptionsubIcon}
                alt="DescriptionsubIcon"
              />
              <ExpandMoreIcon
                sx={{ position: 'absolute', right: '24px', marginTop: '-12px' }}
              />
            </>
          }
          defaultExpandIcon={
            <>
              {' '}
              <img className="img" src={ExpandmoreIcon} alt="ExpandmoreIcon" />
              <ChevronRightIcon
                sx={{ position: 'absolute', right: '24px', marginTop: '-12px' }}
              />
            </>
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
                              <Box>
                                <Typography
                                  variant="h6regular"
                                  color="textSecondary"
                                >
                                  {elem?.name + '(' + 790 + ')'}
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
                                        <Box>
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
        
}
      .left-sidebar-tree .Platform-x-TreeView-root .Platform-x-TreeItem-content .Platform-x-Typography-root {
        color:${ThemeConstants.PRIMARY_MAIN_COLOR};
        margin-left: 20px;
        margin-top: -4px;
        font-family: "Inter";

}
      .left-sidebar-tree .Platform-x-TreeView-root .Platform-x-TreeItem-content .Platform-x-Typography-root .item-count {
        color:${ThemeConstants.LIGHT_GRAY_VARIENT2};
}
.left-sidebar-tree .Platform-x-TreeView-root .Platform-x-TreeItem-iconContainer > svg {
        color: ${ThemeConstants.LIGHT_GRAY_VARIENT2}
        margin-top: -4px
}
      .left-sidebar-tree .Platform-x-TreeView-root .Platform-x-TreeItem-iconContainer:not(:empty) + .Platform-x-TreeItem-label .Mui-checked {
        color: ${ThemeConstants.LIGHT_GRAY_VARIENT1}
}
      `;
export default DamCategory;
