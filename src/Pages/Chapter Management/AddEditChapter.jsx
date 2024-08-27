import { Button, Grid, } from '@mui/material'
import React, { useEffect, useState } from 'react'
import '../../assets/css/global-style.scss'
import { ArrowBackIos, } from '@mui/icons-material'
import InputBox from 'components/Input box'
import { useFormik } from 'formik'
import ArgonButton from 'components/ArgonButton'
import DropownCustom from 'components/Dropdown-custom/DropdownCustom'
import { useLocation, useNavigate } from 'react-router-dom'
import BulkUploadDialog from 'components/Bulk-upload Dialog/BulkUploadDialog'
import { useSubjectDropdown } from 'Hooks/useDropdowns'
import { postRequest } from 'services/axios-api-request/axios_api_Request'
import toaster from 'utility/toaster/toaster'
import { toasterMessage } from 'constants/toasterMessage'
import routerConstants from 'constants/routerConstants'
import { putRequest } from 'services/axios-api-request/axios_api_Request'
import { addChapterSchema } from 'services/yup-validation-schemas'
import { useClassDropdown } from 'Hooks/useDropdowns'
import { useBranchDropdown } from 'Hooks/useDropdowns'
import { apiurl } from 'constants/apiURLsConstants'
import Loader from 'components/loader/Loader'
import { handleInputChange } from 'utility/common'


