import { Button, Grid, } from '@mui/material'
import React, { useEffect, useState } from 'react'
import '../../assets/css/global-style.scss'
import { ArrowBackIos, } from '@mui/icons-material'
import { useFormik } from 'formik'
import ArgonButton from 'components/ArgonButton'
import DropownCustom from 'components/Dropdown-custom/DropdownCustom'
import { useNavigate } from 'react-router-dom'
import { useRoleAssignDropdownRole } from 'Hooks/useDropdowns'
import { postRequest } from 'services/axios-api-request/axios_api_Request'
import { apiurl } from 'constants/apiURLsConstants'
import toaster from 'utility/toaster/toaster'
import { toasterMessage } from 'constants/toasterMessage'
import routerConstants from 'constants/routerConstants'
import { useSubjectDropdown } from 'Hooks/useDropdowns'
import { useSourceDropdown } from 'Hooks/useDropdowns'
import { useChapterDropdownSubject } from 'Hooks/useDropdowns'
import { useTaskTypeDropdown } from 'Hooks/useDropdowns'
import { createNewTaskSchema } from 'services/yup-validation-schemas'
import { useSubSourceDropdownSource } from 'Hooks/useDropdowns'
import { stringToBoolean } from 'utility/common'
import { removeEmptyStringValuesInObj } from 'utility/common'
import MultiSelectDropdown from 'components/MultiSelectDropdown/MultiSelectDropdown'
import Loader from 'components/loader/Loader'


