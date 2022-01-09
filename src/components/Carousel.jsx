import {
    Box,
    IconButton,
    useBreakpointValue,
    Container,
} from '@chakra-ui/react';
import Slider from 'react-slick';
import { useState } from 'react';

//icons
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';

const settings = {
    dots: true,
    arrows: false,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
};

export default function Carousel({ image1, image2, image3 }) {
    const [slider, setSlider] = useState(null);
    const top = useBreakpointValue({ base: '90%', md: '50%' });
    const side = useBreakpointValue({ base: '30%', md: '40px' });
    let image1Url, image2Url, image3Url;

    //if (image1 === null) {
    image1Url = 'https://media.istockphoto.com/photos/modern-living-room-interior-3d-render-picture-id1293762741?b=1&k=20&m=1293762741&s=170667a&w=0&h=2RI8SmBN4MrEZuTvdwRzaeB887x-dukFcQBpyQ-qwS4='
    //}
    // else {
    //     image1Url = `https://travellingav.s3.eu-west-3.amazonaws.com/${image1}`
    // }

    //if (image2 === null) {
    image2Url = 'https://media.istockphoto.com/photos/modern-elegant-kitchen-stock-photo-picture-id1297586166?b=1&k=20&m=1297586166&s=170667a&w=0&h=Ka-3OYiTlbCiwCJhoXeTqRewh3DI4qfSh1B0baJMcCk='
    //}
    //  else {
    //     image2Url = `https://travellingav.s3.eu-west-3.amazonaws.com/${image2}`
    // }

    //if (image3 === null) {
    image3Url = 'https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmVkcm9vbXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
    //}
    // else {
    //     image3Url = `https://travellingav.s3.eu-west-3.amazonaws.com/${image3}`
    // }

    const cards = [
        {
            image: image1Url,
        },
        {
            image: image2Url,
        },
        {
            image: image3Url,
        },
    ];

    return (
        <Container maxW="container.xl">
            <Box
                position={'relative'}
                height={'600px'}
                width={'full'}
                overflow={'hidden'}>
                <link
                    rel="stylesheet"
                    type="text/css"
                    charSet="UTF-8"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
                />
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
                />
                <IconButton
                    aria-label="left-arrow"
                    variant="ghost"
                    position="absolute"
                    left={side}
                    top={top}
                    transform={'translate(0%, -50%)'}
                    zIndex={2}
                    onClick={() => slider?.slickPrev()}
                    color="black">
                    <BiLeftArrowAlt size="40px" />
                </IconButton>
                <IconButton
                    aria-label="right-arrow"
                    variant="ghost"
                    position="absolute"
                    right={side}
                    top={top}
                    transform={'translate(0%, -50%)'}
                    zIndex={2}
                    onClick={() => slider?.slickNext()}
                    color="black">
                    <BiRightArrowAlt size="40px" />
                </IconButton>
                <Slider {...settings} ref={(slider) => setSlider(slider)}>
                    {cards.map((card, index) => (
                        <Box
                            key={index}
                            height={'2xl'}
                            position="relative"
                            backgroundPosition="center"
                            backgroundRepeat="no-repeat"
                            backgroundSize="cover"
                            backgroundImage={`url(${card.image})`}>
                        </Box>
                    ))}
                </Slider>
            </Box>
        </Container>
    );
}