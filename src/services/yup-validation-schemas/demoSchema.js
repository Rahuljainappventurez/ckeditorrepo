import * as Yup from "yup";

export const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .email("It can contain alphanumeric characters.It should contain @")
    .required("Please enter the Email ID to move ahead"),
});

export const setNewPasswordSchema = Yup.object({
  password: Yup.string()
    .min(8, "Password too short should contain at least 8 characters.")
    .max(30, "Password too long should contain at most 30 characters.")
    .required("Please enter the Password to move ahead")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
      "Password must have length of at least 8 characters including at least one uppercase letter, one lowercase, one numeric value and one special character"
    ),
  confirmPass: Yup.string()
    .required("Please enter the Confirm Password to move ahead")
    .oneOf([Yup.ref("password"), null], "The password does not match"),
});

export const changePasswordSchema = Yup.object({
  oldPass: Yup.string()
    .min(8, "Password too short should contain at least 8 characters.")
    .max(30, "Password too long should contain at most 30 characters.")
    .required("Please enter the Old Password to move ahead")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
      "Password must have length of at least 8 characters including at least one uppercase letter, one lowercase, one numeric value and one special character"
    ),
  password: Yup.string()
    .min(8, "Password too short should contain at least 8 characters.")
    .max(30, "Password too long should contain at most 30 characters.")
    .required("Please enter the New Password to move ahead")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
      "Password must have length of at least 8 characters including at least one uppercase letter, one lowercase, one numeric value and one special character"
    ),
  confirmPassword: Yup.string()
    .required("Please enter the Confirm Password to move ahead")
    .oneOf([Yup.ref("new_password"), null], "New password does not match"),
});

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("It can contain alphanumeric characters.It should contain @")
    .required("Please enter the Email ID to move ahead"),
  password: Yup.string()
    .min(8, "Password too short should contain at least 8 characters.")
    .max(30, "Password too long should contain at most 30 characters.")
    .required("Please enter Password to move ahead")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
      "Password must have length of at least 8 characters including at least one uppercase letter, one lowercase, one numeric value and one special character"
    ),
});

