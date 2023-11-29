import PrelemBox from './PrelemBox';
import { PrelemData } from '../../utils/constant';
import { useStyles } from './PrelemList.styles';
import { Box } from '@mui/material';

import { useLazyQuery } from '@apollo/client';
import Mapping from 'platform-x-prelems/prelems/mapping';
import usePlatformAnalytics from 'platform-x-utils/dist/analytics';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import {
  fetchPrelemContent,
  fetchPrelemValidation,
} from '../../../../services/prelems/prelems.api';

import { addPrelem } from '../../../../store/Actions';
import { Store } from '../../../../store/ContextStore';
import ThemeConstants from '../../../../theme/variable';
import { SearchCardListProps } from '../../utils/prelemTypes';
const mappingDynamicInstance = {};
Object.keys(Mapping).forEach((item) => {
  mappingDynamicInstance[item] = React.lazy(
    () => import(`platform-x-prelems/prelems/${Mapping[item]}`)
  );
  return mappingDynamicInstance;
});

const PrelemList = ({ searchCardList }: SearchCardListProps) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const { page } = state;
  const [runFetchValidationQuery] = useLazyQuery(fetchPrelemValidation);
  const [runFetchContentQuery] = useLazyQuery(fetchPrelemContent);
  const [handleImpression] = usePlatformAnalytics();
  return (
    <Box className={classes.listBox}>
      {searchCardList.length > 0 &&
        searchCardList.map((item, key) => {
          return <PrelemBox key={key} item={item} />;
        })}
    </Box>
  );
};

export default PrelemList;
