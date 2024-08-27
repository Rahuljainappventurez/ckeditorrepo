import { Button, Grid, } from '@mui/material'
import React, { useState } from 'react'
import '../../assets/css/global-style.scss'
import { ArrowBackIos, Delete, Edit, } from '@mui/icons-material'
import InputBox from 'components/Input box'
import { useFormik } from 'formik'
import ArgonButton from 'components/ArgonButton'
import DropownCustom from 'components/Dropdown-custom/DropdownCustom'
import { useNavigate } from 'react-router-dom'
import DatePickerCustom from 'components/date_picker/DatePickerCustom'
import { addSchoolSchema } from 'services/yup-validation-schemas'
import CustomAdvanceTable from 'components/TableCustom/CustomAdvanceTable'
import PaginationCustom from 'components/PaginationCustom/PaginationCustom'
import { tableEditSchoolAllColumns } from 'constants/TableConstants'
import { tableViewSchoolAllColumns } from 'constants/TableConstants'
import { tableEditViewSchoolDummyData } from 'constants/TableConstants'
import EditSchoolAdminDialog from 'components/Edit Sub module Dialog/EditSchoolAdminDialog'


const dropdownListArray = ['PCM', 'PCB', "PCMB"]
const dropdownKeysArray = ['PCM', 'PCB', "PCMB"]

