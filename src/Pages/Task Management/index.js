import { Button, Grid, Icon } from '@mui/material'
import CustomAdvanceTable from 'components/TableCustom/CustomAdvanceTable'
import React, { useEffect, useState } from 'react'
import '../../assets/css/global-style.scss'
import PaginationCustom from 'components/PaginationCustom/PaginationCustom'
import ArgonInput from 'components/ArgonInput'
import routerConstants from 'constants/routerConstants'
import ButtonCustom from 'components/Button/ButtonCustom'
import { tableTaskManagementAllColumns } from 'constants/TableConstants'
import { Visibility } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import AssignTaskDialog from 'components/Edit Sub module Dialog/AssignTaskDialog'
import { getRequest } from 'services/axios-api-request/axios_api_Request'
import { apiurl } from 'constants/apiURLsConstants'
import { useQuery, useQueryClient } from 'react-query'
import toaster from 'utility/toaster/toaster'
import SearchCustom from 'components/search-custom/SearchCustom'
import ArgonButton from 'components/ArgonButton'
import FilterCustomDialog from 'components/FilterCustom/FilterCustomDialog'
import { useSubjectDropdown } from 'Hooks/useDropdowns'
import { useSourceDropdown } from 'Hooks/useDropdowns'
import { useTaskTypeDropdown } from 'Hooks/useDropdowns'
import { filterEmptyArrays } from 'utility/common'

