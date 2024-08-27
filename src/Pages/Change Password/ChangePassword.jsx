import { Button, Grid, } from '@mui/material'
import '../../assets/css/global-style.scss'
import { ArrowBackIos, } from '@mui/icons-material'
import InputBox from 'components/Input box'
import { useFormik } from 'formik'
import ArgonButton from 'components/ArgonButton'
import { useNavigate } from 'react-router-dom'
import { toasterMessage } from 'constants/toasterMessage'
import { apiurl } from 'constants/apiURLsConstants'
import toaster from 'utility/toaster/toaster'
import { postRequest } from 'services/axios-api-request/axios_api_Request'
import { changePasswordSchema } from 'services/yup-validation-schemas'


const ChangePassword = ({ type }) => {
    // ************ for navigation *************
    const navigate = useNavigate();

    // ************ initial values for add edit and view ************
    const initialValues = {
        old_password: '',
        new_password: '',
        confirm_password: '',
    };

    // *********** formik to handle form ***********
    const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
        useFormik({
            initialValues,
            validationSchema: changePasswordSchema,
            onSubmit: (values, action) => {
                handleSave(values);
            },
        });

    // ********** handle save and update ********
    const handleSave = async (values) => {
        const data = {
            oldPassword: values.old_password,
            newPassword: values?.new_password,
        }
        const res = await postRequest(apiurl?.CHANGE_PASSWORD_URL, data)
        if (res?.data?.success) {
            toaster('success', toasterMessage?.CHANGE_PASSWORD_SUCCESS);
            navigate(-1);
        }
        else {
            toaster('error', res?.data?.message);
        }
    }

    return (
        <Grid className='page-main-container-layout'>
            <Grid className='screen-white-container'>
                <Grid className='add-edit-screen-wrapper'>
                    <Grid className='add-edit-screen-top-container'>
                        <p><ArrowBackIos onClick={() => navigate(-1)} /><span>Change Password</span></p>
                    </Grid>
                    <form onSubmit={handleSubmit} className='add-edit-screen-form-container mt-20'>

                        <Grid className='add-edit-screen-input-row'>
                            <Grid className='add-edit-screen-input-container'>
                                <p>Old Password</p>
                                <InputBox
                                    placeholder={'Enter Old Password'}
                                    name={'old_password'}
                                    id={'change-password-old_password'}
                                    type={'password'}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    value={values.old_password}
                                />
                                {errors.old_password && touched.old_password ? (
                                    <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.old_password.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.old_password}</p></Grid>
                                ) : null}
                            </Grid>
                        </Grid>

                        <Grid className='add-edit-screen-input-row'>
                            <Grid className='add-edit-screen-input-container'>
                                <p>New Password</p>
                                <InputBox
                                    placeholder={'Enter New Password'}
                                    name={'new_password'}
                                    id={'change-password-new_password'}
                                    type={'password'}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    value={values.new_password}
                                />
                                {errors.new_password && touched.new_password ? (
                                    <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.new_password.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.new_password}</p></Grid>
                                ) : null}
                            </Grid>
                        </Grid>

                        <Grid className='add-edit-screen-input-row'>
                            <Grid className='add-edit-screen-input-container'>
                                <p>Confirm Password</p>
                                <InputBox
                                    placeholder={'Enter Password'}
                                    name={'confirm_password'}
                                    id={'change-password-confirm_password'}
                                    type={'password'}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    value={values.confirm_password}
                                />
                                {errors.confirm_password && touched.confirm_password ? (
                                    <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.confirm_password.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.confirm_password}</p></Grid>
                                ) : null}
                            </Grid>
                        </Grid>

                        <Grid style={{ display: 'flex' }}>
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
                                    {'Save'}
                                </ArgonButton>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ChangePassword