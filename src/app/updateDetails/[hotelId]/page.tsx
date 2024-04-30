'use client'

import { Flex } from '@chakra-ui/react';
import UpdateHotelDetail from '@/components/UpdateHotelDetail';

interface UpdateHotelProps {
    params: {
        hotelId: string;
    }
}

export default function UpdateHotel({ params }: UpdateHotelProps) {

    return (
        <Flex width={"100vw"} height={"100vh"} >
            <UpdateHotelDetail id={params.hotelId}/>
        </Flex>
    );
}
