import {
  CurrencyDollarIcon,
  PresentationChartBarIcon,
  ViewGridIcon,
  PresentationChartLineIcon,
  UsersIcon,
} from "@heroicons/react/solid";

export const menuItem = [
  {
    menuName: "Dashboard",
    menuIcon: <ViewGridIcon className='w-5 h-5' />,
    linkTo: "/admin",
    subMenu: false,
  },
  {
    menuName: "First Installment Due",
    menuIcon: <PresentationChartBarIcon className='w-5 h-5' />,
    linkTo: "/admin/payment",
    subMenu: false,
  },
  {
    menuName: "Content",
    menuIcon: <CurrencyDollarIcon className='w-5 h-5' />,
    linkTo: "/admin/setting",
    subMenu: false,
  },
  {
    menuName: "Analytic",
    menuIcon: <PresentationChartLineIcon className='w-5 h-5' />,
    linkTo: "/admin/setting",
    subMenu: true,
    subMenuItem: [
      { menuName: "Collector", linkTo: "#" },
      { menuName: "Marketing", linkTo: "#" },
      { menuName: "Surveyor", linkTo: "#" },
    ],
  },
  {
    menuName: "Karyawan",
    menuIcon: <UsersIcon className='w-5 h-5' />,
    linkTo: "/admin/karyawan",
    subMenu: false,
  },
];
