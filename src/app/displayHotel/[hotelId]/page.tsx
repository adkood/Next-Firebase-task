'use client'

import { Flex } from '@chakra-ui/react';
import DisplayHotel from '@/components/DisplayHotel';

interface DisplayHotelProps {
    params: {
        hotelId: string;
    }
}

export default function DisplayHotelSingle({ params }: DisplayHotelProps) {

    return (
        <Flex width={"100vw"} height={"100vh"} >
            <DisplayHotel id={params.hotelId}/>
        </Flex>
    );
}
