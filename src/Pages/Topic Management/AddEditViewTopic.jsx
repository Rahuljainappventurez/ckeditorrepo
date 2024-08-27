import { Button, Grid, } from '@mui/material'
import React, { useEffect, useState } from 'react'
import '../../assets/css/global-style.scss'
import { ArrowBackIos, Delete, Edit, } from '@mui/icons-material'
import InputBox from 'components/Input box'
import { useFormik } from 'formik'
import ArgonButton from 'components/ArgonButton'
import DropownCustom from 'components/Dropdown-custom/DropdownCustom'
import { useLocation, useNavigate } from 'react-router-dom'
import BulkUploadDialog from 'components/Bulk-upload Dialog/BulkUploadDialog'
import CustomAdvanceTable from 'components/TableCustom/CustomAdvanceTable'
import { tableViewSubTopicAllColumns } from 'constants/TableConstants'
import EditSubTopicDialog from 'components/Edit Sub module Dialog/EditSubTopicDialog'
import { tableEditSubTopicAllColumns } from 'constants/TableConstants'
import { apiurl } from 'constants/apiURLsConstants'
import { useSubjectDropdown } from 'Hooks/useDropdowns'
import { useBranchDropdown } from 'Hooks/useDropdowns'
import { useChapterDropdown } from 'Hooks/useDropdowns'
import { useClassDropdown } from 'Hooks/useDropdowns'
import { postRequest } from 'services/axios-api-request/axios_api_Request'
import toaster from 'utility/toaster/toaster'
import { toasterMessage } from 'constants/toasterMessage'
import routerConstants from 'constants/routerConstants'
import { addTopicSchema } from 'services/yup-validation-schemas'
import ConfirmationWithCaptcha from 'components/ConfirmationWithCaptcha/ConfirmationWithCaptcha'
import { putRequest } from 'services/axios-api-request/axios_api_Request'
import Loader from 'components/loader/Loader'
import { handleInputChange } from 'utility/common'


