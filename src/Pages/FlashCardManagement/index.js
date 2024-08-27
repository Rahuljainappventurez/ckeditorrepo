import { Grid, Icon } from '@mui/material'
import CustomAdvanceTable from 'components/TableCustom/CustomAdvanceTable'
import React, { useState } from 'react'
import '../../assets/css/global-style.scss'
import PaginationCustom from 'components/PaginationCustom/PaginationCustom'
import ArgonButton from 'components/ArgonButton'
import { Link } from 'react-router-dom'
import ArgonInput from 'components/ArgonInput'
import CustomPopover from 'components/CustomPopover/CustomPopover'
import ButtonCustom from 'components/Button/ButtonCustom'
import { tableFlashcardAllColumns } from 'constants/TableConstants'
import { tableFlashcardDummyData } from 'constants/TableConstants'

const FlashcardManagement = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedRowData, setSelectedRowData] = useState({})
    const [totalRecords, setTotalRecords] = useState(100);
    const [rowsPerPage, setRowsPerPage] = useState(100);
    const ActionData = [
        {
            label: 'View',
        },
        {
            label: 'Delete',
        },
        {
            label: 'Reset Approval 1',
        },
        {
            label: 'Reset Approval 2',
        },
        {
            label: 'Reject Level 1',
        },
        {
            label: 'Reject Level 2',
        },
    ]

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClickMoreAction = (event, rowSelectionObj) => {
        setAnchorEl(event.currentTarget);
    }

    const isEmptyObject = (obj) => {
        return Object.keys(obj).length === 0;
    };

    const tableRowSelectionDataCallback = (rowSelectionObj) => {
        setSelectedRowData(rowSelectionObj)
    }

    return (
        <>
            <Grid className='page-main-container-layout'>

                <Grid className='table-wrapper-with-text'>
                    <Grid className='table-heading-text-top-container'>
                        <span>List of Flashcards</span>
                        <Grid className='page-text-buttons-with-table'>
                            {isEmptyObject(selectedRowData) ? null :
                                <>
                                    <ArgonButton
                                        component={Link}
                                        variant="contained"
                                        secendary size="small"
                                        color={'secondary'}

                                    >
                                        {'Delete'}
                                    </ArgonButton>

                                    <ButtonCustom text={'Reset Approval 1'} />
                                    <ButtonCustom text={'Reset Approval 2'} />
                                    <ButtonCustom text={'Reject Level 1'} />
                                    <ButtonCustom text={'Reject Level 2'} />
                                </>
                            }

                            <ArgonInput
                                placeholder="Type here..."
                                startAdornment={
                                    <Icon fontSize="small" style={{ marginRight: "6px" }}>
                                        search
                                    </Icon>
                                }
                            />
                        </Grid>
                    </Grid>
                    <CustomAdvanceTable
                        ActionData={ActionData}
                        tableMinHeight={"580px"}
                        tableMaxHeight={"580px"}
                        allColumns={tableFlashcardAllColumns}
                        tableData={tableFlashcardDummyData}
                        isLoading={false}
                        enableRowAction={false}
                        enableTopToolbar={false}
                        enableSorting={false}
                        enableColumnAction={false}
                        enableRowSelection={true}
                        enableSelectAll={false}
                        handleClickMoreAction={handleClickMoreAction}
                        tableRowSelectionDataCallback={tableRowSelectionDataCallback}
                        currentPage={currentPage}
                        rowsPerPage={rowsPerPage}
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
            <CustomPopover
                setAnchorEl={setAnchorEl}
                anchorEl={anchorEl}
                popoverId={'popover-custom-id'}
                ActionData={ActionData}
            />
        </>
    )
}

export default FlashcardManagement