import { Button, Grid, } from '@mui/material'
import React, { useState } from 'react'
import '../../assets/css/global-style.scss'
import { ArrowBackIos, Delete, Edit, } from '@mui/icons-material'
import InputBox from 'components/Input box'
import { useFormik } from 'formik'
import ArgonButton from 'components/ArgonButton'
import { useLocation, useNavigate } from 'react-router-dom'
import CheckboxCustom from 'components/CheckboxCustom/CheckboxCustom'
import CustomAdvanceTable from 'components/TableCustom/CustomAdvanceTable'
import { tableViewSubSourceAllColumns } from 'constants/TableConstants'
import EditSubSourceDialog from 'components/Edit Sub module Dialog/EditSubSourceDialog'
import { tableEditSubSourceAllColumns } from 'constants/TableConstants'
import ConfirmationWithCaptcha from 'components/ConfirmationWithCaptcha/ConfirmationWithCaptcha'
import { postRequest } from 'services/axios-api-request/axios_api_Request'
import { putRequest } from 'services/axios-api-request/axios_api_Request'
import toaster from 'utility/toaster/toaster'
import { toasterMessage } from 'constants/toasterMessage'
import routerConstants from 'constants/routerConstants'
import { apiurl } from 'constants/apiURLsConstants'
import { addSourceSchema } from 'services/yup-validation-schemas'
import Loader from 'components/loader/Loader'
import { handleInputChange } from 'utility/common'