const CreateTask = ({ type }) => {
    // ************ for navigation *************
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [selectedChapters, setSelectedChapters] = useState([]);

    // ********* fetch dropdown list using custom hook *******
    const { data: subjectDropdownList } = useSubjectDropdown();
    const { data: sourceDropdownList } = useSourceDropdown();
    const { data: taskTypeDropdownList } = useTaskTypeDropdown();

    // ************ initial values for add edit and view ************
    const initialValues = {
        source: "",
        sub_source: "",
        subject: "",
        type_of_task: "",
        creator: "",
        editor: "",
        approver1: "",
        approver2: "",
    };

    // *********** formik to handle form ***********
    const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
        useFormik({
            initialValues,
            validationSchema: createNewTaskSchema,
            onSubmit: (values, action) => {
                handleSave(values);
            },
        });


    // ********* fetch sub-source dropdown list using custom hook *******
    const { data: subSourceDropdownList } = useSubSourceDropdownSource(values?.source ? (values?.source)?.split('+')[1] : '', stringToBoolean(values?.source?.split('+')[2]));

    // ********* fetch role assign dropdown list using custom hook *******
    const { data: roleAssignDropdownList } = useRoleAssignDropdownRole('others', true);

    // ******************* filtering logic to set unique employees in all creator,editor,approver1,approver2 dropdowns **************************** 
    const [creatorList, setCreatorList] = useState([]);
    const [editorList, setEditorList] = useState([]);
    const [approver1List, setApprover1List] = useState([]);
    const [approver2List, setApprover2List] = useState([]);

    const filterCreatorList = (dataArr, excludeIds) => {
        return dataArr.filter(data => !excludeIds.includes(data._id));
    };

    const filterList = (dataArr, excludeIds) => {
        return dataArr.filter(data => !excludeIds.includes(data._id) && !data.is_data_entry_operator);
    };

    useEffect(() => {
        const allData = roleAssignDropdownList?.data?.result || [];
        const selectedIds = [
            values.creator,
            values.editor,
            values.approver1,
            values.approver2,
        ].filter(Boolean);

        setCreatorList(filterCreatorList(allData, selectedIds.filter(id => id !== values.creator)));
        setEditorList(filterList(allData, selectedIds.filter(id => id !== values.editor)));
        setApprover1List(filterList(allData, selectedIds.filter(id => id !== values.approver1)));
        setApprover2List(filterList(allData, selectedIds.filter(id => id !== values.approver2)));
    }, [roleAssignDropdownList, values.creator, values.editor, values.approver1, values.approver2]);

    // ******************* filtering logic code end, to set unique employees in all creator,editor,approver1,approver2 dropdowns  **************************** 



    // ********* fetch chapter dropdown list using custom hook *******
    const { data: chapterDropdownList } = useChapterDropdownSubject(values?.subject ?? '');


    // ********** handle save and update ********
    const handleSave = async (values) => {
        const data = {
            source_id: values?.source?.split('+')[1],
            is_test_series: stringToBoolean(values?.source?.split('+')[2]),
            task_type: values?.type_of_task,
            creator_id: values?.creator,
            editor_id: values?.editor,
            approver1: values?.approver1,
            approver2: values?.approver2,
        }
        let dataForAdd;

        if (!isLoading) {
            if (!stringToBoolean(values?.source?.split('+')[2])) {
                if (!values?.subject) {
                    toaster('error', 'Please select the Subject');
                    return;
                }
                else if (selectedChapters.length === 0) {
                    toaster('error', 'Please select the Chapters');
                    return;
                }
                dataForAdd = {
                    ...data,
                    subject_id: values?.subject,
                    chapter_id: selectedChapters,
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
            dataForAdd = removeEmptyStringValuesInObj(dataForAdd);
            setIsLoading(true);
            const res = await postRequest(apiurl?.TASK_CREATE_URL, dataForAdd)
            if (res?.data?.success) {
                setIsLoading(false);
                toaster('success', toasterMessage?.CREATE_TASK_SUCCESS);
                navigate(routerConstants?.taskManagementRoute);
            }
            else {
                setIsLoading(false);
                toaster('error', res?.data?.message);
            }
        }
    }


    return (
        <>
            <Grid className='page-main-container-layout'>
                <Grid className='screen-white-container'>
                    <Grid className='add-edit-screen-wrapper'>
                        <Grid className='add-edit-screen-top-container'>
                            <p><ArrowBackIos onClick={() => navigate(-1)} /><span>Create Task</span></p>
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
                                        handleChange={handleChange}
                                        dropdownKeysArray={sourceDropdownList?.data?.result?.rows?.map((item) => `${item?.name}+${item?._id}+${item?.is_test_series}`) ?? []}
                                        dropdownListArray={sourceDropdownList?.data?.result?.rows?.map((item) => item?.name) ?? []}
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
                                        handleChange={handleChange}
                                        dropdownKeysArray={subjectDropdownList?.data?.result?.rows?.map((item) => item?._id) ?? []}
                                        dropdownListArray={subjectDropdownList?.data?.result?.rows?.map((item) => item?.name) ?? []}
                                        dependentDisable={stringToBoolean(values?.source?.split('+')[2]) || values?.source === ''}
                                    />
                                    {errors.subject && touched.subject ? (
                                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.subject.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.subject}</p></Grid>
                                    ) : null}
                                </Grid>
                                <Grid className='add-edit-screen-input-container'>
                                    <p>Select Chapter</p>
                                    <MultiSelectDropdown
                                        dropdownArray={chapterDropdownList?.data?.result?.rows?.map((item) => { return { id: item?._id, name: item?.name } }) ?? []}
                                        setSelectedItemsData={setSelectedChapters}
                                        placeholder={'Select Chapters'}
                                        disabled={stringToBoolean(values?.source?.split('+')[2]) || values?.subject === ''}
                                    />
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
                                    <p>Select Type of Task</p>
                                    <DropownCustom
                                        label={'Select Type of Task'}
                                        value={values.type_of_task}
                                        handleBlur={handleBlur}
                                        name={'type_of_task'}
                                        handleChange={handleChange}
                                        dropdownKeysArray={taskTypeDropdownList?.data?.result?.map((item) => item?._id) ?? []}
                                        dropdownListArray={taskTypeDropdownList?.data?.result?.map((item) => item?.name) ?? []}
                                    />
                                    {errors.type_of_task && touched.type_of_task ? (
                                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.type_of_task.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.type_of_task}</p></Grid>
                                    ) : null}
                                </Grid>

                            </Grid>

                            <h3 className='add-edit-screen-input-group-name'>Select Employees for below Roles</h3>

                            <Grid className='add-edit-screen-input-row'>
                                <Grid className='add-edit-screen-input-container'>
                                    <p>Select Creator</p>
                                    <DropownCustom
                                        label={'Select Creator'}
                                        value={values.creator}
                                        handleBlur={handleBlur}
                                        name={'creator'}
                                        handleChange={handleChange}
                                        dropdownKeysArray={creatorList?.map((item) => item?._id) ?? []}
                                        dropdownListArray={creatorList?.map((item) => item?.name) ?? []}
                                    />
                                    {errors.creator && touched.creator ? (
                                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.creator.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.creator}</p></Grid>
                                    ) : null}
                                </Grid>
                                <Grid className='add-edit-screen-input-container'>
                                    <p>Select Editor</p>
                                    <DropownCustom
                                        label={'Select Editor'}
                                        value={values.editor}
                                        handleBlur={handleBlur}
                                        name={'editor'}
                                        handleChange={handleChange}
                                        dropdownKeysArray={editorList?.map((item) => item?._id) ?? []}
                                        dropdownListArray={editorList?.map((item) => item?.name) ?? []}
                                    />
                                    {errors.editor && touched.editor ? (
                                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.editor.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.editor}</p></Grid>
                                    ) : null}
                                </Grid>

                                <Grid className='add-edit-screen-input-container'>
                                    <p>Select Approver 1</p>
                                    <DropownCustom
                                        label={'Select Approver 1'}
                                        value={values.approver1}
                                        handleBlur={handleBlur}
                                        name={'approver1'}
                                        handleChange={handleChange}
                                        dropdownKeysArray={approver1List?.map((item) => item?._id) ?? []}
                                        dropdownListArray={approver1List?.map((item) => item?.name) ?? []}
                                    />
                                    {errors.approver1 && touched.approver1 ? (
                                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.approver1.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.approver1}</p></Grid>
                                    ) : null}
                                </Grid>

                                <Grid className='add-edit-screen-input-container'>
                                    <p>Select Approver 2</p>
                                    <DropownCustom
                                        label={'Select Approver 2'}
                                        value={values.approver2}
                                        handleBlur={handleBlur}
                                        name={'approver2'}
                                        handleChange={handleChange}
                                        dropdownKeysArray={approver2List?.map((item) => item?._id) ?? []}
                                        dropdownListArray={approver2List?.map((item) => item?.name) ?? []}
                                        dependentDisable={values?.approver1 === ''}
                                    />
                                    {errors.approver2 && touched.approver2 ? (
                                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.approver2.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.approver2}</p></Grid>
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
                                                'Save'
                                        }
                                    </ArgonButton>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default CreateTask