import { Button, Grid, } from '@mui/material'
import React, { useState } from 'react'
import '../../assets/css/global-style.scss'
import { ArrowBackIos, } from '@mui/icons-material'
import InputBox from 'components/Input box'
import { useFormik } from 'formik'
import ArgonButton from 'components/ArgonButton'
import DropownCustom from 'components/Dropdown-custom/DropdownCustom'
import { useLocation, useNavigate } from 'react-router-dom'
import BulkUploadDialog from 'components/Bulk-upload Dialog/BulkUploadDialog'
import { postRequest } from 'services/axios-api-request/axios_api_Request'
import { apiurl } from 'constants/apiURLsConstants'
import toaster from 'utility/toaster/toaster'
import { toasterMessage } from 'constants/toasterMessage'
import routerConstants from 'constants/routerConstants'
import { putRequest } from 'services/axios-api-request/axios_api_Request'
import { useSubjectDropdown } from 'Hooks/useDropdowns'
import { useChapterDropdownSubject } from 'Hooks/useDropdowns'
import { useSourceDropdown } from 'Hooks/useDropdowns'
import { useSubSourceDropdownSource } from 'Hooks/useDropdowns'
import { addSourceChapterSchema } from 'services/yup-validation-schemas'
import { stringToBoolean } from 'utility/common'
import Loader from 'components/loader/Loader'
import { handleChangeOnlyNumbersInput } from 'utility/common'
import { handleInputChange } from 'utility/common'


