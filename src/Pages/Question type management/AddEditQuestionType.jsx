import { Button, Grid, } from '@mui/material'
import React, { useState } from 'react'
import '../../assets/css/global-style.scss'
import { ArrowBackIos, Delete, Edit, } from '@mui/icons-material'
import InputBox from 'components/Input box'
import { useFormik } from 'formik'
import { addSubjectSchema } from 'services/yup-validation-schemas'
import ArgonButton from 'components/ArgonButton'
import DropownCustom from 'components/Dropdown-custom/DropdownCustom'
import { useLocation, useNavigate } from 'react-router-dom'
import { addQuestionTypeSchema } from 'services/yup-validation-schemas'
import { postRequest } from 'services/axios-api-request/axios_api_Request'
import { toasterMessage } from 'constants/toasterMessage'
import { putRequest } from 'services/axios-api-request/axios_api_Request'
import toaster from 'utility/toaster/toaster'
import { apiurl } from 'constants/apiURLsConstants'
import routerConstants from 'constants/routerConstants'
import Loader from 'components/loader/Loader'
import { handleInputChange } from 'utility/common'


const AddEditQuestionType = ({ type }) => {
    // ************ for navigation *************
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    // ********* data reciever for edit ******** 
    const { state: questionTypeData } = useLocation();

    // ************ initial values for add edit and view ************
    const initialValues = {
        question_type: questionTypeData?.question_type ?? '',
    };

    // *********** formik to handle form ***********
    const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
        useFormik({
            initialValues,
            validationSchema: addQuestionTypeSchema,
            onSubmit: (values, action) => {
                handleSave(values);
            },
        });


    const handleSave = async (values) => {
        const data = {
            name: values.question_type?.trim(),
        }
        if (!isLoading) {
            if (type === 'add') {
                setIsLoading(true);
                const res = await postRequest(apiurl?.QUESTION_TYPE_ADD_URL, data)
                if (res?.data?.success) {
                    setIsLoading(false);
                    toaster('success', toasterMessage?.ADD_QUESTION_TYPE_SUCCESS);
                    navigate(routerConstants?.questionTypeManagementRoute);
                }
                else {
                    setIsLoading(false);
                    toaster('error', res?.data?.message);
                }
            }
            else if (type === 'edit') {
                setIsLoading(true);
                const res = await putRequest(`${apiurl?.QUESTION_TYPE_EDIT_URL}/${questionTypeData?._id}`, data)
                if (res?.data?.success) {
                    setIsLoading(false);
                    toaster('success', toasterMessage?.EDIT_QUESTION_TYPE_SUCCESS);
                    navigate(routerConstants?.questionTypeManagementRoute);
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
                        <p><ArrowBackIos onClick={() => navigate(-1)} /><span>{(type === 'add') ? 'Add Question Type' : 'Edit Question Type'}</span></p>
                    </Grid>
                    <form onSubmit={handleSubmit} className='add-edit-screen-form-container mt-20'>
                        <Grid className='add-edit-screen-input-row'>
                            <Grid className='add-edit-screen-input-container'>
                                <p>Name of Question Type</p>
                                <InputBox
                                    placeholder={'Enter Question Type'}
                                    name={'question_type'}
                                    id={'add-question-type-question_type'}
                                    type={'text'}
                                    handleChange={(e) => handleInputChange(e, handleChange)}
                                    handleBlur={handleBlur}
                                    value={values.question_type}
                                    maxLength = {100}
                                />
                                {errors.question_type && touched.question_type ? (
                                    <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.question_type.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.question_type}</p></Grid>
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
    )
}

export default AddEditQuestionType