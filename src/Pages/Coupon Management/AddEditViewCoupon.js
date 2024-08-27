import { Button, Grid, } from '@mui/material'
import '../../assets/css/global-style.scss'
import { ArrowBackIos } from '@mui/icons-material'
import InputBox from 'components/Input box'
import { useFormik } from 'formik'
import ArgonButton from 'components/ArgonButton'
import { useNavigate } from 'react-router-dom'
import { addDifficultyTypeSchema } from 'services/yup-validation-schemas'



const initialValues = {
    coupon_code: "",
    off_percentage: "",
};

const AddEditViewCoupon = ({ type }) => {
    const navigate = useNavigate();
    const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
        useFormik({
            initialValues,
            validationSchema: addDifficultyTypeSchema,
            onSubmit: (values, action) => {
                handleAdd(values);
            },
        });

    const handleAdd = (values) => {
        console.log(values, 'csdjwei4r3foi');
    }

    return (
        <Grid className='page-main-container-layout'>
            <Grid className='screen-white-container'>
                <Grid className='add-edit-screen-wrapper'>
                    <Grid className='add-edit-screen-top-container'>
                        <p><ArrowBackIos onClick={() => navigate(-1)} /><span>{(type === 'add') ? 'Add Coupon' : (type === 'edit') ? 'Edit Coupon' : 'View Coupon'}</span></p>
                    </Grid>
                    <form onSubmit={handleSubmit} className='add-edit-screen-form-container mt-20'>
                        <Grid className='add-edit-screen-input-row'>
                            <Grid className='add-edit-screen-input-container'>
                                <p>Enter Coupon Code</p>
                                <InputBox
                                    placeholder={'Enter Coupon Code'}
                                    name={'coupon_code'}
                                    id={'add-coupon-code-coupon_code'}
                                    type={'text'}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    value={values.coupon_code}
                                    disable={type === 'view' ? true : false}
                                />
                                {errors.coupon_code && touched.coupon_code ? (
                                    <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.coupon_code.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.coupon_code}</p></Grid>
                                ) : null}
                            </Grid>
                            <Grid className='add-edit-screen-input-container'>
                                <p>Enter Off Percentage</p>
                                <InputBox
                                    placeholder={'Enter Off Percentage'}
                                    name={'off_percentage'}
                                    id={'add-coupon-code-off_percentage'}
                                    type={'text'}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    value={values.off_percentage}
                                    disable={type === 'view' ? true : false}
                                />
                                {errors.off_percentage && touched.off_percentage ? (
                                    <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.off_percentage.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.off_percentage}</p></Grid>
                                ) : null}
                            </Grid>

                        </Grid>
                        <Grid style={{ display: `${type === 'view' ? 'none' : 'flex'}`, justifyContent: 'flex-end' }}>
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
                                    {(type === 'add') ? 'Save' : 'Update'}
                                </ArgonButton>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default AddEditViewCoupon