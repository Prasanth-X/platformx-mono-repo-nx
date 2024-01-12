import { useMutation } from '@apollo/client'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import { Box } from '@mui/material'
import { Loader } from '@platformx/utilities'
import { useFormik } from 'formik'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useSearchParams } from 'react-router-dom'
import * as yup from 'yup'

import {
  UserManagementQueries,
  userManagementAPI,
} from '@platformx/authoring-apis'
import {
  PlateformXDialog,
  ShowToastError,
  ShowToastSuccess,
} from '@platformx/utilities'

import { ThemeConstants, USERNAME_EMAIL_EXIST } from '@platformx/utilities'

import { snowplowTrackingHook } from '@platformx/authoring-apis'
import { getSelectedSite, getSubDomain } from '@platformx/utilities'
import {
  BEFORE_UNLOAD,
  DRAFT,
  IMAGES,
  PATH,
  POPSTATE,
  PUBLISH,
  USERTYPES,
} from '../Users/Utils/constant'
import './CreateUser.css'
import ExternalAccess from './ExternalAccess'
import RolePermissions from './RolePermissions'
import TopBar from './TopBar'
import UserDetails from './UserDetails'
import UserTypes from './UserTypes'

const CreateUser = () => {
  const { t } = useTranslation()
  const { userRegisterImpression } = snowplowTrackingHook()
  const [createuser] = useMutation(UserManagementQueries.CREATE_USER)
  const [showExitWarning, setShowExitWarning] = useState(false)
  const [onSavedModal, setOnSavedModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [createUserDisable, setCreateUserDisable] = useState(true)
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const [galleryState, setGalleryState] = useState<boolean>(false)
  const galleryType = useRef<string>(IMAGES)
  const [key, setKey] = useState('')
  const unsavedChanges = useRef<boolean>(false)
  const [roleSelected, setRoleSelected] = useState('')
  const [prevRoles, setPrevRoles] = useState([])
  const [isEmailExists, setIsEmailExist] = useState(false)
  const [phone, setPhone] = useState('')
  const createPageUrl = new URL(window.location.href)
  const [isd, setISD] = useState('')
  const scrollDebounceRef = useRef<any>(null)
  const [searchParams] = useSearchParams()
  const usertype = searchParams.get('usertype')
  const isEditMode = useRef(
    createPageUrl.searchParams.get(PATH)
      ? (createPageUrl.searchParams.get(PATH) as string)
      : '',
  )
  const navigate = useNavigate()
  //calling api to validate email existence
  const validateEmail = async (
    value: string,
    authoringUser: boolean,
    renderingUser: boolean,
  ) => {
    return userManagementAPI.validateEmailExist({
      userName: value,
      isAuthoringUser: authoringUser,
      isRenderingUser: renderingUser,
    })
  }
  // calling api to get user details
  const getUserDetails = async (
    value: string,
    authoringUser: boolean,
    renderingUser: boolean,
  ) => {
    return userManagementAPI.getUsersDetails({
      user_id: value,
      isAuthoringUser: authoringUser,
      isRenderingUser: renderingUser,
    })
  }
  //this method used for update user details
  const editUserDetails = async (url: any) => {
    const {
      timezone,
      image,
      phone,
      preferred_sites_urls,
      preferred_sites_languages,
      accessible_sites,
      default_site,
      default_site_checked,
      is_Authoring_User,
      is_Rendering_User,
      enabled,
    } = userDetails || {}
    const sites = [...(accessible_sites || []), getSelectedSite()].filter(
      (val, index, arr) => arr.indexOf(val) === index,
    )
    //const temp = default_site_checked ? sites : accessible_sites || sites;
    const isRoleExist = prevRoles.find(
      (obj: any) => obj?.site === getSelectedSite(),
    )
    const roleid = prevRoles.map((obj: any) => {
      if (obj?.site === getSelectedSite()) {
        return roleSelected
      } else {
        return obj._id
      }
    })

    !isRoleExist && roleSelected && roleid.push(roleSelected)

    const updateRequest = {
      first_name: formik.values.first_name,
      last_name: formik.values.last_name,
      timezone: timezone,
      role_id: roleid,
      image: image,
      phone: `${isd}-${phone}`,
      id: isEditMode.current,
      default_site: default_site_checked
        ? getSelectedSite()
        : default_site || getSelectedSite(),
      accessible_sites: sites,
      preferred_sites_languages: {
        ...(preferred_sites_languages || {}),
        [getSelectedSite()]: userDetails.default_language,
      },
      preferred_sites_urls: {
        ...(preferred_sites_urls || {}),
        [getSelectedSite()]: url,
      },
      dob: formik.values.dob,
      gender: formik.values.gender,
      is_Authoring_User: is_Authoring_User,
      is_Rendering_User: is_Rendering_User,
      ...(is_Rendering_User && { enabled }),
    }

    return userManagementAPI.editUserDetails({
      input: updateRequest,
    })
  }

  //this method used for create users
  const createUser = async (userDetails: any) => {
    setIsLoading(true)
    try {
      const response = await createuser({
        variables: {
          input: userDetails,
        },
      })
      if (
        response.data.authoring_createUser.message === 'Successfully created!!!'
      ) {
        userRegisterImpression(userDetails)
        // ShowToastSuccess(t('succces_user_toast'));
        setOnSavedModal(true)
        setIsLoading(false)
        unsavedChanges.current = false
        setIsEdited(false)
      } else {
        ShowToastSuccess(response.data.authoring_createUser.message)
      }
    } catch (err: any) {
      ShowToastError(
        err.graphQLErrors.length > 0
          ? err.graphQLErrors[0].message
          : t('api_error_toast'),
      )
      setIsLoading(false)
    }
  }

  const validationSchema = yup.object({
    first_name: yup.string().required(t('first_name_required')),
    last_name: yup.string().required(t('last_name_required')),
    email: yup.string().email(t('email_valid')).required(t('email_required')),
    phone: yup.string().min(10, 'Phone number must be 10 characters'),
    // gender: yup
    //   .string()
    //   .oneOf([t('male'), t('female')])
    //   .required(t('gender_is_required')),
    // dob: yup.string().required(`${t('date_of_birth')} ${t('is_required')}`),
  })
  const [userDetails, setUserDetails] = useState<any>({
    first_name: '',
    last_name: '',
    email: '',
    role_id: '',
    role: '',
    timezone: '',
    image: '',
    phone: '',
    default_language: 'en',
    default_site_checked: true,
    is_Authoring_User: true,
    is_Rendering_User: false,
    is_Community_User: false,
    gender: '',
    dob: null,
    enabled: true,
  })
  //this method used for set the details of existing users
  const getUserData = async () => {
    setIsLoading(true)
    try {
      const detailsRes: any = await getUserDetails(
        isEditMode.current,
        usertype === USERTYPES.AUTHORINGUSER.toLowerCase(),
        usertype === USERTYPES.ENDUSER.toLowerCase() ||
        usertype === USERTYPES.COMMUNITYUSER.toLowerCase(),
      )
      setIsLoading(false)
      const {
        first_name,
        last_name,
        email,
        role,
        phone,
        image,
        timezone,
        default_site,
        preferred_sites_languages,
        preferred_sites_urls,
        accessible_sites,
        dob,
        gender,
        is_Community_User,
        enabled,
      } = detailsRes?.authoring_getUser || {}

      const tempObj = {
        ...formik.values,
        first_name,
        last_name,
        email,
        dob: dob !== '' ? dob : null,
        gender,
      }
      const tempPhone = phone.substring(
        phone.lastIndexOf('-') + 1,
        phone?.length,
      )
      const ISD = phone.substring(0, phone.lastIndexOf('-'))
      formik.setValues(tempObj)
      setRoleSelected(
        role?.find((obj: any) => obj?.site === getSelectedSite())?._id || '',
      )
      setPrevRoles(role)
      setISD(ISD)
      setPhone(tempPhone)
      setUserDetails((prevState: any) => {
        return {
          ...prevState,
          image,
          timezone,
          phone: tempPhone,
          default_language: preferred_sites_languages?.[default_site],
          default_site_checked: default_site === getSelectedSite(),
          default_site,
          preferred_sites_languages,
          preferred_sites_urls,
          accessible_sites,
          is_Community_User,
          enabled,
        }
      })
    } catch (err: any) {
      err.graphQLErrors.length > 0 &&
        ShowToastError(
          err.graphQLErrors.length > 0
            ? err.graphQLErrors[0].message
            : t('api_error_toast'),
        )
    }
  }
  //this method used for checking the response of update_user api and will show the message accordingly
  const updateUser = async (url: any) => {
    setIsLoading(true)
    try {
      const detailsRes: any = await editUserDetails(url)
      if (
        detailsRes.authoring_updateUser.message === 'Successfully updated!!!'
      ) {
        // ShowToastSuccess(t('update_user_toast'));
        setOnSavedModal(true)
        setIsLoading(false)
        unsavedChanges.current = false
      } else {
        ShowToastSuccess(detailsRes.authoring_updateUser.message)
      }
    } catch (err: any) {
      console.log('err', err)
      err.graphQLErrors.length > 0 &&
        ShowToastError(
          err.graphQLErrors.length > 0
            ? err.graphQLErrors[0].message
            : t('api_error_toast'),
        )
    }
  }
  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      gender: '',
      dob: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const default__site = userDetails.default_site_checked
        ? getSelectedSite()
        : userDetails?.default_site
          ? userDetails.default_site
          : getSelectedSite()
      const url = getSubDomain()?.replace('https://', '')
      // try {
      //   const { authoring_getSitedetails = {} } = await fetchSites({
      //     page: default__site,
      //   });
      //   url = authoring_getSitedetails
      //     ? `${authoring_getSitedetails.site_address}.${authoring_getSitedetails.domain_name}`
      //     : '';
      // } catch (error) {
      //   url = '';
      // }
      const createRequest = {
        ...userDetails,
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        username: values.email,
        role_id: roleSelected,
        phone: `${isd}-${values.phone}`,
        default_site: default__site,
        accessible_sites: [default__site],
        preferred_sites_languages: {
          [default__site]: userDetails.default_language,
        },
        preferred_sites_urls: {
          [default__site]: url,
        },
        gender: values.gender,
        dob: values.dob,
      }
      delete createRequest.default_language
      delete createRequest.default_site_checked
      delete createRequest.enabled

      setShowExitWarning(false)

      if (
        createRequest &&
        (userDetails.is_Rendering_User || roleSelected.length !== 0)
      ) {
        if (isEditMode.current) {
          updateUser(url)
        } else {
          try {
            const validationRes: any = await validateEmail(
              values.email,
              userDetails.is_Authoring_User,
              userDetails.is_Rendering_User,
            )
            setIsEmailExist(false)
            createUser(createRequest)
          } catch (err: any) {
            if (
              err.graphQLErrors.length > 0 &&
              err.graphQLErrors[0].message === USERNAME_EMAIL_EXIST
            ) {
              setIsEmailExist(true)
            } else {
              ShowToastError(
                err.graphQLErrors.length > 0
                  ? err.graphQLErrors[0].message
                  : t('api_error_toast'),
              )
            }
          }
        }
      } else if (roleSelected.length === 0) {
        ShowToastError(`Role is required`)
      }
    },
  })
  //this method is used to check the response of valid email api
  const handleEmail = async (e: any) => {
    if (e.target.value !== '' && !formik.errors.email) {
      try {
        const validationRes: any = await validateEmail(
          e.target.value,
          userDetails.is_Authoring_User,
          userDetails.is_Rendering_User,
        )
        setIsEmailExist(false)
      } catch (err: any) {
        if (
          err.graphQLErrors.length > 0 &&
          err.graphQLErrors[0].message === USERNAME_EMAIL_EXIST
        ) {
          setIsEmailExist(true)
        } else {
          ShowToastError(
            err.graphQLErrors.length > 0
              ? err.graphQLErrors[0].message
              : t('api_error_toast'),
          )
        }
      }
    }
  }
  const [, setSelectedImage] = useState({
    Thumbnail: '',
    title: '',
    description: '',
  })

  const setImageToDefault = () => {
    setSelectedImage({
      title: '',
      Thumbnail: '',
      description: '',
    })
  }
  const toggleGallery = (toggleState: any, type: any) => {
    setGalleryState(toggleState)
    if (type == 'cancel') {
      setImageToDefault()
    }
  }
  const showGallery = (gType: any, keyName: any) => {
    window.scrollTo(0, 0)
    galleryType.current = gType
    setGalleryState(true)
    setKey(keyName)
  }
  const handleSelectedImage = (image: any, keyName: any) => {
    setSelectedImage(image)

    setUserDetails({
      ...userDetails,
      [keyName]: image?.Thumbnail,
    })
    unsavedChanges.current = true
  }

  const handleConfirm = () => {
    setShowExitWarning(false)
    unsavedChanges.current = false

    navigate('/user-management/user-list')
  }

  useEffect(() => {
    if (formik.errors.email || formik.values.email === '') {
      setIsEmailExist(false)
    }
  }, [formik.values.email])

  useEffect(() => {
    if (
      formik.values.first_name === '' &&
      formik.values.last_name === '' &&
      formik.values.email === '' &&
      phone === '' &&
      roleSelected.length !== 0 &&
      formik.values.dob === null &&
      formik.values.gender === ''
    ) {
      unsavedChanges.current = false
      setIsEdited(false)
    } else {
      unsavedChanges.current = true
      setIsEdited(true)
    }
  }, [formik.values, userDetails, roleSelected])
  const returnBack = () => {
    if (unsavedChanges.current === true) {
      setShowExitWarning(true)
    } else {
      navigate('/user-management/user-list')
    }
  }
  const unloadCallback = (event: any) => {
    event.preventDefault()
    if (unsavedChanges.current == true) {
      event.returnValue = ''
      return ''
    } else {
      navigate('/user-management/user-list')
    }
  }

  useEffect(() => {
    if (isEdited) {
      window.history.pushState(
        null,
        '',
        window.location.pathname + window.location?.search,
      )

      window.addEventListener(BEFORE_UNLOAD, unloadCallback)
      window.addEventListener(POPSTATE, returnBack)
    }
    return () => {
      window.removeEventListener(BEFORE_UNLOAD, unloadCallback)
      window.removeEventListener(POPSTATE, returnBack)
    }
  }, [isEdited])
  const crossButtonHandle = () => {
    setShowExitWarning(false)
    setOnSavedModal(false)
    navigate(0)
  }
  useEffect(() => {
    const {
      first_name: firstName,
      last_name: lastName,
      email,
      // gender,
      // dob,
    } = formik.values
    if (
      firstName === '' ||
      lastName === '' ||
      email === '' ||
      (userDetails.is_Authoring_User && roleSelected?.length === 0)
      // gender === '' ||
      // dob === ''
      // ||
      // formik.errors.email
    ) {
      setCreateUserDisable(true)
    } else {
      setCreateUserDisable(false)
    }
  }, [
    formik.values,
    roleSelected,
    userDetails.phone,
    phone,
    userDetails.is_Authoring_User,
  ])
  useEffect(() => {
    if (isEditMode.current) {
      getUserData()
      if (usertype === USERTYPES.AUTHORINGUSER.toLowerCase()) {
        setUserDetails((prevState: any) => {
          return {
            ...prevState,
            is_Authoring_User: true,
            is_Rendering_User: false,
          }
        })
      } else if (
        usertype === USERTYPES.ENDUSER.toLowerCase() ||
        usertype === USERTYPES.COMMUNITYUSER.toLowerCase()
      ) {
        setUserDetails((prevState: any) => {
          return {
            ...prevState,
            is_Authoring_User: false,
            is_Rendering_User: true,
          }
        })
      }
    }
  }, [])

  const savePopUpContent = {
    title: isEditMode.current
      ? `${t('update_user_toast')}`
      : `${t('succces_user_toast')}`,
    subtitle: isEditMode.current
      ? ' '
      : `${t('save_popup_subtitle_1')} #${formik.values.email}#.` +
      `<br />` +
      `${t('save_popup_subtitle_2')}`,
  }

  const [parentToolTip, setParentToolTip] = useState('userTypes')
  const [scrollToView, setscrollToView] = useState<any>()

  const icons = [
    { id: 'user', tooltip: 'user' },
    {
      id: 'rolepermission',
      tooltip: 'rolepermission',
    },
  ]
  const isInViewport = (element: any, isSeo: any) => {
    const mainElement = document.querySelector(`#${element}`)
    if (mainElement) {
      const rect = mainElement.getBoundingClientRect()
      return (
        rect.top <= window.pageYOffset + window.innerHeight &&
        rect.left <= window.pageXOffset + window.innerWidth &&
        rect.top >= window.pageYOffset &&
        rect.left >= window.pageXOffset
      )
    }
    return false
  }
  const scrollHandler = () => {
    const active: any = icons.find((i) => isInViewport(i.id, false))

    setParentToolTip(active?.tooltip)
  }
  useEffect(() => {
    const dataHolder: any = document.getElementById('scrollableDiv')
    dataHolder?.addEventListener('scroll', scrollHandler)
    return () => {
      dataHolder.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  return (
    <Box>
      {isLoading && <Loader />}
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            backgroundColor: ThemeConstants.WHITE_COLOR,
          }}
        >
          {/* {galleryState && (
            <Gallery
              handleImageSelected={handleSelectedImage}
              toggleGallery={toggleGallery}
              galleryMode={galleryType.current}
              keyName={key}
            />
          )} */}
        </Box>
        <TopBar
          returnBack={returnBack}
          createUserDisable={createUserDisable}
          isEmailExists={isEmailExists}
          t={t}
          createText={isEditMode.current ? t('edit_user') : t('create_user')}
          parentToolTip={parentToolTip}
        />
        <Box
          id="scrollableDiv"
          sx={{
            height: {
              sm: 'calc(100vh - 127px)',
              xs: 'calc(100vh - 45px)',
            },
            overflowY: 'scroll',
            overflowX: 'hidden',
          }}
        >
          <UserTypes
            t={t}
            state={userDetails}
            setState={setUserDetails}
            setRoleSelected={setRoleSelected}
            isEditMode={isEditMode}
          />
          <UserDetails
            state={userDetails}
            setState={setUserDetails}
            showGallery={showGallery}
            formik={formik}
            isEmailExist={isEmailExists}
            handleEmail={handleEmail}
            t={t}
            phone={phone}
            setPhone={setPhone}
            isDisabled={isEditMode.current}
            isd={isd}
            setISD={setISD}
          />
          {userDetails.is_Rendering_User ? (
            <Box sx={{ marginBottom: '30px' }}>
              <ExternalAccess
                t={t}
                state={userDetails}
                setState={setUserDetails}
              />
            </Box>
          ) : (
            <RolePermissions
              t={t}
              roleSelected={roleSelected}
              setRoleSelected={setRoleSelected}
              state={userDetails}
              setState={setUserDetails}
            />
          )}
        </Box>
      </form>
      <PlateformXDialog
        isDialogOpen={showExitWarning}
        title={t('save_warn_title')}
        subTitle={t('save_warn_subtitle')}
        closeButtonText={t('take_me_out')}
        confirmButtonText="Stay Here"
        closeButtonHandle={handleConfirm}
        confirmButtonHandle={() => setShowExitWarning(false)}
        crossButtonHandle={() => {
          setShowExitWarning(false)
        }}
        modalType="unsavedChanges"
      />
      <PlateformXDialog
        isDialogOpen={onSavedModal}
        title={savePopUpContent.title}
        subTitle={savePopUpContent.subtitle}
        closeButtonText={!isEditMode.current && t('go_to_listing')}
        confirmButtonText={
          isEditMode.current ? t('go_to_listing') : t('create_another_user')
        }
        closeButtonHandle={() => navigate('/user-management/user-list')}
        confirmButtonHandle={() => {
          !isEditMode.current
            ? crossButtonHandle()
            : navigate('/user-management/user-list')
        }}
        modalType={isEditMode.current ? PUBLISH : DRAFT}
        closeIcon={!isEditMode.current && <FormatListBulletedIcon />}
        isCreateUser={!isEditMode.current && true}
      />
    </Box>
  )
}

export default CreateUser
