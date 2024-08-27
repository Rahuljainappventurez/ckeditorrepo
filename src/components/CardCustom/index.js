import { Grid } from '@mui/material'
import React from 'react'
import '../../assets/css/global-style.scss';
import { Link, useNavigate } from 'react-router-dom';

const CardCustom = ({ questionTypeHeading, questionCountHeading, questionCount, route }) => {
    const navigate  = useNavigate();
    return (
        <>
            <Link className='card-custom-container' to={route} >
                <h3>{questionTypeHeading}</h3>
                <Grid className='card-custom-footer'>
                    <p>{questionCountHeading}</p>
                    <span>{questionCount}</span>  
                </Grid>
            </Link>
        </>
    )
}

export default CardCustom
