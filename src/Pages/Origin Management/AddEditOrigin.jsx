import { Button, Grid, } from '@mui/material'
import React, { useState } from 'react'
import '../../assets/css/global-style.scss'
import { ArrowBackIos, Delete, Edit, } from '@mui/icons-material'
import InputBox from 'components/Input box'
import { useFormik } from 'formik'
import { addSubjectSchema } from 'services/yup-validation-schemas'
import ArgonButton from 'components/ArgonButton'
import { useLocation, useNavigate } from 'react-router-dom'
import { postRequest } from 'services/axios-api-request/axios_api_Request'
import { putRequest } from 'services/axios-api-request/axios_api_Request'
import { apiurl } from 'constants/apiURLsConstants'
import { toasterMessage } from 'constants/toasterMessage'
import toaster from 'utility/toaster/toaster'
import routerConstants from 'constants/routerConstants'
import { addOriginSchema } from 'services/yup-validation-schemas'
import Loader from 'components/loader/Loader'
import { handleInputChange } from 'utility/common'


const AddEditOrigin = ({ type }) => {
    // ************ for navigation *************
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    // ********* data reciever for view and edit ******** 
    const { state: originData } = useLocation();

    // ************ initial values for add, edit ************
    const initialValues = {
        origin_name: originData?.origin_name ?? '',
    };

    // *********** formik to handle form ***********
    const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
        useFormik({
            initialValues,
            validationSchema: addOriginSchema,
            onSubmit: (values, action) => {
                handleSave(values);
            },
        });

    
    // ********** handle save and update ********
    const handleSave = async (values) => {
        const data = {
            name: values?.origin_name?.trim(),
        }
        console.log(data,'vejfneifneidei')
        if (!isLoading) {
            if (type === 'add') {
                setIsLoading(true);
                const res = await postRequest(apiurl?.ORIGIN_ADD_URL, data)
                if (res?.data?.success) {
                    setIsLoading(false);
                    toaster('success', toasterMessage?.ADD_ORIGIN_SUCCESS);
                    navigate(routerConstants?.originManagementRoute);
                }
                else {
                    setIsLoading(false);
                    toaster('error', res?.data?.message);
                }
            }
            else if (type === 'edit') {
                setIsLoading(true);
                const res = await putRequest(`${apiurl?.ORIGIN_EDIT_URL}/${originData?._id}`, data)
                if (res?.data?.success) {
                    setIsLoading(false);
                    toaster('success', toasterMessage?.EDIT_ORIGIN_SUCCESS);
                    navigate(routerConstants?.originManagementRoute);
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
                        <p><ArrowBackIos onClick={() => navigate(-1)} /><span>{(type === 'add') ? 'Add Origin' : 'Edit Origin'}</span></p>
                    </Grid>
                    <form onSubmit={handleSubmit} className='add-edit-screen-form-container mt-20'>
                        <Grid className='add-edit-screen-input-row'>
                            <Grid className='add-edit-screen-input-container'>
                                <p>Name of Origin</p>
                                <InputBox
                                    placeholder={'Enter Origin'}
                                    name={'origin_name'}
                                    id={'add-origin-origin_name'}
                                    type={'text'}
                                    handleChange={(e) => handleInputChange(e, handleChange)}
                                    handleBlur={handleBlur}
                                    value={values.origin_name}
                                />
                                {errors.origin_name && touched.origin_name ? (
                                    <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.origin_name.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.origin_name}</p></Grid>
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

export default AddEditOrigin