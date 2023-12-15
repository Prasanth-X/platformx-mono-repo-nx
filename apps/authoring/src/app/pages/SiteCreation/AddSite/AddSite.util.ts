export const formConfigData = (adminDomainList) => {

  const temp = [
   
    {
      name: 'domain_name',
      title: 'select_domain_name',
      placeHolder: 'enter_domain_name',
      type: 'dropdown',
      value: adminDomainList.domainList[0]?.value || '',
      list: adminDomainList.domainList,
      label: 'select_domain',
    },
    {
      name: 'site_address',
      title: 'site_address_(URL)',
      placeHolder: 'enter_site_address',
      type: 'textfield',
      label: 'https://csr.abc.com',
    },
    {
      name: 'site_title',
      title: 'site_title',
      placeHolder: 'enter_site_title',
      type: 'textfield',
    },
    {
      name: 'about_site',
      title: 'About_title',
      placeHolder: 'enter_about_title',
      type: 'textarea',
      maxLength: 250,
    },
    {
      name: 'site_default_language',
      title: 'default_language',
      placeHolder: 'default_language',
      type: 'dropdown',
      value: 'en',
      list: [
        { name: 'English', value: 'en' },
        { name: 'French', value: 'fr' },
        { name: 'German', value: 'de' },
      ],
      label: 'select_language',
    },
    {
      name: 'site_admin',
      title: 'site_admin',
      placeHolder: 'current_login_user',
      type: 'dropdown',
      value: adminDomainList.adminList[0]?.value || '',
      list: adminDomainList.adminList,
      label: 'keep_cureent_logged_in_user',
    },
    {
      name: 'isShared',
      title: 'site_storage',
      placeHolder: 'site_storage',
      type: 'dropdown',
      value: true,
      list: [{value:false, name:'Dedicated'}, {value:true, name:'Shared'}],
      label: 'site_storage',
    }
  ];
  return temp
}

