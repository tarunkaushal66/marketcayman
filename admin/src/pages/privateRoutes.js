import Dashboard from "./SideTabs/Dashboard/Index";
import AddContest from "./SideTabs/ManageContest/AddContest/AddContest";
import ManageContest from "./SideTabs/ManageContest/Index";
import AddManageUser from "./SideTabs/ManageUsers/Add/Index";
import ManageUsers from "./SideTabs/ManageUsers/Index";
import Reports from "./SideTabs/Reports/Index";
import ViewReport from "./SideTabs/Reports/View/Index";
import Transaction from "./SideTabs/Transaction/Index";
import UserContest from "./SideTabs/UserContest/Index";

const privateRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/manage-users", component: <ManageUsers /> },
  { path: "/manage-users/add", component: <AddManageUser /> },
  { path: "/manage-users/edit/:id", component: <AddManageUser /> },
  { path: "/user-contest", component: <UserContest /> },
  { path: "/manage-contest", component: <ManageContest /> },
  { path: "/manage-contest/add", component: <AddContest /> },
  { path: "/manage-contest/edit/:id", component: <AddContest /> },
  { path: "/reports", component: <Reports /> },
  { path: "/reports/view/:id", component: <ViewReport /> },
  { path: "/transaction", component: <Transaction /> },
];

export default privateRoutes;
