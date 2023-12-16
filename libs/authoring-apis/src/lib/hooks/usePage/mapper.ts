import { SORT_ORDER } from '@platformx/utilities';



export const mapFetchPages = (
  startIndex: number,
  state: any,
  filter: string
) => {
  return {
    searchTerm: state?.searchTerm,
    tags: state?.tags,
    dateFilter: {
      from: state?.fromDate,
      to: state?.toDate,
    },
    created_by: state?.author,
    contentType: 'Sitepage',
    pageFilter: filter,
    sort: SORT_ORDER,
    pagination: { start: startIndex, rows: 20 },
    isSuggestive: false,
  };
};

export const consolidatePageModel = (
  pageModel: any,
  prelemMetaArray: any[],
  pageSettings: any,
  username = ''
) => {
  const newModel = {
    ...pageModel,
    Page_LastModificationDate: new Date(),
    Page_LastModifiedBy: username,
  };
  const newChildrenArray: any = [];
  const structuredDataArray: any = [];
  for (let i = 0; i < prelemMetaArray.length; i++) {
    const prelemMetaArrayInstance: any = prelemMetaArray[i];
    if (
      prelemMetaArray[i]?.IsHidden === false &&
      prelemMetaArray[i].SeoEnabled === true
    ) {
      structuredDataArray.push(prelemMetaArrayInstance.StructuredData);
    }
    const prelemMetaArrayInstanceCopy = JSON.parse(
      JSON.stringify(prelemMetaArray[i])
    );
    delete prelemMetaArrayInstanceCopy.content;
    delete prelemMetaArrayInstanceCopy.prelemTag;
    delete prelemMetaArrayInstanceCopy.DefaultStructureDataForReset;

    newChildrenArray.push(prelemMetaArrayInstanceCopy);
  }
  const pageSettingsCopy = pageSettings;
  delete pageSettingsCopy.SeoURL;
  delete pageSettingsCopy.RobotsTags;
  delete pageSettingsCopy.CanonicalURL;
  delete pageSettingsCopy.PageAnalytics;
  delete pageSettingsCopy.EventBasedAnalytics;
  delete newModel.is_workflow_enabled;
  delete newModel.stages;
  delete newModel.workflow_id;
  delete newModel.workflow_status;
  delete newModel.Path;
  newModel.Children = newChildrenArray;
  newModel.PageSettings = pageSettings;
  newModel.StructureData = JSON.stringify(structuredDataArray);
  return newModel;
};

export const ROW_SIZE = 20;
