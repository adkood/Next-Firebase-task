'use client'

import HotelDetailForm from '@/components/HotelDetailForm';
import { Flex } from '@chakra-ui/react';
import UpdateHotelDetail from '@/components/UpdateHotelDetail';
import DisplayHotels from '@/components/DisplayHotels';

export default function Home() {
  return (
    <Flex width={"100vw"} height={"100vh"} >
      <DisplayHotels />
      {/* <HotelDetailForm /> */}
      {/* <UpdateHotelDetail /> */}
    </Flex>
  );
}
