import * as Yup from "yup";


export const loginSchema = Yup.object({
    email: Yup.string()
        .required("Please enter the Email ID to move ahead")
        .email("Please enter a valid email address."),
    password: Yup.string()
        .min(8, "Password too short should contain at least 8 characters.")
        .required("Please enter Password to move ahead")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
            "Password must have length of at least 8 characters including at least one uppercase, one lowercase, one numeric value and one special character"
        ),
});

export const forgotSchema = Yup.object({
    email: Yup.string()
        .required("Please enter the Email ID to move ahead")
        .email("Please enter a valid email address."),
});

export const otpVerifySchema = Yup.object({
    otp: Yup.string()
        .required("Please enter the OTP to move ahead")
        .length(6, 'OTP must be exactly 6 digits'),
});

export const resetPasswordSchema = Yup.object({
    resetPassword: Yup.string()
        .min(8, "Password too short should contain at least 8 characters.")
        .max(30, "Password too long should contain at most 30 characters.")
        .required("Please enter the Password to move ahead")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
            "Password must have length of at least 8 characters including at least one uppercase, one lowercase, one numeric value and one special character"
        ),
    confirmPassword: Yup.string()
        .required("Please enter the Confirm Password to move ahead")
        .oneOf([Yup.ref("resetPassword"), null], "The password does not match"),
});

export const changePasswordSchema = Yup.object({
    old_password: Yup.string()
        .min(8, "Password too short should contain at least 8 characters.")
        .max(30, "Password too long should contain at most 30 characters.")
        .required("Please enter the Old Password to move ahead")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
            "Password must have length of at least 8 characters including at least one uppercase, one lowercase, one numeric value and one special character"
        ),
    new_password: Yup.string()
        .min(8, "Password too short should contain at least 8 characters.")
        .max(30, "Password too long should contain at most 30 characters.")
        .required("Please enter the New Password to move ahead")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
            "Password must have length of at least 8 characters including at least one uppercase, one lowercase, one numeric value and one special character"
        ),
    confirm_password: Yup.string()
        .required("Please enter the Confirm Password to move ahead")
        .oneOf([Yup.ref("new_password"), null], "New password does not match"),
});


export const addSubjectSchema = Yup.object({
    subject_id: Yup.string()
        .required("Please enter the Subject ID to move ahead")
        .min(3, "Subject ID too short should contain at least 3 characters.")
        .matches(
            /^[a-zA-Z0-9_]*$/,
            "It can contain Alphanumeric characters. Special characters are not allowed"
        ),
    subject_name: Yup.string()
        .required("Please enter the Subject Name to move ahead")
        .min(3, "Subject Name too short should contain at least 3 characters.")
        .matches(/^[a-zA-Z0-9_ ]*$/, "It can contain Alphanumeric characters. Special characters are not allowed")
    ,
    stream: Yup.string()
        .required("Please select the Stream to move ahead"),
});

export const addChapterSchema = Yup.object({
    subject: Yup.string()
        .required("Please select the Subject to move ahead"),
    branch: Yup.string()
        .required("Please select the Branch to move ahead"),
    class: Yup.string()
        .required("Please select the Class to move ahead"),
    chapter_name: Yup.string()
        .required("Please enter the Chapter Name to move ahead")
        .min(3, "Chapter Name too short should contain at least 3 characters."),
    chapter_id: Yup.string()
        .required("Please enter the Chapter ID to move ahead")
        .min(3, "Chapter ID too short should contain at least 3 characters."),
});

export const addBranchSchema = Yup.object({
    subject: Yup.string()
        .required("Please select the Subject to move ahead"),
    branch_name: Yup.string()
        .required("Please enter the Branch Name to move ahead")
        .min(3, "Branch Name too short should contain at least 3 characters."),
    branch_id: Yup.string()
        .required("Please enter the Branch ID to move ahead")
        .min(3, "Branch ID too short should contain at least 3 characters."),
});

