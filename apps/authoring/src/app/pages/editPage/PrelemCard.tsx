import { makeStyles } from '@material-ui/core';
import { Box, Button } from '@mui/material/';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import React, {
  Suspense,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
// import Mapping from '../../utils/mapping.json';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { ThemeProvider } from '@mui/material/styles';
import { PrelemTheme } from '@platformx/utilities';
import Mapping from 'platform-x-prelems/prelems/mapping';
import { useTranslation } from 'react-i18next';
import { LightTheme } from '@platformx/utilities';
import { ThemeConstants } from '@platformx/utilities';
import EditTray from '../../components/EditTray';
import ButtonEditLink from '../../components/buttonEditLink';
import ButtonEditWindow from '../../components/buttonEditWindow';
import {
  paddingBottomPrelem,
  paddingTopPrelem,
  updateContentForCard,
} from '../../store/Actions';
import { Store } from '../../store/ContextStore';
import { convertToLowerCase, getSubDomain } from '../../utils/helperFunctions';
// Custom css classes to add centered "add icon" on each prelem card on top ad bottom
const useStyles = makeStyles(() => ({
  addiconTop: {
    position: 'absolute',
    top: '0px',
    left: '50%',
    zIndex: 2,
    transform: 'translate(-50%,-50%)',
  },
  addiconBottom: {
    position: 'absolute',
    bottom: '-36px',
    left: '50%',
    zIndex: 2,
    transform: 'translate(-50%,-50%)',
  },
}));
// Control to show or hide add section on top and bottom of each card
interface AddSectionDisplay {
  showAtTop: boolean;
  showAtBottom: boolean;
}
interface ShowIconsStateObjectType {
  showCreate: boolean;
  showVisible: boolean | undefined;
  showCopy: boolean;
  showUp: boolean;
  showDown: boolean;
  showReset: boolean | undefined;
  showDelete: boolean;
  showSettings: boolean;
}

interface ContentProps {
  id: string;
  valdation: {
    maxlength: string;
    required: string;
  };
}

interface Props {
  onOpenContentType?: any;
  eComContentGalleryHandle?: any;
  keyIndex: string;
  prelemInfo: string;
  showIconsState: ShowIconsStateObjectType;
  handleClick(
    prelemIndex?: string,
    operation?: string,
    prelemRef?: React.Ref<HTMLDivElement>,
    schemaArray?: ContentProps[]
  ): void;
  showAddSection: AddSectionDisplay;
  addSectionTouchPointClick(prelemPosition: string, position: string): void;
  prelemEditState: boolean;
  handlePrelemEditSubmit: (
    editStateValue: string,
    obj: object,
    schemaArray?: ContentProps[],
    prelemRef?: React.Ref<HTMLDivElement>,
    index?: string,
    buttonsKeysPopulatedObj?: object
  ) => void;
  documentPath: string;
  prelemDataReset: boolean;
  onToggleContentGallery(
    activeTab?: string,
    imageVideoContentGallery?: boolean,
    slotNumber?: number
  ): void;
  selectedContentForButton: string;
  contentGalleryStatus?: any;
}
const mappingDynamicInstance = {};
Object.keys(Mapping).map((item) => {
  mappingDynamicInstance[item] = React.lazy(
    // () => import('../../components/ServiceCard7/ServiceCard7')
    () => import(`platform-x-prelems/prelems/${Mapping[item]}`)
  );
  return mappingDynamicInstance;
});

const PrelemCard: React.FC<Props> = ({
  onOpenContentType,
  keyIndex,
  showIconsState,
  prelemInfo,
  handleClick,
  showAddSection,
  addSectionTouchPointClick,
  prelemEditState,
  handlePrelemEditSubmit,
  prelemDataReset,
  onToggleContentGallery,
  selectedContentForButton,
  contentGalleryStatus,
  eComContentGalleryHandle,
}) => {
  const { t, i18n } = useTranslation();
  let prelemContentProp = {};
  let prelemAnalyticsProp = {};
  let prelemAuthoringHelperProp = {};
  const prelemBaseEndpoint = {
    APIEndPoint: process.env.NX_API_URI,
    PublishEndPoint: `${getSubDomain()}/`,
    device: 'window',
    buttonBaseUrl: `${getSubDomain()}/`,
    deliveryEndPoint: process.env.NX_DELIVERY_URI,
    language: i18n.language,
    gatewayURL: process.env.NX_GRAPHQL_URI,
  };
  const windowTarget = '';
  const externalWindowLink = '';
  const pageWindowUrl = '';
  const buttonTarget: any = '';
  const buttonAction = '';
  const contentUrl = '';
  const refButtonEditableState = useRef({});
  const refButtonEditableCurrentTargetState = useRef({});
  const refCurrentEditableButtonId = useRef('');
  const refCurrentEditableButtonEditWindowValues = useRef({
    windowTarget,
    externalWindowLink,
    contentUrl,
    pageWindowUrl,
    buttonTarget,
    buttonAction,
  });

  const { state, dispatch } = useContext(Store);
  const { page } = state;
  const [showOptions, setShowOptions] = useState(false);
  /* used for storing the current editable button state,
    later on this will be passed to doneInsitu handler for creating complete prelem content object
    */
  const strData = useRef('');
  const classes = useStyles();
  const prelemRef = useRef<HTMLDivElement>(null);

  const secondaryArgs = {
    prelemBaseEndpoint,
    editState: prelemEditState,
    currentPageURL: page?.pageModel?.Page,
    multiSlot: { onToggleContentGallery, eComContentGalleryHandle },
    gcpUrl: process.env.NX_GCP_URL,
    bucketName: process.env.NX_BUCKET_NAME,
  };

  const [editLinkWindowPostion, setEditLinkWindowPostion] = useState({
    left: '',
    top: '',
    opacity: '0',
    zIndex: -1,
    buttonName: '',
  });
  const [editButtonWindowPostion, setEditButtonWindowPostion] = useState({
    left: '',
    top: '',
    opacity: '0',
    zIndex: -1,
  });
  const [currentBtnEditing, setCurrentBtnEditing] = useState('');
  // buttonEditWindow state
  const [windowValue, setWindowValue] = React.useState('current window');
  const [pageUrl, setPageUrl] = React.useState('');
  const [externalLink, setExternalLink] = React.useState('');
  const [buttonContentEditable, setButtonContentEditable] = useState(false);
  const [urlValue, setUrlValue] = React.useState('Internal');
  const [contentLink, setContentLink] = useState('');
  const [insituEditingContentKey, setInsituEditingContentKey] = React.useState(
    []
  );
  const [showMenu, setShowMenu] = useState(false);

  //New Changes
  const lastEditedButton = useRef('');
  const currentButtonObject = useRef('');

  const onOutsideClick = (event) => {
    const typeId = event.target.id;
    if (
      !buttonEditWindowRef?.current?.contains(event.target as Node) &&
      !dropDownMenuRef?.current?.contains(event.target as Node) &&
      !buttonEditLinkRef?.current?.contains(event.target as Node) &&
      typeId != refCurrentEditableButtonId.current &&
      event.target.parentElement.id !== refCurrentEditableButtonId.current
      // !(event.target instanceof HTMLSpanElement)
    ) {
      for (const key in refButtonEditableState.current) {
        const btnKeysObj = refButtonEditableState.current[key];
        if (btnKeysObj != undefined && btnKeysObj !== null) {
          const buttonUpdatedEditState = createButtonState(
            btnKeysObj,
            refButtonEditableCurrentTargetState.current[key]
          );

          refButtonEditableState.current[key] = buttonUpdatedEditState;
        }
        if (!contentGalleryStatus) {
          setEditButtonWindowPostion({
            left: '',
            top: '',
            opacity: '0',
            zIndex: -1,
          });
          setEditLinkWindowPostion({
            left: '',
            top: '',
            opacity: '0',
            zIndex: -1,
            buttonName: '',
          });
          setCurrentBtnEditing('');
          setButtonContentEditable(false);
        }
      }
    }
  };

  useEffect(() => {
    //Backend doesn't maintain states for different redirectUrls, Added reference to maintain local state.
    const buttonProps = Object.keys(
      page?.prelemMetaArray?.[keyIndex]?.content || {}
    )?.reduce((acc: any, item: any) => {
      if (item?.includes('Button')) {
        acc = {
          ...acc,
          [item]: page?.prelemMetaArray?.[keyIndex]?.content?.[item],
        };
      }
      if (item?.includes('RedirectURL')) {
        acc = {
          ...acc,
          [`${item}_Internal`]:
            page?.prelemMetaArray?.[keyIndex]?.content?.[
              item.replace('RedirectURL', 'Action')
            ] === 'Internal'
              ? page?.prelemMetaArray?.[keyIndex]?.content?.[item]
              : '',
        };
        acc = {
          ...acc,
          [`${item}_External`]:
            page?.prelemMetaArray?.[keyIndex]?.content?.[
              item.replace('RedirectURL', 'Action')
            ] === 'External'
              ? page?.prelemMetaArray?.[keyIndex]?.content?.[item]
              : '',
        };
        acc = {
          ...acc,
          [`${item}_Content`]:
            page?.prelemMetaArray?.[keyIndex]?.content?.[
              item.replace('RedirectURL', 'Action')
            ] === 'Content'
              ? page?.prelemMetaArray?.[keyIndex]?.content?.[item]
              : '',
        };
      }
      return acc;
    }, {});

    currentButtonObject.current = buttonProps;
  }, [prelemDataReset]);

  const constructButtonObjForSubmit = () => {
    const buttonsList = Object.keys(currentButtonObject.current).filter(
      (item) => item.includes('Name')
    );

    const buttonProps = buttonsList.reduce((acc, item) => {
      const selectedAction =
        currentButtonObject.current[`${item.replace('Name', 'Action')}`];

      let selectedUrl = '';
      if (selectedAction === 'Internal')
        selectedUrl =
          currentButtonObject.current[
            `${item.replace('Name', 'RedirectURL_Internal')}`
          ];
      else if (selectedAction === 'External')
        selectedUrl =
          currentButtonObject.current[
            `${item.replace('Name', 'RedirectURL_External')}`
          ];
      else if (['Content', 'Ecommerce'].some((ele) => ele === selectedAction))
        selectedUrl =
          currentButtonObject.current[
            `${item.replace('Name', 'RedirectURL_Content')}`
          ];
      const ContentData =
        currentButtonObject.current[`${item.replace('Name', 'Content')}`];
      acc = {
        ...acc,
        [item]: {
          [item]: currentButtonObject.current[item],
          //condition based empty end path **Content** **RedirectURL**
          [item.replace('Name', 'RedirectURL')]: ['Content', 'Ecommerce'].some(
            (ele) => ele === selectedAction
          )
            ? ''
            : selectedUrl,
          [item.replace('Name', 'Content')]: ContentData,
          [item.replace('Name', 'Action')]: selectedAction,
          [item.replace('Name', 'Type')]:
            currentButtonObject.current[`${item.replace('Name', 'Type')}`],
          [item.replace('Name', 'Value')]:
            currentButtonObject.current[`${item.replace('Name', 'Value')}`],
        },
      };
      return acc;
    }, {});
    return buttonProps;
  };

  const updateStateValuesForButton = (buttonId) => {
    const selectedWindowValue =
      currentButtonObject.current[`${buttonId.replace('Name', 'Type')}`];
    const selectedPageUrl =
      currentButtonObject.current[
        `${buttonId.replace('Name', 'RedirectURL_Internal')}`
      ];
    const selectedExternalLink =
      currentButtonObject.current[
        `${buttonId.replace('Name', 'RedirectURL_External')}`
      ];

    const selectedAction =
      currentButtonObject.current[`${buttonId.replace('Name', 'Action')}`];
    const contentTypeCheck = ['Content', 'Ecommerce'].some(
      (ele) => convertToLowerCase(ele) !== convertToLowerCase(selectedAction)
    );
    const selectedContentLink = !contentTypeCheck
      ? currentButtonObject.current[
          `${buttonId.replace('Name', 'RedirectURL_Content')}`
        ]
      : currentButtonObject.current[`${buttonId.replace('Name', 'Content')}`];

    setWindowValue(selectedWindowValue);
    setPageUrl(selectedPageUrl);
    setExternalLink(selectedExternalLink);
    setUrlValue(selectedAction);
    setContentLink(selectedContentLink);
  };

  const updateCurrentButtonObject = (value, buttonId, actionType) => {
    const propertyName = buttonId.replace('Name', actionType);
    currentButtonObject.current[`${propertyName}`] = value;

    if (buttonId) lastEditedButton.current = buttonId;
    if (actionType === 'RedirectURL_Content') {
      // currentButtonObject.current[`${buttonId.replace('Name', 'Type')}`] =
      //   'current window';
      currentButtonObject.current[`${buttonId.replace('Name', 'Content')}`] =
        value; //content data append
    }
    updateStateValuesForButton(buttonId);
  };

  useEffect(() => {
    if (selectedContentForButton)
      updateCurrentButtonObject(
        selectedContentForButton,
        lastEditedButton.current,
        'RedirectURL_Content'
      );
  }, [selectedContentForButton]);

  //End New Changes

  const handleSelectPageUrlChange = (event) => {
    const {
      target: { value },
    } = event;
    refCurrentEditableButtonEditWindowValues.current.pageWindowUrl = value;
    refButtonEditableCurrentTargetState.current[
      refCurrentEditableButtonEditWindowValues.current.buttonTarget.id
    ] = {
      target: refCurrentEditableButtonEditWindowValues.current.buttonTarget,
      currentEditWindow: {
        ...refCurrentEditableButtonEditWindowValues.current,
      },
    };

    setPageUrl(value);
    updateCurrentButtonObject(
      value,
      refCurrentEditableButtonEditWindowValues.current.buttonTarget.id,
      'RedirectURL_Internal'
    );
  };

  const handleWindowOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWindowValue((event.target as HTMLInputElement).value);
    refCurrentEditableButtonEditWindowValues.current.windowTarget = (
      event.target as HTMLInputElement
    ).value;
    refButtonEditableCurrentTargetState.current[
      refCurrentEditableButtonEditWindowValues.current.buttonTarget.id
    ] = {
      target: refCurrentEditableButtonEditWindowValues.current.buttonTarget,
      currentEditWindow: {
        ...refCurrentEditableButtonEditWindowValues.current,
      },
    };
    updateCurrentButtonObject(
      event.target.value,
      refCurrentEditableButtonEditWindowValues.current.buttonTarget.id,
      'Type'
    );
  };

  const handleUrlInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    refCurrentEditableButtonEditWindowValues.current.externalWindowLink =
      event.target.value;
    refCurrentEditableButtonEditWindowValues.current.buttonAction = 'External';
    setExternalLink(event.target.value);
    refButtonEditableCurrentTargetState.current[
      refCurrentEditableButtonEditWindowValues.current.buttonTarget.id
    ] = {
      target: refCurrentEditableButtonEditWindowValues.current.buttonTarget,
      currentEditWindow: {
        ...refCurrentEditableButtonEditWindowValues.current,
      },
    };
    updateCurrentButtonObject(
      event.target.value,
      refCurrentEditableButtonEditWindowValues.current.buttonTarget.id,
      'RedirectURL_External'
    );
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    refCurrentEditableButtonEditWindowValues.current.buttonAction = (
      event.target as HTMLInputElement
    ).value;
    setUrlValue((event.target as HTMLInputElement).value);
    if (
      refCurrentEditableButtonEditWindowValues.current.buttonAction ===
      'Internal'
    ) {
      setExternalLink(
        refCurrentEditableButtonEditWindowValues.current.pageWindowUrl
      );
    } else if (
      refCurrentEditableButtonEditWindowValues.current.buttonAction ===
      'Content'
    ) {
      setExternalLink(
        refCurrentEditableButtonEditWindowValues.current.contentUrl
      );
    } else if (
      refCurrentEditableButtonEditWindowValues.current.buttonAction ===
      'Ecommerce'
    ) {
      setExternalLink(
        refCurrentEditableButtonEditWindowValues.current.contentUrl
      );
    } else {
      setExternalLink(
        refCurrentEditableButtonEditWindowValues.current.externalWindowLink
      );
    }
    refButtonEditableCurrentTargetState.current[
      refCurrentEditableButtonEditWindowValues.current.buttonTarget.id
    ] = {
      target: refCurrentEditableButtonEditWindowValues.current.buttonTarget,
      currentEditWindow: {
        ...refCurrentEditableButtonEditWindowValues.current,
      },
    };
    updateCurrentButtonObject(
      event?.target?.value,
      refCurrentEditableButtonEditWindowValues.current.buttonTarget.id,
      'Action'
    );
  };

  const buttonEditLinkRef = useRef<HTMLDivElement | null>(null);
  const buttonEditWindowRef = useRef<HTMLDivElement>(null);
  const ReachUsbuttonRef = useRef<HTMLButtonElement>(null);
  const dropDownMenuRef = useRef<HTMLDivElement>(null);

  const handleEditLinkButtonRef = (buttonRef, e) => {
    //New Changes
    const buttonId = e.currentTarget.id;
    lastEditedButton.current = buttonId;
    updateStateValuesForButton(buttonId);
    //End New Changes

    // getting default button Keys with default data from inside Prelem and setting inside local state
    // setting current editable button ID

    // if (
    //   refButtonEditableCurrentTargetState?.current[e.currentTarget.id]
    //     ?.currentEditWindow != undefined
    // ) {
    //   refCurrentEditableButtonEditWindowValues.current = {
    //     ...refButtonEditableCurrentTargetState?.current[e.currentTarget.id]
    //       ?.currentEditWindow,
    //   };
    // } else {
    //   refCurrentEditableButtonEditWindowValues.current.buttonTarget =
    //     e.currentTarget;
    // }

    refCurrentEditableButtonId.current = e.currentTarget.id;
    refButtonEditableState.current[e.currentTarget.id] = buttonRef;
    // debugger;
    // if (
    //   refButtonEditableCurrentTargetState.current[e.currentTarget.id]?.target
    //     .id === e.currentTarget.id
    // ) {
    //   refButtonEditableCurrentTargetState.current[e.currentTarget.id] = {
    //     target: e.currentTarget,
    //     currentEditWindow: {
    //       ...refCurrentEditableButtonEditWindowValues.current,
    //     },
    //   };
    // } else {
    if (
      !(
        refButtonEditableCurrentTargetState.current?.[e.currentTarget.id] &&
        refButtonEditableCurrentTargetState.current[e.currentTarget.id]?.target
          .id === e.currentTarget.id
      )
    ) {
      refButtonEditableCurrentTargetState.current[e.currentTarget.id] = {
        target: e.currentTarget,
        currentEditWindow: {
          windowTarget: '',
          externalWindowLink: '',
          pageWindowUrl: '',
          buttonTarget: '',
          buttonInternal: '',
        },
      };
    }
    // }

    refCurrentEditableButtonEditWindowValues.current.windowTarget = '';
    refCurrentEditableButtonEditWindowValues.current.externalWindowLink = '';
    refCurrentEditableButtonEditWindowValues.current.pageWindowUrl = '';
    // refCurrentEditableButtonEditWindowValues.current.buttonInternal = '';
    refCurrentEditableButtonEditWindowValues.current.buttonTarget =
      e.currentTarget;

    const clientX = e.clientX;
    const clientY = e.clientY;
    const viewPortHeight: any =
      typeof window !== undefined ? window.innerHeight : '';
    const topVal: any =
      viewPortHeight - clientY > 200 ? clientY + 40 : clientY + -60;
    setEditLinkWindowPostion({
      left: clientX + 70,
      top: topVal,
      opacity: '1',
      zIndex: 1,
      buttonName: buttonRef,
    });
  };

  const handleEditButtonWindowRef = (clientX, clientY) => {
    const viewPortHeight: any =
      typeof window !== undefined ? window.innerHeight : '';
    const topVal: any =
      viewPortHeight - clientY > 180 ? clientY + 20 : clientY + -280;
    setEditButtonWindowPostion({
      left: clientX + -200,
      top: clientY > 360 && clientY < 400 ? clientY + -280 : topVal,
      opacity: '1',
      zIndex: 2,
    });
  };
  const createButtonState = (buttonRef, buttonStateTarget) => {
    // when second time its coming with actual keys, we dont need to create this again hence sending same object back
    if (buttonRef.Button_Name == undefined) return buttonRef;
    const buttonState = {};
    const prelemState = page?.prelemMetaArray?.[keyIndex]?.content || {};
    //Assignation
    buttonState[buttonRef.Button_Name] = prelemState?.[buttonRef.Button_Name];
    if (
      refButtonEditableCurrentTargetState.current[
        refCurrentEditableButtonEditWindowValues.current.buttonTarget.id
      ]?.currentEditWindow?.buttonAction === 'Internal' ||
      prelemState?.[buttonRef.Button_Action] === 'Internal'
    ) {
      buttonState[buttonRef.Button_RedirectURL] =
        refButtonEditableCurrentTargetState.current[
          refCurrentEditableButtonEditWindowValues.current.buttonTarget.id
        ]?.currentEditWindow?.pageWindowUrl ||
        prelemState?.[buttonRef.Button_RedirectURL];
    } else if (
      refButtonEditableCurrentTargetState.current[
        refCurrentEditableButtonEditWindowValues.current.buttonTarget.id
      ]?.currentEditWindow?.buttonAction === 'Content' ||
      prelemState?.[buttonRef.Button_Action] === 'Content'
    ) {
      buttonState[buttonRef.Button_RedirectURL] =
        refButtonEditableCurrentTargetState.current[
          refCurrentEditableButtonEditWindowValues.current.buttonTarget.id
        ]?.currentEditWindow?.contentUrl ||
        prelemState?.[buttonRef.Button_RedirectURL];
    } else if (
      refButtonEditableCurrentTargetState.current[
        refCurrentEditableButtonEditWindowValues.current.buttonTarget.id
      ]?.currentEditWindow?.buttonAction === 'Ecommerce' ||
      prelemState?.[buttonRef.Button_Action] === 'Ecommerce'
    ) {
      buttonState[buttonRef.Button_RedirectURL] =
        refButtonEditableCurrentTargetState.current[
          refCurrentEditableButtonEditWindowValues.current.buttonTarget.id
        ]?.currentEditWindow?.contentUrl ||
        prelemState?.[buttonRef.Button_RedirectURL];
    } else {
      buttonState[buttonRef.Button_RedirectURL] =
        refButtonEditableCurrentTargetState.current[
          refCurrentEditableButtonEditWindowValues.current.buttonTarget.id
        ]?.currentEditWindow?.externalWindowLink ||
        prelemState?.[buttonRef.Button_RedirectURL];
    }
    buttonState[buttonRef.Button_Action] =
      refButtonEditableCurrentTargetState.current[
        refCurrentEditableButtonEditWindowValues.current.buttonTarget.id
      ]?.currentEditWindow?.buttonAction ||
      prelemState?.[buttonRef.Button_Action];
    buttonState[buttonRef.Button_Type] = refButtonEditableCurrentTargetState
      .current[refCurrentEditableButtonEditWindowValues.current.buttonTarget.id]
      ?.currentEditWindow?.windowTarget
      ? buttonStateTarget.currentEditWindow.windowTarget
      : prelemState?.[buttonRef.Button_Type] !== ''
      ? prelemState?.[buttonRef.Button_Type]
      : 'current window';
    buttonState[buttonRef.Button_Value] = buttonStateTarget.target.innerText;
    updateCurrentButtonObject(
      buttonStateTarget.target.innerText,
      lastEditedButton.current,
      'Value'
    );
    // debugger;
    return buttonState;
  };

  useEffect(() => {
    if (prelemDataReset) {
      refButtonEditableState.current = {};
      refCurrentEditableButtonId.current = '';
      refCurrentEditableButtonEditWindowValues.current.windowTarget = '';
      refCurrentEditableButtonEditWindowValues.current.externalWindowLink = '';
      refCurrentEditableButtonEditWindowValues.current.contentUrl = '';
      refCurrentEditableButtonEditWindowValues.current.pageWindowUrl = '';
      refCurrentEditableButtonEditWindowValues.current.buttonTarget = '';
      refCurrentEditableButtonEditWindowValues.current.buttonAction = '';
    }
  }, [prelemDataReset]);

  const handleButtonEditText = (event, buttonName) => {
    setCurrentBtnEditing(buttonName.Button_Name);
    setButtonContentEditable(true);
  };
  const PrelemComponent = mappingDynamicInstance[prelemInfo];
  const getStructuredData = (strDataOld, index, isPrelemDataReset) => {
    strData.current = strDataOld;
    dispatch(
      updateContentForCard(index, 'StructuredData', strDataOld, undefined)
    );
  };

  const showItems = (value: boolean) => {
    setShowOptions(value);
  };
  //Add Section generate component
  const addSectionTouchPoint = (prelemPosition: string, position: string) => {
    return (
      <Button
        variant="contained"
        sx={{
          color: '#FFFFFF',
          backgroundColor: '#6d6dff',
          '&:hover': {
            backgroundColor: '#6d6dff',
          },
          borderRadius: '34px',
          minWidth: '120px',
          padding: '10px 20px',
        }}
        onClick={() => addSectionTouchPointClick(prelemPosition, position)}
      >
        {t('add_prelem')}
      </Button>
    );
  };

  const handleClickCard = (iconIndex, operation = '') => {
    if (operation == 'edit') {
      const validationKeysArray =
        page?.prelemsValidationObject[
          page?.prelemMetaArray?.[keyIndex].DocumentType
        ];
      const prelemKeys = validationKeysArray.map((element) => {
        let ele = {};
        if (element && element?.validation && element.validation.length) {
          for (let i = 0; i < element.validation.length; i++) {
            const str = element.validation[i];
            ele = { ...ele, ...str };
          }
        }

        return {
          id: element.name,
          validations: ele,
        };
      });
      setInsituEditingContentKey(prelemKeys);
      return handleClick(iconIndex, operation, prelemRef, prelemKeys);
    }
    if (operation == 'expand') {
      setShowMenu(!showMenu);
    } else {
      return handleClick(iconIndex, operation);
    }
  };

  const handleChangeTop = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(paddingTopPrelem(keyIndex, event.target.checked));
  };

  const handleChangeBottom = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(paddingBottomPrelem(keyIndex, event.target.checked));
  };

  prelemContentProp = { ...page?.prelemMetaArray?.[keyIndex]?.content };

  prelemAnalyticsProp = {
    pageId: page?.pageSettings?.PageName,
    pageTitle: page?.pageModel?.Title,
    pageDesc: page?.pageSettings?.PageName,
    pageTags: page?.pageSettings?.PageTags,
    prelemID: page?.prelemMetaArray?.[keyIndex].PrelemId,
    prelemTitle: page?.prelemMetaArray?.[keyIndex].PrelemName,
    prelemPosition: keyIndex,
    isAuthoring: true,
    isSeoEnabled: page?.prelemMetaArray?.[keyIndex].SeoEnabled,
    isAnalyticsEnabled: page?.prelemMetaArray?.[keyIndex].AnalyticsEnabled,
  };

  prelemAuthoringHelperProp = {
    innerRef: prelemRef,
    sendStructureDataToAuthoringCB: (strDataNew = prelemInfo) => {
      getStructuredData(strDataNew, keyIndex, false);
    },
    openButtonEditWindowInAuthoringCB: (button, e) => {
      handleEditLinkButtonRef(button, e);
    },

    sendDefaultStructureDataForResetToAuthoringCB: (
      strDataNew = prelemInfo
    ) => {
      dispatch(
        updateContentForCard(
          keyIndex,
          'DefaultStructureDataForReset',
          strDataNew,
          undefined
        )
      );
    },

    selectedButtonNameForEditing: currentBtnEditing,
    isEditing: prelemEditState,
    buttonRef: ReachUsbuttonRef,
    buttonContentEditable: buttonContentEditable,
    lastSavedStructuredData: page?.prelemMetaArray?.[keyIndex].StructuredData,
    isModalShow: false,
    authoringHoverShow: true,
    isEditPage: true,
  };

  const handleClickAway = () => !prelemEditState && showItems(false);
  const theme = {
    LightTheme,
  };
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box
        component="div"
        sx={{
          // backgroundColor: '#f1f1f1',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            width: '100%',
            margin: 'auto',
          }}
          data-testid={`card${keyIndex}`}
          onMouseOver={() => !prelemEditState && showItems(true)}
          onMouseLeave={() => !prelemEditState && showItems(false)}
        >
          <Suspense fallback={<div>Loading</div>}>
            <ThemeProvider theme={PrelemTheme}>
              <CssBaseline />
              <Box
                sx={{
                  opacity: `${showIconsState.showVisible ? '0.5' : ''}`,
                }}
              >
                <PrelemComponent
                  content={prelemContentProp}
                  analytics={prelemAnalyticsProp}
                  authoringHelper={prelemAuthoringHelperProp}
                  secondaryArgs={secondaryArgs}
                />
              </Box>
              <ButtonEditWindow
                {...editButtonWindowPostion}
                buttonRef={buttonEditWindowRef}
                handleWindowOptionChange={handleWindowOptionChange}
                handleSelectPageUrlChange={handleSelectPageUrlChange}
                handleUrlInputChange={handleUrlInputChange}
                handleUrlChange={handleUrlChange}
                windowValue={windowValue}
                pageUrl={pageUrl}
                externalLink={externalLink}
                dropDownMenuRef={dropDownMenuRef}
                urlValue={urlValue}
                eComContentGalleryHandle={eComContentGalleryHandle}
                onOpenContentType={onOpenContentType}
                onToggleContentGallery={onToggleContentGallery}
                contentUrl={contentLink}
                onOutsideClick={onOutsideClick}
              />
              <ButtonEditLink
                handleEditButtonText={(event, buttonName) => {
                  handleButtonEditText(event, buttonName);
                }}
                {...editLinkWindowPostion}
                handleEditButtonWindowRef={(clientX, clientY) => {
                  handleEditButtonWindowRef(clientX, clientY);
                }}
                buttonRef={buttonEditLinkRef}
              />
            </ThemeProvider>
          </Suspense>
          {prelemEditState && (
            <Button
              sx={{
                position: 'absolute',
                top: '30px',
                right: { xs: '3%', md: '3%', lg: '8%' },
                backgroundColor: ThemeConstants.WHITE_COLOR,
                color: '#1f2021',
                minWidth: '110px',
                zIndex: '1',
                fontSize: ThemeConstants.FONTSIZE_DEFAULT,
                '&:hover': {
                  color: '#1f2021',
                  backgroundColor: ThemeConstants.WHITE_COLOR,
                },
              }}
              variant="contained"
              onClick={() =>
                handlePrelemEditSubmit(
                  'reach-us',
                  {
                    page: pageUrl,
                    externalLink: externalLink,
                    windowValue: windowValue,
                  },
                  insituEditingContentKey,
                  prelemRef,
                  keyIndex,
                  constructButtonObjForSubmit()
                )
              }
            >
              <CheckRoundedIcon sx={{ marginRight: '5px' }} /> {t('done')}
            </Button>
          )}
          {!prelemEditState && showOptions ? (
            <>
              <Box
                component="div"
                sx={{
                  position: 'absolute',
                  height: '100%',
                  top: 0,
                  zIndex: 1,
                  width: '100%',
                  border: '2px dashed #6d6dff',
                  backgroundColor: `${
                    showIconsState.showVisible
                      ? 'rgba(204,204,204,0.3)'
                      : 'rgba(25,132,188,0.3)'
                  }`,
                }}
              ></Box>
              <EditTray
                key={keyIndex}
                listIndx={keyIndex}
                showIconsState={showIconsState}
                showMenu={showMenu}
                handleClick={handleClickCard}
              />
              {showMenu && (
                <Box
                  sx={{
                    backgroundColor: 'white',
                    // zIndex: 'modal',
                    position: 'absolute',
                    top: { xs: '8%', sm: '10%', md: '16%', lg: '20%' },
                    right: { xs: '16%', sm: '11%', md: '7%', lg: '22%' },
                    width: '131px',
                    borderRadius: 2,
                    zIndex: { xs: 1, sm: 1, md: 0, lg: 0 },
                  }}
                >
                  <FormGroup sx={{ margin: '11px 23px' }}>
                    <FormControlLabel
                      control={<Checkbox onChange={handleChangeTop} />}
                      label="Top"
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={handleChangeBottom} />}
                      label="Bottom"
                    />
                  </FormGroup>
                </Box>
              )}
              {showAddSection.showAtTop ? (
                <Box component="div" className={classes.addiconTop}>
                  {addSectionTouchPoint(keyIndex, 'top')}
                </Box>
              ) : null}
              {showAddSection.showAtBottom ? (
                <Box component="div" className={classes.addiconBottom}>
                  {addSectionTouchPoint(keyIndex, 'bottom')}
                </Box>
              ) : null}
            </>
          ) : null}
        </Box>
      </Box>
    </ClickAwayListener>
  );
};
export default PrelemCard;
