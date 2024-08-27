import { Button, Grid, } from '@mui/material'
import '../../assets/css/global-style.scss'
import { ArrowBackIos } from '@mui/icons-material'
import InputBox from 'components/Input box'
import { useFormik } from 'formik'
import ArgonButton from 'components/ArgonButton'
import { useLocation, useNavigate } from 'react-router-dom'
import { addExamTypeSchema } from 'services/yup-validation-schemas'
import { postRequest } from 'services/axios-api-request/axios_api_Request'
import { putRequest } from 'services/axios-api-request/axios_api_Request'
import { apiurl } from 'constants/apiURLsConstants'
import toaster from 'utility/toaster/toaster'
import { toasterMessage } from 'constants/toasterMessage'
import routerConstants from 'constants/routerConstants'
import Loader from 'components/loader/Loader'
import { useState } from 'react'
import { handleInputChange } from 'utility/common'


const AddEditExamType = ({ type }) => {
    // ************ for navigation *************
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    // ********* data reciever for view and edit ******** 
    const { state: examTypeData } = useLocation();

    // ************ initial values for add, edit and view ************
    const initialValues = {
        exam_type: examTypeData?.exam_type ?? '',
    };

    // *********** formik to handle form ***********
    const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
        useFormik({
            initialValues,
            validationSchema: addExamTypeSchema,
            onSubmit: (values, action) => {
                handleSave(values);
            },
        });

    // ********** handle save and update ********
    const handleSave = async (values) => {
        const data = {
            name: values?.exam_type?.trim(),
        }

        if (!isLoading) {
            if (type === 'add') {
                setIsLoading(true);
                const res = await postRequest(apiurl?.EXAM_TYPE_ADD_URL, data)
                if (res?.data?.success) {
                    setIsLoading(false);
                    toaster('success', toasterMessage?.ADD_EXAM_TYPE_SUCCESS);
                    navigate(routerConstants?.examTypeManagementRoute);
                }
                else {
                    setIsLoading(false);
                    toaster('error', res?.data?.message);
                }
            }
            else if (type === 'edit') {
                setIsLoading(true);
                const res = await putRequest(`${apiurl?.EXAM_TYPE_EDIT_URL}/${examTypeData?._id}`, data)
                if (res?.data?.success) {
                    setIsLoading(false);
                    toaster('success', toasterMessage?.EDIT_EXAM_TYPE_SUCCESS);
                    navigate(routerConstants?.examTypeManagementRoute);
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
                        <p><ArrowBackIos onClick={() => navigate(-1)} /><span>{(type === 'add') ? 'Add Exam Type' : 'Edit Exam Type'}</span></p>
                    </Grid>
                    <form onSubmit={handleSubmit} className='add-edit-screen-form-container mt-20'>
                        <Grid className='add-edit-screen-input-row'>
                            <Grid className='add-edit-screen-input-container'>
                                <p>Name of Exam Type</p>
                                <InputBox
                                    placeholder={'Enter Exam Type'}
                                    name={'exam_type'}
                                    id={'add-exam_type-exam_type'}
                                    type={'text'}
                                    handleChange={(e) => handleInputChange(e, handleChange)}
                                    handleBlur={handleBlur}
                                    value={values.exam_type}
                                    maxLength={100}
                                />
                                {errors.exam_type && touched.exam_type ? (
                                    <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.exam_type.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.exam_type}</p></Grid>
                                ) : null}
                            </Grid>

                        </Grid>
                        <Grid style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Grid style={{ display: 'flex', gap: '20px' }}>
                                <ArgonButton
                                    component={Button}
                                    variant="gradient"
                                    secendary size="large"
                                    color={'error'}
                                    disableHover={true}
                                    onClick={() => navigate(-1)}
                                >
                                    {'Cancel'}
                                </ArgonButton>
                                <ArgonButton
                                    component={Button}
                                    variant="gradient"
                                    secendary size="large"
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

export default AddEditExamType