const AddEditViewSource = ({ type }) => {
    // ************ for navigation *************
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    // ********* data reciever for view and edit ******** 
    const { state: sourceData } = useLocation();

    // ***************** for test-series checkbox ****************
    const [checkboxChecked, setCheckboxChecked] = useState(sourceData?.is_test_series ?? false);

    // ******************* for edit sub topic dialog *******************
    const [openEditSubSourceDialog, setOpenEditSubSourceDialog] = useState(false);

    // ************** for edit and delete the sub-source from table ******************
    const [subSourceArrayForEdit, setSubSourceArrayForEdit] = useState(sourceData?.sub_sources ?? []);
    const [subSourceRowData, setSubSourceRowData] = useState('');
    const subSourceRowDataCallback = (rowData) => {
        setSubSourceRowData(rowData)
    }

    // ************* for delete captcha dialog *************
    const [openConfirmationCaptchaDialog, setOpenConfirmationCaptchaDialog] = useState(false);

    // ************ initial values for add, edit and view ************
    const initialValues = {
        source_name: sourceData?.source_name ?? '',
    };

    // ********************** action array *****************
    const ActionData = [
        {
            label: 'Edit',
            icon: <Edit />,
            open: openEditSubSourceDialog,
            setOpen: setOpenEditSubSourceDialog,
            callback: subSourceRowDataCallback,
        },
        {
            label: 'Delete',
            icon: <Delete />,
            open: openConfirmationCaptchaDialog,
            setOpen: setOpenConfirmationCaptchaDialog,
            callback: subSourceRowDataCallback,
        },
    ]

    // *********** formik to handle form ***********
    const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
        useFormik({
            initialValues,
            validationSchema: addSourceSchema,
            onSubmit: (values, action) => {
                handleSave(values);
            },
        });


    // ************ checkbox handleChange ****************
    const checkboxHandleChange = () => {
        setCheckboxChecked(event.target.checked);
    }

    // ****************** for and new functionality to add sub sources ***************
    const [subSourceArray, setSubSourceArray] = useState([
        { name: '' }
    ]);

    const handleAddSubSource = () => {
        setSubSourceArray((previousSubSources) => {
            if (previousSubSources[previousSubSources.length - 1].name === '') {
                toaster('error', 'Please fill the previous sub-source before adding a new one.');
                return previousSubSources;
            }
            else if (previousSubSources[previousSubSources.length - 1].name.length < 3) {
                toaster('error', 'Sub-source Name too short should contain at least 3 characters.');
                return previousSubSources;
            }
            return [...previousSubSources, { name: '' }];
        })
    };

    const handleRemoveSubSource = (indexToRemove) => {
        setSubSourceArray(subSourceArray?.filter((_, index) => index !== indexToRemove))
    };

    const handleChangeSubSource = (index, value, key) => {
        if (value === '' || value[0] !== ' ') {
            const values = [...subSourceArray];
            values[index][key] = value;
            setSubSourceArray(values);
        }
    };

    // ********** handle save and update ********
    const handleSave = async (values) => {
        const data = {
            name: values?.source_name,
        }

        if (!isLoading) {
            if (checkboxChecked && subSourceArray.some(subSource => subSource.name === '') && type === 'add') {
                toaster('error', 'Please fill all the sub-sources before saving.');
                return;
            }
            else if (checkboxChecked && subSourceArray.some(subSource => subSource?.name?.length < 3) && type === 'add') {
                toaster('error', 'Sub-source Name too short should contain at least 3 characters.');
                return;
            }
            else if (type === 'add') {
                let dataForAdd;
                if (checkboxChecked) {
                    dataForAdd = {
                        ...data,
                        sub_sources: subSourceArray?.map((item) => { return { name: item?.name?.trim() } }),
                        is_test_series: checkboxChecked,
                    }
                }
                else {
                    dataForAdd = {
                        ...data,
                        is_test_series: checkboxChecked,
                    }
                }
                setIsLoading(true);
                const res = await postRequest(apiurl?.SOURCE_ADD_URL, dataForAdd)
                if (res?.data?.success) {
                    setIsLoading(false);
                    toaster('success', toasterMessage?.ADD_SOURCE_SUCCESS);
                    navigate(routerConstants?.sourceManagementRoute);
                }
                else {
                    setIsLoading(false);
                    toaster('error', res?.data?.message);
                }
            }
            else if (type === 'edit') {
                let editedData;
                if (checkboxChecked) {
                    editedData = {
                        ...data,
                        sub_sources: subSourceArrayForEdit,
                        is_test_series: checkboxChecked,
                    }
                }
                else {
                    editedData = {
                        ...data,
                        is_test_series: checkboxChecked,
                    }
                }
                setIsLoading(true);
                const res = await putRequest(`${apiurl?.SOURCE_EDIT_URL}/${sourceData?._id}`, editedData)
                if (res?.data?.success) {
                    setIsLoading(false);
                    toaster('success', toasterMessage?.EDIT_SOURCE_SUCCESS);
                    navigate(routerConstants?.sourceManagementRoute);
                }
                else {
                    setIsLoading(false);
                    toaster('error', res?.data?.message);
                }
            }
        }
    }

    const handleDeleteRow = () => {
        setSubSourceArrayForEdit(
            subSourceArrayForEdit.filter(subSource =>
                subSource._id !== subSourceRowData._id
            )
        )
    }

    return (
        <>
            <Grid className='page-main-container-layout'>
                <Grid className='screen-white-container'>
                    <Grid className='add-edit-screen-wrapper'>
                        <Grid className='add-edit-screen-top-container'>
                            <p><ArrowBackIos onClick={() => navigate(-1)} /><span>{(type === 'add') ? 'Add Source' : (type === 'edit') ? 'Edit Source' : 'View Source'}</span></p>
                        </Grid>
                        <form onSubmit={handleSubmit} className='add-edit-screen-form-container mt-20'>

                            <Grid className='add-edit-screen-input-row'>
                                <Grid className='add-edit-screen-input-container'>
                                    <p>Source Name</p>
                                    <InputBox
                                        placeholder={'Enter Source Name'}
                                        name={'source_name'}
                                        id={'add-source-source_name'}
                                        type={'text'}
                                        handleChange={(e) => handleInputChange(e, handleChange)}
                                        handleBlur={handleBlur}
                                        value={values.source_name}
                                        disable={type === 'view' ? true : false}
                                        maxLength={100}
                                    />
                                    {errors.source_name && touched.source_name ? (
                                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.source_name.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.source_name}</p></Grid>
                                    ) : null}
                                </Grid>
                                {(sourceData?.is_test_series || type === 'add') &&
                                    <Grid>
                                        <p style={{ visibility: 'hidden', paddingBottom: '5px' }}>Source Name</p>
                                        <CheckboxCustom
                                            handleChange={checkboxHandleChange}
                                            checked={checkboxChecked}
                                            disabled={type !== 'add'}
                                            label={'Check for Test Series'}
                                        />
                                    </Grid>}

                            </Grid>

                            {(checkboxChecked && type === 'add') &&
                                <>
                                    {
                                        subSourceArray?.map((subSource, index) => {
                                            return (
                                                <Grid key={`add-source-sub-source-${index + 1}`} className='add-edit-screen-input-row'>
                                                    <Grid className='add-edit-screen-input-container'>
                                                        <p>Sub Source</p>
                                                        <InputBox
                                                            placeholder={'Enter Sub Source'}
                                                            name={'subSource.name'}
                                                            id={`add-source-name-${index + 1}`}
                                                            type={'text'}
                                                            handleChange={() => handleChangeSubSource(index, event.target.value, 'name')}
                                                            value={subSource?.name}
                                                            maxLength={100}
                                                        />
                                                    </Grid>
                                                    <Grid className='add-edit-screen-input-container'>
                                                        <p style={{ visibility: 'hidden' }}>Add more button</p>
                                                        <Grid style={{ width: '130px' }}>
                                                            <ArgonButton
                                                                component={Button}
                                                                variant="gradient"
                                                                size="medium"
                                                                color={'dark'}
                                                                disableHover={true}
                                                                onClick={() => {
                                                                    if (index === subSourceArray.length - 1) {
                                                                        handleAddSubSource();
                                                                    }
                                                                    else {
                                                                        handleRemoveSubSource(index);
                                                                    }
                                                                }}

                                                            >
                                                                {(index === subSourceArray.length - 1) ? 'Add New' : 'Remove'}
                                                            </ArgonButton>
                                                        </Grid>
                                                    </Grid>



                                                </Grid>
                                            )
                                        })
                                    }
                                </>
                            }

                            {(type !== 'add' && checkboxChecked) &&
                                <>
                                    <h3 className='add-edit-screen-input-group-name'>Sub Source Details</h3>
                                    <Grid style={{ margin: '0 -24px' }}>
                                        <CustomAdvanceTable
                                            ActionData={ActionData}
                                            tableMinHeight={"0px"}
                                            tableMaxHeight={"420px"}
                                            allColumns={type === 'view' ? tableViewSubSourceAllColumns : tableEditSubSourceAllColumns}
                                            tableData={subSourceArrayForEdit}
                                            isLoading={false}
                                            enableRowAction={false}
                                            enableTopToolbar={false}
                                            enableSorting={false}
                                            enableColumnAction={false}
                                            enableRowSelection={false}
                                            enableSelectAll={false}
                                        />
                                    </Grid>

                                    {/* <Grid style={{ margin: '0 -24px' }}>
                                        <PaginationCustom
                                            currentPage={currentPage}
                                            setCurrentPage={setCurrentPage}
                                            totalRecords={totalRecords}
                                        />
                                    </Grid> */}

                                </>
                            }


                            <Grid display={'flex'} style={{ visibility: `${type === 'view' && !checkboxChecked ? 'hidden' : ''}`, display: `${type === 'view' && checkboxChecked ? 'none' : ''}`, justifyContent: 'flex-end' }}>
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
            {
                openEditSubSourceDialog && <EditSubSourceDialog
                    open={openEditSubSourceDialog}
                    setOpen={setOpenEditSubSourceDialog}
                    dataForEdit={subSourceRowData}
                    subSourceArrayForEdit={subSourceArrayForEdit}
                    setSubSourceArrayForEdit={setSubSourceArrayForEdit}
                />
            }
            {
                openConfirmationCaptchaDialog &&
                <ConfirmationWithCaptcha
                    open={openConfirmationCaptchaDialog}
                    setOpen={setOpenConfirmationCaptchaDialog}
                    confirmationMessage={'Are You sure want to delete?'}
                    handleDeleteRow={handleDeleteRow}
                />
            }
        </>
    )
}

export default AddEditViewSource