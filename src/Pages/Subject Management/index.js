import { Grid, Icon } from '@mui/material'
import CustomAdvanceTable from 'components/TableCustom/CustomAdvanceTable'
import React, { useEffect, useState } from 'react'
import '../../assets/css/global-style.scss'
import { Delete, Edit, Visibility } from '@mui/icons-material'
import PaginationCustom from 'components/PaginationCustom/PaginationCustom'
import ArgonButton from 'components/ArgonButton'
import { Link } from 'react-router-dom'
import { tableSubjectManagementAllColumns } from 'constants/TableConstants'
import ArgonInput from 'components/ArgonInput'
import routerConstants from 'constants/routerConstants'
import ConfirmationWithCaptcha from 'components/ConfirmationWithCaptcha/ConfirmationWithCaptcha'
import { useQuery, useQueryClient } from 'react-query'
import { getRequest } from 'services/axios-api-request/axios_api_Request'
import toaster from 'utility/toaster/toaster'
import { apiurl } from 'constants/apiURLsConstants'
import { toasterMessage } from 'constants/toasterMessage'
import SearchCustom from 'components/search-custom/SearchCustom'

const SubjectManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1)
    const [totalRecords, setTotalRecords] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openConfirmationCaptchaDialog, setOpenConfirmationCaptchaDialog] = useState(false);
    const [subjectRowData, setSubjectRowData] = useState('');

    const subjectRowDataCallback = (rowData) => {
        setSubjectRowData(rowData)
    }

    const ActionData = [
        {
            label: 'View',
            icon: <Visibility />,
            navigationAddress: routerConstants?.viewSubjectRoute,
        },
        {
            label: 'Edit',
            icon: <Edit />,
            navigationAddress: routerConstants?.editSubjectRoute,
        },
        {
            label: 'Delete',
            icon: <Delete />,
            open: openConfirmationCaptchaDialog,
            setOpen: setOpenConfirmationCaptchaDialog,
            callback: subjectRowDataCallback,
        },
    ]

    const transormSubjectData = (data) => {
        return data?.rows?.map((item) => ({
            ...item,
            subject_name: item?.name,
            subject_id: item?.client_subject_id,
        }))
    }

    const queryClient = useQueryClient();

    const fetchSubjectList = () => {
        return getRequest(apiurl?.SUBJECT_LIST_URL, {
            page: currentPage,
            size: rowsPerPage,
            search: searchTerm,
        })
    }

    const { isLoading, data: subjectList, isError, error } = useQuery(
        ['subject-management-list', currentPage, rowsPerPage, searchTerm],
        fetchSubjectList,
        {
            select: (data) => {
                return data?.data?.result
            },
        }
    )

    useEffect(() => {
        if (isError) {
            toaster('error', error?.message)
        }
    }, [isError])

    useEffect(() => {
        setTotalRecords(subjectList?.totalCount ?? '')
    }, [subjectList])

    const handleRefetch = () => {
        queryClient.invalidateQueries('subject-management-list');
    };

    return (
        <>
            <Grid className='page-main-container-layout'>

                <Grid className='table-wrapper-with-text'>
                    <Grid className='table-heading-text-top-container'>
                        <span>List of Subjects</span>
                        <Grid className='page-text-buttons-with-table'>

                            <SearchCustom setSearchKey={setSearchTerm} debounceDelay={800} />

                            <ArgonButton
                                component={Link}
                                to={routerConstants?.addSubjectRoute}
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
                        allColumns={tableSubjectManagementAllColumns}
                        tableData={transormSubjectData(subjectList) ?? []}
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
                    apiurl={`${apiurl?.SUBJECT_DELETE_URL}/${subjectRowData?._id}`}
                    apiSuccessMsg={toasterMessage?.DELETE_SUBJECT_SUCCESS}
                    refetch={handleRefetch}
                />
            }
        </>
    )
}

export default SubjectManagement