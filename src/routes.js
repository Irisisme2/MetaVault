import React from "react";
import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
  MdAssessment,
  MdPieChart,
  MdSettings,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import DeFiActivities from "views/admin/DeFiActivities";
import Portfolio from "views/admin/Portfolio";
import IntegrationManagement from "views/admin/IntegrationManagement";
import RiskManagement from "views/admin/RiskManagement";

// Auth Imports
import SignInCentered from "views/auth/signIn";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Portfolio",
    layout: "/admin",
    icon: <Icon as={MdPieChart} width='20px' height='20px' color='inherit' />,
    path: "/Portfolio",
    component: Portfolio,
  },
  {
    name: "DeFi Activities",
    layout: "/admin",
    path: "/DeFiActivities",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: DeFiActivities,
    secondary: true,
  },
  {
    name: "Integration Management",
    layout: "/admin",
    icon: <Icon as={MdSettings} width='20px' height='20px' color='inherit' />,
    path: "/IntegrationManagement",
    component: IntegrationManagement,
  },
  {
    name: "Risk Management",
    layout: "/admin",
    path: "/RiskManagement",
    icon: <Icon as={MdAssessment} width='20px' height='20px' color='inherit' />,
    component: RiskManagement,
  },
];

export default routes;