const AddEditViewSchool = ({ type }) => {
    const navigate = useNavigate();
    const [initialValues, setInitialValue] = useState({
        school: "",
        primary_contact: "",
        secondary_contact: "",
        no_of_teachers: "",
        no_of_students: "",
        no_of_school_admin: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        zip_code: "",
        country: "",
        poc1: {
            poc_name: "",
            contact: "",
            email: "",
        },
        poc2: {
            poc_name: "",
            contact: "",
            email: "",
        },
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(100);
    const [openEditSchoolAdminDialog, setOpenEditSchoolAdminDialog] = useState(false);

    const ActionData = [
        {
            label: 'Edit',
            icon: <Edit />,
            open: openEditSchoolAdminDialog,
            setOpen: setOpenEditSchoolAdminDialog,
        },
        {
            label: 'Delete',
            icon: <Delete />
        },
    ]


    const { values, handleChange, handleBlur, handleSubmit, setFieldValue, errors, touched } =
        useFormik({
            initialValues,
            validationSchema: addSchoolSchema,
            onSubmit: (values, action) => {
                handleSave(values);
            },
        });

    const handleSave = (values) => {
        console.log(values, 'csdjwei4r3foi');
    }

    const [schoolAdminArray, setSchoolAdminArray] = useState([
        { admin_name: '', admin_email: '' }
    ]);

    const handleAddAdmin = () => {
        setSchoolAdminArray((previousAdmins) => {
            return [...previousAdmins, { admin_name: '', admin_email: '' }]
        })
    };

    const handleRemoveAdmin = (indexToRemove) => {
        setSchoolAdminArray(schoolAdminArray?.filter((_, index) => index !== indexToRemove))
    };

    const handleChangeAdminInput = (index, value, key) => {
        const values = [...schoolAdminArray];
        values[index][key] = value;
        setSchoolAdminArray(values);
    };

    console.log(schoolAdminArray, 'csdjwei4r3foi');


    return (
        <>
            <Grid className='page-main-container-layout'>
                <Grid className='screen-white-container'>
                    <Grid className='add-edit-screen-wrapper'>
                        <Grid className='add-edit-screen-top-container'>
                            <p><ArrowBackIos onClick={() => navigate(-1)} /><span>{type === 'add' ? 'Add School' : type === 'edit' ? 'Edit School' : 'View School'}</span></p>
                        </Grid>
                        <form onSubmit={handleSubmit} className='add-edit-screen-form-container mt-20'>
                            <Grid className='add-edit-screen-input-row'>
                                <Grid className='add-edit-screen-input-container'>
                                    <p>School Name</p>
                                    <InputBox
                                        placeholder={'Enter School Name'}
                                        name={'school'}
                                        id={'add-school-school'}
                                        type={'text'}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        value={values.school}
                                        disable={type === 'view' ? true : false}
                                    />
                                    {errors.school && touched.school ? (
                                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.school.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.school}</p></Grid>
                                    ) : null}
                                </Grid>
                                <Grid className='add-edit-screen-input-container'>
                                    <p>Primary Contact Number</p>
                                    <InputBox
                                        placeholder={'Enter Primary Contact Number'}
                                        name={'primary_contact'}
                                        id={'add-school-primary_contact'}
                                        type={'text'}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        value={values.primary_contact}
                                        disable={type === 'view' ? true : false}
                                    />
                                    {errors.primary_contact && touched.primary_contact ? (
                                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.primary_contact.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.primary_contact}</p></Grid>
                                    ) : null}
                                </Grid>
                                <Grid className='add-edit-screen-input-container'>
                                    <p>Secondary Contact Number</p>
                                    <InputBox
                                        placeholder={'Enter Secondary Contact Number'}
                                        name={'secondary_contact'}
                                        id={'add-school-secondary_contact'}
                                        type={'text'}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        value={values.secondary_contact}
                                        disable={type === 'view' ? true : false}
                                    />
                                    {errors.secondary_contact && touched.secondary_contact ? (
                                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.secondary_contact.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.secondary_contact}</p></Grid>
                                    ) : null}
                                </Grid>
                                <Grid className='add-edit-screen-input-container'>
                                    <p>Number of Teachers in School</p>
                                    <InputBox
                                        placeholder={'Enter Number of Teachers'}
                                        name={'no_of_teachers'}
                                        id={'add-school-no_of_teachers'}
                                        type={'text'}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        value={values.no_of_teachers}
                                        disable={type === 'view' ? true : false}
                                    />
                                    {errors.no_of_teachers && touched.no_of_teachers ? (
                                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.no_of_teachers.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.no_of_teachers}</p></Grid>
                                    ) : null}
                                </Grid>
                                <Grid className='add-edit-screen-input-container'>
                                    <p>Number of Students in School</p>
                                    <InputBox
                                        placeholder={'Enter Number of Students'}
                                        name={'no_of_students'}
                                        id={'add-school-no_of_students'}
                                        type={'text'}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        value={values.no_of_students}
                                        disable={type === 'view' ? true : false}
                                    />
                                    {errors.no_of_students && touched.no_of_students ? (
                                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.no_of_students.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.no_of_students}</p></Grid>
                                    ) : null}
                                </Grid>
                                <Grid className='add-edit-screen-input-container'>
                                    <p>Number of School Admins in School</p>
                                    <InputBox
                                        placeholder={'Enter Number of School Admins'}
                                        name={'no_of_school_admin'}
                                        id={'add-school-no_of_school_admin'}
                                        type={'text'}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        value={values.no_of_school_admin}
                                        disable={type === 'view' ? true : false}
                                    />
                                    {errors.no_of_school_admin && touched.no_of_school_admin ? (
                                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.no_of_school_admin.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.no_of_school_admin}</p></Grid>
                                    ) : null}
                                </Grid>

                            </Grid>

                            <h3 className='add-edit-screen-input-group-name'>Address Details</h3>

                            <Grid className='add-edit-screen-input-row'>
                                <Grid className='add-edit-screen-input-container'>
                                    <p>Address Line 1</p>
                                    <InputBox
                                        placeholder={'Enter Address Line 1'}
                                        name={'addressLine1'}
                                        id={'add-school-addressLine1'}
                                        type={'text'}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        value={values.addressLine1}
                                        disable={type === 'view' ? true : false}
                                    />
                                    {errors.addressLine1 && touched.addressLine1 ? (
                                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.addressLine1.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.addressLine1}</p></Grid>
                                    ) : null}
                                </Grid>
                                <Grid className='add-edit-screen-input-container'>
                                    <p>Address Line 2</p>
                                    <InputBox
                                        placeholder={'Enter Address Line 2'}
                                        name={'addressLine2'}
                                        id={'add-school-addressLine2'}
                                        type={'text'}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        value={values.addressLine2}
                                        disable={type === 'view' ? true : false}
                                    />
                                    {errors.addressLine2 && touched.addressLine2 ? (
                                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.addressLine2.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.addressLine2}</p></Grid>
                                    ) : null}
                                </Grid>

                                <Grid className='add-edit-screen-input-container'>
                                    <p>City</p>
                                    <DropownCustom
                                        label={'Select City'}
                                        value={values.city}
                                        handleBlur={handleBlur}
                                        name={'city'}
                                        handleChange={handleChange}
                                        dropdownKeysArray={dropdownKeysArray}
                                        dropdownListArray={dropdownListArray}
                                        disabledOption={type === 'view' ? true : false}
                                    />
                                    {errors.city && touched.city ? (
                                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.city.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.city}</p></Grid>
                                    ) : null}
                                </Grid>
                                <Grid className='add-edit-screen-input-container'>
                                    <p>State</p>
                                    <DropownCustom
                                        label={'Select State'}
                                        value={values.state}
                                        handleBlur={handleBlur}
                                        name={'state'}
                                        handleChange={handleChange}
                                        dropdownKeysArray={dropdownKeysArray}
                                        dropdownListArray={dropdownListArray}
                                        disabledOption={type === 'view' ? true : false}
                                    />
                                    {errors.state && touched.state ? (
                                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.state.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.state}</p></Grid>
                                    ) : null}
                                </Grid>

                                <Grid className='add-edit-screen-input-container'>
                                    <p>Zip/Postal Code</p>
                                    <InputBox
                                        placeholder={'Enter Postal Code'}
                                        name={'zip_code'}
                                        id={'add-school-zip_code'}
                                        type={'text'}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        value={values.zip_code}
                                        disable={type === 'view' ? true : false}
                                    />
                                    {errors.zip_code && touched.zip_code ? (
                                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.zip_code.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.zip_code}</p></Grid>
                                    ) : null}
                                </Grid>

                                <Grid className='add-edit-screen-input-container'>
                                    <p>Country</p>
                                    <DropownCustom
                                        label={'Select Country'}
                                        value={values.country}
                                        handleBlur={handleBlur}
                                        name={'country'}
                                        handleChange={handleChange}
                                        dropdownKeysArray={dropdownKeysArray}
                                        dropdownListArray={dropdownListArray}
                                        disabledOption={type === 'view' ? true : false}
                                    />
                                    {errors.country && touched.country ? (
                                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.country.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.country}</p></Grid>
                                    ) : null}
                                </Grid>

                            </Grid>

                            <h3 className='add-edit-screen-input-group-name'>POC - 1 Details</h3>

                            <Grid className='add-edit-screen-input-row'>
                                <Grid className='add-edit-screen-input-container'>
                                    <p>Name</p>
                                    <InputBox
                                        placeholder={'Enter Name'}
                                        name={'poc1.poc_name'}
                                        id={'add-school-poc1.poc_name'}
                                        type={'text'}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        value={values.poc1?.poc_name}
                                        disable={type === 'view' ? true : false}
                                    />
                                    {errors.poc1?.poc_name && touched.poc1?.poc_name ? (
                                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.poc1?.poc_name.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.poc1?.poc_name}</p></Grid>
                                    ) : null}
                                </Grid>

                                <Grid className='add-edit-screen-input-container'>
                                    <p>Contact Number</p>
                                    <InputBox
                                        placeholder={'Enter Contact Number'}
                                        name={'poc1.contact'}
                                        id={'add-school-poc1.contact'}
                                        type={'text'}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        value={values.poc1?.contact}
                                        disable={type === 'view' ? true : false}
                                    />
                                    {errors.poc1?.contact && touched.poc1?.contact ? (
                                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.poc1?.contact.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.poc1?.contact}</p></Grid>
                                    ) : null}
                                </Grid>

                                <Grid className='add-edit-screen-input-container'>
                                    <p>Email Address</p>
                                    <InputBox
                                        placeholder={'Enter Email Address'}
                                        name={'poc1.email'}
                                        id={'add-school-poc1.email'}
                                        type={'text'}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        value={values.poc1?.email}
                                        disable={type === 'view' ? true : false}
                                    />
                                    {errors.poc1?.email && touched.poc1?.email ? (
                                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.poc1?.email.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.poc1?.email}</p></Grid>
                                    ) : null}
                                </Grid>

                            </Grid>

                            <h3 className='add-edit-screen-input-group-name'>POC - 2 Details</h3>

                            <Grid className='add-edit-screen-input-row'>
                                <Grid className='add-edit-screen-input-container'>
                                    <p>Name</p>
                                    <InputBox
                                        placeholder={'Enter Name'}
                                        name={'poc2.poc_name'}
                                        id={'add-school-poc2.poc_name'}
                                        type={'text'}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        value={values.poc2.poc_name}
                                        disable={type === 'view' ? true : false}
                                    />
                                    {errors.poc2?.poc_name && touched.poc2?.poc_name ? (
                                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.poc2?.poc_name.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.poc2?.poc_name}</p></Grid>
                                    ) : null}
                                </Grid>

                                <Grid className='add-edit-screen-input-container'>
                                    <p>Contact Number</p>
                                    <InputBox
                                        placeholder={'Enter Contact Number'}
                                        name={'poc2.contact'}
                                        id={'add-school-poc2.contact'}
                                        type={'text'}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        value={values.poc2?.contact}
                                        disable={type === 'view' ? true : false}
                                    />
                                    {errors.poc2?.contact && touched.poc2?.contact ? (
                                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.poc2?.contact.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.poc2?.contact}</p></Grid>
                                    ) : null}
                                </Grid>

                                <Grid className='add-edit-screen-input-container'>
                                    <p>Email Address</p>
                                    <InputBox
                                        placeholder={'Enter Email Address'}
                                        name={'poc2.email'}
                                        id={'add-school-poc2.email'}
                                        type={'text'}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        value={values.poc2?.email}
                                        disable={type === 'view' ? true : false}
                                    />
                                    {errors.poc2?.email && touched.poc2?.email ? (
                                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.poc2?.email.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.poc2?.email}</p></Grid>
                                    ) : null}
                                </Grid>

                            </Grid>

                            {(type === 'add') &&
                                <>

                                    <h3 className='add-edit-screen-input-group-name'>School Admin Details</h3>

                                    {
                                        schoolAdminArray?.map((admin, index) => {
                                            return (
                                                <Grid key={`addSchool-add-admin-${index + 1}`} className='add-edit-screen-input-row'>
                                                    <Grid className='add-edit-screen-input-container'>
                                                        <p>Name of School Admin</p>
                                                        <InputBox
                                                            placeholder={'Enter Name'}
                                                            name={'admin.admin_name'}
                                                            id={`add-school-admin_name-${index + 1}`}
                                                            type={'text'}
                                                            handleChange={(event) => handleChangeAdminInput(index, event.target.value, 'admin_name')}
                                                            value={admin?.admin_name}
                                                        />
                                                    </Grid>

                                                    <Grid className='add-edit-screen-input-container'>
                                                        <p>Email Address</p>
                                                        <InputBox
                                                            placeholder={'Enter Email Address'}
                                                            name={'admin.admin_email'}
                                                            id={`add-school-admin_email-${index + 1}`}
                                                            type={'text'}
                                                            handleChange={(event) => handleChangeAdminInput(index, event.target.value, 'admin_email')}
                                                            value={admin?.admin_email}
                                                        />
                                                    </Grid>

                                                    <Grid className='add-edit-screen-input-container'>
                                                        <p style={{ visibility: 'hidden' }}>button</p>
                                                        <Grid width={'130px'}>
                                                            <ArgonButton
                                                                component={Button}
                                                                variant="gradient"
                                                                size="medium"
                                                                color={'dark'}
                                                                disableHover={true}
                                                                onClick={() => {
                                                                    if (index === schoolAdminArray?.length - 1) {
                                                                        handleAddAdmin();
                                                                    }
                                                                    else {
                                                                        handleRemoveAdmin(index);
                                                                    }
                                                                }}
                                                            >
                                                                {(index === schoolAdminArray?.length - 1) ? 'Add New' : 'Remove'}
                                                            </ArgonButton>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            )
                                        })
                                    }
                                </>
                            }

                            <h3 className='add-edit-screen-input-group-name'>Subscription Details</h3>

                            <Grid className='add-edit-screen-input-row'>
                                <Grid className='add-edit-screen-input-container'>
                                    <p>Payable Amount</p>
                                    <InputBox
                                        placeholder={'Enter Amount'}
                                        // name={'schoool'}
                                        // id={'add-school-schoool'}
                                        type={'text'}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        // value={values.schoool}
                                        disable={type === 'view' ? true : false}
                                    />
                                    {/* {errors.schoool && touched.schoool ? (
                                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.schoool.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.schoool}</p></Grid>
                                    ) : null} */}
                                </Grid>

                                <Grid className='add-edit-screen-input-container'>
                                    <p>Activation Status</p>
                                    <DropownCustom
                                        label={'Activate/ Deactivate'}
                                        // value={values.city}
                                        handleBlur={handleBlur}
                                        // name={'city'}
                                        handleChange={handleChange}
                                        dropdownKeysArray={['activate', 'deactivate']}
                                        dropdownListArray={['Activate', 'Deactivate']}
                                        disabledOption={type === 'view' ? true : false}
                                    />
                                    {/* {errors.city && touched.city ? (
                                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.city.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.city}</p></Grid>
                                    ) : null} */}
                                </Grid>

                                <Grid className='add-edit-screen-input-container'>
                                    <p>Enter Due Date</p>
                                    <DatePickerCustom
                                        placeholder={'Validity period'}
                                        value={values?.validity}
                                        name={'validity'}
                                        id={'add-comp-off-validity'}
                                        handleChange={setFieldValue}
                                        disabledOption={type === 'view' ? true : false}
                                    />
                                    {/* {errors.city && touched.city ? (
                                        <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: '1rem', width: '100%', marginTop: `${(errors.city.length <= 60) ? '-5px' : '8px'}` }}><p style={{ margin: '0', padding: '0' }} className="form-error">{errors.city}</p></Grid>
                                    ) : null} */}
                                </Grid>

                            </Grid>



                            {!(type === 'add') &&
                                <>
                                    <h3 className='add-edit-screen-input-group-name'>School Admin Details</h3>
                                    <CustomAdvanceTable
                                        ActionData={ActionData}
                                        tableMinHeight={"580px"}
                                        tableMaxHeight={"580px"}
                                        // hideColumns={tableHideColumns}
                                        allColumns={type === 'edit' ? tableEditSchoolAllColumns : tableViewSchoolAllColumns}
                                        tableData={tableEditViewSchoolDummyData}
                                        isLoading={false}
                                        enableRowAction={false}
                                        enableTopToolbar={false}
                                        enableSorting={false}
                                        enableColumnAction={false}
                                        enableRowSelection={false}
                                        enableSelectAll={false}
                                    />
                                    <Grid>
                                        <PaginationCustom
                                            currentPage={currentPage}
                                            setCurrentPage={setCurrentPage}
                                            totalRecords={totalRecords}
                                        />
                                    </Grid>
                                </>
                            }


                            <Grid style={{ display: `${type === 'view' ? 'none' : 'flex'}`, justifyContent: 'flex-start' }}>
                                <Grid style={{ display: 'flex', gap: '20px' }}>
                                    <ArgonButton
                                        component={Button}
                                        variant="gradient"
                                        size="large"
                                        color={'secondary'}
                                        type={'submit'}
                                        disableHover={true}
                                    >
                                        {'Generate Bill'}
                                    </ArgonButton>
                                </Grid>
                            </Grid>



                            <Grid style={{ display: `${type === 'view' ? 'none' : 'flex'}`, justifyContent: 'flex-end' }}>
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
                                        {type === 'add' ? 'Save' : 'Update'}
                                    </ArgonButton>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Grid>

            {
                openEditSchoolAdminDialog && <EditSchoolAdminDialog open={openEditSchoolAdminDialog} setOpen={setOpenEditSchoolAdminDialog} />
            }
        </>
    )
}

export default AddEditViewSchool