export const addResourcesSchema = Yup.object({
  empId: Yup.string()
    .required("Please enter the Employee ID to move ahead")
    .matches(
      /^[ A-Za-z0-9_@./#&+-]*$/,
      "It can contain alphanumeric and special characters."
    ),
  empName: Yup.string()
    .required("Please enter the Employee Name to move ahead")
    .matches(/^[a-zA-Z ]*$/, "Employee Name should contain only alphabets"),
  mobile: Yup.string()
    .min(10, "Character length should be 10")
    .matches(/^[0-9]{10,10}$/, "It contains only positive integers")
    .required("Please enter the Mobile Number to move ahead"),
  email: Yup.string()
    .email("It can contain alphanumeric characters.It should contain @")
    .required("Please enter the Email ID to move ahead"),
  experience: Yup.string()
    .max(2)
    .matches(
      /^[0-9]{1,2}$/,
      "It should contain positive integers. Experience would be in years"
    )
    .required("Please enter the Experience to move ahead"),
  salary: Yup.string()
    .max(12)
    .matches(
      /^[0-9]{1,12}$/,
      "It should contain positive integers. Salary would be in LPA"
    )
    .required("Please enter the Salary to move ahead"),
  designation: Yup.string().required(
    "Please select the Designation to move ahead"
  ),
  techStack: Yup.string().required(
    "Please select the Tech Stack to move ahead"
  ),
  workMode: Yup.string().required("Please select the Work Mode to move ahead"),
});

export const addAssetSchema = Yup.object({
  deviceId: Yup.string()
    .required("Please enter the Device ID to move ahead")
    .max(12, "Device ID must be at most 12 characters")
    .matches(
      /^[ A-Za-z0-9_@./#&+-]*$/,
      "It can contain alphanumeric and special characters."
    ),
  deviceName: Yup.string()
    .required("Please enter the Device Name to move ahead")
    .matches(
      /^[a-zA-Z0-9_]*$/,
      "It can contain Alphanumeric characters. Special characters are not allowed"
    )
    .max(30),
  deviceType: Yup.string().required(
    "Please select the Device Type to move ahead"
  ),
  issueDate: Yup.string().required(
    "Please select the Issue Date to move ahead"
  ),
});

export const editAssetSchema = Yup.object({
  deviceId: Yup.string()
    .required("Please enter the Device ID to move ahead")
    .max(12, "Device ID must be at most 12 characters")
    .matches(
      /^[ A-Za-z0-9_@./#&+-]*$/,
      "It can contain alphanumeric and special characters."
    ),
  deviceName: Yup.string()
    .required("Please enter the Device Name to move ahead")
    .matches(
      /^[a-zA-Z0-9_]*$/,
      "It can contain Alphanumeric characters. Special characters are not allowed"
    )
    .max(30),
  deviceType: Yup.string().required(
    "Please select the Device Type to move ahead"
  ),
  issueDate: Yup.date()
    .typeError("Please select a valid Date")
    .required("Please select the Issue Date to move ahead"),
  returnDate: Yup.date()
    .required("Please select the Return Date to move ahead")
    .min(Yup.ref("issueDate"), "It should not be less than Issue Date"),
});

export const addProjectSchema = Yup.object({
  name: Yup.string()
    .required("Please enter the Project Name to move ahead")
    .matches(
      /^[ A-Za-z0-9_@./#&+-]*$/,
      "It will contain Alphanumeric and special characters"
    )
    .max(20),
  client_id: Yup.string()
    .required("Please enter Client Name")
    .min(1, "Client ID too short should contain at least 1 characters.")
    .max(20, "Client ID too long should contain at most 20 characters.")
    .matches(/^[0-9]{1,20}$/, "It will contain only numbers"),
  start_date: Yup.date()
    .typeError("Please select a valid Date")
    .required("Please select the Start Date to move ahead"),
  expected_end_date: Yup.date()
    .typeError("Please select a valid Date")
    .required("Please select the Expected End Date to move ahead")
    .min(
      Yup.ref("start_date"),
      "It should not be less than or equal to the Start Date"
    )
    .test(
      "is-greater-than-start",
      "It should not be less than or equal to the Start Date",
      function (value) {
        const start_date = this.resolve(Yup.ref("start_date"));
        return value > start_date;
      }
    ),
  end_date: Yup.date()
    .typeError("Please select a valid Date")
    .min(
      Yup.ref("expected_end_date"),
      "It should not be less than Expected End Date"
    ),
  pm: Yup.string().required("Please select the PM to move ahead"),
  project_type: Yup.string().required(
    "Please select the Project Type to move ahead"
  ),
});

export const addProjectResourceSchema = Yup.object({
  allocationOnProject: Yup.number()
    .typeError("Allocation On Project must be a number")
    .required("Please enter the Allocation On Project to move ahead")
    .test(
      "Is positive?",
      "It will contain only positive integers",
      (value) => value > 0
    )
    .max(
      100,
      "The total allocation of the resource should not be more than 100%"
    ),
  selectRole: Yup.string().required(
    "Please select the Select Role to move ahead"
  ),
  dateOfAllocation: Yup.date()
    .typeError("Please select a valid Date")
    .required("Please select the Date Of Allocation to move ahead"),
  dateOfDeallocation: Yup.date()
    .typeError("Please select a valid Date")
    .min(
      Yup.ref("dateOfAllocation"),
      "It should not be less than to the Date of Allocation"
    ),
});

export const addNewHiringSchema = Yup.object({
  designation: Yup.string()
    .required("Please enter the designation to move ahead")
    .matches(/^[a-zA-Z0-9 ]*$/, "It will contian only Alphanumeric characters"),
  experience: Yup.string().required(
    "Please enter the Experience to move ahead"
  ),
  jobDescription: Yup.string().required(
    "Please enter the Job Description to move ahead"
  ),
  budget: Yup.string().required("Please enter budget to move ahead"),
  techStack: Yup.string().required(
    "Please select the Tech Stack to move ahead"
  ),
});

export const addRequestSchema = Yup.object({
  designation: Yup.string()
    .required("Please enter the designation to move ahead")
    .matches(/^[a-zA-Z0-9 ]*$/, "It will contian only Alphanumeric characters"),
  experience: Yup.string().required("Please enter Experience"),
  allocationRequested: Yup.string().required(
    "Please enter the Alloction Requested to move ahead"
  ),
  techStack: Yup.string().required(
    "Please select the Tech Stack to move ahead"
  ),
  project: Yup.string().required("Please select the Project to move ahead"),
});


export const profileSchema = Yup.object({
  name: Yup.string()
    .required("Please enter Name")
    .matches(/^[a-zA-Z ]*$/, "Name should contain only alphabets")
    .max(20),
  experience: Yup.string()
    .required("Please enter Experience")
    .min(1, "Experience too short should contain at least 1 characters.")
    .max(8, "Experience too long should contain at most 8 characters."),
  mobile: Yup.string()
    .min(10, "Mobile Number too short should contain at least 10 characters.")
    .matches(/^[0-9]{10,10}$/, "It contains only positive integers")
    .required("Please enter the Mobile Number to move ahead"),
  empId: Yup.string()
    .min(5, "Employee ID too short should contain at least 5 characters.")
    .required("Please enter the Employee ID to move ahead"),
  salary: Yup.string()
    .min(1, "Employee ID too short should contain at least 1 characters.")
    .required("Please enter the Salary to move ahead"),
  email: Yup.string()
    .email("It can contain alphanumeric characters.It should contain @")
    .required("Please enter the Email ID to move ahead"),
  techStack: Yup.string().required(
    "Please select the Tech Stack to move ahead"
  ),
  workMode: Yup.string().required(
    "Please select the Work Mode to move ahead"
  ),
  designation: Yup.string().required(
    "Please select the Designation to move ahead"
  ),
});


export const profileBasicDetailSchema = Yup.object({
  fName: Yup.string()
    .required("Please enter First Name")
    .matches(/^[a-zA-Z ]*$/, "First Name should contain only alphabets")
    .max(20),
  lName: Yup.string()
    .required("Please enter Last Name")
    .matches(/^[a-zA-Z ]*$/, "Last Name should contain only alphabets")
    .max(20),
  dob: Yup.string().required(
    "Please enter DOB to move ahead"
  ),
  totalWorkingMonth: Yup.string().required(
    "Please enter Total Working Month to move ahead"
  ),
  totalWorkingYear: Yup.string().required(
    "Please enter Total Working Year to move ahead"
  ),
  relevantWorkingMonth: Yup.string().required(
    "Please enter Relevant Working Month to move ahead"
  ),
  relevantWorkingYear: Yup.string().required(
    "Please enter Relevant Working Year to move ahead"
  ),
  address: Yup.string().required(
    "Please enter address to move ahead"
  ),
});


export const profileQualificationSchema = Yup.object({
  university: Yup.string()
    .required("Please enter First Name")
    .matches(/^[a-zA-Z ]*$/, "First Name should contain only alphabets")
    .max(20),
  educationLevel: Yup.string()
    .required("Please enter Last Name")
    .matches(/^[a-zA-Z ]*$/, "Last Name should contain only alphabets")
    .max(20),
  specialization: Yup.string().required(
    "Please enter DOB to move ahead"
  ),
  timePeriodFrom: Yup.string().required(
    "Please enter Total Working Month to move ahead"
  ),
  timePeriodTo: Yup.string().required(
    "Please enter Total Working Year to move ahead"
  ),
  scoreObtain: Yup.string().required(
    "Please enter Relevant Working Month to move ahead"
  ),
  totalScore: Yup.string().required(
    "Please enter Relevant Working Year to move ahead"
  ),
});



export const addIndirectExpenseSchema = Yup.object({
  description: Yup.string()
    .required("Please enter the Description to move ahead")
    .min(200, "The Description should be at least 200 characters."),
  amount: Yup.string()
    .required("Please enter the Amount to move ahead")
    .matches(
      /^[0-9]{1,10}$/,
      "It should contain positive integers only. No space is allowed"
    ),
  date: Yup.date()
    .typeError("Please select a valid Date")
    .required("Please select the Date to move ahead"),
  expenseType: Yup.string().required(
    "Please select the Expense Type to move ahead"
  ),
});

export const addPaymentSchema = Yup.object({
  remark: Yup.string()
    .required("Please enter the Remark to move ahead")
    .min(200, "The Remark should be at least 200 characters."),
  amount: Yup.string()
    .required("Please enter the Amount to move ahead")
    .matches(
      /^[0-9]{1,10}$/,
      "It should contain positive integers only. No space is allowed"
    ),
  date: Yup.date()
    .typeError("Please select a valid Date")
    .required("Please select the Date to move ahead"),
  month: Yup.string().required("Please select the Month to move ahead"),
});
