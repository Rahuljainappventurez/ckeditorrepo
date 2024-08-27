import { Button, Grid, Icon } from '@mui/material'
import CustomAdvanceTable from 'components/TableCustom/CustomAdvanceTable'
import React, { useEffect, useState } from 'react'
import '../../assets/css/global-style.scss'
import { Delete, Edit, Visibility } from '@mui/icons-material'
import PaginationCustom from 'components/PaginationCustom/PaginationCustom'
import ArgonButton from 'components/ArgonButton'
import { Link } from 'react-router-dom'
import routerConstants from 'constants/routerConstants'
import { tableEmployeeManagementAllColumns } from 'constants/TableConstants'
import { getRequest } from 'services/axios-api-request/axios_api_Request'
import { useQuery, useQueryClient } from 'react-query'
import toaster from 'utility/toaster/toaster'
import ConfirmationWithCaptcha from 'components/ConfirmationWithCaptcha/ConfirmationWithCaptcha'
import { apiurl } from 'constants/apiURLsConstants'
import { toasterMessage } from 'constants/toasterMessage'
import { capitalizeString } from 'utility/common'
import FilterCustomDialog from 'components/FilterCustom/FilterCustomDialog'
import SearchCustom from 'components/search-custom/SearchCustom'

const EmployeeManagement = () => {
    const [openFilterDialog, setOpenFilterDialog] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState({})
    const [searchTerm, setSearchTerm] = useState('');

    // ******** state variable for pagination *********
    const [currentPage, setCurrentPage] = useState(1)
    const [totalRecords, setTotalRecords] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    // ******** state variable for handle the captcha dialog state *********
    const [openConfirmationCaptchaDialog, setOpenConfirmationCaptchaDialog] = useState(false);

    // ************ callback function and state variable for row data ************
    const [employeeRowData, setEmployeeRowData] = useState('');
    const employeeRowDataCallback = (rowData) => {
        setEmployeeRowData(rowData)
    }

    // ************* action array **********
    const ActionData = [
        {
            label: 'View',
            icon: <Visibility />,
            navigationAddress: routerConstants?.viewEmployeeRoute,
        },
        {
            label: 'Edit',
            icon: <Edit />,
            navigationAddress: routerConstants?.editEmployeeRoute,
        },
        {
            label: 'Delete',
            icon: <Delete />,
            open: openConfirmationCaptchaDialog,
            setOpen: setOpenConfirmationCaptchaDialog,
            callback: employeeRowDataCallback,
        },
    ]

    // ********* for fetch the employee list and transform data according to requirement *********
    const transormEmployeeData = (data) => {
        return data?.rows?.map((item) => ({
            ...item,
            employee_name: item?.name,
            access_level: capitalizeString(item?.role),
        }))
    }

    const fetchEmployeeList = () => {
        return getRequest(apiurl?.EMPLOYEE_LIST_URL, {
            page: currentPage,
            size: rowsPerPage,
            filter: selectedFilters['filter'],
            search: searchTerm,
        })
    }

    const { isLoading, data: employeeList, isError, error } = useQuery(
        ['employee-management-list', currentPage, rowsPerPage, selectedFilters, searchTerm],
        fetchEmployeeList,
        {
            select: (data) => {
                return data?.data?.result
            },
        }
    )


    // ********** for error message when we fetch the list ********** 
    useEffect(() => {
        if (isError) {
            toaster('error', error?.message)
        }
    }, [isError])

    // ************** for set the total records for pagination ************

    useEffect(() => {
        setTotalRecords(employeeList?.totalCount ?? '')
    }, [employeeList])

    // ************* handle refetch after delete ************
    const queryClient = useQueryClient();
    const handleRefetch = () => {
        queryClient.invalidateQueries('employee-management-list');
    };

    const sidebarItems = [
        { label: 'Role', key: 'filter' },
    ];

    const filterOptions = {
        filter: [
            { key: 'content admin', displayName: 'Content admin' },
            { key: 'team lead', displayName: 'Team lead' },
            { key: 'others', displayName: 'Others' },
        ],
    };

    const handleSubmitFilter = (selectedFiltersParameter) => {
        setSelectedFilters({ ...selectedFiltersParameter });
        setCurrentPage(1);
    };


    return (
        <>
            <Grid className='page-main-container-layout'>

                <Grid className='table-wrapper-with-text'>
                    <Grid className='table-heading-text-top-container'>
                        <span>List of Employees</span>
                        <Grid className='page-text-buttons-with-table'>

                            <ArgonButton
                                component={Button}
                                variant="gradient"
                                size="medium"
                                color={'secondary'}
                                disableHover={true}
                                onClick={() => setOpenFilterDialog(true)}
                            >
                                {'Filter'}
                            </ArgonButton>

                            <SearchCustom setSearchKey={setSearchTerm} debounceDelay = {800} />

                            <ArgonButton
                                component={Link}
                                to={routerConstants?.addEmployeeRoute}
                                variant="gradient"
                                size="small"
                                color={'secondary'}
                            >
                                {'Add'}
                            </ArgonButton>
                        </Grid>
                    </Grid>
                    <CustomAdvanceTable
                        ActionData={ActionData}
                        tableMinHeight={"580px"}
                        tableMaxHeight={"580px"}
                        allColumns={tableEmployeeManagementAllColumns}
                        tableData={transormEmployeeData(employeeList) ?? []}
                        isLoading={isLoading}
                        enableRowAction={false}
                        enableTopToolbar={false}
                        enableSorting={false}
                        enableColumnAction={false}
                        enableRowSelection={false}
                        enableSelectAll={false}
                        currentPage={currentPage}
                        rowsPerPage={rowsPerPage}
                    />
                    <Grid>
                        <PaginationCustom
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            totalRecords={totalRecords}
                            rowsPerPage={rowsPerPage}
                            setRowsPerPage={setRowsPerPage}
                        />
                    </Grid>
                </Grid>
            </Grid>

            {
                openConfirmationCaptchaDialog &&
                <ConfirmationWithCaptcha
                    open={openConfirmationCaptchaDialog}
                    setOpen={setOpenConfirmationCaptchaDialog}
                    confirmationMessage={'Are You sure want to delete?'}
                    apiurl={`${apiurl?.EMPLOYEE_DELETE_URL}/${employeeRowData?._id}`}
                    apiSuccessMsg={toasterMessage?.DELETE_EMPLOYEE_SUCCESS}
                    refetch={handleRefetch}
                />
            }

            {
                openFilterDialog &&
                <FilterCustomDialog
                    open={openFilterDialog}
                    setOpen={setOpenFilterDialog}
                    sidebarItems={sidebarItems}
                    filterOptions={filterOptions}
                    onSubmit={handleSubmitFilter}
                    initialSelectedFilters={selectedFilters}
                    title="Filters"
                    description="Select filters to see the relevant results"
                />
            }
        </>
    )
}

export default EmployeeManagement