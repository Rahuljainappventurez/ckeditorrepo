import { Grid, Icon } from '@mui/material'
import CustomAdvanceTable from 'components/TableCustom/CustomAdvanceTable'
import React, { useState } from 'react'
import '../../../assets/css/global-style.scss'
import { Delete, Edit, Visibility } from '@mui/icons-material'
import PaginationCustom from 'components/PaginationCustom/PaginationCustom'
import ArgonInput from 'components/ArgonInput'
import routerConstants from 'constants/routerConstants'
import { tableMyTasksAllColumns } from 'constants/TableConstants'
import { tableMyTasksDummyData } from 'constants/TableConstants'
import SearchCustom from 'components/search-custom/SearchCustom'
import ArgonButton from 'components/ArgonButton'
import { Link } from 'react-router-dom'
import { tableTestSeriesAllColumns } from 'constants/TableConstants'
import { tableTestSeriesDummyData } from 'constants/TableConstants'

const TestSeriesAllType = ({ testSeriesType }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalRecords, setTotalRecords] = useState(100);
    const [searchKey, setSearchKey] = useState(1)
    const ActionData = [
        {
            label: 'View',
            icon: <Visibility />,
        },
        {
            label: 'Edit',
            icon: <Edit />,
        },
    ]

    return (
        <Grid className='page-main-container-layout'>

            <Grid className='table-wrapper-with-text'>
                <Grid className='table-heading-text-top-container'>
                    <span>List of Test Series - {(testSeriesType === 'section-wise') ? 'Section wise' : (testSeriesType === 'full-mock') ? 'Full Mock Test' : 'Previous Year Exams'}</span>
                    <Grid className='page-text-buttons-with-table'>
                        <ArgonButton
                            component={Link}
                            variant="gradient"
                            size="medium"
                            color={'secondary'}
                            disableHover={true}
                            to={routerConstants?.createTestRoute}
                        >
                            {'Create Test'}
                        </ArgonButton>
                        <SearchCustom setSearchKey={setSearchKey} />
                    </Grid>
                </Grid>
                <CustomAdvanceTable
                    ActionData={ActionData}
                    tableMinHeight={"580px"}
                    tableMaxHeight={"580px"}
                    allColumns={tableTestSeriesAllColumns}
                    tableData={tableTestSeriesDummyData}
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
            </Grid>
        </Grid>
    )
}

export default TestSeriesAllType