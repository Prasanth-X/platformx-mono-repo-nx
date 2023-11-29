interface PageModelInstance {
  Page: string;
  SiteName: string;
  Title: string;
  ParentPageUrl: string;
  CurrentPageUrl: string;
  DevelopedBy: string;
  DevelopedDate: string;
  IsEdit: boolean;
  SeoEnable: boolean;
  AnalyticsEnable: boolean;
  RobotTxt: boolean;
  SiteMap: boolean;
  Children: [];
  PageSettings: any;
}
interface PrelemInstanceFromSearch {
  AnalyticsEnabled: boolean;
  DocumentCreationPath: string;
  DocumentPath: string;
  DocumentType: string;
  PrelemId: string;
  PrelemName: string;
  SeoEnabled: boolean;
  Description: string;
  DevelopedBy: string;
  DevelopedDate: string;
  PreviewThumbnail: string;
  Tags: [];
  Thumbnails: [];
}
interface PrelemInstance {
  PrelemId: string;
  PrelemName: string;
  SeoEnabled: boolean;
  AnalyticsEnabled: boolean;
  InstanceId: string;
  DocumentPath: string;
  DocumentCreationPath: string;
  DocumentType: string;
  IsHidden?: boolean;
  IsModified?: boolean;
  StructuredData: string;
  content?: any;
  DefaultStructureDataForReset: string;
}
// interface InitialValuesDef {
//   prelemsSchemaArray: [PrelemInstance];
//   pageModel: PageModelInstance;
//   insertPrelemAt: number;
// }
export const initialState = {
  prelemsValidationObject: {},
  prelemMetaArray: [],
  pageModel: {},
  insertPrelemAt: 0,
  scrollIndex: 0,
  pageSettings: {},
  publishedPages: [],
  showSaveWarning: false,
  callSave: false,
  dashboard: {
    recentPages: [],
    recentContent: [],
    createContent: [],
    colorArray: [],
    boostContent: [],
    scheduled: [],
  },
};

