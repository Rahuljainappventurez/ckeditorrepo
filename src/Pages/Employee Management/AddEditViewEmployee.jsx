import { Button, Grid, } from '@mui/material'
import React, { useState } from 'react'
import '../../assets/css/global-style.scss'
import { ArrowBackIos } from '@mui/icons-material'
import InputBox from 'components/Input box'
import { useFormik } from 'formik'
import ArgonButton from 'components/ArgonButton'
import { useLocation, useNavigate } from 'react-router-dom'
import CheckboxCustom from 'components/CheckboxCustom/CheckboxCustom'
import DropownCustom from 'components/Dropdown-custom/DropdownCustom'
import { postRequest } from 'services/axios-api-request/axios_api_Request'
import { apiurl } from 'constants/apiURLsConstants'
import toaster from 'utility/toaster/toaster'
import { toasterMessage } from 'constants/toasterMessage'
import routerConstants from 'constants/routerConstants'
import { putRequest } from 'services/axios-api-request/axios_api_Request'
import { addEmployeeSchema } from 'services/yup-validation-schemas'
import { useRoleAssignDropdownRole } from 'Hooks/useDropdowns'
import Loader from 'components/loader/Loader'
import { handleChangeOnlyAlphabetsInput } from 'utility/common'
import { handleChangeEmailInput } from 'utility/common'



