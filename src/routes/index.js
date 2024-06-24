import Login from "../pages/Authentication/Login";
import ForgetPassword from "../pages/Authentication/ForgetPassword";
import Register from "../pages/Authentication/Register";
import Profile from "../pages/Authentication/Profile";
import Dashboard from "../pages/Dashboard/Dashboard";
import PortAccount from "../pages/Authentication/PortAccount";
import QuizMaster from "../pages/Quiz Master/QuizMaster";
import ActivityMaster from "../pages/Activity Master/ActivityMaster";
import CareerMaster from "../pages/Career Report/CareerMaster";
import CareerLibraryMaster from "../pages/Career Library/CareerLibraryMaster";
import ActivitySubMaster from "../pages/Activity Master/ActivitySubMaster/ActivitySubMaster";
import CoursesMaster from "../pages/Courses Master/CoursesMaster";
import ProfileMaster from "../pages/Profile Master/ProfileMaster";
import CourseMaster from "../pages/Career Library/Course Master/CourseMaster";
import SteamMaster from "../pages/Career Library/Steam Master/SteamMaster";
import AllSteams from "../pages/Career Report/All Steams/AllSteams";
import WebinarDetails from "../pages/Dashboard/Webinar Details/WebinarDetails";
import CounsellorDashboard from "../pages/Counsellor Master/CounsellorDashboard";
import CounsellorStudent from "../pages/Counsellor Master/CounsellorStudent";
import SpaceBucks from "../pages/SpaceBucks/SpaceBucks";
import Schedules from "../pages/Counsellor Master/Schedules Master/Schedules";
import PartnerDashboard from "../pages/PartnerMaster/PartnerDashboard";
import TaskMaster from "../pages/Task Master/TaskMaster";
import TaskList from "../pages/Task Master/TaskList";
import NextGen from "../pages/NextGen";
import ChatBot from "../pages/ChatBot/ChatBot";
import Payment from "../pages/Payment/payment";


const authProtectedRoutes = [
	{ path: "/profile", component: Profile },
	{ path: "/register", component: Register },
	{ path: "/dashboard", component: Dashboard },
	{ path: "/port", component: PortAccount },
	{ path: `/test/:quizNumber`, component: QuizMaster },
	{ path: "/activity", component: ActivityMaster },
	{ path: "/activity/webinar", component: ActivitySubMaster },
	{ path: "/activity/webinar/details", component: WebinarDetails },
	{ path: "/career", component: CareerMaster },
	{ path: "/career/steams", component: AllSteams },
	{ path: "/library", component: CareerLibraryMaster },
	{ path: "/courses", component: CoursesMaster },
	{ path: `/library/courses`, component: CourseMaster },
	{ path: `/library/courses/steam`, component: SteamMaster },
	{ path: "/user", component: ProfileMaster },
	{ path: "/consoler", component: CounsellorDashboard },
	{ path: "/partner", component: PartnerDashboard },
	{ path: `/partner/task`, component: TaskMaster },
	{ path: "/assigned-list", component: TaskList },
	{ path: "/space-bucks", component: SpaceBucks },
	{ path: "/schedules", component: Schedules },
	{ path: "/student-list", component: CounsellorStudent },
	{ path: "/chatbot", component: ChatBot },
	{ path: "/payment", component: Payment }
];

const authStudentRoutes = [
	{ path: "/dashboard", component: Dashboard },
	{ path: `/test/:quizNumber`, component: QuizMaster },
	{ path: "/activity", component: ActivityMaster },
	{ path: "/activity/webinar", component: ActivitySubMaster },
	{ path: "/career", component: CareerMaster },
	{ path: "/library", component: CareerLibraryMaster },
	{ path: "/library/courses", component: CourseMaster },
	{ path: "/courses", component: CoursesMaster },
	{ path: "/schedules", component: Schedules }

];

const authConsolerRoutes = [
	{ path: "/consoler", component: CounsellorDashboard },
	{ path: "/student-list", component: CounsellorStudent },
	{ path: "/space-bucks", component: SpaceBucks },
	{ path: "/schedules", component: Schedules },
	{ path: "/user", component: ProfileMaster },

];


const publicRoutes = [

	{ path: "/", component: Login },
	{ path: "/main", component: Login },
	{ path: "/forgot-password", component: ForgetPassword },
	{ path: "/courses", component: CoursesMaster },
	{ path: "/register", component: Register },
	{ path: "/nextgen", component: NextGen },
];

export { authProtectedRoutes, authStudentRoutes, publicRoutes, authConsolerRoutes };
