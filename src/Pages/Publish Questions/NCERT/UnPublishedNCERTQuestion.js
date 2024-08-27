import { FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material'
import CustomAdvanceTable from 'components/TableCustom/CustomAdvanceTable'
import React, { useState } from 'react'
import '../../../assets/css/global-style.scss';
import PaginationCustom from 'components/PaginationCustom/PaginationCustom'
import ArgonButton from 'components/ArgonButton'
import { Link, useNavigate } from 'react-router-dom'
import SearchCustom from 'components/search-custom/SearchCustom'
import { tablePersonalizedDPPAllColumns } from 'constants/TableConstants';
import { tablePersonalizedDPPDummyData } from 'constants/TableConstants';
import SingleQuestionView from 'components/SingleQuestionView';
import { dummyDataForFullView } from 'constants/moduleConstants';
import routerConstants from 'constants/routerConstants';
import { ArrowBackIos } from '@mui/icons-material';

const UnPublishedNCERTQuestion = () => {
    const navigate = useNavigate();
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

    const isEmptyObject = (obj) => {
        return Object.keys(obj).length === 0;
    };

    const tableRowSelectionDataCallback = (rowSelectionObj) => {
        setSelectedRowData(rowSelectionObj)
    }

    console.log(checkedQuestions, 'cewnw33i2e23ubfiu')

    return (
        <>
            <Grid className='page-main-container-layout'>

                <Grid className='table-wrapper-with-text'>
                    <Grid className='table-heading-text-top-container'>
                        <p className='main-heading-with-back-button'><ArrowBackIos onClick={() => navigate(-1)} />
                            <span>List of Unpublished Questions</span>
                        </p>
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
                                        {'Add'}
                                    </ArgonButton>
                                </>
                            }

                            {/* <ArgonButton
                                component={Link}
                                variant="contained"
                                secendary size="small"
                                color={'secondary'}
                                to={(type === 'DPP') ? routerConstants?.PersonalizedDPPRoute
                                    : (type === 'flashcard') ? routerConstants?.flashcardPublishedRoute
                                        : routerConstants?.assignmentPublishedRoute}

                            >
                                {(type === 'DPP') ? 'View Published Questions'
                                    : (type === 'flashcard') ? 'View Published Flashcards'
                                        : 'View Published Assignments'}
                            </ArgonButton> */}

                            <SearchCustom setSearchKey={setSearchKey} />
                        </Grid>
                    </Grid>

                    {
                        (tableViewType === 'list') ?
                            <CustomAdvanceTable
                                tableMinHeight={"580px"}
                                tableMaxHeight={"580px"}
                                allColumns={tablePersonalizedDPPAllColumns}
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
                            :
                            <Grid className='view-task-full-list-container'>
                                {
                                    dummyDataForFullView?.map((dummyData, index) => (
                                        <SingleQuestionView
                                            data={dummyData}
                                            onCheckboxChange={handleCheckboxChange}
                                            type={'full-view'}
                                        />
                                    ))
                                }
                            </Grid>
                    }
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

export default UnPublishedNCERTQuestion