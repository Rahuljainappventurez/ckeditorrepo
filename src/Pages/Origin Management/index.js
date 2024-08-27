import { Grid, Icon } from '@mui/material'
import CustomAdvanceTable from 'components/TableCustom/CustomAdvanceTable'
import React, { useEffect, useState } from 'react'
import '../../assets/css/global-style.scss'
import { Delete, Edit, Visibility } from '@mui/icons-material'
import PaginationCustom from 'components/PaginationCustom/PaginationCustom'
import ArgonButton from 'components/ArgonButton'
import { Link } from 'react-router-dom'
import ArgonInput from 'components/ArgonInput'
import { tableQuestionTypeManagementAllColumns } from 'constants/TableConstants'
import { tableQuestionTypeDummyData } from 'constants/TableConstants'
import routerConstants from 'constants/routerConstants'
import { tableOriginManagementAllColumns } from 'constants/TableConstants'
import { tableOriginDummyData } from 'constants/TableConstants'
import { useQuery, useQueryClient } from 'react-query'
import { getRequest } from 'services/axios-api-request/axios_api_Request'
import toaster from 'utility/toaster/toaster'
import { apiurl } from 'constants/apiURLsConstants'
import ConfirmationWithCaptcha from 'components/ConfirmationWithCaptcha/ConfirmationWithCaptcha'
import { toasterMessage } from 'constants/toasterMessage'
import SearchCustom from 'components/search-custom/SearchCustom'

const OriginManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    // ******** state variable for pagination *********
    const [currentPage, setCurrentPage] = useState(1)
    const [totalRecords, setTotalRecords] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    // ******** state variable for handle the captcha dialog state *********
    const [openConfirmationCaptchaDialog, setOpenConfirmationCaptchaDialog] = useState(false);

    // ************ callback function and state variable for row data ************
    const [originRowData, setOriginRowData] = useState('');
    const originRowDataCallback = (rowData) => {
        setOriginRowData(rowData)
    }

    // ************* action array **********
    const ActionData = [
        {
            label: 'Edit',
            icon: <Edit />,
            navigationAddress: routerConstants?.editOriginRoute,
        },
        {
            label: 'Delete',
            icon: <Delete />,
            open: openConfirmationCaptchaDialog,
            setOpen: setOpenConfirmationCaptchaDialog,
            callback: originRowDataCallback,
        },
    ]

    // ********* for fetch the chapter list and transform data according to requirement *********
    const transormOriginData = (data) => {
        return data?.rows?.map((item) => ({
            ...item,
            origin_name: item?.name,
        }))
    }

    const fetchOriginList = () => {
        return getRequest(apiurl?.ORIGIN_LIST_URL, {
            page: currentPage,
            size: rowsPerPage,
            search: searchTerm,
        })
    }

    const { isLoading, data: originList, isError, error } = useQuery(
        ['origin-management-list', currentPage, rowsPerPage,searchTerm],
        fetchOriginList,
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
        setTotalRecords(originList?.totalCount ?? '')
    }, [originList])

    // ************* handle refetch after delete ************
    const queryClient = useQueryClient();
    const handleRefetch = () => {
        queryClient.invalidateQueries('origin-management-list');
    };

    return (
        <>
            <Grid className='page-main-container-layout'>

                <Grid className='table-wrapper-with-text'>
                    <Grid className='table-heading-text-top-container'>
                        <span>List of Origins</span>
                        <Grid className='page-text-buttons-with-table'>
                            <SearchCustom setSearchKey={setSearchTerm} debounceDelay={800} />
                            <ArgonButton
                                component={Link}
                                to={routerConstants?.addOriginRoute}
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
                        allColumns={tableOriginManagementAllColumns}
                        tableData={transormOriginData(originList) ?? []}
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
                    apiurl={`${apiurl?.ORIGIN_DELETE_URL}/${originRowData?._id}`}
                    apiSuccessMsg={toasterMessage?.DELETE_ORIGIN_SUCCESS}
                    refetch={handleRefetch}
                />
            }
        </>
    )
}

export default OriginManagement