const AddEditViewEmployee = ({ type }) => {
    // ************ for navigation *************
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    // ********* data reciever for view and edit ******** 
    const { state: employeeData } = useLocation();

    console.log(employeeData,'cefnendif3er3')

    // ************** checkbox for data entry oprator ************
    const [checkboxChecked, setCheckboxChecked] = useState(employeeData?.is_data_entry_operator ?? false);
    const checkboxHandleChange = () => {
        setCheckboxChecked(event.target.checked);
    }

    // ************ initial values for add edit and view ************
    const initialValues = {
        employee_name: employeeData?.employee_name ?? '',
        access_level: employeeData?.role ?? '',
        team_lead: employeeData?.team_lead_id ?? '',
        email: employeeData?.email ?? '',
    };

    // *********** formik to handle form ***********
    const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
        useFormik({
            initialValues,
            validationSchema: addEmployeeSchema,
            onSubmit: (values, action) => {
                handleSave(values);
            },
        });

    // ********* fetch role assign dropdown list using custom hook *******
    const { data: roleAssignDropdownList } = useRoleAssignDropdownRole('team lead', values?.access_level === 'others');

    // ********** handle save and update ********
    const handleSave = async (values) => {
        const data = {
            name: values.employee_name,
            role: values?.access_level,
            email: values?.email,
        }

        if (!isLoading) {
            if (type === 'add') {
                let dataForAdd;
                if (values?.access_level === 'others') {
                    if (values?.team_lead === '') {
                        toaster('error', 'Please select Team Lead')
                        return;
                    }
                    dataForAdd = {
                        ...data,
                        team_lead_id: values?.team_lead,
                        is_data_entry_operator: checkboxChecked,
                    }
                }
                else {
                    dataForAdd = {
                        ...data,
                    }
                }
                setIsLoading(true);
                const res = await postRequest(apiurl?.EMPLOYEE_ADD_URL, dataForAdd)
                if (res?.data?.success) {
                    setIsLoading(false);
                    toaster('success', toasterMessage?.ADD_EMPLOYEE_SUCCESS);
                    navigate(routerConstants?.employeeManagementRoute);
                }
                else {
                    setIsLoading(false);
                    toaster('error', res?.data?.message);
                }
            }
            else if (type === 'edit') {
                let dataForEdit;
                if (values?.access_level === 'others') {
                    if (values?.team_lead === '') {
                        toaster('error', 'Please select Team Lead')
                        return;
                    }
                    dataForEdit = {
                        ...data,
                        team_lead_id: values?.team_lead,
                        is_data_entry_operator: checkboxChecked,
                        team_lead_id: values?.team_lead,
                    }
                }
                else {
                    dataForEdit = {
                        ...data,
                    }
                }
                setIsLoading(true);
                const res = await putRequest(`${apiurl?.EMPLOYEE_EDIT_URL}/${employeeData?._id}`, dataForEdit)
                if (res?.data?.success) {
                    setIsLoading(false);
                    toaster('success', toasterMessage?.EDIT_EMPLOYEE_SUCCESS);
                    navigate(routerConstants?.employeeManagementRoute);
                }
                else {
                    setIsLoading(false);
                    toaster('error', res?.data?.message);
                }
            }
        }
    }

    return (
        <Grid className='page-main-container-layout'>
            <Grid className='screen-white-container'>
                <Grid className='add-edit-screen-wrapper'>
                    <Grid className='add-edit-screen-top-container'>
                        <p><ArrowBackIos onClick={() => navigate(-1)} /><span>{(type === 'add') ? 'Add Employee' : (type === 'edit') ? 'Edit Employee' : 'View Employee'}</span></p>
                    </Grid>
                    <form onSubmit={handleSubmit} className='add-edit-screen-form-container mt-20'>

                        <Grid className='add-edit-screen-input-row'>
                            <Grid className='add-edit-screen-input-container'>
                                <p>Employee Name</p>
                                <InputBox
                                    placeholder={'Enter Name'}
                                    name={'employee_name'}
                                    id={'add-employee-employee_name'}
                                    type={'text'}
                                    handleChange={(e) => handleChangeOnlyAlphabetsInput(e, handleChange,true)}
                                    handleBlur={handleBlur}
                                    value={values.employee_name}
                                    disable={type === 'view'}
                                    maxLength={100}
                                />
                                {errors.employee_name && touched.employee_name ? (
                                    <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.employee_name.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.employee_name}</p></Grid>
                                ) : null}
                            </Grid>
                            <Grid className='add-edit-screen-input-container'>
                                <p>Select Access Level</p>
                                <DropownCustom
                                    label={'Select Access Level'}
                                    value={values.access_level}
                                    handleBlur={handleBlur}
                                    name={'access_level'}
                                    handleChange={handleChange}
                                    dropdownKeysArray={['content admin', 'team lead', 'others']}
                                    dropdownListArray={['Content Admin', 'Team Lead', 'Others']}
                                    disabledOption={type === 'view'}
                                />
                                {errors.access_level && touched.access_level ? (
                                    <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.access_level.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.access_level}</p></Grid>
                                ) : null}
                            </Grid>
                            {(values.access_level === 'others') &&
                                <Grid>
                                    <p style={{ visibility: 'hidden' }}>Source Name</p>
                                    <CheckboxCustom
                                        handleChange={checkboxHandleChange}
                                        checked={checkboxChecked}
                                        disabled={type === 'view'}
                                        label={'Data Entry Operator'}
                                    />
                                </Grid>
                            }

                            {(values.access_level === 'others') &&
                                <Grid className='add-edit-screen-input-container'>
                                    <p>Select Team Lead</p>
                                    <DropownCustom
                                        label={'Select Team Lead'}
                                        value={values.team_lead}
                                        handleBlur={handleBlur}
                                        name={'team_lead'}
                                        handleChange={handleChange}
                                        dropdownKeysArray={roleAssignDropdownList?.data?.result?.map((item) => item?._id) ?? []}
                                        dropdownListArray={roleAssignDropdownList?.data?.result?.map((item) => item?.name) ?? []}
                                        disabledOption={type === 'view'}
                                    />
                                    {errors.team_lead && touched.team_lead ? (
                                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.team_lead.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.team_lead}</p></Grid>
                                    ) : null}
                                </Grid>
                            }

                            <Grid className='add-edit-screen-input-container'>
                                <p>Email Address</p>
                                <InputBox
                                    placeholder={'Enter Email Address'}
                                    name={'email'}
                                    id={'add-employee-email'}
                                    type={'text'}
                                    handleChange={(e) => handleChangeEmailInput(e, handleChange)}
                                    handleBlur={handleBlur}
                                    value={values.email}
                                    disable={type === 'view' ? true : false}
                                />
                                {errors.email && touched.email ? (
                                    <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.email.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.email}</p></Grid>
                                ) : null}
                            </Grid>

                        </Grid>


                        <Grid display={'flex'} style={{ visibility: `${type === 'view' ? 'hidden' : ''}`, justifyContent: 'flex-end' }}>
                            <Grid style={{ display: 'flex', gap: '20px' }}>
                                <ArgonButton
                                    component={Button}
                                    variant="gradient"
                                    size="large"
                                    color={'error'}
                                    disableHover={true}
                                    onClick={() => navigate(-1)}
                                >
                                    {'Cancel'}
                                </ArgonButton>
                                <ArgonButton
                                    component={Button}
                                    variant="gradient"
                                    size="large"
                                    color={'secondary'}
                                    type={'submit'}
                                    disableHover={true}
                                >
                                    {
                                        isLoading ? <Loader dotsColor='black' /> :
                                            type === 'add' ? 'Save' : 'Update'
                                    }
                                </ArgonButton>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default AddEditViewEmployee