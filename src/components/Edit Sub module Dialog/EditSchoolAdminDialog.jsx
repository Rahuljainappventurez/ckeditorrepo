import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import './edit-sub-topic-dialog.scss';
import { Button, Grid } from '@mui/material';
import * as Yup from "yup";
import PropTypes from 'prop-types';
import ArgonButton from 'components/ArgonButton';
import InputBox from 'components/Input box';
import { useFormik } from 'formik';


const initialValues = {
    school_admin_name: "",
    email: "",
}


function EditSchoolAdminDialog({ open, setOpen }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClose = () => {
        setOpen(false);
    };

    const editSchoolAdminSchema = Yup.object({
        school_admin_name: Yup.string()
            .required("Please enter the School Admin Name to move ahead"),
        email: Yup.string()
            .required("Please enter the Email ID to move ahead"),
    });

    const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
        useFormik({
            initialValues,
            validationSchema: editSchoolAdminSchema,
            onSubmit: (values, action) => {
                handleSave(values);
            },
        });

    const handleSave = (values) => {
        console.log(values, 'csdjwei4r3foi');
    }

    return (
        <Dialog
            fullScreen={fullScreen}
            fullWidth={true}
            maxWidth={'xs'}
            open={open}
            onClose={handleClose}
            aria-labelledby="ypic-title"
        >
            <Grid className='dialog-main-container'>

                <Grid className='edit-sub-topic-cross-button'>
                    <Grid onClick={() => setOpen(!open)} className='dialog-box-cross-icon'>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.4 15L10 11.4L13.6 15L15 13.6L11.4 10L15 6.4L13.6 5L10 8.6L6.4 5L5 6.4L8.6 10L5 13.6L6.4 15ZM10 20C8.61667 20 7.31667 19.7373 6.1 19.212C4.88334 18.6867 3.825 17.9743 2.925 17.075C2.025 16.1757 1.31267 15.1173 0.788001 13.9C0.263335 12.6827 0.000667933 11.3827 1.26582e-06 10C-0.000665401 8.61733 0.262001 7.31733 0.788001 6.1C1.314 4.88267 2.02633 3.82433 2.925 2.925C3.82367 2.02567 4.882 1.31333 6.1 0.788C7.318 0.262667 8.618 0 10 0C11.382 0 12.682 0.262667 13.9 0.788C15.118 1.31333 16.1763 2.02567 17.075 2.925C17.9737 3.82433 18.6863 4.88267 19.213 6.1C19.7397 7.31733 20.002 8.61733 20 10C19.998 11.3827 19.7353 12.6827 19.212 13.9C18.6887 15.1173 17.9763 16.1757 17.075 17.075C16.1737 17.9743 15.1153 18.687 13.9 19.213C12.6847 19.739 11.3847 20.0013 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z" fill="#777A7F" />
                        </svg>
                    </Grid>


                </Grid>

                <Grid className='edit-sub-topic-content-box'>
                    <Grid className='edit-sub-topic-text'>
                        <h4>Edit School Admin</h4>
                    </Grid>

                    <form onSubmit={handleSubmit} className='edit-sub-topic-file-upload-container'>
                        <Grid className='add-sub-topic-screen-input-container'>
                            <p>School Admin Name</p>
                            <InputBox
                                placeholder={'Enter School Admin Name'}
                                name={'school_admin_name'}
                                id={'edit-school-admin-school_admin_name'}
                                type={'text'}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                value={values.school_admin_name}
                            />
                            {errors.school_admin_name && touched.school_admin_name ? (
                                <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.school_admin_name.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.school_admin_name}</p></Grid>
                            ) : null}
                        </Grid>
                        <Grid className='add-sub-topic-screen-input-container'>
                            <p>Email ID</p>
                            <InputBox
                                placeholder={'Enter Email'}
                                name={'email'}
                                id={'edit-school-admin-email'}
                                type={'text'}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                value={values.email}
                            />
                            {errors.email && touched.email ? (
                                <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.email.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.email}</p></Grid>
                            ) : null}
                        </Grid>

                        <Grid display={'flex'} justifyContent={'center'} gap={'20px'} mt={3}>
                            <ArgonButton
                                component={Button}
                                variant="contained"
                                secendary size="medium"
                                color={'error'}
                                disableHover={true}
                                type={'button'}
                                onClick={() => setOpen(!open)}
                            >
                                {'Cancel'}
                            </ArgonButton>
                            <ArgonButton
                                component={Button}
                                variant="contained"
                                secendary size="medium"
                                color={'secondary'}
                                disableHover={true}
                                type={'submit'}

                            >
                                {'Save'}
                            </ArgonButton>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Dialog>
    );
}

EditSchoolAdminDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
};

export default React.memo(EditSchoolAdminDialog)
