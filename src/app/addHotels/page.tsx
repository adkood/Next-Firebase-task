'use client'

import HotelDetailForm from '@/components/HotelDetailForm';
import { Flex } from '@chakra-ui/react';

export default function AddHotels() {
    return (
        <Flex width={"100vw"} height={"100vh"} >
            <HotelDetailForm />
        </Flex>
    );
}
