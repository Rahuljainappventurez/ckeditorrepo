/**
=========================================================
* Argon Dashboard 2 MUI - v3.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.
  Once you add a new route on this file it will be visible automatically on
  the Sidenav.
  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Argon Dashboard 2 MUI layouts
import Dashboard from "layouts/dashboard";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import SubjectManagement from "Pages/Subject Management";
import TopicManagement from "Pages/Topic Management";
import ChapterManagement from "Pages/Chapter Management";
import QuestionTypeManagement from "Pages/Question type management";
import routerConstants from "constants/routerConstants";
import BranchManagement from "Pages/Branch Management";
import AnswerTypeManagement from "Pages/Answer type";
import OriginManagement from "Pages/Origin Management";
import SourceManagement from "Pages/Source Management";
import SourceChapterManagement from "Pages/Source Chapter Management";
import ExamTypeManagement from "Pages/Exam Type Management";
import DifficultyTypeManagement from "Pages/Difficulty Type Management";
import SchoolManagement from "Pages/SchoolManagement";
import QuestionBank from "Pages/Question Bank";
import EmployeeManagement from "Pages/Employee Management";
import TaskManagement from "Pages/Task Management";
import NCERTManagement from "Pages/NCERT Management";
import FlashcardManagement from "Pages/FlashCardManagement";
import FeedbackManagement from "Pages/Feedback management";
import CouponManagement from "Pages/Coupon Management";
import SubscriptionManagement from "Pages/Subscription Management";
import StudentManagement from "Pages/StudentManagement";
import ReportManagement from "Pages/Report Management";
import PublishQuestions from "Pages/Publish Questions";
import { publishQuestionsCards } from "constants/cardDetailsConstants";
import TeamManagement from "Pages/Team management";
import MyTaskCreatorApproverEditor from "Pages/My Task";
import SidebarNameIcon from "components/SidebarNameIcon";

const routes = [
  {
    type: "route",
    name: "Dashboard",
    key: "",
    route: routerConstants?.dashboardRoute,
    icon: <SidebarNameIcon name={'dashboard'} />,
    component: <Dashboard />,
  },
  {
    type: "route",
    name: "Subject Management",
    key: "subject-management",
    route: routerConstants?.subjectManagementRoute,
    icon: <SidebarNameIcon name={'subject'} />,
    component: <SubjectManagement />,
  },
  {
    type: "route",
    name: "Branch Management",
    key: "branch-management",
    route: routerConstants?.branchManagementRoute,
    icon: <SidebarNameIcon name={'branch'} />,
    component: <BranchManagement />,
  },
  {
    type: "route",
    name: "Chapter Management",
    key: "chapter-management",
    route: routerConstants?.chapterManagementRoute,
    icon: <SidebarNameIcon name={'chapter'} />,
    component: <ChapterManagement />,
  },
  {
    type: "route",
    name: "Topic Management",
    key: "topic-management",
    route: routerConstants?.topicManagementRoute,
    icon: <SidebarNameIcon name={'topic'} />,
    component: <TopicManagement />,
  },
  {
    type: "route",
    name: "Question Type Management",
    key: "question-type-management",
    route: routerConstants?.questionTypeManagementRoute,
    icon: <SidebarNameIcon name={'question'} />,
    component: <QuestionTypeManagement />,
  },
  {
    type: "route",
    name: "Answer Type Management",
    key: "answer-type-management",
    route: routerConstants?.answerTypeManagementRoute,
    icon: <SidebarNameIcon name={'answer'} />,
    component: <AnswerTypeManagement />,
  },
  {
    type: "route",
    name: "Origin Management",
    key: "origin-management",
    route: routerConstants?.originManagementRoute,
    icon: <SidebarNameIcon name={'origin'} />,
    component: <OriginManagement />,
  },
  {
    type: "route",
    name: "Source Management",
    key: "source-management",
    route: routerConstants?.sourceManagementRoute,
    icon: <SidebarNameIcon name={'source'} />,
    component: <SourceManagement />,
  },
  {
    type: "route",
    name: "Source Chapter Management",
    key: "source-chapter-management",
    route: routerConstants?.sourceChapterManagementRoute,
    icon: <SidebarNameIcon name={'source-chapter'} />,
    component: <SourceChapterManagement />,
  },
  {
    type: "route",
    name: "Exam Type Management",
    key: "exam-type-management",
    route: routerConstants?.examTypeManagementRoute,
    icon: <SidebarNameIcon name={'exam'} />,
    component: <ExamTypeManagement />,
  },
  {
    type: "route",
    name: "Difficulty Type Management",
    key: "difficulty-type-management",
    route: routerConstants?.difficultyTypeManagementRoute,
    icon: <SidebarNameIcon name={'difficulty'} />,
    component: <DifficultyTypeManagement />,
  },
  {
    type: "route",
    name: "School Management",
    key: "school-management",
    route: routerConstants?.schoolManagementRoute,
    icon: <SidebarNameIcon name={'school'} />,
    component: <SchoolManagement />,
  },
  {
    type: "route",
    name: "Question Bank",
    key: "question-bank",
    route: routerConstants?.questionBankRoute,
    icon: <SidebarNameIcon name={'question'} />,
    component: <QuestionBank />,
  },
  {
    type: "route",
    name: "Employee Management",
    key: "employee-management",
    route: routerConstants?.employeeManagementRoute,
    icon: <SidebarNameIcon name={'employee'} />,
    component: <EmployeeManagement />,
  },
  {
    type: "route",
    name: "Task Management",
    key: "task-management",
    route: routerConstants?.taskManagementRoute,
    icon: <SidebarNameIcon name={'task'} />,
    component: <TaskManagement />,
  },
  {
    type: "route",
    name: "NCERT Management",
    key: "NCERT-management",
    route: routerConstants?.NCERTManagementRoute,
    icon: <SidebarNameIcon name={'NCERT'} />,
    component: <NCERTManagement />,
  },
  {
    type: "route",
    name: "Flashcard Management",
    key: "flashcard-management",
    route: routerConstants?.flashcardManagementRoute,
    icon: <SidebarNameIcon name={'flashcard'} />,
    component: <FlashcardManagement />,
  },
  {
    type: "route",
    name: "Feedback Management",
    key: "feedback-management",
    route: routerConstants?.feedbackManagementRoute,
    icon: <SidebarNameIcon name={'feedback'} />,
    component: <FeedbackManagement />,
  },
  {
    type: "route",
    name: "Report Management",
    key: "report-management",
    route: routerConstants?.questionReportManagementRoute,
    icon: <SidebarNameIcon name={'report'} />,
    component: <ReportManagement />,
  },
  {
    type: "route",
    name: "Subscription Management",
    key: "subscription-management",
    route: routerConstants?.subscriptionManagementRoute,
    icon: <SidebarNameIcon name={'subscription'} />,
    component: <SubscriptionManagement />,
  },
  {
    type: "route",
    name: "Coupons Management",
    key: "coupons-management",
    route: routerConstants?.couponManagementRoute,
    icon: <SidebarNameIcon name={'coupons'} />,
    component: <CouponManagement />,
  },
  {
    type: "route",
    name: "Student Management",
    key: "student-management",
    route: routerConstants?.studentManagementRoute,
    icon: <SidebarNameIcon name={'student'} />,
    component: <StudentManagement />,
  },
  {
    type: "route",
    name: "Publish Questions",
    key: "publish-questions",
    route: routerConstants?.publishQuestionsRoute,
    icon: <SidebarNameIcon name={'publish'} />,
    component: <PublishQuestions cardsDetailArray={publishQuestionsCards} />,
  },
  {
    type: "route",
    name: "Team Management",
    key: "team-management",
    route: routerConstants?.teamManagementRoute,
    icon: <SidebarNameIcon name={'team'} />,
    component: <TeamManagement />,
  },
  {
    type: "route",
    name: "My Tasks",
    key: "my-tasks",
    route: routerConstants?.myTasksRoute,
    icon: <SidebarNameIcon name={'my'} />,
    component: <MyTaskCreatorApproverEditor />,
  },
];

export default routes;