const AddEditChapter = ({ type }) => {
    // ************ for navigation *************
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    // ********* data reciever for view and edit ******** 
    const { state: chapterData } = useLocation();

    // ********* fetch dropdown list using custom hook *******
    const { data: subjectDropdownList } = useSubjectDropdown();
    const { data: classDropdownList } = useClassDropdown();

    // *********** for bulk upload *********
    const [openBulkUpload, setOpenBulkUpload] = useState(false);

    // ************ initial values for add edit and view ************
    const initialValues = {
        subject: chapterData?.subject_id ?? '',
        branch: chapterData?.branch_id ?? '',
        class: chapterData?.class_id ?? '',
        chapter_name: chapterData?.chapter_name ?? '',
        chapter_id: chapterData?.chapter_id ?? '',
    };

    // *********** formik to handle form ***********
    const { values, handleChange, handleBlur, handleSubmit, setFieldValue, errors, touched } =
        useFormik({
            initialValues,
            validationSchema: addChapterSchema,
            onSubmit: (values, action) => {
                handleSave(values);
            },
        });


    // ************* Handle subject change to reset the branch ************
    const handleSubjectChange = (e) => {
        handleChange(e); // Update the subject value
        setFieldValue('branch', ''); // Reset the branch value
    };



    // ********* fetch branch dropdown list using custom hook *******
    const { data: branchDropdownList } = useBranchDropdown(values?.subject);

    // ********** handle save and update ********
    const handleSave = async (values) => {
        const data = {
            subject_id: values.subject,
            branch_id: values.branch,
            class_id: values.class,
            name: values?.chapter_name?.trim(),
            chapter_id: values?.chapter_id?.trim(),
        }
        if (!isLoading) {
            if (type === 'add') {
                setIsLoading(true);
                const res = await postRequest(apiurl?.CHAPTER_ADD_URL, data)
                if (res?.data?.success) {
                    setIsLoading(false);
                    toaster('success', toasterMessage?.ADD_CHAPTER_SUCCESS);
                    navigate(routerConstants?.chapterManagementRoute);
                }
                else {
                    setIsLoading(false);
                    toaster('error', res?.data?.message);
                }
            }
            else if (type === 'edit') {
                setIsLoading(true);
                const res = await putRequest(`${apiurl?.CHAPTER_EDIT_URL}/${chapterData?._id}`, data)
                if (res?.data?.success) {
                    setIsLoading(false);
                    toaster('success', toasterMessage?.EDIT_CHAPTER_SUCCESS);
                    navigate(routerConstants?.chapterManagementRoute);
                }
                else {
                    setIsLoading(false);
                    toaster('error', res?.data?.message);
                }
            }
        }
    }

    return (
        <>
            <Grid className='page-main-container-layout'>
                <Grid className='screen-white-container'>
                    <Grid className='add-edit-screen-wrapper'>
                        <Grid className='add-edit-screen-top-container'>
                            <p><ArrowBackIos onClick={() => navigate(-1)} /><span>{type === 'add' ? 'Add Chapter' : type === 'edit' ? 'Edit Chapter' : 'View Chapter'}</span></p>
                            {(type === 'add') && <Grid className='page-text-buttons-with-table'>
                                <ArgonButton
                                    component={Button}
                                    variant="gradient"
                                    size="medium"
                                    color={'success'}
                                    disableHover={true}
                                    onClick={() => setOpenBulkUpload(!openBulkUpload)}

                                >
                                    {'Bulk Upload'}
                                </ArgonButton>
                            </Grid>}
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
                                        handleChange={handleSubjectChange}
                                        dropdownKeysArray={subjectDropdownList?.data?.result?.rows?.map((item) => item?._id) ?? []}
                                        dropdownListArray={subjectDropdownList?.data?.result?.rows?.map((item) => item?.name) ?? []}
                                        disabledOption={type === 'view'}
                                    />
                                    {errors.subject && touched.subject ? (
                                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.subject.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.subject}</p></Grid>
                                    ) : null}
                                </Grid>
                                <Grid className='add-edit-screen-input-container'>
                                    <p>Select Branch</p>
                                    <DropownCustom
                                        label={'Select Branch'}
                                        value={values.branch}
                                        handleBlur={handleBlur}
                                        name={'branch'}
                                        handleChange={handleChange}
                                        dropdownKeysArray={branchDropdownList?.data?.result?.rows?.map((item) => item?._id) ?? []}
                                        dropdownListArray={branchDropdownList?.data?.result?.rows?.map((item) => item?.name) ?? []}
                                        disabledOption={type === 'view'}
                                        dependentDisable={values?.subject === ''}
                                    />
                                    {errors.branch && touched.branch ? (
                                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.branch.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.branch}</p></Grid>
                                    ) : null}
                                </Grid>
                                <Grid className='add-edit-screen-input-container'>
                                    <p>Select Class</p>
                                    <DropownCustom
                                        label={'Select Class'}
                                        value={values.class}
                                        handleBlur={handleBlur}
                                        name={'class'}
                                        handleChange={handleChange}
                                        dropdownKeysArray={classDropdownList?.data?.result?.map((item) => item?._id) ?? []}
                                        dropdownListArray={classDropdownList?.data?.result?.map((item) => item?.name) ?? []}
                                        disabledOption={type === 'view'}
                                    />
                                    {errors.class && touched.class ? (
                                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.class.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.class}</p></Grid>
                                    ) : null}
                                </Grid>
                                <Grid className='add-edit-screen-input-container'>
                                    <p>Chapter Name</p>
                                    <InputBox
                                        placeholder={'Enter Chapter Name'}
                                        name={'chapter_name'}
                                        id={'add-subject-chapter_name'}
                                        type={'text'}
                                        handleChange={(e) => handleInputChange(e, handleChange)}
                                        handleBlur={handleBlur}
                                        value={values.chapter_name}
                                        disable={type === 'view'}
                                        maxLength={100}
                                    />
                                    {errors.chapter_name && touched.chapter_name ? (
                                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.chapter_name.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.chapter_name}</p></Grid>
                                    ) : null}
                                </Grid>
                                <Grid className='add-edit-screen-input-container'>
                                    <p>Chapter ID</p>
                                    <InputBox
                                        placeholder={'Enter Chapter ID'}
                                        name={'chapter_id'}
                                        id={'add-subject-chapter_id'}
                                        type={'text'}
                                        handleChange={(e) => handleInputChange(e, handleChange)}
                                        handleBlur={handleBlur}
                                        value={values.chapter_id}
                                        disable={type === 'view'}
                                        maxLength={25}
                                    />
                                    {errors.chapter_id && touched.chapter_id ? (
                                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.chapter_id.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.chapter_id}</p></Grid>
                                    ) : null}
                                </Grid>


                            </Grid>
                            <Grid style={{ display: `${type === 'view' ? 'none' : 'flex'}`, justifyContent: 'flex-end' }}>
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
            {
                openBulkUpload &&
                <BulkUploadDialog
                    open={openBulkUpload}
                    setOpen={setOpenBulkUpload}
                    bulkUploadId={'add-chapter-bulk-upload'}
                    downloadCSV_apiUrl={apiurl?.SAMPLE_CSV_DOWNLOAD_URL}
                    CSV_sampleType={'chapters'}
                    downloadCSV_SuccessMsg={toasterMessage?.DOWNLOAD_CHAPTER_SAMPLE_CSV_SUCCESS}
                    bulkUpload_apiUrl={apiurl?.CHAPTER_BULK_UPLOAD_URL}
                    bulkUploadSuccessMsg={toasterMessage?.BULK_UPLOAD_CHAPTER_SUCCESS}
                />
            }
        </>
    )
}

export default AddEditChapter