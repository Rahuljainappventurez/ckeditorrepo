import { Grid, Icon } from '@mui/material'
import CustomAdvanceTable from 'components/TableCustom/CustomAdvanceTable'
import React, { useEffect, useState } from 'react'
import '../../assets/css/global-style.scss'
import { Delete, Edit, Visibility } from '@mui/icons-material'
import PaginationCustom from 'components/PaginationCustom/PaginationCustom'
import ArgonButton from 'components/ArgonButton'
import { Link, useLocation } from 'react-router-dom'
import ArgonInput from 'components/ArgonInput'
import { tableBranchManagementAllColumns } from 'constants/TableConstants'
import routerConstants from 'constants/routerConstants'
import ConfirmationWithCaptcha from 'components/ConfirmationWithCaptcha/ConfirmationWithCaptcha'
import { toasterMessage } from 'constants/toasterMessage'
import { useQuery, useQueryClient } from 'react-query'
import { getRequest } from 'services/axios-api-request/axios_api_Request'
import { apiurl } from 'constants/apiURLsConstants'
import toaster from 'utility/toaster/toaster'
import SearchCustom from 'components/search-custom/SearchCustom'

const BranchManagement = () => {
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');

    // ******** state variable for pagination *********
    const [currentPage, setCurrentPage] = useState(1)
    const [totalRecords, setTotalRecords] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    // ******** state variable for handle the captcha dialog state *********
    const [openConfirmationCaptchaDialog, setOpenConfirmationCaptchaDialog] = useState(false);

    // ************ callback function and state variable for row data ************
    const [branchRowData, setBranchRowData] = useState('');
    const branchRowDataCallback = (rowData) => {
        setBranchRowData(rowData)
    }

    // ************* action array **********
    const ActionData = [
        {
            label: 'View',
            icon: <Visibility />,
            navigationAddress: routerConstants?.viewBranchRoute,
        },
        {
            label: 'Edit',
            icon: <Edit />,
            navigationAddress: routerConstants?.editBranchRoute,
        },
        {
            label: 'Delete',
            icon: <Delete />,
            open: openConfirmationCaptchaDialog,
            setOpen: setOpenConfirmationCaptchaDialog,
            callback: branchRowDataCallback,
        },
    ]


    // ********* for fetch the branch list and transform data according to requirement *********
    const transormBranchData = (data) => {
        return data?.rows?.map((item) => ({
            ...item,
            branch_name: item?.name,
            branch_id: item?.client_branch_id,
        }))
    }

    const fetchBranchList = () => {
        return getRequest(apiurl?.BRANCH_LIST_URL, {
            page: currentPage,
            size: rowsPerPage,
            search: searchTerm,
        })
    }

    const { isLoading, data: branchList, isError, error } = useQuery(
        ['branch-management-list', currentPage, rowsPerPage,searchTerm],
        fetchBranchList,
        {
            // enabled: location.pathname === routerConstants?.branchManagementRoute,
            // refetchOnWindowFocus: false,
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
        setTotalRecords(branchList?.totalCount ?? '')
    }, [branchList])

    // ************* handle refetch after delete ************
    const queryClient = useQueryClient();
    const handleRefetch = () => {
        queryClient.invalidateQueries('branch-management-list');
    };

    return (
        <>
            <Grid className='page-main-container-layout'>

                <Grid className='table-wrapper-with-text'>
                    <Grid className='table-heading-text-top-container'>
                        <span>List of Branches</span>
                        <Grid className='page-text-buttons-with-table'>
                            <SearchCustom setSearchKey={setSearchTerm} debounceDelay={800} />
                            <ArgonButton
                                component={Link}
                                to={routerConstants?.addBranchRoute}
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
                        allColumns={tableBranchManagementAllColumns}
                        tableData={transormBranchData(branchList) ?? []}
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
                    apiurl={`${apiurl?.BRANCH_DELETE_URL}/${branchRowData?._id}`}
                    apiSuccessMsg={toasterMessage?.DELETE_BRANCH_SUCCESS}
                    refetch={handleRefetch}
                />
            }
        </>
    )
}

export default BranchManagement