export const addQuestionTypeSchema = Yup.object({
    question_type: Yup.string()
        .required("Please enter the Question Type to move ahead")
        .min(3, "Question Type too short should contain at least 3 characters."),
});

export const addTopicSchema = Yup.object({
    subject: Yup.string()
        .required("Please select the Subject to move ahead"),
    branch: Yup.string()
        .required("Please select the Branch to move ahead"),
    class: Yup.string()
        .required("Please select the Class to move ahead"),
    chapter: Yup.string()
        .required("Please select the Chapter to move ahead"),
    topic_name: Yup.string()
        .required("Please enter the Topic Name to move ahead")
        .min(3, "Topic Name too short should contain at least 3 characters."),
    topic_id: Yup.string()
        .required("Please enter the Topic ID to move ahead")
        .min(3, "Topic ID too short should contain at least 3 characters."),
});

export const addSourceSchema = Yup.object({
    source_name: Yup.string()
        .required("Please enter the Source Name to move ahead")
        .min(3, "Source Name too short should contain at least 3 characters."),
});

export const addSourceChapterSchema = Yup.object({
    source: Yup.string()
        .required("Please select the Source to move ahead"),
    no_of_questions: Yup.string()
        .required("Please enter the Number Of Questions to move ahead"),
    question_link: Yup.string()
        .required("Please enter the Question Link to move ahead"),
});

export const addOriginSchema = Yup.object({
    origin_name: Yup.string()
        .required("Please enter the Origin Name to move ahead")
        .min(3, "Origin Name too short should contain at least 3 characters."),
});

export const addExamTypeSchema = Yup.object({
    exam_type: Yup.string()
        .required("Please enter the Exam Type to move ahead")
        .min(3, "Exam Type too short should contain at least 3 characters."),
});

export const addEmployeeSchema = Yup.object({
    employee_name: Yup.string()
        .required("Please enter the Name to move ahead")
        .min(3, "Employee Name too short should contain at least 3 characters.")
        .matches(/^[A-Za-z\s]+$/, "Employee name should contain only alphabets."),
    email: Yup.string()
        .required("Please enter the Email ID to move ahead")
        .email("Please enter a valid email address."),
    access_level: Yup.string()
        .required("Please select the Role to move ahead"),
});

export const addDifficultyTypeSchema = Yup.object({
    difficulty_level: Yup.string()
        .required("Please enter the Difficulty Level to move ahead")
        .min(3, "Difficulty Level too short should contain at least 3 characters."),
});

export const createNewTaskSchema = Yup.object({
    source: Yup.string()
        .required("Please select the Source to move ahead"),
    type_of_task: Yup.string()
        .required("Please select the Type of Task to move ahead"),
    creator: Yup.string()
        .required("Please select the Creator to move ahead"),
});


export const addSchoolSchema = Yup.object().shape({
    school: Yup.string().required('School name is required'),
    primary_contact: Yup.string().required('Primary contact is required'),
    secondary_contact: Yup.string().required('Secondary contact is required'),
    no_of_teachers: Yup.number().required('Number of teachers is required').min(1, 'At least one teacher is required'),
    no_of_students: Yup.number().required('Number of students is required').min(1, 'At least one student is required'),
    no_of_school_admin: Yup.number().required('Number of school admins is required').min(1, 'At least one admin is required'),
    addressLine1: Yup.string().required('Address Line 1 is required'),
    addressLine2: Yup.string(),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zip_code: Yup.string().required('Zip Code is required'),
    country: Yup.string().required('Country is required'),
    poc1: Yup.object().shape({
        poc_name: Yup.string().required('POC1 Name is required'),
        contact: Yup.string().required('POC1 Contact is required'),
        email: Yup.string().email('Invalid email format').required('POC1 Email is required'),
    }),
    poc2: Yup.object().shape({
        poc_name: Yup.string().required('POC2 Name is required'),
        contact: Yup.string().required('POC2 Contact is required'),
        email: Yup.string().email('Invalid email format').required('POC2 Email is required'),
    }),
});