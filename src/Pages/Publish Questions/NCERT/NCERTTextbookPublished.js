import { FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material'
import CustomAdvanceTable from 'components/TableCustom/CustomAdvanceTable'
import React, { useState } from 'react'
import '../../../assets/css/global-style.scss';
import PaginationCustom from 'components/PaginationCustom/PaginationCustom'
import ArgonButton from 'components/ArgonButton'
import { Link } from 'react-router-dom'
import SearchCustom from 'components/search-custom/SearchCustom'
import { tablePersonalizedDPPAllColumns } from 'constants/TableConstants';
import { tablePersonalizedDPPDummyData } from 'constants/TableConstants';
import SingleQuestionView from 'components/SingleQuestionView';
import { dummyDataForFullView } from 'constants/moduleConstants';
import routerConstants from 'constants/routerConstants';
import { tableNCERTTextbooksAllColumns } from 'constants/TableConstants';

const NCERTTextbookPublished = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedRowData, setSelectedRowData] = useState({})
    const [searchKey, setSearchKey] = useState('')
    const [tableViewType, setTableViewType] = useState('list');
    const [totalRecords, setTotalRecords] = useState(100);
    const [checkedQuestions, setCheckedQuestions] = useState([]);


    const handleCheckboxChange = (questionNo, checked) => {
        setCheckedQuestions(prevState => {
            if (checked) {
                return [...prevState, questionNo];
            } else {
                return prevState.filter(qNo => qNo !== questionNo);
            }
        });
    };

    console.log(checkedQuestions, 'vrjnkncowedwoi3rn3kefef')

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
                        <span>List of NCERT Published Textbook</span>
                        <Grid className='view-task-radio-full-list'>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={tableViewType}
                                onChange={(event) => setTableViewType(event.target.value)}
                            >
                                <FormControlLabel value="list" control={<Radio />} label="List View" />
                                <FormControlLabel value="full" control={<Radio />} label="Full View" />
                            </RadioGroup>
                        </Grid>
                        <Grid className='page-text-buttons-with-table'>
                            {isEmptyObject(selectedRowData) ? null :
                                <>
                                    <ArgonButton
                                        component={Link}
                                        variant="contained"
                                        secendary size="small"
                                        color={'secondary'}
                                    >
                                        {'Unpublish'}
                                    </ArgonButton>
                                </>
                            }

                            <ArgonButton
                                component={Link}
                                variant="contained"
                                secendary size="small"
                                color={'secondary'}
                                to={routerConstants?.NCERTUnpublishedTextbookRoute}

                            >
                                {'View Unpublished Textbooks'}
                            </ArgonButton>

                            <SearchCustom setSearchKey={setSearchKey} />
                        </Grid>
                    </Grid>

                    <CustomAdvanceTable
                        tableMinHeight={"580px"}
                        tableMaxHeight={"580px"}
                        allColumns={tableNCERTTextbooksAllColumns}
                        tableData={tablePersonalizedDPPDummyData}
                        isLoading={false}
                        enableRowAction={false}
                        enableTopToolbar={false}
                        enableSorting={false}
                        enableColumnAction={false}
                        enableRowSelection={true}
                        enableSelectAll={false}
                        tableRowSelectionDataCallback={tableRowSelectionDataCallback}
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
        </>
    )
}

export default NCERTTextbookPublished