const pageModelDefault = (state, pageModelCreated: PageModelInstance) => {
  return {
    ...(state || {}),
    pageModel: pageModelCreated,
    pageSettings: pageModelCreated.PageSettings,
  };
};
const updatePageModel = (state, pageModelCreated: PageModelInstance) => {
  return {
    ...(state || {}),
    pageModel: pageModelCreated,
    showSaveWarning: true,
  };
};
const setPageModelPostFetch = (state, pm, pagesettings, children) => {
  return {
    ...(state || {}),
    prelemMetaArray: children,
    pageSettings: pagesettings,
    pageModel: pm,
  };
};
const saveInsertIndex = (state, insertPrelemAt: number, index: number) => {
  return { ...state, insertPrelemAt: insertPrelemAt, scrollIndex: index };
}; //updateDynamicPrelemAssetInfo
const updateDynamicPrelemAssetInfo = (
  state,
  selectedPrelemIndex: number,
  sectionToUpdate: string,
  data: any
) => {
  const existingEntries = JSON.parse(JSON.stringify(state.prelemMetaArray));
  existingEntries[selectedPrelemIndex].content[sectionToUpdate] = data;
  return { ...state, prelemMetaArray: existingEntries, showSaveWarning: true };
};
const updateLivestreamPrelemAssetInfo = (
  state,
  selectedPrelemIndex: number,
  sectionToUpdate: string,
  data: any
) => {
  const existingEntries = JSON.parse(JSON.stringify(state.prelemMetaArray));
  existingEntries[selectedPrelemIndex].content = {
    ...existingEntries[selectedPrelemIndex].content,
    ...data,
  };
  return { ...state, prelemMetaArray: existingEntries, showSaveWarning: true };
};
const updatePrelemAssetInfo = (
  state,
  selectedPrelemIndex: number,
  sectionToUpdate: string,
  data: any,
  index?: string
) => {
  const existingEntries = [...state.prelemMetaArray];
  console.log(index, selectedPrelemIndex);
  console.log('existingEntries', existingEntries[selectedPrelemIndex]);
  console.log('sectionToUpdate', sectionToUpdate);

  if (index != undefined) {
    existingEntries[selectedPrelemIndex].content[sectionToUpdate][index] = data;
    return {
      ...(state || {}),
      prelemMetaArray: existingEntries,
      showSaveWarning: true,
    };
  } else {
    existingEntries[selectedPrelemIndex][sectionToUpdate] = data;
    return { ...(state || {}), prelemMetaArray: existingEntries };
  }
};
const addPrelem = (
  state,
  prelemMetaInstance,
  prelemValidationInstance,
  prelemPosition = 0
) => {
  let existingEntriesMeta = [...state.prelemMetaArray];
  const validationsObjCopy = { ...state.prelemsValidationObject };
  validationsObjCopy[prelemMetaInstance.DocumentType] =
    prelemValidationInstance;
  if (prelemPosition) {
    existingEntriesMeta = [
      ...existingEntriesMeta.slice(0, prelemPosition),
      prelemMetaInstance,
      ...existingEntriesMeta.slice(prelemPosition, existingEntriesMeta.length),
    ];
  } else {
    if (existingEntriesMeta == null) {
      existingEntriesMeta = [];
      existingEntriesMeta.push(prelemMetaInstance);
    } else if (prelemPosition === 0) {
      existingEntriesMeta = [prelemMetaInstance, ...existingEntriesMeta];
    }
  }
  return {
    ...state,
    prelemMetaArray: existingEntriesMeta,
    prelemsValidationObject: validationsObjCopy,
    showSaveWarning: true,
  };
};
const copyPrelem = (state, prelemIndexInitial) => {
  const duplicatedPrelemMeta = JSON.parse(
    JSON.stringify(state.prelemMetaArray[prelemIndexInitial])
  );
  const copyMeta: PrelemInstance[] = [
    ...state.prelemMetaArray.slice(0, prelemIndexInitial + 1),
    duplicatedPrelemMeta,
    ...state.prelemMetaArray.slice(
      prelemIndexInitial + 1,
      state.prelemMetaArray.length
    ),
  ];
  return { ...state, prelemMetaArray: copyMeta, showSaveWarning: true };
};
const movePrelem = (state, prelemIndexInitial: number, operation: string) => {
  const newPrelemMetaArray: PrelemInstance[] = [...state.prelemMetaArray];
  let i = -1; //to handle operation move up and down accordingly
  if (operation == 'down') {
    i = 1;
  }
  const tempMeta = newPrelemMetaArray[prelemIndexInitial + i];
  newPrelemMetaArray[prelemIndexInitial + i] =
    newPrelemMetaArray[prelemIndexInitial];
  newPrelemMetaArray[prelemIndexInitial] = tempMeta;
  return { ...state, prelemMetaArray: newPrelemMetaArray };
};
const deletePrelem = (state, prelemIndexInitial: number) => {
  const newPrelemMetaArray: PrelemInstance[] = [
    ...state.prelemMetaArray.slice(0, prelemIndexInitial),
    ...state.prelemMetaArray.slice(
      prelemIndexInitial + 1,
      state.prelemMetaArray.length
    ),
  ];
  return {
    ...state,
    prelemMetaArray: newPrelemMetaArray,
    showSaveWarning: true,
  };
};
const hidePrelem = (state, prelemIndexInitial: number) => {
  const newPrelemMetaArray: PrelemInstance[] = [...state.prelemMetaArray];
  newPrelemMetaArray[prelemIndexInitial].IsHidden = newPrelemMetaArray[
    prelemIndexInitial
  ].IsHidden
    ? !newPrelemMetaArray[prelemIndexInitial].IsHidden
    : true;
  return {
    ...state,
    prelemMetaArray: newPrelemMetaArray,
    showSaveWarning: true,
  };
};
const paddingTopPrelem = (
  state,
  prelemIndexInitial: number,
  checked: boolean
) => {
  const newPrelemMetaArray: PrelemInstance[] = [...state.prelemMetaArray];
  // newPrelemMetaArray[prelemIndexInitial].IsHidden = newPrelemMetaArray[
  //   prelemIndexInitial
  // ].IsHidden
  //   ? !newPrelemMetaArray[prelemIndexInitial].IsHidden
  //   : true;
  return { ...state, prelemMetaArray: newPrelemMetaArray };
};
const paddingBottomPrelem = (
  state,
  prelemIndexInitial: number,
  checked: boolean
) => {
  const newPrelemMetaArray: PrelemInstance[] = [...state.prelemMetaArray];
  // newPrelemMetaArray[prelemIndexInitial].IsHidden = newPrelemMetaArray[
  //   prelemIndexInitial
  // ].IsHidden
  //   ? !newPrelemMetaArray[prelemIndexInitial].IsHidden
  //   : true;
  return { ...state, prelemMetaArray: newPrelemMetaArray };
};
const resetPrelemContentReducer = (
  state,
  contentFetched,
  prelemAfterReset,
  prelemAt
) => {
  const newPrelemMetaArray: PrelemInstance[] = [...state.prelemMetaArray];
  newPrelemMetaArray[prelemAt] = prelemAfterReset;
  newPrelemMetaArray[prelemAt].content = contentFetched;
  newPrelemMetaArray[prelemAt].StructuredData =
    state.prelemMetaArray[prelemAt].DefaultStructureDataForReset;
  newPrelemMetaArray[prelemAt].DefaultStructureDataForReset =
    state.prelemMetaArray[prelemAt].DefaultStructureDataForReset;
  newPrelemMetaArray[prelemAt].IsModified = false;
  return { ...state, prelemMetaArray: newPrelemMetaArray };
};
const updateContentPath = (state, newPath, contentObj, prelemAt) => {
  const prelemMetaArr = [...state.prelemMetaArray];
  prelemMetaArr[prelemAt].content = contentObj;
  prelemMetaArr[prelemAt].DocumentPath = newPath;
  prelemMetaArr[prelemAt].IsModified = true;
  return { ...state, prelemMetaArray: prelemMetaArr };
};
const updatePageSettings = (state, pageInfo) => {
  return {
    ...state,
    pageSettings: { ...state.pageSettings, ...pageInfo },
    showSaveWarning: true,
  };
};

