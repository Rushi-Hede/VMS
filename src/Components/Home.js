import { Carousel } from 'react-responsive-carousel';
import { Grid, Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../Styles/Home.css'
import i1 from '../Images/c1.jpg';
import i2 from '../Images/c2.jpg';
import i3 from '../Images/c3.jpg';
import i4 from '../Images/c4.jpg';
import i5 from '../Images/c5.jpg';
import i6 from '../Images/c6.jpg';
import i7 from '../Images/c7.jpg';

export default function Home() {


    const cardData = [
        {
          title: 'Enhanced Security',
          description: 'Our Visitor Management System ensures enhanced security by allowing you to accurately track and monitor visitors entering your premises. With features like visitor registration, ID verification, and badge printing, you can maintain a secure environment and quickly identify any unauthorized access. These safety measures provide peace of mind for your facility.',
          image: 'https://images.pexels.com/photos/14568020/pexels-photo-14568020.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          title: 'Streamlined Check-In Process',
          description: 'Simplify the check-in process for your visitors with our Visitor Management System. By automating registration, pre-registration, and self-check-in, you can eliminate long queues and provide a seamless and hassle-free experience. Say goodbye to manual paperwork and welcome a more efficient check-in process.',
          image: 'https://images.pexels.com/photos/8297478/pexels-photo-8297478.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          title: 'Real-time Visitor Tracking',
          description: 'Stay informed and in control with real-time visitor tracking. Our Visitor Management System allows you to monitor visitor movements throughout your facility, providing you with valuable insights and ensuring better safety and compliance. Instant notifications and alerts keep you updated on visitor arrivals and departures.',
          image: 'https://images.pexels.com/photos/518244/pexels-photo-518244.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          title: 'Customizable Visitor Badges',
          description: 'Impress your visitors and enhance your brand image with customizable visitor badges. Our Visitor Management System enables you to design professional-looking badges with personalized information, including visitor names, photos, and visit details. Create a positive and memorable experience for your guests.',
          image: 'https://images.pexels.com/photos/7319161/pexels-photo-7319161.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          title: 'Visitor History and Reports',
          description: 'Keep a comprehensive record of visitor history and generate detailed reports with our Visitor Management System. Access past visitor data, analyze trends, and extract valuable insights to optimize your facility\'s operations. Gain valuable information for security audits, compliance, and visitor analytics.',
          image: 'https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
        {
          title: 'Easy Integration and Scalability',
          description: 'Our Visitor Management System offers easy integration and scalability. Seamlessly integrate the system with your existing infrastructure, including access control systems and visitor databases. Scale the solution to meet the needs of your growing facility without compromising on performance or security.',
          image: 'https://images.pexels.com/photos/3801167/pexels-photo-3801167.jpeg?auto=compress&cs=tinysrgb&w=400',
        },
      ];
      
    return (
        <div className='body'>
            <Carousel showThumbs={false} autoPlay={true} infiniteLoop={true} interval={2000}>
                <img src={i1} alt="i1" />
                <img src={i2} alt="i1" />
                <img src={i3} alt="i1" />
                <img src={i4} alt="i1" />
                <img src={i5} alt="i1" />
                <img src={i6} alt="i1" />
                <img src={i7} alt="i1" />
            </Carousel>

            <Grid container spacing={2}>
                {cardData.map((card) => (
                    <Grid item xs={12} sm={6} md={4} key={card.title}>
                        <Card className='card'>
                            <CardMedia
                                className='card_img'
                                component="img"
                                alt={card.title}
                                height="200"
                                image={card.image}
                            />
                            <CardContent className='card_content'>
                                <Typography gutterBottom variant="h5" component="h2" style={{ fontSize: '22px', fontWeight: 'bold' }}>
                                    {card.title}
                                </Typography>
                                <div className='card_description'>
                                    {card.description}
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

        </div>

    )
}

