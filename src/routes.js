import RequestAccess from "./pages/RequestAccess/RequestAccessContainer";
import LandingPage from "./pages/LandingPage/LandingPage";
import PatientView from "./components/PatientView/PatientViewContainer";
import ConsentLog from "./components/ConsentsListTable/LoadConsentsContainer";
const routes = [
  {
    component: LandingPage,
    path: "/",
    isExact: true
  },
  {
    component: RequestAccess,
    path: "/request-access",
    isExact: false
  },
  {
    component: PatientView,
    path: "/patient-view",
    isExact: false
  },
  {
    component: ConsentLog,
    path: "/consent-log",
    isExact: false
  }
];

export default routes;