const savePrelemAnalytics = (
  state,
  analyticsAttributeVal: boolean,
  prelemIndex: number
) => {
  const prelemSchemaCopyArr: PrelemInstance[] = [...state.prelemMetaArray];
  prelemSchemaCopyArr[prelemIndex].AnalyticsEnabled = analyticsAttributeVal;
  prelemSchemaCopyArr[prelemIndex].IsModified = true;
  return { ...state, prelemMetaArray: prelemSchemaCopyArr };
};

const setValidationObject = (state, validations) => {
  return { ...state, prelemsValidationObject: validations };
};

const setPublishedPages = (state, publishedPages: any) => {
  return {
    ...state,
    publishedPages: publishedPages,
  };
};

const setDefaultPageModel = (state) => {
  return {
    ...state,
    prelemsValidationObject: {},
    prelemMetaArray: [],
    pageModel: {},
    insertPrelemAt: 0,
    pageSettings: {},
  };
};
const saveSchedulePublish = (state, status, publishtime) => {
  const pageSettingsNew = {
    ...state.pageSettings,
    IsSchedulePublish: status,
    SchedulePublishDateTime: publishtime,
  };
  return {
    ...state,
    pageSettings: pageSettingsNew,
    showSaveWarning: true,
  };
};
const saveScheduleUnpublish = (state, status, unpublishtime) => {
  const pageSettingsNew = {
    ...state.pageSettings,
    IsScheduleUnpublish: status,
    ScheduleUnpublishDateTime: unpublishtime,
  };
  return {
    ...state,
    pageSettings: pageSettingsNew,
    showSaveWarning: true,
  };
};

