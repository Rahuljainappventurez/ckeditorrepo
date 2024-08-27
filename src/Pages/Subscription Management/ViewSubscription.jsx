import { Grid } from '@mui/material'
import '../../assets/css/global-style.scss'
import { ArrowBackIos } from '@mui/icons-material'
import InputBox from 'components/Input box'
import { useLocation, useNavigate } from 'react-router-dom'
import TextareaCustom from 'components/TextareaCustom/TextareaCustom'


const ViewSubscription = () => {
    const navigate = useNavigate();
    const { state: subscriptionRowData } = useLocation();

    console.log(subscriptionRowData, 'vhbdubuebedeud')
    return (
        <Grid className='page-main-container-layout'>
            <Grid className='screen-white-container'>
                <Grid className='add-edit-screen-wrapper'>
                    <Grid className='add-edit-screen-top-container'>
                        <p><ArrowBackIos onClick={() => navigate(-1)} /><span>View Subscription</span></p>
                    </Grid>
                    <form className='add-edit-screen-form-container mt-20'>

                        <Grid className='add-edit-screen-input-row'>
                            <Grid className='add-edit-screen-input-container'>
                                <p>Type of Student</p>
                                <InputBox
                                    placeholder={'Type of Student'}
                                    name={'employee_name'}
                                    id={'add-employee-employee_name'}
                                    type={'text'}
                                    value={subscriptionRowData?.user_type}
                                    disable={true}
                                />
                            </Grid>
                        </Grid>

                        <h3 className='add-edit-screen-input-group-name'>Details for Monthly Subscription</h3>

                        <Grid className='add-edit-screen-input-row'>

                            <Grid className='add-edit-screen-input-container'>
                                <p>Base Price</p>
                                <InputBox
                                    placeholder={'Price'}
                                    name={'employee_name'}
                                    id={'add-employee-employee_name'}
                                    type={'text'}
                                    disable={true}
                                    value={subscriptionRowData?.price}
                                />
                            </Grid>

                            {(subscriptionRowData?.user_type === 'School Student') &&
                                <>
                                    <Grid className='add-edit-screen-input-container'>
                                        <p>Price per School Admin</p>
                                        <InputBox
                                            placeholder={'Price'}
                                            name={'employee_name'}
                                            id={'add-employee-employee_name'}
                                            type={'text'}
                                            disable={true}
                                            value={subscriptionRowData?.price}
                                        />
                                    </Grid>
                                    <Grid className='add-edit-screen-input-container'>
                                        <p>Price per Student</p>
                                        <InputBox
                                            placeholder={'Price'}
                                            name={'employee_name'}
                                            id={'add-employee-employee_name'}
                                            type={'text'}
                                            disable={true}
                                            value={subscriptionRowData?.price}
                                        />
                                    </Grid>
                                    <Grid className='add-edit-screen-input-container'>
                                        <p>Price per Teacher</p>
                                        <InputBox
                                            placeholder={'Price'}
                                            name={'employee_name'}
                                            id={'add-employee-employee_name'}
                                            type={'text'}
                                            disable={true}
                                            value={subscriptionRowData?.price}
                                        />
                                    </Grid>
                                </>
                            }

                        </Grid>

                        <h3 className='add-edit-screen-input-group-name'>Details for Yearly Subscription</h3>

                        <Grid className='add-edit-screen-input-row'>

                            <Grid className='add-edit-screen-input-container'>
                                <p>Base Price</p>
                                <InputBox
                                    placeholder={'Price'}
                                    name={'employee_name'}
                                    id={'add-employee-employee_name'}
                                    type={'text'}
                                    disable={true}
                                    value={subscriptionRowData?.price}
                                />
                            </Grid>

                            {(subscriptionRowData?.user_type === 'School Student') &&
                                <>
                                    <Grid className='add-edit-screen-input-container'>
                                        <p>Price per School Admin</p>
                                        <InputBox
                                            placeholder={'Price'}
                                            name={'employee_name'}
                                            id={'add-employee-employee_name'}
                                            type={'text'}
                                            disable={true}
                                            value={subscriptionRowData?.price}
                                        />
                                    </Grid>
                                    <Grid className='add-edit-screen-input-container'>
                                        <p>Price per Student</p>
                                        <InputBox
                                            placeholder={'Price'}
                                            name={'employee_name'}
                                            id={'add-employee-employee_name'}
                                            type={'text'}
                                            disable={true}
                                            value={subscriptionRowData?.price}
                                        />
                                    </Grid>
                                    <Grid className='add-edit-screen-input-container'>
                                        <p>Price per Teacher</p>
                                        <InputBox
                                            placeholder={'Price'}
                                            name={'employee_name'}
                                            id={'add-employee-employee_name'}
                                            type={'text'}
                                            disable={true}
                                            value={subscriptionRowData?.price}
                                        />
                                    </Grid>
                                </>
                            }

                        </Grid>

                        <h3 className='add-edit-screen-input-group-name'>Features of the Subscription</h3>

                        <Grid className='add-edit-screen-input-row'>
                            <Grid className='add-edit-screen-input-container' style={{ width: '100%' }}>
                                <p>Features</p>
                                <TextareaCustom
                                    placeholder={'Type of Student'}
                                    name={'employee_name'}
                                    id={'add-employee-employee_name'}
                                    value={subscriptionRowData?.features}
                                    disabled={true}
                                    minHeight = {180}
                                />
                            </Grid>
                        </Grid>

                    </form>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ViewSubscription