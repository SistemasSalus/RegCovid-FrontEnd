var pageMenus = [
  {
    icon: 'fa fa-th-large',
    title: 'Administrador',
    url: '',
    caret: 'true',
    submenu: [
      {
        url: 'administrator/services-admin',
        title: 'Consulta Servicios',
      },
      {
        url: 'administrator/app-precios',
        title: 'Consulta Precios',
      }
    ],
  },
  {
    icon: 'fa fa-building',
    title: 'Cliente',
    url: '',
    caret: 'true',
    submenu: [
      {
        url: 'customer/indicators',
        title: 'Indicadores',
      },
    ],
  },
  {
    icon: 'fa fa-user-md',
    title: 'Registro Médico',
    url: '',
    caret: 'true',
    submenu: [
      {
        url: 'medical/scheduled',
        title: 'Servicios',
      },
      // {
      //   url: 'medical/other-clinics',
      //   title: 'Otras Clínicas',
      // },
    ],
  },
];

export default pageMenus;
