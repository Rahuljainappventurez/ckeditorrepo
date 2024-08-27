import routerConstants from "./routerConstants";

export const publishQuestionsCards = [
    {
        questionTypeHeading: 'Practice Infinity',
        questionCountHeading: 'Number of Questions Published',
        questionCount: 15000,
        route: routerConstants?.practiceZoneRoute,
    },
    {
        questionTypeHeading: 'NCERT',
        questionCountHeading: 'Number of Questions Published',
        questionCount: 1000,
        route: routerConstants?.NCERTRoute,
    },
    {
        questionTypeHeading: 'Test Series',
        questionCountHeading: 'Number of Questions Published',
        questionCount: 15000,
        route: routerConstants?.testSeriesRoute,
    },
]

export const practiceZoneCards = [
    {
        questionTypeHeading: 'Personalized DPP',
        questionCountHeading: 'Number of Questions Published',
        questionCount: 15000,
        route: routerConstants?.PersonalizedDPPRoute,
    },
    {
        questionTypeHeading: 'Flashcard',
        questionCountHeading: 'Number of Questions Published',
        questionCount: 1000,
        route: routerConstants?.flashcardPublishedRoute,
    },
    {
        questionTypeHeading: 'Assignment',
        questionCountHeading: 'Number of Questions Published',
        questionCount: 500,
        route: routerConstants?.assignmentPublishedRoute,
    },
]

export const NCERTCards = [
    {
        questionTypeHeading: 'NCERT Textbook',
        questionCountHeading: 'Number of Chapters Published',
        questionCount: 700,
        route: routerConstants?.NCERTPublishedTextbookRoute,
    },
    {
        questionTypeHeading: 'NCERT Questions',
        questionCountHeading: 'Number of Questions Published',
        questionCount: 12000,
        route: routerConstants?.NCERTPublishedQuestionsRoute,
    },
]

export const testSeriesCards = [
    {
        questionTypeHeading: 'Test Series - Section-wise',
        questionCountHeading: 'Number of Questions Published',
        questionCount: 15000,
        route: routerConstants?.testSeriesSectionWiseRoute,
    },
    {
        questionTypeHeading: 'Test Series - Full Mock Test',
        questionCountHeading: 'Number of Questions Published',
        questionCount: 20000,
        route: routerConstants?.testSeriesFullMockRoute,
    },
    {
        questionTypeHeading: 'Test Series - Previous Year Exams',
        questionCountHeading: 'Number of Questions Published',
        questionCount: 500,
        route: routerConstants?.testSeriesPreviousYearRoute,
    },
]