const updateShowSaveWarningOnPage = (state, status) => {
  return { ...state, showSaveWarning: status };
};
const savePageModel = (state, callSaveStatus) => {
  return { ...state, showSaveWarning: false, callSave: callSaveStatus };
};

const setMultiSlotContent = (
  state,
  { slotContent, currentSlot, prelemIndex }
) => {
  const newPrelemMetaArray = [...(state?.prelemMetaArray || [])];
  let newSlotContent = {};
  if (slotContent.ContentType === 'Article') {
    newSlotContent =
      slotContent && Object.keys(slotContent).length === 0
        ? slotContent
        : (({
            Description,
            Title,
            ContentType,
            Author,
            PublishedDate,
            Thumbnail,
            CurrentPageURL,
          }) => ({
            Description,
            Title,
            ContentType,
            PublishedBy: Author,
            PublishedDate,
            Thumbnail,
            Id: CurrentPageURL,
            EditorialItemPath: CurrentPageURL,
          }))(slotContent);
  } else if (slotContent.ContentType === 'VOD') {
    newSlotContent =
      slotContent && Object.keys(slotContent).length === 0
        ? slotContent
        : (({
            Description,
            Title,
            ContentType,
            Author,
            PublishedDate,
            Thumbnail,
            Banner,
            CurrentPageURL,
          }) => ({
            Description,
            Title,
            ContentType,
            PublishedBy: Author,
            PublishedDate,
            Thumbnail,
            Id: CurrentPageURL,
            EditorialItemPath: CurrentPageURL,
          }))(slotContent);
  } else if (
    slotContent.ContentType === 'Poll' ||
    slotContent.ContentType === 'Quiz' ||
    slotContent.ContentType === 'Event'
  ) {
    newSlotContent =
      slotContent && Object.keys(slotContent).length === 0
        ? slotContent
        : (({
            Description,
            Title,
            ContentType,
            Author,
            PublishedDate,
            Thumbnail,
            Banner,
            CurrentPageURL,
            background_content,
          }) => ({
            Description,
            Title,
            ContentType,
            PublishedBy: Author,
            PublishedDate,
            Thumbnail: { ...Thumbnail, Color: background_content?.Color },
            Id: CurrentPageURL,
            EditorialItemPath: CurrentPageURL,
          }))(slotContent);
  } else {
    newSlotContent =
      slotContent && Object.keys(slotContent).length === 0
        ? slotContent
        : (({
            Description,
            Title,
            EditorialItemPath,
            Thumbnail,
            ContentType,
          }) => ({
            Description,
            Title,
            EditorialItemPath,
            Thumbnail,
            ContentType,
          }))(slotContent);
  }
  const newContent = newPrelemMetaArray[prelemIndex].content?.Slots.map(
    (item, index) => (index === currentSlot ? newSlotContent : item)
  );
  newPrelemMetaArray[prelemIndex].content = {
    ...newPrelemMetaArray[prelemIndex].content,
    Slots: newContent,
  };
  const newState = { ...state, prelemMetaArray: newPrelemMetaArray };
  return newState;
};

const setFeatureBoxServiceCardContent = (
  state,
  { slotContent, prelemIndex }
) => {
  const newPrelemMetaArray = [...(state?.prelemMetaArray || [])];
  const existingSlots = newPrelemMetaArray[prelemIndex]?.content?.Slots;
  const keysArr = existingSlots?.[0] && Object.keys(existingSlots?.[0]);
  const recievedSlots = slotContent?.slots;
  const updatedSlots = recievedSlots?.map((i) => {
    let obj: any = {};
    keysArr.forEach((j) => (obj = { ...obj, [j]: i[j] }));
    return obj;
  });
  newPrelemMetaArray[prelemIndex].content = {
    ...newPrelemMetaArray[prelemIndex].content,
    Slots: updatedSlots,
    EditorialItemPath: slotContent?.EditorialItemPath,
  };
  const newState = { ...(state || {}), prelemMetaArray: newPrelemMetaArray };
  return newState;
};

