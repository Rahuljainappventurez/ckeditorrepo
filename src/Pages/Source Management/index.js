import { Grid, Icon } from '@mui/material'
import CustomAdvanceTable from 'components/TableCustom/CustomAdvanceTable'
import React, { useEffect, useState } from 'react'
import '../../assets/css/global-style.scss'
import { Delete, Edit, Visibility } from '@mui/icons-material'
import PaginationCustom from 'components/PaginationCustom/PaginationCustom'
import ArgonButton from 'components/ArgonButton'
import { Link } from 'react-router-dom'
import ArgonInput from 'components/ArgonInput'
import routerConstants from 'constants/routerConstants'
import { tableSourceManagementAllColumns } from 'constants/TableConstants'
import { getRequest } from 'services/axios-api-request/axios_api_Request'
import { apiurl } from 'constants/apiURLsConstants'
import { useQuery, useQueryClient } from 'react-query'
import toaster from 'utility/toaster/toaster'
import ConfirmationWithCaptcha from 'components/ConfirmationWithCaptcha/ConfirmationWithCaptcha'
import { toasterMessage } from 'constants/toasterMessage'
import SearchCustom from 'components/search-custom/SearchCustom'

const SourceManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    // ******** state variable for pagination *********
    const [currentPage, setCurrentPage] = useState(1)
    const [totalRecords, setTotalRecords] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    // ******** state variable for handle the captcha dialog state *********
    const [openConfirmationCaptchaDialog, setOpenConfirmationCaptchaDialog] = useState(false);

    // ************ callback function and state variable for row data ************
    const [sourceRowData, setSourceRowData] = useState('');
    const sourceRowDataCallback = (rowData) => {
        setSourceRowData(rowData)
    }

    // ************* action array **********
    const ActionData = [
        {
            label: 'View',
            icon: <Visibility />,
            navigationAddress: routerConstants?.viewSourceRoute,
        },
        {
            label: 'Edit',
            icon: <Edit />,
            navigationAddress: routerConstants?.editSourceRoute,
        },
        {
            label: 'Delete',
            icon: <Delete />,
            open: openConfirmationCaptchaDialog,
            setOpen: setOpenConfirmationCaptchaDialog,
            callback: sourceRowDataCallback,
        },
    ]

    // ********* for fetch the source list and transform data according to requirement *********
    const transormSourceData = (data) => {
        return data?.rows?.map((item) => ({
            ...item,
            source_name: item?.name,
        }))
    }

    const fetchSourceList = () => {
        return getRequest(apiurl?.SOURCE_LIST_URL, {
            page: currentPage,
            size: rowsPerPage,
            search: searchTerm,
        })
    }

    const { isLoading, data: sourceList, isError, error } = useQuery(
        ['source-management-list', currentPage, rowsPerPage, searchTerm],
        fetchSourceList,
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
        setTotalRecords(sourceList?.totalCount ?? '')
    }, [sourceList])

    // ************* handle refetch after delete ************
    const queryClient = useQueryClient();
    const handleRefetch = () => {
        queryClient.invalidateQueries('source-management-list');
    };

    return (
        <>
            <Grid className='page-main-container-layout'>

                <Grid className='table-wrapper-with-text'>
                    <Grid className='table-heading-text-top-container'>
                        <span>List of Sources</span>
                        <Grid className='page-text-buttons-with-table'>
                            <SearchCustom setSearchKey={setSearchTerm} debounceDelay={800} />
                            <ArgonButton
                                component={Link}
                                to={routerConstants?.addSourceRoute}
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
                        allColumns={tableSourceManagementAllColumns}
                        tableData={transormSourceData(sourceList) ?? []}
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
                    apiurl={`${apiurl?.SOURCE_DELETE_URL}/${sourceRowData?._id}`}
                    apiSuccessMsg={toasterMessage?.DELETE_SOURCE_SUCCESS}
                    refetch={handleRefetch}
                />
            }
        </>
    )
}

export default SourceManagement