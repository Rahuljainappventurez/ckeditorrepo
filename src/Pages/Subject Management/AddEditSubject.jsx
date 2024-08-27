import { Button, Grid, } from '@mui/material'
import '../../assets/css/global-style.scss'
import { ArrowBackIos } from '@mui/icons-material'
import InputBox from 'components/Input box'
import { useFormik } from 'formik'
import { addSubjectSchema } from 'services/yup-validation-schemas'
import ArgonButton from 'components/ArgonButton'
import DropownCustom from 'components/Dropdown-custom/DropdownCustom'
import { useLocation, useNavigate } from 'react-router-dom'
import { postRequest } from 'services/axios-api-request/axios_api_Request'
import { apiurl } from 'constants/apiURLsConstants'
import toaster from 'utility/toaster/toaster'
import routerConstants from 'constants/routerConstants'
import { toasterMessage } from 'constants/toasterMessage'
import { putRequest } from 'services/axios-api-request/axios_api_Request'
import { useStreamDropdown } from 'Hooks/useDropdowns'
import { useState } from 'react'
import Loader from 'components/loader/Loader'
import { handleInputChange } from 'utility/common'



const AddEditSubject = ({ type }) => {
    // ************ for navigation *************
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    // ********* data reciever for view and edit ******** 
    const { state: subjectData } = useLocation();

    // ********* fetch stream dropdown list using custom hook *********
    const { data: streamDropdownList } = useStreamDropdown();

    // ************ initial values for add edit and view ************
    const initialValues = {
        subject_id: subjectData?.subject_id ?? "",
        subject_name: subjectData?.subject_name ?? "",
        stream: subjectData?.stream_id ? `${subjectData?.stream_name}+${subjectData?.stream_id}` : "",
    };

    // *********** formik to handle form ***********
    const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
        useFormik({
            initialValues,
            validationSchema: addSubjectSchema,
            onSubmit: (values, action) => {
                handleAddSubject(values);
            },
        });


    // ********** handle add and edit subject ********
    const handleAddSubject = async (values) => {
        const data = {
            subject_id: values.subject_id?.trim(),
            name: values.subject_name?.trim(),
            stream_name: values.stream?.split('+')[0],
            stream_id: values.stream?.split('+')[1],
        };

        // Create a map of initial values to corresponding payload keys
        const initialValueMap = {
            subject_id: initialValues.subject_id,
            name: initialValues.subject_name,
            stream_name: initialValues.stream?.split('+')[0],
            stream_id: initialValues.stream?.split('+')[1],
        };
        // Filter out unchanged fields for the edit case
        const editedData = Object.keys(data).reduce((accObj, key) => {
            if (data[key] !== initialValueMap[key]) {
                accObj[key] = data[key];
            }
            return accObj;
        }, {});

        if (!isLoading) {
            setIsLoading(true);
            let res;

            if (type === 'add') {
                res = await postRequest(apiurl?.SUBJECT_ADD_URL, data);
            } else if (type === 'edit') {
                res = await putRequest(`${apiurl?.SUBJECT_EDIT_URL}/${subjectData?._id}`, editedData);
            }

            setIsLoading(false);

            if (res?.data?.success) {
                toaster('success', type === 'add' ? toasterMessage?.ADD_SUBJECT_SUCCESS : toasterMessage?.EDIT_SUBJECT_SUCCESS);
                navigate(routerConstants?.subjectManagementRoute);
            } else {
                toaster('error', res?.data?.message);
            }
        }
    };


    return (
        <Grid className='page-main-container-layout'>
            <Grid className='screen-white-container'>
                <Grid className='add-edit-screen-wrapper'>
                    <Grid className='add-edit-screen-top-container'>
                        <p><ArrowBackIos onClick={() => navigate(-1)} /><span>{type === 'add' ? 'Add Subject' : type === 'edit' ? 'Edit Subject' : 'View Subject'}</span></p>
                    </Grid>
                    <form onSubmit={handleSubmit} className='add-edit-screen-form-container mt-20'>
                        <Grid className='add-edit-screen-input-row'>
                            <Grid className='add-edit-screen-input-container'>
                                <p>Subject Id</p>
                                <InputBox
                                    placeholder={'Enter ID'}
                                    name={'subject_id'}
                                    id={'add-subject-subject_id'}
                                    type={'text'}
                                    handleChange={(e) => handleInputChange(e, handleChange)}
                                    handleBlur={handleBlur}
                                    value={values.subject_id}
                                    disable={type === 'view'}
                                    maxLength={25}
                                />
                                {errors.subject_id && touched.subject_id ? (
                                    <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.subject_id.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.subject_id}</p></Grid>
                                ) : null}
                            </Grid>
                            <Grid className='add-edit-screen-input-container'>
                                <p>Subject Name</p>
                                <InputBox
                                    placeholder={'Enter Name'}
                                    name={'subject_name'}
                                    id={'add-subject-subject_name'}
                                    type={'text'}
                                    handleChange={(e) => handleInputChange(e, handleChange,true)}
                                    handleBlur={handleBlur}
                                    value={values.subject_name}
                                    disable={type === 'view'}
                                    maxLength={100}
                                />
                                {errors.subject_name && touched.subject_name ? (
                                    <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.subject_name.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.subject_name}</p></Grid>
                                ) : null}
                            </Grid>
                            <Grid className='add-edit-screen-input-container'>
                                <p>Select Stream</p>
                                <DropownCustom
                                    label={'Select Stream'}
                                    value={values.stream}
                                    handleBlur={handleBlur}
                                    name={'stream'}
                                    handleChange={handleChange}
                                    dropdownKeysArray={streamDropdownList?.data?.result?.map((item) => `${item?.name}+${item?._id}`) ?? []}
                                    dropdownListArray={streamDropdownList?.data?.result?.map((item) => item?.name) ?? []}
                                    disabledOption={type === 'view'}
                                />
                                {errors.stream && touched.stream ? (
                                    <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.stream.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.stream}</p></Grid>
                                ) : null}
                            </Grid>

                        </Grid>
                        <Grid display={'flex'} style={{ visibility: `${type === 'view' ? 'hidden' : ''}`, justifyContent: 'flex-end' }}>
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

export default AddEditSubject