const setDynamicPrelemContent = (state, { contentObj, prelemIndex }) => {
  const newPrelemMetaArray = [...(state?.prelemMetaArray || [])];
  const newSlotContent = contentObj?.slots.map(function (content) {
    return {
      Description: content.Description,
      Title: content.Title,
      ContentType: content.ContentType,
      PublishedBy: content?.Author || '',
      PublishedDate: content.PublishedDate,
      Thumbnail: {
        Url: content?.background_content?.Url || content?.Thumbnail?.Url || '',
        ext: content?.Thumbnail?.ext || ''
      },
      background_content: content?.background_content || '',
      Id: content?.CurrentPageURL || content?.EditorialItemPath || '',
      EditorialItemPath:
        content?.CurrentPageURL || content?.EditorialItemPath || '',
    };
  });
  newPrelemMetaArray[prelemIndex].content = {
    ...newPrelemMetaArray[prelemIndex].content,
    QueryParam: contentObj?.queryParam,
    Slots: newSlotContent,
  };
  const newState = { ...state, prelemMetaArray: newPrelemMetaArray };
  return newState;
};

const setImageVideoGalleryContent = (
  state,
  { content, selectedPrelemIndex, activeTab, EditorialItemPath }
) => {
  const newPrelemMetaArray = [...(state?.prelemMetaArray || [])];
  let newContent = [];
  if (activeTab.current === 'image') {
    newContent = content.map((x) => x.Image);
    newPrelemMetaArray[selectedPrelemIndex].content.Tab_1.Gallery = newContent;
  } else if (activeTab.current === 'awards') {
    newPrelemMetaArray[selectedPrelemIndex].content.Slots = content;
    newPrelemMetaArray[selectedPrelemIndex].content.EditorialItemPath =
      EditorialItemPath;
  } else if (activeTab.current === 'gallery') {
    newContent = content.map((x) => x.Image || x.Video || x);
    newPrelemMetaArray[selectedPrelemIndex].content.EditorialItemPath =
      EditorialItemPath;
    newPrelemMetaArray[selectedPrelemIndex].content.Slots = newContent;
  } else {
    newContent = content.map((x) => x.Video);
    newPrelemMetaArray[selectedPrelemIndex].content.Tab_2.Gallery = newContent;
  }

  const newState = { ...state, prelemMetaArray: newPrelemMetaArray };
  return newState;
};
const setDashBoardData = (state, payload) => ({
  ...state,
  dashboard: payload,
});

const setEcommercePrelemQueryParam = (
  state,
  { data, prelemIndex, selectedSlot }
) => {
  const newPrelemMetaArray = [...(state?.prelemMetaArray || [])];
  if (selectedSlot === -1) {
    newPrelemMetaArray[prelemIndex].content = {
      ...newPrelemMetaArray[prelemIndex].content,
      QueryParam: { ...JSON.parse(data) },
    };
  } else {
    newPrelemMetaArray[prelemIndex].content = {
      ...newPrelemMetaArray[prelemIndex].content,
      [`query_param${selectedSlot}`]: { ...JSON.parse(data) },
    };
  }
  const newState = { ...state, prelemMetaArray: newPrelemMetaArray };
  return newState;
};

