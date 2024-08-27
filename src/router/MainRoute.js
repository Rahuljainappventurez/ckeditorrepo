import React, { memo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PublicRouter from "./PublicRouter";
import PrivateRouter from "./PrivateRouter";
import routerConstants from "../constants/routerConstants";
import SignIn from "../layouts/authentication/sign-in";
import routes from "./routes";
import Dashboard from "Pages/Dashboard/Dashboard";
import AddEditSubject from "Pages/Subject Management/AddEditSubject";
import AddEditChapter from "Pages/Chapter Management/AddEditChapter";
import AddEditQuestionType from "Pages/Question type management/AddEditQuestionType";
import AddEditBranch from "Pages/Branch Management/AddEditBranch";
import AddEditOrigin from "Pages/Origin Management/AddEditOrigin";
import AddEditSourceChapter from "Pages/Source Chapter Management/AddEditSourceChapter";
import AddEditExamType from "Pages/Exam Type Management/AddEditExamType";
import AddEditDifficultyType from "Pages/Difficulty Type Management/AddEditDifficulty";
import AddEditViewEmployee from "Pages/Employee Management/AddEditViewEmployee";
import AddEditViewSchool from "Pages/SchoolManagement/AddEditViewSchool";
import AddEditViewSource from "Pages/Source Management/AddEditViewSource";
import AddEditViewTopic from "Pages/Topic Management/AddEditViewTopic";
import CreateTask from "Pages/Task Management/CreateTask";
import AddEditViewCoupon from "Pages/Coupon Management/AddEditViewCoupon";
import ViewSubscription from "Pages/Subscription Management/ViewSubscription";
import StreakReportManagement from "Pages/Report Management/StreakReportManagement";
import { practiceZoneCards } from "constants/cardDetailsConstants";
import { NCERTCards } from "constants/cardDetailsConstants";
import { testSeriesCards } from "constants/cardDetailsConstants";
import PublishQuestions from "Pages/Publish Questions";
import ViewEmployeeList from "Pages/Team management/ViewEmployeeList";
import ViewTaskList from "Pages/Team management/ViewTaskList";
import ViewTaskCreatorApproverEditor from "Pages/My Task/ViewTaskCreatorEditorApprover";
import AddEditQuestionCreatorEditor from "Pages/My Task/AddEditQuestionCreatorEditor";
import PersonalizedDPP from "Pages/Publish Questions/Practice-Infinity";
import UnPublishedQuestion from "Pages/Publish Questions/Practice-Infinity/UnPublishedQuestion";
import NCERTPublishedQuestions from "Pages/Publish Questions/NCERT";
import UnPublishedNCERTQuestion from "Pages/Publish Questions/NCERT/UnPublishedNCERTQuestion";
import NCERTTextbookPublished from "Pages/Publish Questions/NCERT/NCERTTextbookPublished";
import UnPublishedNCERTTextbook from "Pages/Publish Questions/NCERT/NCERTTextbookUnpublished";
import ViewNCERTCreatorApproverEditor from "Pages/My Task/ViewNCERTCreatorEditorApprover";
import ViewFlashcardsCreatorApproverEditor from "Pages/My Task/ViewFlashcardsCreatorApproverEditor";
import AddEditNCERTCreatorEditor from "Pages/My Task/AddEditNCERTCreatorEditor";
import AddEditFlashcardCreatorEditor from "Pages/My Task/AddEditFlashcardCreatorEditor";
import PreviewScreen from "Pages/My Task/PreviewScreen";
import TestSeriesAllType from "Pages/Publish Questions/Test-Series";
import CreateTest from "Pages/Publish Questions/Test-Series/CreateTest";
import ForgotPassword from "layouts/authentication/forgot-password";
import OTPVerification from "layouts/authentication/otp-veify";
import ResetPassword from "layouts/authentication/reset password";
import Profile from "layouts/profile";
import ChangePassword from "Pages/Change Password/ChangePassword";
import ViewTaskQuestions from "Pages/Task Management/ViewTaskQuestions";
import ViewFlashcardsTasks from "Pages/Task Management/ViewFlashcardsTasks";
import ViewNCERTTasks from "Pages/Task Management/ViewNCERTTasks";

function MainRoute() {
  const getRoutes = (allRoutes) =>
    allRoutes?.map((route) => {
      // if (route.collapse) {
      //   return getRoutes(route.collapse);
      // }

      if (route.route && route.name !== 'Dashboard') {
        return <Route path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });
  return (
    <Routes>
      {/* public router  */}
      <Route path="/" element={<PublicRouter />}>
        <Route path={routerConstants?.loginRoute} element={<SignIn />} />
        <Route path={routerConstants?.forgotRoute} element={<ForgotPassword />} />
        <Route path={routerConstants?.otpVerifyRoute}  element={<OTPVerification />} />
        <Route path={routerConstants?.resetPasswordRoute} element={<ResetPassword />} />
        <Route path="*" element={<Navigate to={'/'} />} />
      </Route>

      {/* private router  */}
      <Route path="/" element={<PrivateRouter />}>
        <Route index element={<Dashboard />} key="dashboard" />
        {getRoutes(routes)}
        <Route path={routerConstants?.changePasswordRoute} element={<ChangePassword />} />
        <Route path={routerConstants?.myProfileRoute} element={<Profile />} />
        <Route path={routerConstants?.addSubjectRoute} element={<AddEditSubject type={'add'} />} />
        <Route path={routerConstants?.editSubjectRoute} element={<AddEditSubject type={'edit'} />} />
        <Route path={routerConstants?.viewSubjectRoute} element={<AddEditSubject type={'view'} />} />
        <Route path={routerConstants?.addChapterRoute} element={<AddEditChapter type={'add'} />} />
        <Route path={routerConstants?.editChapterRoute} element={<AddEditChapter type={'edit'} />} />
        <Route path={routerConstants?.viewChapterRoute} element={<AddEditChapter type={'view'} />} />
        <Route path={routerConstants?.addTopicRoute} element={<AddEditViewTopic type={'add'} />} />
        <Route path={routerConstants?.editTopicRoute} element={<AddEditViewTopic type={'edit'} />} />
        <Route path={routerConstants?.viewTopicRoute} element={<AddEditViewTopic type={'view'} />} />
        <Route path={routerConstants?.addQuestionTypeRoute} element={<AddEditQuestionType type={'add'} />} />
        <Route path={routerConstants?.editQuestionTypeRoute} element={<AddEditQuestionType type={'edit'} />} />
        <Route path={routerConstants?.addBranchRoute} element={<AddEditBranch type={'add'} />} />
        <Route path={routerConstants?.editBranchRoute} element={<AddEditBranch type={'edit'} />} />
        <Route path={routerConstants?.viewBranchRoute} element={<AddEditBranch type={'view'} />} />
        <Route path={routerConstants?.addOriginRoute} element={<AddEditOrigin type={'add'} />} />
        <Route path={routerConstants?.editOriginRoute} element={<AddEditOrigin type={'edit'} />} />
        <Route path={routerConstants?.addSourceRoute} element={<AddEditViewSource type={'add'} />} />
        <Route path={routerConstants?.editSourceRoute} element={<AddEditViewSource type={'edit'} />} />
        <Route path={routerConstants?.viewSourceRoute} element={<AddEditViewSource type={'view'} />} />
        <Route path={routerConstants?.addSourceChapterRoute} element={<AddEditSourceChapter type={'add'} />} />
        <Route path={routerConstants?.editSourceChapterRoute} element={<AddEditSourceChapter type={'edit'} />} />
        <Route path={routerConstants?.viewSourceChapterRoute} element={<AddEditSourceChapter type={'view'} />} />
        <Route path={routerConstants?.addExamTypeRoute} element={<AddEditExamType type={'add'} />} />
        <Route path={routerConstants?.editExamTypeRoute} element={<AddEditExamType type={'edit'} />} />
        <Route path={routerConstants?.addDifficultyTypeRoute} element={<AddEditDifficultyType type={'add'} />} />
        <Route path={routerConstants?.editDifficultyTypeRoute} element={<AddEditDifficultyType type={'edit'} />} />
        <Route path={routerConstants?.addSchoolRoute} element={<AddEditViewSchool type={'add'} />} />
        <Route path={routerConstants?.editSchoolRoute} element={<AddEditViewSchool type={'edit'} />} />
        <Route path={routerConstants?.viewSchoolRoute} element={<AddEditViewSchool type={'view'} />} />
        <Route path={routerConstants?.addEmployeeRoute} element={<AddEditViewEmployee type={'add'} />} />
        <Route path={routerConstants?.editEmployeeRoute} element={<AddEditViewEmployee type={'edit'} />} />
        <Route path={routerConstants?.viewEmployeeRoute} element={<AddEditViewEmployee type={'view'} />} />
        <Route path={routerConstants?.createTaskRoute} element={<CreateTask />} />
        <Route path={routerConstants?.viewQuestionsTaskRoute} element={<ViewTaskQuestions />} />
        <Route path={routerConstants?.viewFlashcardTaskRoute} element={<ViewFlashcardsTasks />} />
        <Route path={routerConstants?.viewNCERTTaskRoute} element={<ViewNCERTTasks />} />
        <Route path={routerConstants?.addCouponRoute} element={<AddEditViewCoupon type={'add'} />} />
        <Route path={routerConstants?.editCouponRoute} element={<AddEditViewCoupon type={'edit'} />} />
        <Route path={routerConstants?.viewCouponRoute} element={<AddEditViewCoupon type={'view'} />} />
        <Route path={routerConstants?.viewSubscriptionRoute} element={<ViewSubscription />} />
        <Route path={routerConstants?.streakReportManagementRoute} element={<StreakReportManagement />} />
        <Route path={routerConstants?.practiceZoneRoute} element={<PublishQuestions cardsDetailArray={practiceZoneCards} />} />
        <Route path={routerConstants?.PersonalizedDPPRoute} element={<PersonalizedDPP type={'DPP'} />} />
        <Route path={routerConstants?.PersonalizedDPPUnPublishedRoute} element={<UnPublishedQuestion type={'DPP'} />} />
        <Route path={routerConstants?.flashcardPublishedRoute} element={<PersonalizedDPP type={'flashcard'} />} />
        <Route path={routerConstants?.flashcardUnPublishedRoute} element={<UnPublishedQuestion type={'flashcard'} />} />
        <Route path={routerConstants?.assignmentPublishedRoute} element={<PersonalizedDPP type={'assignment'} />} />
        <Route path={routerConstants?.assignmentUnPublishedRoute} element={<UnPublishedQuestion type={'assignment'} />} />
        <Route path={routerConstants?.NCERTRoute} element={<PublishQuestions cardsDetailArray={NCERTCards} />} />
        <Route path={routerConstants?.NCERTPublishedQuestionsRoute} element={<NCERTPublishedQuestions />} />
        <Route path={routerConstants?.NCERTUnpublishedQuestionsRoute} element={<UnPublishedNCERTQuestion />} />
        <Route path={routerConstants?.NCERTPublishedTextbookRoute} element={<NCERTTextbookPublished />} />
        <Route path={routerConstants?.NCERTUnpublishedTextbookRoute} element={<UnPublishedNCERTTextbook />} />
        <Route path={routerConstants?.testSeriesRoute} element={<PublishQuestions cardsDetailArray={testSeriesCards} />} />
        <Route path={routerConstants?.testSeriesSectionWiseRoute} element={<TestSeriesAllType testSeriesType={'section-wise'} />} />
        <Route path={routerConstants?.createTestRoute} element={<CreateTest type={'add'} />} />
        <Route path={routerConstants?.testSeriesFullMockRoute} element={<TestSeriesAllType testSeriesType={'full-mock'} />} />
        <Route path={routerConstants?.testSeriesPreviousYearRoute} element={<TestSeriesAllType testSeriesType={'previous-year'} />} />
        <Route path={routerConstants?.viewEmployeeTeamRoute} element={<ViewEmployeeList />} />
        <Route path={routerConstants?.viewtaskTeamRoute} element={<ViewTaskList />} />
        <Route path={routerConstants?.viewTaskCreatorEditorApproverRoute} element={<ViewTaskCreatorApproverEditor />} />
        <Route path={routerConstants?.previewQuestionRoute} element={<PreviewScreen previewType={'question'} />} />
        <Route path={routerConstants?.addQuestionRoute} element={<AddEditQuestionCreatorEditor type={'add'} />} />
        <Route path={routerConstants?.viewFlashcardTaskCreatorEditorApproverRoute} element={<ViewFlashcardsCreatorApproverEditor />} />
        <Route path={routerConstants?.addFlashcardRoute} element={<AddEditFlashcardCreatorEditor type={'add'} />} />
        <Route path={routerConstants?.previewFlashcardRoute} element={<PreviewScreen previewType={'flashcard'} />} />
        <Route path={routerConstants?.viewNCERTTaskCreatorEditorApproverRoute} element={<ViewNCERTCreatorApproverEditor />} />
        <Route path={routerConstants?.addNCERTTextbookRoute} element={<AddEditNCERTCreatorEditor type={'add'} />} />
        <Route path={routerConstants?.previewNCERTTextbookRoute} element={<PreviewScreen previewType={'NCERT'} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default memo(MainRoute);