const AddEditSourceChapter = ({ type }) => {
    // ************ for navigation *************
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    // ************ for bulk upload *************
    const [openBulkUpload, setOpenBulkUpload] = useState(false);

    // ********* data reciever for view and edit ******** 
    const { state: sourceChapterData } = useLocation();

    // ********* fetch dropdown list using custom hook *******
    const { data: subjectDropdownList } = useSubjectDropdown();
    const { data: sourceDropdownList } = useSourceDropdown();


    // ************ initial values for add, edit and view ************
    const initialValues = {
        subject: (sourceChapterData?.subject_id && sourceChapterData?.subject_name) ? `${sourceChapterData?.subject_name}+${sourceChapterData?.subject_id}` : '',
        source: (sourceChapterData?.source_id && sourceChapterData?.source_name) ? `${sourceChapterData?.source_name}+${sourceChapterData?.source_id}+${sourceChapterData?.is_test_series}` : '',
        chapter: (sourceChapterData?.chapter_id && sourceChapterData?.chapter_name) ? `${sourceChapterData?.chapter_name}+${sourceChapterData?.chapter_id}` : '',
        no_of_questions: sourceChapterData?.no_of_questions ?? '',
        sub_source: (sourceChapterData?.sub_source_id && sourceChapterData?.sub_source_name) ? `${sourceChapterData?.sub_source_name}+${sourceChapterData?.sub_source_id}` : '',
        question_link: sourceChapterData?.question_link ?? '',
        ncert_link: sourceChapterData?.ncert_link ?? '',
        solution_link: sourceChapterData?.solution_link ?? '',
    };


    // *********** formik to handle form ***********
    const { values, handleChange, handleBlur, handleSubmit, setFieldValue, errors, touched } =
        useFormik({
            initialValues,
            validationSchema: addSourceChapterSchema,
            onSubmit: (values, action) => {
                handleSave(values);
            },
        });


    // ************* Handle source change to reset the subject,chapter and sub-source ************
    const handleSourceChange = (e) => {
        handleChange(e);
        setFieldValue('subject', '');
        setFieldValue('chapter', '');
        setFieldValue('sub_source', '');
    };

    // ************* Handle source change to reset the subject,chapter and sub-source ************
    const handleSubjectChange = (e) => {
        handleChange(e);
        setFieldValue('chapter', '');
    };


    // ********* fetch chapter dropdown list using custom hook *******
    const { data: chapterDropdownList } = useChapterDropdownSubject(values?.subject ? (values?.subject).split('+')[1] : '');
    const { data: subSourceDropdownList } = useSubSourceDropdownSource(values?.source ? (values?.source)?.split('+')[1] : '', stringToBoolean(values?.source?.split('+')[2]));

    // ********** handle save and update ********
    const handleSave = async (values) => {
        const data = {
            source_id: values?.source?.split('+')[1],
            source_name: values?.source?.split('+')[0],
            number_of_questions: values?.no_of_questions,
            question_link: values?.question_link?.trim(),
            solution_link: values?.solution_link?.trim(),
            ncert_link: values?.ncert_link?.trim(),
            is_test_series: stringToBoolean(values?.source?.split('+')[2]),
        }

        if (!isLoading) {
            if (type === 'add') {
                let dataForAdd;
                if (!stringToBoolean(values?.source?.split('+')[2])) {
                    if (!values?.subject) {
                        toaster('error', 'Please select the Subject');
                        return;
                    }
                    else if (!values?.chapter) {
                        toaster('error', 'Please select the Chapter');
                        return;
                    }
                    dataForAdd = {
                        ...data,
                        subject_id: values?.subject?.split('+')[1],
                        subject_name: values?.subject?.split('+')[0],
                        chapter_id: values?.chapter?.split('+')[1],
                        chapter_name: values?.chapter?.split('+')[0],
                    }
                }
                else {
                    if (!values?.sub_source) {
                        toaster('error', 'Please select the Sub-Source');
                        return;
                    }
                    dataForAdd = {
                        ...data,
                        sub_source_id: values?.sub_source?.split('+')[1],
                        sub_source_name: values?.sub_source?.split('+')[0],
                    }
                }
                setIsLoading(true);
                const res = await postRequest(apiurl?.SOURCE_CHAPTER_ADD_URL, dataForAdd)
                if (res?.data?.success) {
                    setIsLoading(false);
                    toaster('success', toasterMessage?.ADD_SOURCE_CHAPTER_SUCCESS);
                    navigate(routerConstants?.sourceChapterManagementRoute);
                }
                else {
                    setIsLoading(false);
                    toaster('error', res?.data?.message);
                }
            }
            else if (type === 'edit') {
                let editedData;
                if (!stringToBoolean(values?.source?.split('+')[2])) {
                    if (!values?.subject) {
                        toaster('error', 'Please select the Subject');
                        return;
                    }
                    else if (!values?.chapter) {
                        toaster('error', 'Please select the Chapter');
                        return;
                    }
                    editedData = {
                        ...data,
                        subject_id: values?.subject?.split('+')[1],
                        subject_name: values?.subject?.split('+')[0],
                        chapter_id: values?.chapter?.split('+')[1],
                        chapter_name: values?.chapter?.split('+')[0],
                    }
                }
                else {
                    if (!values?.sub_source) {
                        toaster('error', 'Please select the Sub-Source');
                        return;
                    }
                    editedData = {
                        ...data,
                        sub_source_id: values?.sub_source?.split('+')[1],
                        sub_source_name: values?.sub_source?.split('+')[0],
                    }
                }
                setIsLoading(true);
                const res = await putRequest(`${apiurl?.SOURCE_CHAPTER_EDIT_URL}/${sourceChapterData?._id}`, editedData)
                if (res?.data?.success) {
                    setIsLoading(false);
                    toaster('success', toasterMessage?.EDIT_SOURCE_CHAPTER_SUCCESS);
                    navigate(routerConstants?.sourceChapterManagementRoute);
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
                            <p><ArrowBackIos onClick={() => navigate(-1)} /><span>{type === 'add' ? 'Add Source Chapter' : type === 'edit' ? 'Edit Source Chapter' : 'View Source Chapter'}</span></p>
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
                                    <p>Select Source</p>
                                    <DropownCustom
                                        label={'Select Source'}
                                        value={values.source}
                                        handleBlur={handleBlur}
                                        name={'source'}
                                        handleChange={handleSourceChange}
                                        dropdownKeysArray={sourceDropdownList?.data?.result?.rows?.map((item) => `${item?.name}+${item?._id}+${item?.is_test_series}`) ?? []}
                                        dropdownListArray={sourceDropdownList?.data?.result?.rows?.map((item) => item?.name) ?? []}
                                        disabledOption={type === 'view'}
                                    // dependentDisable={type === 'edit'}
                                    />
                                    {errors.source && touched.source ? (
                                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.source.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.source}</p></Grid>
                                    ) : null}
                                </Grid>

                                <Grid className='add-edit-screen-input-container'>
                                    <p>Select Subject</p>
                                    <DropownCustom
                                        label={'Select Subject'}
                                        value={values.subject}
                                        handleBlur={handleBlur}
                                        name={'subject'}
                                        handleChange={handleSubjectChange}
                                        dropdownKeysArray={subjectDropdownList?.data?.result?.rows?.map((item) => `${item?.name}+${item?._id}`) ?? []}
                                        dropdownListArray={subjectDropdownList?.data?.result?.rows?.map((item) => item?.name) ?? []}
                                        disabledOption={type === 'view'}
                                        dependentDisable={stringToBoolean(values?.source?.split('+')[2]) || values?.source === ''}
                                    />
                                    {errors.subject && touched.subject ? (
                                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.subject.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.subject}</p></Grid>
                                    ) : null}
                                </Grid>

                                <Grid className='add-edit-screen-input-container'>
                                    <p>Select Chapter</p>
                                    <DropownCustom
                                        label={'Select Chapter'}
                                        value={values.chapter}
                                        handleBlur={handleBlur}
                                        name={'chapter'}
                                        handleChange={handleChange}
                                        dropdownKeysArray={chapterDropdownList?.data?.result?.rows?.map((item) => `${item?.name}+${item?._id}`) ?? []}
                                        dropdownListArray={chapterDropdownList?.data?.result?.rows?.map((item) => item?.name) ?? []}
                                        disabledOption={type === 'view'}
                                        dependentDisable={stringToBoolean(values?.source?.split('+')[2]) || values?.subject === ''}
                                    />
                                    {errors.chapter && touched.chapter ? (
                                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.chapter.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.chapter}</p></Grid>
                                    ) : null}
                                </Grid>
                                {(stringToBoolean(values?.source.split('+')[2])) &&
                                    <Grid className='add-edit-screen-input-container'>
                                        <p>Select Sub Source</p>
                                        <DropownCustom
                                            label={'Select Sub Source'}
                                            value={values.sub_source}
                                            handleBlur={handleBlur}
                                            name={'sub_source'}
                                            handleChange={handleChange}
                                            dropdownKeysArray={subSourceDropdownList?.data?.result?.rows?.map((item) => `${item?.name}+${item?._id}`) ?? []}
                                            dropdownListArray={subSourceDropdownList?.data?.result?.rows?.map((item) => item?.name) ?? []}
                                            disabledOption={type === 'view'}
                                        />
                                        {errors.sub_source && touched.sub_source ? (
                                            <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.sub_source.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.sub_source}</p></Grid>
                                        ) : null}
                                    </Grid>
                                }
                                <Grid className='add-edit-screen-input-container'>
                                    <p>Enter Number of Questions</p>
                                    <InputBox
                                        placeholder={'Enter Number of Questions'}
                                        name={'no_of_questions'}
                                        id={'add-source-chapter-no_of_questions'}
                                        type={'text'}
                                        handleChange={(e) => handleChangeOnlyNumbersInput(e, handleChange)}
                                        handleBlur={handleBlur}
                                        value={values.no_of_questions}
                                        disable={type === 'view'}
                                        maxLength={10}
                                    />
                                    {errors.no_of_questions && touched.no_of_questions ? (
                                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.no_of_questions.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.no_of_questions}</p></Grid>
                                    ) : null}
                                </Grid>


                            </Grid>

                            <Grid className='add-edit-screen-input-row'>

                                <Grid className='add-edit-screen-input-container' style={{ width: 'calc((100% - (40px + (100% - 80px)/3)))' }}>
                                    <p>Question Link</p>
                                    <InputBox
                                        placeholder={'Enter Link'}
                                        name={'question_link'}
                                        id={'add-source-chapter-question_link'}
                                        type={'text'}
                                        handleChange={(e) => handleInputChange(e, handleChange)}
                                        handleBlur={handleBlur}
                                        value={values.question_link}
                                        disable={type === 'view'}
                                    />
                                    {errors.question_link && touched.question_link ? (
                                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.question_link.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.question_link}</p></Grid>
                                    ) : null}
                                </Grid>
                                <Grid className='add-edit-screen-input-container' style={{ width: 'calc((100% - (40px + (100% - 80px)/3)))' }}>
                                    <p>NCERT Link</p>
                                    <InputBox
                                        placeholder={'Enter Link'}
                                        name={'ncert_link'}
                                        id={'add-source-chapter-ncert_link'}
                                        type={'text'}
                                        handleChange={(e) => handleInputChange(e, handleChange)}
                                        handleBlur={handleBlur}
                                        value={values.ncert_link}
                                        disable={type === 'view'}
                                    />
                                    {errors.ncert_link && touched.ncert_link ? (
                                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.ncert_link.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.ncert_link}</p></Grid>
                                    ) : null}
                                </Grid>
                                <Grid className='add-edit-screen-input-container' style={{ width: 'calc((100% - (40px + (100% - 80px)/3)))' }}>
                                    <p>Solution Link</p>
                                    <InputBox
                                        placeholder={'Enter Link'}
                                        name={'solution_link'}
                                        id={'add-source-chapter-solution_link'}
                                        type={'text'}
                                        handleChange={(e) => handleInputChange(e, handleChange)}
                                        handleBlur={handleBlur}
                                        value={values.solution_link}
                                        disable={type === 'view'}
                                    />
                                    {errors.solution_link && touched.solution_link ? (
                                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.solution_link.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.solution_link}</p></Grid>
                                    ) : null}
                                </Grid>

                            </Grid>


                            <Grid style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
                openBulkUpload && <BulkUploadDialog
                    open={openBulkUpload}
                    setOpen={setOpenBulkUpload}
                    bulkUploadId={'add-source-chapter-bulk-upload'}
                    downloadCSV_apiUrl={apiurl?.SAMPLE_CSV_DOWNLOAD_URL}
                    CSV_sampleType={'source_chapters'}
                    downloadCSV_SuccessMsg={toasterMessage?.DOWNLOAD_SOURCE_CHAPTER_SAMPLE_CSV_SUCCESS}
                    bulkUpload_apiUrl={apiurl?.SOURCE_CHAPTER_BULK_UPLOAD_URL}
                    bulkUploadSuccessMsg={toasterMessage?.BULK_UPLOAD_SOURCE_CHAPTER_SUCCESS}
                />
            }
        </>
    )
}

export default AddEditSourceChapter