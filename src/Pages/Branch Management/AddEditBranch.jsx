import { Button, Grid, } from '@mui/material'
import '../../assets/css/global-style.scss'
import { ArrowBackIos, } from '@mui/icons-material'
import InputBox from 'components/Input box'
import { useFormik } from 'formik'
import ArgonButton from 'components/ArgonButton'
import DropownCustom from 'components/Dropdown-custom/DropdownCustom'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSubjectDropdown } from 'Hooks/useDropdowns'
import { addBranchSchema } from 'services/yup-validation-schemas'
import { toasterMessage } from 'constants/toasterMessage'
import { apiurl } from 'constants/apiURLsConstants'
import routerConstants from 'constants/routerConstants'
import toaster from 'utility/toaster/toaster'
import { putRequest } from 'services/axios-api-request/axios_api_Request'
import { postRequest } from 'services/axios-api-request/axios_api_Request'
import { useState } from 'react'
import Loader from 'components/loader/Loader'
import { handleInputChange } from 'utility/common'


const AddEditBranch = ({ type }) => {
    // ************ for navigation *************
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)

    // ********* data reciever for view and edit ******** 
    const { state: branchData } = useLocation();

    // ********* fetch subject dropdown list using custom hook *******
    const { data: subjectDropdownList } = useSubjectDropdown();

    // ************ initial values for add edit and view ************
    const initialValues = {
        subject: branchData?.subject_id ?? '',
        branch_name: branchData?.branch_name ?? '',
        branch_id: branchData?.branch_id ?? '',
    };

    // *********** formik to handle form ***********
    const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
        useFormik({
            initialValues,
            validationSchema: addBranchSchema,
            onSubmit: (values, action) => {
                handleSave(values);
            },
        });


    // ********** handle save and update ********
    const handleSave = async (values) => {
        const data = {
            subject_id: values.subject,
            name: values?.branch_name?.trim(),
            branch_id: values?.branch_id?.trim()
        }
        if (!isLoading) {
            if (type === 'add') {
                setIsLoading(true);
                const res = await postRequest(apiurl?.BRANCH_ADD_URL, data)
                if (res?.data?.success) {
                    setIsLoading(false);
                    toaster('success', toasterMessage?.ADD_BRANCH_SUCCESS);
                    navigate(routerConstants?.branchManagementRoute);
                }
                else {
                    setIsLoading(false);
                    toaster('error', res?.data?.message);
                }
            }
            else if (type === 'edit') {
                setIsLoading(true);
                const res = await putRequest(`${apiurl?.BRANCH_EDIT_URL}/${branchData?._id}`, data)
                if (res?.data?.success) {
                    setIsLoading(false);
                    toaster('success', toasterMessage?.EDIT_BRANCH_SUCCESS);
                    navigate(routerConstants?.branchManagementRoute);
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
                        <p><ArrowBackIos onClick={() => navigate(-1)} /><span>{type === 'add' ? 'Add Branch' : type === 'edit' ? 'Edit Branch' : 'View Branch'}</span></p>
                    </Grid>
                    <form onSubmit={handleSubmit} className='add-edit-screen-form-container mt-20'>
                        <Grid className='add-edit-screen-input-row'>

                            <Grid className='add-edit-screen-input-container'>
                                <p>Select Subject</p>
                                <DropownCustom
                                    label={'Select Subject'}
                                    value={values.subject}
                                    handleBlur={handleBlur}
                                    name={'subject'}
                                    handleChange={handleChange}
                                    dropdownKeysArray={subjectDropdownList?.data?.result?.rows?.map((item) => item?._id) ?? []}
                                    dropdownListArray={subjectDropdownList?.data?.result?.rows?.map((item) => item?.name) ?? []}
                                    disabledOption={type === 'view'}
                                />
                                {errors.subject && touched.subject ? (
                                    <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.subject.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.subject}</p></Grid>
                                ) : null}
                            </Grid>

                            <Grid className='add-edit-screen-input-container'>
                                <p>Branch Name</p>
                                <InputBox
                                    placeholder={'Enter Branch Name'}
                                    name={'branch_name'}
                                    id={'add-subject-branch_name'}
                                    type={'text'}
                                    handleChange={(e) => handleInputChange(e, handleChange)}
                                    handleBlur={handleBlur}
                                    value={values.branch_name}
                                    disable={type === 'view'}
                                    maxLength={100}
                                />
                                {errors.branch_name && touched.branch_name ? (
                                    <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.branch_name.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.branch_name}</p></Grid>
                                ) : null}
                            </Grid>
                            <Grid className='add-edit-screen-input-container'>
                                <p>Branch ID</p>
                                <InputBox
                                    placeholder={'Enter Branch ID'}
                                    name={'branch_id'}
                                    id={'add-subject-branch_id'}
                                    type={'text'}
                                    handleChange={(e) => handleInputChange(e, handleChange)}
                                    handleBlur={handleBlur}
                                    value={values.branch_id}
                                    disable={type === 'view'}
                                    maxLength={25}
                                />
                                {errors.branch_id && touched.branch_id ? (
                                    <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.branch_id.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.branch_id}</p></Grid>
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
                                        isLoading ? <Loader dotsColor={'black'} /> :
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

export default AddEditBranch