const TaskManagement = () => {
    // ************* for navigation *************
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('');
    const [openFilterDialog, setOpenFilterDialog] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState({})
    const [selectedFiltersOnChnage, setSelectedFiltersOnChange] = useState({})

    // ******** state variable for pagination *********
    const [currentPage, setCurrentPage] = useState(1)
    const [totalRecords, setTotalRecords] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // ************ for selected row info ***********
    const [selectedRowData, setSelectedRowData] = useState({})
    const [selectedRowIDs, setSelectedRowIDS] = useState([])
    const [rowSelection, setRowSelection] = useState({});
    // ************ for open assign task dialog **************
    const [openAssignTaskDialog, setOpenAssignTaskDialog] = useState(false);

    // ************* action array **********
    const ActionData = [
        {
            label: 'View',
            icon: <Visibility />,
            isTaskType: true,
            navigationAddressObj: {
                questionView: routerConstants?.viewQuestionsTaskRoute,
                flashCardView: routerConstants?.viewFlashcardTaskRoute,
                NCERTView: routerConstants?.viewNCERTTaskRoute,
            },
        },
    ]

    // *********** callback function for recieve the selected row data from table **********
    const tableRowSelectionDataCallback = (rowSelectionObj, selectedIds) => {
        setSelectedRowData(rowSelectionObj)
        setSelectedRowIDS(selectedIds)
    }

    const isEmptyObject = (obj) => {
        return Object.keys(obj).length === 0;
    };

    // ********* for fetch the source list and transform data according to requirement *********

    const transformTaskManagementData = (data) => {
        return data?.rows?.map((item) => ({
            chapter: item?.chapter_id?.name,
            chapter_id: item?.chapter_id?._id,
            client_chapter_id: item?.chapter_id?.client_chapter_id,
            task_type: item?.task_type?.name,
            task_type_id: item?.task_type?._id,
            _id: item?._id,
            approver1: item?.approver1?.name,
            approver1_id: item?.approver1?._id,
            approver2: item?.approver2?.name,
            approver2_id: item?.approver2?._id,
            creator: item?.creator_id?.name,
            creator_id: item?.creator_id?._id,
            editor: item?.editor_id?.name,
            editor_id: item?.editor_id?._id,
            source: item?.source_id?.name,
            source_id: item?.source_id?._id,
            subject: item?.subject_id?.name,
            subject_id: item?.subject_id?._id,
            questions_created: item?.created_count,
            questions_approved: item?.approved_count,
            questions_rejected: item?.rejected_count,
            questions_pending: item?.pending_count,
        }))
    }

    const fetchTaskManagementList = () => {
        let queryParams = {
            page: currentPage,
            size: rowsPerPage,
            search: searchTerm,
        }
        if (!isEmptyObject(selectedFilters)) {
            queryParams = { ...queryParams, ...selectedFilters }
        }
        return getRequest(apiurl?.TASK_LIST_URL, queryParams)
    }

    const { isLoading, data: taskManagementList, isError, error } = useQuery(
        ['task-management-list', currentPage, rowsPerPage, searchTerm, selectedFilters],
        fetchTaskManagementList,
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
        setTotalRecords(taskManagementList?.totalCount ?? '')
    }, [taskManagementList])


    // ************* handle refetch after delete ************
    const queryClient = useQueryClient();
    const handleRefetch = () => {
        queryClient.invalidateQueries('task-management-list');
    };


    const trasformDataForFilter = (dataForTransform) => {
        const transformedData = dataForTransform?.map((item) => {
            return {
                key: item?._id,
                displayName: item?.name,
            }
        })
        return transformedData;
    }


    const handleChangeCallbackFilter = (filterData) => {
        setSelectedFiltersOnChange(filterData)
    }

    const [chapterListForFilter, setChaptersForFilter] = useState([]);


    const fetchChapterListSubjectForAll = (queryKey) => {
        if (queryKey?.length === 0) {
            return getRequest(apiurl?.CHAPTER_LIST_URL);
        }
        return getRequest(apiurl?.CHAPTER_LIST_URL, { subject_id: queryKey });
    }

    useEffect(() => {
        const fetchChapters = async () => {
            try {
                const res = await fetchChapterListSubjectForAll(selectedFiltersOnChnage?.subjectId);
                setChaptersForFilter(res?.data?.result?.rows || []);
            } catch (error) {
                console.error('Error fetching chapter list:', error);
            }
        };
        fetchChapters();

        // Cleanup function to handle component unmount
        return () => {
            setChaptersForFilter([]); // Reset the chapters if the component unmounts
        };
    }, [selectedFiltersOnChnage]);


    // ********* fetch dropdown list using custom hook *******
    const { data: subjectDropdownList } = useSubjectDropdown();
    const { data: sourceDropdownList } = useSourceDropdown();
    const { data: taskTypeDropdownList } = useTaskTypeDropdown();


    const sidebarItems = [
        { label: 'Source', key: 'sourceId' },
        { label: 'Subject', key: 'subjectId' },
        { label: 'Chapter', key: 'chapterId' },
        { label: 'Task Type', key: 'taskTypeId' },
    ];

    const filterOptions = {
        sourceId: trasformDataForFilter(sourceDropdownList?.data?.result?.rows) ?? [],
        taskTypeId: trasformDataForFilter(taskTypeDropdownList?.data?.result) ?? [],
        subjectId: trasformDataForFilter(subjectDropdownList?.data?.result?.rows) ?? [],
        chapterId: trasformDataForFilter(chapterListForFilter) ?? [],
    };

    const handleSubmitFilter = (selectedFiltersParameter) => {
        setSelectedFilters(filterEmptyArrays({ ...selectedFiltersParameter }));
        setCurrentPage(1);
    };

    console.log(selectedFilters, 'cefeufefifvcenrrifrnfi')

    return (
        <>
            <Grid className='page-main-container-layout'>

                <Grid className='table-wrapper-with-text'>
                    <Grid className='table-heading-text-top-container'>
                        <span>List of Tasks</span>
                        <Grid className='page-text-buttons-with-table'>
                            <div style={{ display: `${isEmptyObject(selectedRowData) ? 'none' : ''}` }} onClick={() => setOpenAssignTaskDialog(!openAssignTaskDialog)}>
                                <ButtonCustom text={'Assign'} />
                            </div>

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

                            <SearchCustom setSearchKey={setSearchTerm} debounceDelay={800} />

                            <div onClick={() => navigate(routerConstants?.createTaskRoute)}>
                                <ButtonCustom text={'Create Task'} />
                            </div>
                        </Grid>
                    </Grid>
                    <CustomAdvanceTable
                        ActionData={ActionData}
                        tableMinHeight={"580px"}
                        tableMaxHeight={"580px"}
                        allColumns={tableTaskManagementAllColumns}
                        tableData={transformTaskManagementData(taskManagementList) ?? []}
                        isLoading={isLoading}
                        enableRowAction={false}
                        enableTopToolbar={false}
                        enableSorting={false}
                        enableColumnAction={false}
                        enableRowSelection={true}
                        enableSelectAll={false}
                        tableRowSelectionDataCallback={tableRowSelectionDataCallback}
                        currentPage={currentPage}
                        rowsPerPage={rowsPerPage}
                        rowSelection={rowSelection}
                        setRowSelection={setRowSelection}
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
                openAssignTaskDialog && <AssignTaskDialog
                    open={openAssignTaskDialog}
                    setOpen={setOpenAssignTaskDialog}
                    selectedRowIDs={selectedRowIDs}
                    refetch={handleRefetch}
                    setRowSelection={setRowSelection}
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
                    handleChangeCallback={handleChangeCallbackFilter}
                />
            }
        </>
    )
}

export default TaskManagement