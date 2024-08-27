import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import './bulk-upload-dialog.scss';
import { Button, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import ArgonButton from 'components/ArgonButton';
import { DeleteOutline } from '@mui/icons-material';
import { getRequest } from 'services/axios-api-request/axios_api_Request';
import toaster from 'utility/toaster/toaster';
import Loader from 'components/loader/Loader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const BulkUploadDialog = ({
    open,
    setOpen,
    bulkUploadId,
    downloadCSV_apiUrl,
    bulkUpload_apiUrl,
    bulkUploadSuccessMsg,
    downloadCSV_SuccessMsg,
    CSV_sampleType
}) => {
    const [selectedFile, setSelectedFile] = React.useState(null);
    const fileInputRef = React.useRef(null);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [isLoadingDownloading, setIsLoadingDownloading] = React.useState(false);
    const [isLoadingUploading, setIsLoadingUploading] = React.useState(false);
    const navigate = useNavigate();


    const openFileInput = () => {
        document.getElementById(bulkUploadId).click();
    };

    const handleFileInput = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const removeSelectedFile = () => {
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };


    // ******************* handle download sample csv *****************************
    const handleDownloadCSV = async (event) => {
        if (!isLoadingDownloading) {
            setIsLoadingDownloading(true);
            const res = await getRequest(downloadCSV_apiUrl, { type: CSV_sampleType });
            if (res?.status === 200) {
                const csvData = res.data;
                // Create a Blob from the CSV data
                const blob = new Blob([csvData], { type: 'text/csv' });
                // Create a link element
                const link = document.createElement('a');
                // Set the URL of the link to the Blob
                link.href = URL.createObjectURL(blob);
                // Set the download attribute to trigger the download
                link.download = `${CSV_sampleType}-sample.csv`;
                // Append the link to the body
                document.body.appendChild(link);
                // Programmatically click the link to trigger the download
                link.click();
                // Clean up by removing the link and revoking the object URL
                document.body.removeChild(link);
                URL.revokeObjectURL(link.href);

                toaster('success', downloadCSV_SuccessMsg);
                setIsLoadingDownloading(false);
            }
            else {
                toaster('error', res?.data?.message);
                setIsLoadingDownloading(false);
            }
        }
        else {
            event.preventDefault();
        }
    }

    // ******************* handle upload csv file :- handleSave *****************************

    const handleSave = async () => {
        if (selectedFile && !isLoadingUploading) {
            setIsLoadingUploading(true);

            // Create a FormData object
            const formData = new FormData();
            formData.append('file', selectedFile);
            try {
                const res = await axios.post(`${process.env.REACT_APP_BASE_URL_DEV + bulkUpload_apiUrl}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        "X-API-KEY": process.env.REACT_APP_API_KEY,
                        "Authorization": `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
                    }
                })

                if (res?.data?.status_code === 200) {

                    if (res?.data?.result?.successCount === 0) {
                        toaster('error', 'All records failed during the bulk upload.');
                    }
                    else if (res?.data?.result?.totalCount === res?.data?.result?.successCount) {
                        toaster('success', 'All records were successfully uploaded.');
                        navigate(-1);
                    }
                    else {
                        toaster('success', `${res?.data?.result?.successCount} ${res?.data?.result?.successCount === 1 ? 'record' : 'records'} successfully uploaded and ${res.data?.result?.failureCount} ${res.data?.result?.failureCount === 1 ? 'record' : 'records'} failed.`);
                        navigate(-1);
                    }
                    setIsLoadingUploading(false);
                    handleClose();
                }
                else {

                    toaster('error', res.data.message);
                    setIsLoadingUploading(false);
                }

            } catch (error) {
                toaster('error', error?.response?.data?.message);
                setIsLoadingUploading(false);
            }
        }
        else if (!selectedFile) {
            toaster('error', 'Please select a file to upload');
            return;
        }
    }


    return (
        <Dialog
            fullScreen={fullScreen}
            fullWidth={true}
            maxWidth={'sm'}
            open={open}
            onClose={handleClose}
            aria-labelledby="bulk-upload-title"
        >
            <Grid className='dialog-main-container'>

                <Grid className='bulk-upload-cross-button'>
                    <Grid onClick={() => setOpen(!open)} className='dialog-box-cross-icon'>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.4 15L10 11.4L13.6 15L15 13.6L11.4 10L15 6.4L13.6 5L10 8.6L6.4 5L5 6.4L8.6 10L5 13.6L6.4 15ZM10 20C8.61667 20 7.31667 19.7373 6.1 19.212C4.88334 18.6867 3.825 17.9743 2.925 17.075C2.025 16.1757 1.31267 15.1173 0.788001 13.9C0.263335 12.6827 0.000667933 11.3827 1.26582e-06 10C-0.000665401 8.61733 0.262001 7.31733 0.788001 6.1C1.314 4.88267 2.02633 3.82433 2.925 2.925C3.82367 2.02567 4.882 1.31333 6.1 0.788C7.318 0.262667 8.618 0 10 0C11.382 0 12.682 0.262667 13.9 0.788C15.118 1.31333 16.1763 2.02567 17.075 2.925C17.9737 3.82433 18.6863 4.88267 19.213 6.1C19.7397 7.31733 20.002 8.61733 20 10C19.998 11.3827 19.7353 12.6827 19.212 13.9C18.6887 15.1173 17.9763 16.1757 17.075 17.075C16.1737 17.9743 15.1153 18.687 13.9 19.213C12.6847 19.739 11.3847 20.0013 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z" fill="#777A7F" />
                        </svg>
                    </Grid>


                </Grid>

                <Grid className='bulk-upload-content-box'>
                    <Grid className='bulk-upload-text'>
                        <h4>Bulk Upload</h4>
                        <p>Download the sample CSV and update the data in it and re upload it.</p>
                    </Grid>
                    <Grid ml={3} mt={2}>
                        <ArgonButton
                            component={Button}
                            variant="gradient"
                            size="medium"
                            color={'success'}
                            disableHover={true}
                            onClick={handleDownloadCSV}

                        >
                            {!isLoadingDownloading ?
                                'Download Sample CSV'
                                :
                                <Loader dotsColor={'black'} />
                            }
                        </ArgonButton>
                    </Grid>
                    <Grid className='bulk-upload-file-upload-container'>
                        <p>Choose File</p>
                        <Grid className='bulk-upload-file-upload'>
                            <svg width="32" height="26" viewBox="0 0 32 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.3337 18.3333L16.0003 13L10.667 18.3333" stroke="black" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M16 13V25" stroke="black" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M27.1866 21.5199C28.4871 20.8109 29.5144 19.6891 30.1064 18.3314C30.6985 16.9737 30.8216 15.4575 30.4562 14.0222C30.0909 12.5868 29.2579 11.3139 28.0888 10.4045C26.9198 9.49507 25.4811 9.00088 23.9999 8.9999H22.3199C21.9164 7.43889 21.1642 5.98968 20.1199 4.76122C19.0756 3.53277 17.7664 2.55703 16.2907 1.90737C14.8151 1.25772 13.2113 0.951042 11.6001 1.01041C9.98886 1.06977 8.41204 1.49363 6.98818 2.25012C5.56433 3.0066 4.3305 4.07603 3.37944 5.37801C2.42839 6.67998 1.78487 8.18061 1.49725 9.76709C1.20964 11.3536 1.28542 12.9846 1.7189 14.5376C2.15238 16.0906 2.93227 17.5251 3.99995 18.7332" stroke="black" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M21.3337 18.3333L16.0003 13L10.667 18.3333" stroke="black" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {
                                selectedFile ?
                                    <h4 style={{ color: 'rgb(45, 206, 137)' }}>File selected</h4> :
                                    <h4>Select a file</h4>
                            }
                            {
                                selectedFile ?
                                    <p>
                                        <span>{selectedFile.name}</span>
                                        <DeleteOutline onClick={removeSelectedFile} />
                                    </p>
                                    :
                                    <p>Supports Formats : CSV</p>
                            }

                            {
                                !selectedFile &&
                                <ArgonButton
                                    component={Button}
                                    variant="outlined"
                                    size="medium"
                                    color={'success'}
                                    disableHover={true}
                                    onClick={openFileInput}

                                >
                                    {'SELECT FILE'}
                                </ArgonButton>
                            }


                            <input
                                type='file'
                                id={bulkUploadId}
                                accept=".csv"
                                style={{ display: 'none' }}
                                onInput={handleFileInput}
                                ref={fileInputRef}
                            />
                        </Grid>

                        <Grid display={'flex'} justifyContent={'center'} gap={'20px'}>
                            <ArgonButton
                                component={Button}
                                variant="contained"
                                size="medium"
                                color={'error'}
                                disableHover={true}
                                type={'button'}
                                onClick={() => setOpen(!open)}
                            >
                                {'Cancel'}
                            </ArgonButton>
                            <ArgonButton
                                component={Button}
                                variant="contained"
                                size="medium"
                                color={'secondary'}
                                disableHover={true}
                                onClick={handleSave}

                            >
                                {isLoadingUploading ? <Loader dotsColor={'black'} /> : 'Save'}
                            </ArgonButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Dialog>
    );
}

BulkUploadDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    bulkUploadId: PropTypes.string.isRequired,
};

export default React.memo(BulkUploadDialog)
