import { Box, Button, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import PrelemTheme from 'libs/utilities/src/lib/themes/prelems/prelemTheme';
import Mapping from 'platform-x-prelems/prelems/mapping';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CommentListPanel from '../../../../components/ContentRewiew/CommentListPanel';
import CommentWrapper from '../../../../components/ContentRewiew/CommentWrapper';
import ButtonEditLink from '../../../../components/buttonEditLink';
import ButtonEditWindow from '../../../../components/buttonEditWindow';
import { useComment } from '../../../../hooks/useComment/useComment';
import { updateContentForCard } from '../../../../store/Actions';
import { Store } from '../../../../store/ContextStore';
import { authInfo } from '../../../../utils/authConstants';
import {
  convertToLowerCase,
  getSelectedSite,
  getSubDomain,
} from '../../../../utils/helperFunctions';
import { PrelemActions } from '../../utils/constant';
import { iconsSet } from '../../utils/icons';
import { useStyles } from './AddPrelem.styles';
import PrelemButtons from './PrelemButtons';

//mapping dynamic instance
const mappingDynamicInstance = {};
Object.keys(Mapping).map((item) => {
  mappingDynamicInstance[item] = React.lazy(
    () => import(`platform-x-prelems/prelems/${Mapping[item]}`)
  );
  return mappingDynamicInstance;
});

const Prelem = ({
  setPageId,
  prelemData,
  index,
  handleOperationClick,
  onToggleContentGallery,
  contentGalleryStatus,
  handlePrelemEditSubmit,
  prelemEditState,
  selectedContentForButton,
  prelemDataReset,
  showAddSection,
  addSectionTouchPointClick,
  showIconsState,
  eComContentGalleryHandle,
  onOpenContentType,
  count,
}: any) => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const [isHover, setIsHover] = useState(false);
  //Prelem related fields
  const { state, dispatch } = useContext(Store);
  const { page } = state;
  const { PrelemId } = prelemData;
  const PrelemComponent = mappingDynamicInstance[PrelemId];

  const prelemRef = useRef<HTMLDivElement>(null);
  const lastEditedButton = useRef('');
  const currentButtonObject = useRef('');
  //Prelem props
  let prelemContentProp = {};
  let prelemAnalyticsProp = {};
  let prelemAuthoringHelperProp = {};
  // buttonEditWindow state
  const [windowValue, setWindowValue] = React.useState('current window');
  const [pageUrl, setPageUrl] = React.useState('');
  const [externalLink, setExternalLink] = React.useState('');
  const [buttonContentEditable, setButtonContentEditable] = useState(false);
  const [urlValue, setUrlValue] = React.useState('Internal');
  const [jsValue, setJsValue] = React.useState('');
  const [contentLink, setContentLink] = useState('');
  const [insituEditingContentKey, setInsituEditingContentKey] = React.useState(
    []
  );
  const refCurrentEditableButtonId = useRef('');
  const refButtonEditableCurrentTargetState = useRef({});
  const refButtonEditableState = useRef({});
  const windowTarget = '';
  const externalWindowLink = '';
  const pageWindowUrl = '';
  const buttonTarget: any = '';
  const buttonAction = '';
  const contentUrl = '';
  const refCurrentEditableButtonEditWindowValues = useRef({
    windowTarget,
    externalWindowLink,
    contentUrl,
    pageWindowUrl,
    buttonTarget,
    buttonAction,
    jsValue: '',
  });
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
  const buttonEditLinkRef = useRef<HTMLDivElement | null>(null);
  const ReachUsbuttonRef = useRef<HTMLButtonElement>(null);
  const buttonEditWindowRef = useRef<HTMLDivElement>(null);
  const dropDownMenuRef = useRef<HTMLDivElement>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [spaceKey, setSpaceKey] = useState(false);
  //get Structured data
  const getStructuredData = (strDataOld, index, isPrelemDataReset) => {
    dispatch(
      updateContentForCard(index, 'StructuredData', strDataOld, undefined)
    );
  };

  function logKey(e) {
    e.code === 'Space' || e.code === 'Enter'
      ? setSpaceKey(true)
      : setSpaceKey(false);
  }

  useEffect(() => {
    window.addEventListener('keypress', logKey);

    return () => {
      window.removeEventListener('keypress', logKey);
    };
  }, []);

  useEffect(() => {
    //Backend doesn't maintain states for different redirectUrls, Added reference to maintain local state.
    const buttonProps = Object.keys(
      page?.prelemMetaArray?.[index].content
    )?.reduce((acc: any, item: any) => {
      if (item?.includes('Button')) {
        acc = {
          ...acc,
          [item]: page?.prelemMetaArray?.[index].content?.[item],
        };
      }
      if (item?.includes('RedirectURL')) {
        acc = {
          ...acc,
          [`${item}_Internal`]:
            page?.prelemMetaArray?.[index].content?.[
              item.replace('RedirectURL', 'Action')
            ] === 'Internal'
              ? page?.prelemMetaArray?.[index].content?.[item]
              : '',
        };
        acc = {
          ...acc,
          [`${item}_External`]:
            page?.prelemMetaArray?.[index].content?.[
              item.replace('RedirectURL', 'Action')
            ] === 'External'
              ? page?.prelemMetaArray?.[index].content?.[item]
              : '',
        };
        acc = {
          ...acc,
          [`${item}_Content`]:
            page?.prelemMetaArray?.[index].content?.[
              item.replace('RedirectURL', 'Action')
            ] === 'Content'
              ? page?.prelemMetaArray?.[index].content?.[item]
              : '',
        };
      }
      return acc;
    }, {});

    currentButtonObject.current = buttonProps;
    console.log('buttonProps', buttonProps);
  }, [prelemDataReset]);

  //Update state values for button
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
    const selectedContentLink =
      convertToLowerCase(selectedAction) !== convertToLowerCase('Content')
        ? currentButtonObject.current[
            `${buttonId.replace('Name', 'RedirectURL_Content')}`
          ]
        : currentButtonObject.current[`${buttonId.replace('Name', 'Content')}`];
    const jsValue =
      selectedAction === 'Js'
        ? currentButtonObject.current[
            `${buttonId.replace('Name', 'RedirectURL')}`
          ]
        : '';
    setWindowValue(selectedWindowValue);
    setPageUrl(selectedPageUrl);
    setExternalLink(selectedExternalLink);
    setUrlValue(selectedAction);
    setContentLink(selectedContentLink);
    setJsValue(jsValue);
  };

  // handle edit link button
  const handleEditLinkButtonRef = (buttonRef, e) => {
    const buttonId = e.currentTarget.id;
    lastEditedButton.current = buttonId;
    updateStateValuesForButton(buttonId);
    refCurrentEditableButtonId.current = e.currentTarget.id;
    refButtonEditableState.current[e.currentTarget.id] = buttonRef;
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
    refCurrentEditableButtonEditWindowValues.current.windowTarget = '';
    refCurrentEditableButtonEditWindowValues.current.externalWindowLink = '';
    refCurrentEditableButtonEditWindowValues.current.pageWindowUrl = '';
    refCurrentEditableButtonEditWindowValues.current.buttonTarget =
      e.currentTarget;
    const clientX = e.clientX;
    const clientY = e.clientY;
    const viewPortHeight: any =
      typeof window !== undefined ? window.innerHeight : '';
    const topVal: any =
      viewPortHeight - clientY > 200 ? clientY + 40 : clientY + -60;
    if (!spaceKey) {
      setEditLinkWindowPostion({
        left: clientX + 70,
        top: topVal,
        opacity: '1',
        zIndex: 1,
        buttonName: buttonRef,
      });
    }
  };

  useEffect(() => {
    if (selectedContentForButton)
      updateCurrentButtonObject(
        selectedContentForButton,
        lastEditedButton.current,
        'RedirectURL_Content'
      );
  }, [selectedContentForButton]);

  // Assigning prelem prop data
  const prelemBaseEndpoint = {
    APIEndPoint: process.env.NX_API_URI,
    PublishEndPoint: `${getSubDomain()}/`,
    device: 'window',
    buttonBaseUrl: `${getSubDomain()}/`,
    deliveryEndPoint: process.env.NX_DELIVERY_URI,
    usersEndPoint: process.env.NX_USERS_URI,
    language: i18n.language,
  };
  const secondaryArgs = {
    prelemBaseEndpoint,
    editState: prelemEditState,
    currentPageURL: page?.pageModel?.Page,
    multiSlot: { onToggleContentGallery, eComContentGalleryHandle },
    // gcpUrl: process.env.NX_GCP_URL,
    // bucketName: process.env.NX_BUCKET_NAME
    bucketName: authInfo.gcpBucketName,
    gcpUrl: authInfo.gcpUri,
    sitename: getSelectedSite(),
  };
  prelemContentProp = { ...page?.prelemMetaArray?.[index].content };
  prelemAnalyticsProp = {
    pageId: page?.pageSettings?.PageName,
    pageTitle: page?.pageModel?.Title,
    pageDesc: page?.pageSettings?.PageName,
    pageTags: page?.pageSettings?.PageTags,
    prelemID: page?.prelemMetaArray?.[index].PrelemId,
    prelemTitle: page?.prelemMetaArray?.[index].PrelemName,
    prelemPosition: index,
    isAuthoring: true,
    isSeoEnabled: page?.prelemMetaArray?.[index].SeoEnabled,
    isAnalyticsEnabled: page?.prelemMetaArray?.[index].AnalyticsEnabled,
  };
  prelemAuthoringHelperProp = {
    innerRef: prelemRef,
    sendStructureDataToAuthoringCB: (strDataNew = PrelemId) => {
      getStructuredData(strDataNew, index, false);
    },
    openButtonEditWindowInAuthoringCB: (button, e) => {
      handleEditLinkButtonRef(button, e);
    },
    sendDefaultStructureDataForResetToAuthoringCB: (strDataNew = PrelemId) => {
      dispatch(
        updateContentForCard(
          index,
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
    lastSavedStructuredData: page?.prelemMetaArray?.[index].StructuredData,
    isModalShow: false,
    authoringHoverShow: true,
    isEditPage: true,
  };

  const handleEdit = (action) => {
    const validationKeysArray =
      page?.prelemsValidationObject[
        page?.prelemMetaArray?.[index].DocumentType
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
    return handleOperationClick(index, action, prelemRef, prelemKeys);
  };

  //handle Prelem Icon click
  const handlePageId = (action) => {
    switch (action) {
      case PrelemActions.PRELEM_INFO:
        setPageId(action);
        handleOperationClick(index, action, prelemRef);
        break;
      case PrelemActions.EDIT:
        handleEdit(action);
        break;
      case PrelemActions.COPY:
        handleOperationClick(index, action, prelemRef);
        break;
      case PrelemActions.PRELEM_SETTING:
        setPageId(action);
        handleOperationClick(index, action, prelemRef);
        break;
      case PrelemActions.SHOW:
      case PrelemActions.HIDE:
        handleOperationClick(index, action, prelemRef);
        break;
      case PrelemActions.UP:
      case PrelemActions.DOWN:
        handleOperationClick(index, action, prelemRef);
        break;
      case PrelemActions.RESET:
        handleOperationClick(index, action, prelemRef);
        break;
      case PrelemActions.DELETE:
        handleOperationClick(index, action, prelemRef);
        break;
      default:
        break;
    }
  };

  const updateCurrentButtonObject = (value, buttonId, actionType) => {
    const propertyName = buttonId.replace('Name', actionType);
    currentButtonObject.current[`${propertyName}`] = value;

    if (buttonId) lastEditedButton.current = buttonId;
    if (actionType === 'RedirectURL_Content') {
      currentButtonObject.current[`${buttonId.replace('Name', 'Content')}`] =
        value; //content data append
    }
    updateStateValuesForButton(buttonId);
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

    updateCurrentButtonObject(
      value,
      refCurrentEditableButtonEditWindowValues.current.buttonTarget.id,
      'RedirectURL_Internal'
    );
  };
  const handleSelectJsValue = (event) => {
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

    updateCurrentButtonObject(
      value,
      refCurrentEditableButtonEditWindowValues.current.buttonTarget.id,
      'RedirectURL'
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
    }
    // else if (
    //   refCurrentEditableButtonEditWindowValues.current.pageWindowUrl === 'Js'
    // ) {
    //   setExternalLink(
    //     refCurrentEditableButtonEditWindowValues.current.contentUrl
    //   );
    // }
    else {
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

  const createButtonState = (buttonRef, buttonStateTarget) => {
    // when second time its coming with actual keys, we dont need to create this again hence sending same object back
    if (buttonRef.Button_Name == undefined) return buttonRef;
    const buttonState = {};
    const prelemState = page?.prelemMetaArray?.[index].content;
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
    return buttonState;
  };

  const onOutsideClick = (event) => {
    const typeId = event.target.id;
    if (
      !buttonEditWindowRef?.current?.contains(event.target as Node) &&
      !dropDownMenuRef?.current?.contains(event.target as Node) &&
      !buttonEditLinkRef?.current?.contains(event.target as Node) &&
      typeId != refCurrentEditableButtonId.current &&
      event.target.parentElement.id !== refCurrentEditableButtonId.current
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

  const handleButtonEditText = (event, buttonName) => {
    setCurrentBtnEditing(buttonName.Button_Name);
    setButtonContentEditable(true);
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
      else if (selectedAction === 'Js')
        selectedUrl =
          currentButtonObject.current[`${item.replace('Name', 'RedirectURL')}`];
      else if (selectedAction === 'Content')
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
          [item.replace('Name', 'RedirectURL')]: selectedUrl,
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

  const addSectionTouchPoint = (prelemPosition: string, position: string) => {
    return (
      <Button
        variant="quaternaryButton"
        onClick={() => addSectionTouchPointClick(prelemPosition, position)}
      >
        {t('add_prelem')}
      </Button>
    );
  };

  const showOnHover = {
    display: !prelemEditState && isHover ? 'flex' : 'none',
  };

  const handleMouseEnter = () => {
    if (!prelemEditState) {
      setIsHover(true);
    }
  };

  const handleMouseLeave = () => {
    if (!prelemEditState) {
      setIsHover(false);
    }
  };
  const { comments, scrollToRef } = useComment();
  return (
    <Box
      id={`prelem${index}`}
      sx={{
        position: 'relative',
      }}
    >
      <Box
        className={classes.editPageComonBox}
        onMouseOver={handleMouseEnter}
        onMouseOut={handleMouseLeave}
      >
        <CssBaseline />
        <Box
          className={classes.prelemButtonsWp}
          sx={{
            display: !prelemEditState && isHover ? 'flex' : 'none',
          }}
        >
          <ul>
            {iconsSet
              .filter(
                (item) =>
                  item.id != (showIconsState.showVisible ? 'show' : 'hide')
              )
              .map((value, key) => {
                return (
                  <PrelemButtons
                    key={key}
                    Id={value.id}
                    tooltipId={value.tooltipId}
                    Icon={value.Icon}
                    DisabledIcon={value.disabledIcon}
                    index={index}
                    handleClick={handlePageId}
                    showIconsState={showIconsState}
                  />
                );
              })}
          </ul>
        </Box>
        <CommentWrapper
          elementId={PrelemId} //{(count + 1).toString()}
          scrollRef={scrollToRef}
          comments={comments}
        >
          <Box
            sx={{
              position: 'relative',
              // padding: prelemEditState ? '70px 0px' : '',
              opacity: `${showIconsState.showVisible ? '0.5' : ''}`,
              pointerEvents: `${
                showIconsState.showVisible || (!prelemEditState && isHover)
                  ? 'none'
                  : ''
              }`,
            }}
          >
            <ThemeProvider theme={PrelemTheme}>
              <PrelemComponent
                content={prelemContentProp}
                analytics={prelemAnalyticsProp}
                authoringHelper={prelemAuthoringHelperProp}
                secondaryArgs={secondaryArgs}
              />
            </ThemeProvider>
            <ButtonEditWindow
              {...editButtonWindowPostion}
              prelemData={prelemData}
              buttonRef={buttonEditWindowRef}
              onOpenContentType={onOpenContentType}
              handleWindowOptionChange={handleWindowOptionChange}
              handleSelectPageUrlChange={handleSelectPageUrlChange}
              handleUrlInputChange={handleUrlInputChange}
              handleUrlChange={handleUrlChange}
              windowValue={windowValue}
              pageUrl={pageUrl}
              externalLink={externalLink}
              dropDownMenuRef={dropDownMenuRef}
              urlValue={urlValue}
              onToggleContentGallery={onToggleContentGallery}
              contentUrl={contentLink}
              onOutsideClick={onOutsideClick}
              eComContentGalleryHandle={eComContentGalleryHandle}
              jsValue={jsValue}
              handleJsValueChange={handleSelectJsValue}
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
            {prelemEditState && (
              <Button
                sx={{
                  position: 'absolute',
                  top: '-1px',
                  right: '-1px',
                  zIndex: 2,
                }}
                variant="primaryButton"
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
                    index,
                    constructButtonObjForSubmit()
                  )
                }
              >
                {t('done')}
              </Button>
            )}
          </Box>
        </CommentWrapper>
        {showAddSection.showAtTop ? (
          <Box
            component="div"
            className={classes.topaddCtaWp}
            style={showOnHover}
          >
            {addSectionTouchPoint(index, 'top')}
          </Box>
        ) : null}
        {showAddSection.showAtBottom ? (
          <Box
            component="div"
            className={classes.bottomaddCtaWp}
            style={showOnHover}
          >
            {addSectionTouchPoint(index, 'bottom')}
          </Box>
        ) : (
          <Box
            component="div"
            className={classes.bottomaddCtaWp}
            style={showOnHover}
          >
            {addSectionTouchPoint(index, 'bottom')}
          </Box>
        )}
      </Box>
      <CommentListPanel></CommentListPanel>
    </Box>
  );
};

export default Prelem;
