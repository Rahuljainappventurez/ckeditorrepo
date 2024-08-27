import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import './edit-sub-topic-dialog.scss';
import { Button, Grid } from '@mui/material';
import * as Yup from "yup";
import PropTypes from 'prop-types';
import ArgonButton from 'components/ArgonButton';
import { useFormik } from 'formik';
import DropownCustom from 'components/Dropdown-custom/DropdownCustom';
import { useRoleAssignDropdownRole } from 'Hooks/useDropdowns';
import { apiurl } from 'constants/apiURLsConstants';
import { patchRequest } from 'services/axios-api-request/axios_api_Request';
import toaster from 'utility/toaster/toaster';
import { removeEmptyStringValuesInObj } from 'utility/common';
import { toasterMessage } from 'constants/toasterMessage';
import Loader from 'components/loader/Loader';


const initialValues = {
    creator: "",
    editor: "",
    approver1: "",
    approver2: "",
}
function AssignTaskDialog({ open, setOpen, selectedRowIDs, refetch, setRowSelection }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [isLoading, setIsLoading] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };


    // const assignTaskSchema = Yup.object({
    //     creator: Yup.string()
    //         .required("Please select the Creator to move ahead"),
    //     editor: Yup.string()
    //         .required("Please select the editor to move ahead"),
    //     approver1: Yup.string()
    //         .required("Please select the Approver 1 to move ahead"),
    //     approver2: Yup.string()
    //         .required("Please select the Approver 2 to move ahead"),
    // });

    const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
        useFormik({
            initialValues,
            // validationSchema: assignTaskSchema,
            onSubmit: (values, action) => {
                handleSave(values);
            },
        });


    // ********* fetch role assign dropdown list using custom hook *******
    const { data: roleAssignDropdownList } = useRoleAssignDropdownRole('others', true);

    // ******************* filtering logic to set unique employees in all creator,editor,approver1,approver2 dropdowns **************************** 
    const [creatorList, setCreatorList] = React.useState([]);
    const [editorList, setEditorList] = React.useState([]);
    const [approver1List, setApprover1List] = React.useState([]);
    const [approver2List, setApprover2List] = React.useState([]);

    const filterCreatorList = (dataArr, excludeIds) => {
        return dataArr.filter(data => !excludeIds.includes(data._id));
    };

    const filterList = (dataArr, excludeIds) => {
        return dataArr.filter(data => !excludeIds.includes(data._id) && !data.is_data_entry_operator);
    };

    React.useEffect(() => {
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

    const handleSave = async (values) => {
        const { creator, editor, approver1, approver2 } = values;

        if (!isLoading) {
            if (!creator && !editor && !approver1 && !approver2) {
                toaster('error', 'Please select any one dropdown')
                return;
            }
            let data = {
                creator_id: creator,
                editor_id: editor,
                approver1: approver1,
                approver2: approver2,
            }
            data = removeEmptyStringValuesInObj(data)
            data = { ...data, task_id: selectedRowIDs }
            setIsLoading(true);
            const res = await patchRequest(apiurl?.ASSIGN_TASK_URL, data);
            if (res?.data?.success) {
                setIsLoading(false);
                setRowSelection({});
                toaster('success', toasterMessage?.ASSIGN_TASK_SUCCESS);
                handleClose()
                refetch();
            }
            else {
                setIsLoading(false);
                toaster('error', res?.data?.message)
            }
        }
    }

    return (
        <Dialog
            fullScreen={fullScreen}
            fullWidth={true}
            maxWidth={'sm'}
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
                        <h4>Assign Task</h4>
                        <p style={{ marginTop: '10px' }}>Select Employees for below Roles</p>
                    </Grid>

                    <form onSubmit={handleSubmit} className='edit-sub-topic-file-upload-container'>

                        <Grid className='dialog-sub-screen-input-row'>

                            <Grid className='add-sub-topic-screen-input-container'>
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

                            <Grid className='add-sub-topic-screen-input-container'>
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

                            <Grid className='add-sub-topic-screen-input-container'>
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

                            <Grid className='add-sub-topic-screen-input-container'>
                                <p>Select Approver 2</p>
                                <DropownCustom
                                    label={'Select Approver 2'}
                                    value={values.approver2}
                                    handleBlur={handleBlur}
                                    name={'approver2'}
                                    handleChange={handleChange}
                                    dropdownKeysArray={approver2List?.map((item) => item?._id) ?? []}
                                    dropdownListArray={approver2List?.map((item) => item?.name) ?? []}
                                />
                                {errors.approver2 && touched.approver2 ? (
                                    <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.approver2.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.approver2}</p></Grid>
                                ) : null}
                            </Grid>

                        </Grid>

                        <Grid display={'flex'} justifyContent={'center'} gap={'20px'} mt={3}>
                            <ArgonButton
                                component={Button}
                                variant="contained"
                                size="medium"
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
                                size="medium"
                                color={'secondary'}
                                disableHover={true}
                                type={'submit'}

                            >
                                {
                                    isLoading ? <Loader dotsColor='black' /> :
                                        'Save'
                                }
                            </ArgonButton>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Dialog>
    );
}

AssignTaskDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
};

export default React.memo(AssignTaskDialog)