const AddEditViewTopic = ({ type }) => {
    // ************ for navigation *************
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    // ************* for delete captcha dialog *************
    const [openConfirmationCaptchaDialog, setOpenConfirmationCaptchaDialog] = useState(false);

    // ********* data reciever for view and edit ******** 
    const { state: topicData } = useLocation();

    // ********* fetch dropdown list using custom hook *******
    const { data: subjectDropdownList } = useSubjectDropdown();
    const { data: classDropdownList } = useClassDropdown();

    // ************ initial values for add edit and view ************
    const initialValues = {
        subject: (topicData?.subject_name && topicData?.subject_id) ? `${topicData?.subject_name}+${topicData?.subject_id}` : '',
        branch: (topicData?.branch_name && topicData?.branch_id) ? `${topicData?.branch_name}+${topicData?.branch_id}` : '',
        class: (topicData?.class_name && topicData?.class_id) ? `${topicData?.class_name}+${topicData?.class_id}` : '',
        chapter: (topicData?.chapter_name && topicData?.chapter_id) ? `${topicData?.chapter_name}+${topicData?.chapter_id}` : '',
        topic_name: topicData?.topic_name ?? '',
        topic_id: topicData?.topic_id ?? '',
    };

    // *********** for bulk upload *********
    const [openBulkUpload, setOpenBulkUpload] = useState(false);

    const [openEditSubTopicDialog, setOpenEditSubTopicDialog] = useState(false);

    const [subtopicArrayForEdit, setSubtopicArrayForEdit] = useState(topicData?.sub_topics ?? []);

    const [subTopicRowData, setSubTopicRowData] = useState('');

    const subTopicRowDataCallback = (rowData) => {
        setSubTopicRowData(rowData)
    }

    const ActionData = [
        {
            label: 'Edit',
            icon: <Edit />,
            open: openEditSubTopicDialog,
            setOpen: setOpenEditSubTopicDialog,
            callback: subTopicRowDataCallback,
        },
        {
            label: 'Delete',
            icon: <Delete />,
            open: openConfirmationCaptchaDialog,
            setOpen: setOpenConfirmationCaptchaDialog,
            callback: subTopicRowDataCallback,
        },
    ]

    // *********** formik to handle form ***********
    const { values, handleChange, handleBlur, handleSubmit, setFieldValue, errors, touched } =
        useFormik({
            initialValues,
            validationSchema: addTopicSchema,
            onSubmit: (values, action) => {
                handleSave(values);
            },
        });


    // ********* fetch branch dropdown list using custom hook *******
    const { data: branchDropdownList } = useBranchDropdown(values?.subject ? (values?.subject).split('+')[1] : '');

    // ********* fetch chapter dropdown list using custom hook *******
    const { data: chapterDropdownList } = useChapterDropdown(values?.branch ? (values?.branch).split('+')[1] : '');

    // ****************** for and new functionality to add sub topics ***************
    const [subTopicsArray, setSubTopicsArray] = useState([
        { name: '', client_subtopic_id: '' }
    ]);

    const handleAddSubTopic = () => {
        setSubTopicsArray((previousSubTopics) => {
            const { name, client_subtopic_id } = previousSubTopics[previousSubTopics.length - 1]
            if (name === '' || client_subtopic_id === '') {
                toaster('error', 'Please fill all the previous fields before adding a new one.');
                return previousSubTopics;
            }
            else if (name.length < 3) {
                toaster('error', 'Sub-Topic Name too short should contain at least 3 characters.');
                return previousSubTopics;
            }
            else if (client_subtopic_id.length < 3) {
                toaster('error', 'Sub-Topic ID too short should contain at least 3 characters.');
                return previousSubTopics;
            }
            return [...previousSubTopics, { name: '', client_subtopic_id: '' }]
        })
    };

    const handleRemoveSubTopic = (indexToRemove) => {
        setSubTopicsArray(subTopicsArray?.filter((_, index) => index !== indexToRemove))
    };

    const handleChangeSubTopics = (index, target, key) => {
        const { value } = target;
        if (value === '' || value[0] !== ' ') {
            const values = [...subTopicsArray];
            values[index][key] = value;
            setSubTopicsArray(values);
        }
    };

    // ************* Handle subject change to reset the branch ************
    const handleSubjectChange = (e) => {
        handleChange(e); // Update the subject value
        setFieldValue('branch', ''); // Reset the branch value
        setFieldValue('chapter', ''); // Reset the branch value
    };

    // ************* Handle branch change to reset the chapter ************
    const handleBranchChange = (e) => {
        handleChange(e); // Update the branch value
        setFieldValue('chapter', ''); // Reset the branch value
    };


    // ********** handle save and update ********
    const handleSave = async (values) => {
        const data = {
            subject_id: values?.subject?.split('+')[1],
            branch_id: values?.branch?.split('+')[1],
            class_id: values?.class?.split('+')[1],
            chapter_id: values?.chapter?.split('+')[1],
            subject_name: values?.subject?.split('+')[0],
            branch_name: values?.branch?.split('+')[0],
            class_name: values?.class?.split('+')[0],
            chapter_name: values?.chapter?.split('+')[0],
            name: values?.topic_name?.trim(),
            client_topic_id: values?.topic_id?.trim(),
        }
        if (!isLoading) {
            if (type === 'add') {
                const dataForAdd = {
                    ...data,
                    sub_topics: subTopicsArray?.map((item) => {
                        return { name: item?.name?.trim(), client_subtopic_id: item?.client_subtopic_id?.trim() }
                    })
                }
                setIsLoading(true);
                const res = await postRequest(apiurl?.TOPIC_ADD_URL, dataForAdd)
                if (res?.data?.success) {
                    setIsLoading(false);
                    toaster('success', toasterMessage?.ADD_TOPIC_SUCCESS);
                    navigate(routerConstants?.topicManagementRoute);
                }
                else {
                    setIsLoading(false);
                    toaster('error', res?.data?.message);
                }
            }
            else if (type === 'edit') {
                const editedData = {
                    ...data,
                    sub_topics: subtopicArrayForEdit?.map((item) => {
                        return {
                            ...item,
                            name: item?.name?.trim(),
                            client_subtopic_id: item?.client_subtopic_id?.trim()
                        }
                    })
                }
                setIsLoading(true);
                const res = await putRequest(`${apiurl?.TOPIC_EDIT_URL}/${topicData?._id}`, editedData)
                if (res?.data?.success) {
                    setIsLoading(false);
                    toaster('success', toasterMessage?.EDIT_TOPIC_SUCCESS);
                    navigate(routerConstants?.topicManagementRoute);
                }
                else {
                    setIsLoading(false);
                    toaster('error', res?.data?.message);
                }
            }
        }
    }

    const handleDeleteRow = () => {
        setSubtopicArrayForEdit(
            subtopicArrayForEdit.filter(subtopic =>
                subtopic.client_subtopic_id !== subTopicRowData.client_subtopic_id
            )
        )
    }

    return (
        <>
            <Grid className='page-main-container-layout'>
                <Grid className='screen-white-container'>
                    <Grid className='add-edit-screen-wrapper'>
                        <Grid className='add-edit-screen-top-container'>
                            <p><ArrowBackIos onClick={() => navigate(-1)} /><span>{type === 'add' ? 'Add Topic' : type === 'edit' ? 'Edit Topic' : 'View Topic'}</span></p>
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
                                        dropdownKeysArray={subjectDropdownList?.data?.result?.rows?.map((item) => `${item?.name}+${item?._id}`) ?? []}
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
                                        handleChange={handleBranchChange}
                                        dropdownKeysArray={branchDropdownList?.data?.result?.rows?.map((item) => `${item?.name}+${item?._id}`) ?? []}
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
                                        dropdownKeysArray={classDropdownList?.data?.result?.map((item) => `${item?.name}+${item?._id}`) ?? []}
                                        dropdownListArray={classDropdownList?.data?.result?.map((item) => item?.name) ?? []}
                                        disabledOption={type === 'view'}
                                    />
                                    {errors.class && touched.class ? (
                                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.class.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.class}</p></Grid>
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
                                        dependentDisable={values?.branch === ''}
                                    />
                                    {errors.chapter && touched.chapter ? (
                                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.chapter.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.chapter}</p></Grid>
                                    ) : null}
                                </Grid>

                            </Grid>

                            <h3 className='add-edit-screen-input-group-name'>Topic Details</h3>

                            <Grid className='add-edit-screen-input-row'>
                                <Grid className='add-edit-screen-input-container'>
                                    <p>Topic Name</p>
                                    <InputBox
                                        placeholder={'Enter Topic Name'}
                                        name={'topic_name'}
                                        id={'add-topic-topic_name'}
                                        type={'text'}
                                        handleChange={(e) => handleInputChange(e, handleChange)}
                                        handleBlur={handleBlur}
                                        value={values.topic_name}
                                        disable={type === 'view' ? true : false}
                                        maxLength={100}
                                    />
                                    {errors.topic_name && touched.topic_name ? (
                                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.topic_name.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.topic_name}</p></Grid>
                                    ) : null}
                                </Grid>
                                <Grid className='add-edit-screen-input-container'>
                                    <p>Topic ID</p>
                                    <InputBox
                                        placeholder={'Enter Topic ID'}
                                        name={'topic_id'}
                                        id={'add-topic-topic_id'}
                                        type={'text'}
                                        handleChange={(e) => handleInputChange(e, handleChange)}
                                        handleBlur={handleBlur}
                                        value={values.topic_id}
                                        disable={type === 'view' ? true : false}
                                        maxLength={25}
                                    />
                                    {errors.topic_id && touched.topic_id ? (
                                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.topic_id.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.topic_id}</p></Grid>
                                    ) : null}
                                </Grid>
                            </Grid>

                            {(type === 'add') &&
                                <>
                                    <h3 className='add-edit-screen-input-group-name'>Sub Topics Details</h3>

                                    {
                                        subTopicsArray?.map((subTopic, index) => {
                                            return (
                                                <Grid key={`add-topic-subTopic-${index + 1}`} className='add-edit-screen-input-row'>
                                                    <Grid className='add-edit-screen-input-container'>
                                                        <p>Sub Topic Name</p>
                                                        <InputBox
                                                            placeholder={'Enter Sub Topic Name'}
                                                            name={'subTopic.name'}
                                                            id={`add-topic-sub_topic_name-${index + 1}`}
                                                            type={'text'}
                                                            handleChange={(event) => handleChangeSubTopics(index, event.target, 'name')}
                                                            value={subTopic?.name}
                                                            maxLength={100}
                                                        />
                                                    </Grid>
                                                    <Grid className='add-edit-screen-input-container'>
                                                        <p>Sub Topic ID</p>
                                                        <InputBox
                                                            placeholder={'Enter Sub Topic ID'}
                                                            name={'subTopic.client_subtopic_id'}
                                                            id={`add-topic-sub_topic_id-${index + 1}`}
                                                            type={'text'}
                                                            handleChange={(event) => handleChangeSubTopics(index, event.target, 'client_subtopic_id')}
                                                            value={subTopic?.client_subtopic_id}
                                                            maxLength={25}
                                                        />
                                                    </Grid>
                                                    <Grid className='add-edit-screen-input-container'>
                                                        <p style={{ visibility: 'hidden' }}>button</p>
                                                        <Grid width={'130px'}>
                                                            <ArgonButton
                                                                component={Button}
                                                                variant="gradient"
                                                                size="medium"
                                                                color={'dark'}
                                                                disableHover={true}
                                                                onClick={() => {
                                                                    if (index === subTopicsArray.length - 1) {
                                                                        handleAddSubTopic();
                                                                    }
                                                                    else {
                                                                        handleRemoveSubTopic(index)
                                                                    }
                                                                }}
                                                            >
                                                                {(index === subTopicsArray.length - 1) ? 'Add New' : 'Remove'}
                                                            </ArgonButton>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            )
                                        })
                                    }
                                </>
                            }


                            {!(type === 'add') &&
                                <>
                                    <h3 className='add-edit-screen-input-group-name'>Sub Topics Details</h3>
                                    <Grid style={{ margin: '0 -24px' }}>
                                        <CustomAdvanceTable
                                            ActionData={ActionData}
                                            tableMinHeight={"0px"}
                                            tableMaxHeight={"580px"}
                                            allColumns={type === 'view' ? tableViewSubTopicAllColumns : tableEditSubTopicAllColumns}
                                            tableData={subtopicArrayForEdit}
                                            isLoading={false}
                                            enableRowAction={false}
                                            enableTopToolbar={false}
                                            enableSorting={false}
                                            enableColumnAction={false}
                                            enableRowSelection={false}
                                            enableSelectAll={false}
                                        />
                                    </Grid>

                                    {/* <Grid style={{ margin: '0 -24px' }}>
                                        <PaginationCustom
                                            currentPage={currentPage}
                                            setCurrentPage={setCurrentPage}
                                            totalRecords={totalRecords}
                                        />
                                    </Grid> */}

                                </>
                            }



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
            {
                openBulkUpload && <BulkUploadDialog
                    open={openBulkUpload}
                    setOpen={setOpenBulkUpload}
                    bulkUploadId={'add-topic-bulk-upload'}
                    downloadCSV_apiUrl={apiurl?.SAMPLE_CSV_DOWNLOAD_URL}
                    CSV_sampleType={'topics'}
                    downloadCSV_SuccessMsg={toasterMessage?.DOWNLOAD_TOPIC_SAMPLE_CSV_SUCCESS}
                    bulkUpload_apiUrl={apiurl?.TOPIC_BULK_UPLOAD_URL}
                    bulkUploadSuccessMsg={toasterMessage?.BULK_UPLOAD_TOPIC_SUCCESS}
                />
            }

            {
                openEditSubTopicDialog && <EditSubTopicDialog
                    open={openEditSubTopicDialog}
                    setOpen={setOpenEditSubTopicDialog}
                    dataForEdit={subTopicRowData}
                    subtopicArrayForEdit={subtopicArrayForEdit}
                    setSubtopicArrayForEdit={setSubtopicArrayForEdit}
                />
            }
            {
                openConfirmationCaptchaDialog &&
                <ConfirmationWithCaptcha
                    open={openConfirmationCaptchaDialog}
                    setOpen={setOpenConfirmationCaptchaDialog}
                    confirmationMessage={'Are You sure want to delete?'}
                    handleDeleteRow={handleDeleteRow}
                />
            }
        </>
    )
}

export default AddEditViewTopic