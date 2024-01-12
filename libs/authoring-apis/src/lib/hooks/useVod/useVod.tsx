import { useMutation } from '@apollo/client'
import {
  ShowToastError,
  ShowToastSuccess,
  useUserSession,
} from '@platformx/utilities'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import {
  create_vod,
  delete_vod,
  unpublish_vod,
} from '../../services/vod/vod.api'
import { LanguageList, MENU_STATE_DRAFT } from '../../utils/constants'
import { formatUrl } from '../../utils/helper'
import { VodInstance } from './Utils/constants'
import { updateStructureDataVOD } from './Utils/helper'
import { getSampVod } from './Utils/mapper'

const useVod = (filter = 'ALL') => {
  // const { fetchContentDetails } = useContentListing()
  const [getSession] = useUserSession()
  const navigate = useNavigate()
  const { userInfo } = getSession()
  const username = `${userInfo.first_name} ${userInfo.last_name}`
  const vodInstance = useRef<VodInstance>(getSampVod(username))
  const { t, i18n } = useTranslation()

  const [mutateDelete] = useMutation(delete_vod)
  const [mutateUnpublish] = useMutation(unpublish_vod, {
    update: (cache, { data: { mutateUnpublish } }) => {
      cache.modify({
        id: cache.identify(mutateUnpublish),
        fields: {
          Status: mutateUnpublish.Status,
        },
      })
    },
  })
  const [createvodemutate] = useMutation(create_vod, {
    context: {
      headers: {
        language: localStorage.getItem('lang'),
      },
    },
  })

  const deleteVod = async (selectedVod: any) => {
    try {
      const vodInfo = {
        page: selectedVod?.page,
        currentpageurl: selectedVod?.currentPageUrl,
        parentpageurl: selectedVod?.parentPageUrl,
      }
      const deleteResponse = await mutateDelete({
        variables: {
          input: vodInfo,
        },
      })
      if (deleteResponse) {
        ShowToastSuccess(`${t('vod')} ${t('deleted_toast')}`)
      } else {
        ShowToastError(t('api_error_toast'))
        return deleteResponse
      }
    } catch (err) {
      ShowToastError(t('api_error_toast'))
    }
  }

  const unPublish = async (selectedVod, calledFromDelete = false) => {
    if (selectedVod && Object.keys(selectedVod).length > 0) {
      try {
        const unPublishResponse = await mutateUnpublish({
          variables: {
            page: selectedVod?.page,
            parentpageurl: selectedVod?.parentPageUrl,
            currentpageurl: selectedVod?.currentPageUrl,
          },
        })
        if (unPublishResponse) {
          if (calledFromDelete) {
            deleteVod(selectedVod)
          } else {
            ShowToastSuccess(`${t('vod')} ${t('unpublished_toast')}`)
          }
        }
      } catch (error: any) {
        ShowToastError(error?.graphQLErrors[0]?.message || t('api_error_toast'))
      }
    }
  }

  const onCopy = (pageUrl) => {
    if (pageUrl) {
      navigator.clipboard.writeText(
        `${process.env.REACT_APP_PUBLISH_URI + i18n.language}/` +
          `video${pageUrl}`,
      )
      ShowToastSuccess(t('url_copy_toast'))
    } else {
      ShowToastError(t('api_error_toast'))
    }
  }

  const handleOpenVod = (item) => {
    const pageState = item?.page_state
    if (pageState?.toLowerCase() === 'pending') {
      return
    }
    navigate(`/content/create-vod?path=${item.page}`)
  }

  const getVodInstance = (selectedVod) => {
    const creatorDetails = {
      Page_CreatedBy: username,
      Page_LastModifiedBy: username,
      Page_PublishedBy: '',
      Author: username,
    }
    vodInstance.current = {
      ...vodInstance.current,
      ...selectedVod,
      ...creatorDetails,
    }
  }

  const duplicateVod = async ({
    IsDuplicate,
    title,
    language,
    listItemDetails,
    isCalled = false,
    arr = [],
  }: // setArr,
  // setOpenPageExistModal,
  // setLangContent,
  any) => {
    // const selectedItem = await fetchContentDetails(listItemDetails)
    getVodInstance(listItemDetails)
    // const temp = ''
    const url = formatUrl(title ? title : vodInstance.current.Title)
    if (title) {
      vodInstance.current.Title = title
    }

    const structureData = updateStructureDataVOD(
      title,
      vodInstance.current?.Description,
      vodInstance.current?.DsapceVideoUrl,
      vodInstance.current?.Thumbnail,
    )
    const vodToSend = {
      ...JSON.parse(JSON.stringify(vodInstance.current)),
      Title: vodInstance.current.Title,
      Page: url,
      CurrentPageURL: `/${url}`,
      Page_State: MENU_STATE_DRAFT,
      IsConfirm: IsDuplicate,
      StructureData: JSON.stringify(structureData),
    }

    if (!isCalled) {
      language.map((lang) => {
        LanguageList.map((l) => {
          if (l.value === lang) {
            localStorage.setItem('lang', l.id)
            createvodemutate({
              variables: {
                input: vodToSend,
              },
              context: {
                headers: {
                  language: localStorage.getItem('lang'),
                },
              },
            })
              .then((resp) => {
                localStorage.removeItem('lang')
                if (resp?.data?.authoring_createVod?.isExist) {
                  // temp += `${l.value},`
                  // setLangContent(temp)
                  // setOpenPageExistModal(true)
                  // setArr((prev) => [...prev, { id: l.id, value: lang }])
                } else {
                  ShowToastSuccess(
                    `${t('vod')} ${t('duplicated_toast')} ${t('for')} ${
                      l.value
                    }`,
                  )
                }
              })
              .catch((error) => {
                if (error?.graphQLErrors[0]) {
                  ShowToastError(error.graphQLErrors[0].message)
                } else {
                  ShowToastError(t('api_error_toast'))
                }
              })
          }
        })
      })
    } else {
      arr.map((val: any) => {
        localStorage.setItem('lang', val.id)
        createvodemutate({
          variables: {
            input: vodToSend,
          },
          context: {
            headers: {
              language: localStorage.getItem('lang'),
            },
          },
        })
          .then((resp) => {
            localStorage.removeItem('lang')
            if (resp?.data?.authoring_createVod?.isExist) {
              // setOpenPageExistModal(true)
            } else {
              // setOpenPageExistModal(false)
              ShowToastSuccess(
                `${t('vod')} ${t('duplicated_toast')} ${t('for')} ${val.value}`,
              )
              // fetchContent(0, 'ALL', true);
            }
          })
          .catch((error) => {
            if (error?.graphQLErrors[0]) {
              ShowToastError(error.graphQLErrors[0].message)
            } else {
              ShowToastError(t('api_error_toast'))
            }
          })
      })
      // setArr([])
    }
  }

  return {
    deleteVod,
    duplicateVod,
    // fetchContentDetails,
    unPublish,
    onCopy,
    handleOpenVod,
  }
}

export default useVod
