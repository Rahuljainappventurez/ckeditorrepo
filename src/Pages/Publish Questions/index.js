import { Grid } from '@mui/material'
import '../../assets/css/global-style.scss'
import CardCustom from 'components/CardCustom'

const PublishQuestions = ({ cardsDetailArray }) => {

    return (
        <Grid className='page-main-container-layout'>
            <Grid className='publish-questions-page-cards-container'>
                {
                    cardsDetailArray?.map((card, index) => (
                        <CardCustom
                            questionTypeHeading={card?.questionTypeHeading}
                            questionCountHeading={card?.questionCountHeading}
                            questionCount={card?.questionCount}
                            key={`card-custom-${index + 1}`}
                            route={card?.route}
                        />
                    ))
                }
            </Grid>
        </Grid>
    )
}

export default PublishQuestions