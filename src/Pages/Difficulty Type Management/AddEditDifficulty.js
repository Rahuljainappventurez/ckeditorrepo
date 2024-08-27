import { Button, Grid, } from '@mui/material'
import '../../assets/css/global-style.scss'
import { ArrowBackIos } from '@mui/icons-material'
import InputBox from 'components/Input box'
import { useFormik } from 'formik'
import ArgonButton from 'components/ArgonButton'
import { useLocation, useNavigate } from 'react-router-dom'
import { addDifficultyTypeSchema } from 'services/yup-validation-schemas'
import { postRequest } from 'services/axios-api-request/axios_api_Request'
import { putRequest } from 'services/axios-api-request/axios_api_Request'
import { apiurl } from 'constants/apiURLsConstants'
import toaster from 'utility/toaster/toaster'
import { toasterMessage } from 'constants/toasterMessage'
import routerConstants from 'constants/routerConstants'
import { useState } from 'react'
import Loader from 'components/loader/Loader'
import { handleInputChange } from 'utility/common'


const AddEditDifficultyType = ({ type }) => {
    // ************ for navigation *************
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    // ********* data reciever for view and edit ******** 
    const { state: difficultyTypeData } = useLocation();

    // ************ initial values for add, edit and view ************
    const initialValues = {
        difficulty_level: difficultyTypeData?.difficulty_level ?? '',
    };

    // *********** formik to handle form ***********
    const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
        useFormik({
            initialValues,
            validationSchema: addDifficultyTypeSchema,
            onSubmit: (values, action) => {
                handleSave(values);
            },
        });

    // ********** handle save and update ********
    const handleSave = async (values) => {
        const data = {
            name: values?.difficulty_level?.trim(),
        }

        if (!isLoading) {
            if (type === 'add') {
                setIsLoading(true);
                const res = await postRequest(apiurl?.DIFFICULTY_TYPE_ADD_URL, data)
                if (res?.data?.success) {
                    setIsLoading(false);
                    toaster('success', toasterMessage?.ADD_DIFFICULTY_TYPE_SUCCESS);
                    navigate(routerConstants?.difficultyTypeManagementRoute);
                }
                else {
                    setIsLoading(false);
                    toaster('error', res?.data?.message);
                }
            }
            else if (type === 'edit') {
                setIsLoading(true);
                const res = await putRequest(`${apiurl?.DIFFICULTY_TYPE_EDIT_URL}/${difficultyTypeData?._id}`, data)
                if (res?.data?.success) {
                    setIsLoading(false);
                    toaster('success', toasterMessage?.EDIT_DIFFICULTY_TYPE_SUCCESS);
                    navigate(routerConstants?.difficultyTypeManagementRoute);
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
                        <p><ArrowBackIos onClick={() => navigate(-1)} /><span>{(type === 'add') ? 'Add Difficulty Level' : 'Edit Difficulty Level'}</span></p>
                    </Grid>
                    <form onSubmit={handleSubmit} className='add-edit-screen-form-container mt-20'>
                        <Grid className='add-edit-screen-input-row'>
                            <Grid className='add-edit-screen-input-container'>
                                <p>Name of Difficulty Level</p>
                                <InputBox
                                    placeholder={'Enter Difficulty Level'}
                                    name={'difficulty_level'}
                                    id={'add-difficulty_level-difficulty_level'}
                                    type={'text'}
                                    handleChange={(e) => handleInputChange(e, handleChange)}
                                    handleBlur={handleBlur}
                                    value={values.difficulty_level}
                                    maxLength = {100}
                                />
                                {errors.difficulty_level && touched.difficulty_level ? (
                                    <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.difficulty_level.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.difficulty_level}</p></Grid>
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

export default AddEditDifficultyType