import { Grid, Icon } from '@mui/material'
import CustomAdvanceTable from 'components/TableCustom/CustomAdvanceTable'
import React, { useEffect, useState } from 'react'
import '../../assets/css/global-style.scss'
import { Delete, Edit } from '@mui/icons-material'
import PaginationCustom from 'components/PaginationCustom/PaginationCustom'
import ArgonButton from 'components/ArgonButton'
import { Link } from 'react-router-dom'
import { tableQuestionTypeManagementAllColumns } from 'constants/TableConstants'
import routerConstants from 'constants/routerConstants'
import { apiurl } from 'constants/apiURLsConstants'
import { useQuery, useQueryClient } from 'react-query'
import toaster from 'utility/toaster/toaster'
import { getRequest } from 'services/axios-api-request/axios_api_Request'
import ConfirmationWithCaptcha from 'components/ConfirmationWithCaptcha/ConfirmationWithCaptcha'
import { toasterMessage } from 'constants/toasterMessage'
import SearchCustom from 'components/search-custom/SearchCustom'

const QuestionTypeManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    // ******** state variable for pagination *********
    const [currentPage, setCurrentPage] = useState(1)
    const [totalRecords, setTotalRecords] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    // ******** state variable for handle the captcha dialog state *********
    const [openConfirmationCaptchaDialog, setOpenConfirmationCaptchaDialog] = useState(false);

    // ************ callback function and state variable for row data ************
    const [questionTypeRowData, setQuestionTypeRowData] = useState('');
    const questionTypeRowDataCallback = (rowData) => {
        setQuestionTypeRowData(rowData)
    }

    // ************* action array **********
    const ActionData = [
        {
            label: 'Edit',
            icon: <Edit />,
            navigationAddress: routerConstants?.editQuestionTypeRoute,
        },
        {
            label: 'Delete',
            icon: <Delete />,
            open: openConfirmationCaptchaDialog,
            setOpen: setOpenConfirmationCaptchaDialog,
            callback: questionTypeRowDataCallback,
        },
    ]

    // ********* for fetch the question-type list and transform data according to requirement *********
    const transormQuestionTypeData = (data) => {
        return data?.rows?.map((item) => ({
            ...item,
            question_type: item?.name,
        }))
    }

    const fetchQuestionTypeList = () => {
        return getRequest(apiurl?.QUESTION_TYPE_LIST_URL, {
            page: currentPage,
            size: rowsPerPage,
            search: searchTerm,
        })
    }

    const { isLoading, data: questionTypeList, isError, error } = useQuery(
        ['question-type-management-list', currentPage, rowsPerPage, searchTerm],
        fetchQuestionTypeList,
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
        setTotalRecords(questionTypeList?.totalCount ?? '')
    }, [questionTypeList])

    // ************* handle refetch after delete ************
    const queryClient = useQueryClient();
    const handleRefetch = () => {
        queryClient.invalidateQueries('question-type-management-list');
    };

    return (
        <>
            <Grid className='page-main-container-layout'>

                <Grid className='table-wrapper-with-text'>
                    <Grid className='table-heading-text-top-container'>
                        <span>List of Question Types</span>
                        <Grid className='page-text-buttons-with-table'>
                            <SearchCustom setSearchKey={setSearchTerm} debounceDelay={800} />
                            <ArgonButton
                                component={Link}
                                to={routerConstants?.addQuestionTypeRoute}
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
                        allColumns={tableQuestionTypeManagementAllColumns}
                        tableData={transormQuestionTypeData(questionTypeList) ?? []}
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
                    apiurl={`${apiurl?.QUESTION_TYPE_DELETE_URL}/${questionTypeRowData?._id}`}
                    apiSuccessMsg={toasterMessage?.DELETE_QUESTION_TYPE_SUCCESS}
                    refetch={handleRefetch}
                />
            }
        </>
    )
}

export default QuestionTypeManagement