const updateModificationDate = (state, date) => {
  const newModel = { ...state?.pageModel, Page_LastModificationDate: date };
  const newState = { ...state, pageModel: newModel };
  return newState;
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_VALIDATION_OBJECT':
      return setValidationObject(state, action.validations);
    case 'SHOW_SAVE_WARNING':
      return updateShowSaveWarningOnPage(state, action.status);
    case 'SAVE_PAGEMODEL':
      return savePageModel(state, action.callSaveStatus);
    case 'CREATE_PAGEMODEL':
      return pageModelDefault(state, action.pm);
    case 'SET_PUBLISH_TIME':
      return saveSchedulePublish(state, action.status, action.publishtime);
    case 'SET_UNPUBLISH_TIME':
      return saveScheduleUnpublish(state, action.status, action.unpublishtime);
    case 'UPDATE_PAGEMODEL':
      return updatePageModel(state, action.pm);
    case 'SAVE_INDEX':
      return saveInsertIndex(state, action.insertPrelemAt, action.index);
    case 'ADD_PRELEM':
      return addPrelem(
        state,
        action.prelemMetaInstance,
        action.prelemValidation,
        action.insertPrelemAt
      );
    case 'DUPLICATE_PRELEM':
      return copyPrelem(state, action.sourcePrelemIndex);
    case 'MOVE_PRELEM':
      return movePrelem(state, action.prelemIndex, action.direction);
    case 'DELETE_PRELEM':
      return deletePrelem(state, action.targtPrelemIndex);
    case 'HIDE_PRELEM':
      return hidePrelem(state, action.targtPrelemIndex);
    case 'PADDINGTOP_PRELEM':
      return paddingTopPrelem(state, action.targtPrelemIndex, action.checked);
    case 'PADDINGBOTTOM_PRELEM':
      return paddingBottomPrelem(
        state,
        action.targtPrelemIndex,
        action.checked
      );
    case 'RESET_PRELEM':
      return resetPrelemContentReducer(
        state,
        action.content,
        action.prelemAfterReset,
        action.prelemAt
      );
    case 'UPDATE_PRELEM_ASSET_INFO_DYNAMIC':
      return updateDynamicPrelemAssetInfo(
        state,
        action.selectedPrelemIndex,
        action.sectionToUpdate,
        action.info
      );
    case 'UPDATE_PRELEM_ASSET_INFO_LIVESTREAM':
      return updateLivestreamPrelemAssetInfo(
        state,
        action.selectedPrelemIndex,
        action.sectionToUpdate,
        action.info
      );
    case 'UPDATE_PRELEM_ASSET_INFO':
      return updatePrelemAssetInfo(
        state,
        action.selectedPrelemIndex,
        action.sectionToUpdate,
        action.info,
        action.assetIndex
      );
    case 'PRELEM_ANALYTICS_BASIC':
      return savePrelemAnalytics(
        state,
        action.analyticsAttributeVal,
        action.prelemIndex
      );

    case 'UPDATE_PAGE_SETTINGS':
      return updatePageSettings(state, action.pageInfo);
    // return {
    //   ...state,
    //   pageSettings: { ...state.pageSettings, ...action.payload.value },
    // };
    case 'UPDATE_PRELEM_DATA':
      return updateContentPath(
        state,
        action.newPath,
        action.updatedContent,
        action.prelemAt
      );
    case 'SET_PAGE_MODEL_POST_FETCH':
      return setPageModelPostFetch(
        state,
        action.pm,
        action.pagesettings,
        action.children
      );
    case 'SET_PUBLISHED_PAGES':
      return setPublishedPages(state, action.publishedPages);
    case 'SET_DEFAULT_PAGE_MODEL':
      return setDefaultPageModel(state);
    case 'UPDATE_MULTISLOT_CONTENT':
      return setMultiSlotContent(state, action);
    case 'UPDATE_IMAGE_VIDEO_GALLERY_CONTENT':
      return setImageVideoGalleryContent(state, action);
    case 'UPDATE_FEATUREBOX_SERVICECARD_CONTENT':
      return setFeatureBoxServiceCardContent(state, action);
    case 'UPDATE_DYNAMICPRELEM_CONTENT':
      return setDynamicPrelemContent(state, action.payload);
    case 'DASHBOARD_CONTENT':
      return setDashBoardData(state, action.payload);
    case 'UPDATE_ECOMMERCEPRELEM_QUERYPARAM':
      return setEcommercePrelemQueryParam(state, action);
    case 'UPDATE_MODIFIED_DATE':
      return updateModificationDate(state, action.date);
    default:
      return state;
  }
};
