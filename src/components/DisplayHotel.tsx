'use client';

import React, { useEffect, useState } from "react";
import {
    Box,
    Flex,
    Heading,
    Image,
    Text,
    Button,
    Spinner,
} from "@chakra-ui/react";
import { HotelInfoDetails } from "@/lib/HotelDetails";
import { doc, getDoc } from "firebase/firestore";
import { hotelRef } from "@/firebase/firebaseConfig";
import Link from "next/link";

const DisplayHotel = ({ id }: { id: string }) => {

    const [hotelInfo, setHotelInfo] = useState<HotelInfoDetails>({
        hotelName: '',
        hotelEmailId: '',
        hotelContactNumber: 0,
        hotelLandmark: '',
        hotelAddress: '',
        hotelStartingPrice: 0,
        hotelDescription: '',
        hotelStarRating: 0,
        hotelImageUrl: '',
        hotelState: '',
        hotelCity: '',
        hotelCountry: '',
        hotelRegion: '',
        hotelPincode: '',
        hotelSlugsDetails: {
            hotel: '',
            hotelCity: '',
            hotelRegion: '',
            hotelState: '',
            hotelCountry: '',
        },
        hotelLongitude: 0,
        hotelLatitude: 0,
        hotelMapUrl: '',
        hotelPaymentOption: {
            postpaidPayment: false,
            prepaidPayment: false,
            partialPayment: false,
        },
        hotelImagesList: [],
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHotelData = async () => {
            try {
                const docSnap = await getDoc(doc(hotelRef, id));
                if (docSnap.exists()) {
                    const data = docSnap.data() as HotelInfoDetails;
                    setHotelInfo(data);
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error getting document:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchHotelData();
    }, [id]);

    return (
        <Box p={5} width={"100vw"} height={"100vh"}>
            <Flex mt={4} justify="space-between">
                <Link href={"/"}>
                    <Button colorScheme="blue" >Back</Button>
                </Link>
                <Link href={`/updateDetails/${id}`}>
                    <Button colorScheme="blue" >Edit</Button>
                </Link>
            </Flex>
            <Flex width={"100%"} height={"90%"} mt={5} direction={{ base: "column", md: "row" }} align="center">
                <Flex direction={"column"} alignItems={"center"} width={"50%"} height={"100%"} p={10}>
                    {loading && <Flex width={"100%"} justify={"center"} alignItems={"center"}>
                        <Spinner
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="blue.500"
                            size="xl"
                        />
                    </Flex>}
                    {!loading &&
                        <Image
                            src={hotelInfo.hotelImageUrl}
                            alt={hotelInfo.hotelName}
                            width={"90%"}
                            mr={{ md: 4 }}
                        />
                    }
                    <Heading color={"cornflowerblue"} mt={5} as="h2" size="lg" mb={4}>
                        {hotelInfo.hotelName}
                    </Heading>
                    <Text fontSize={"1.3rem"} mb={2}>{hotelInfo.hotelDescription}</Text>

                </Flex>
                <Flex p={5} direction={"column"} width={"50%"} height={"100%"} justifyContent={"space-evenly"}>
                    <Flex boxShadow={"1px 1px 2px cornflowerblue"} width={"100%"} height={"7%"} pl={5} alignItems={"center"} border={"1px solid cornflowerblue"} borderRadius={"5px"}>
                        <Text fontSize={"1.3rem"} mb={2}>Email: {hotelInfo.hotelEmailId}</Text>
                    </Flex>
                    <Flex boxShadow={"1px 1px 2px cornflowerblue"} width={"100%"} height={"7%"} pl={5} alignItems={"center"} border={"1px solid cornflowerblue"} borderRadius={"5px"}>
                        <Text fontSize={"1.3rem"} mb={2}>Contact Number: {hotelInfo.hotelContactNumber}</Text>

                    </Flex>
                    <Flex boxShadow={"1px 1px 2px cornflowerblue"} width={"100%"} height={"7%"} pl={5} alignItems={"center"} border={"1px solid cornflowerblue"} borderRadius={"5px"}>

                        <Text fontSize={"1.3rem"} mb={2}>Address: {hotelInfo.hotelAddress}</Text>
                    </Flex>
                    <Flex boxShadow={"1px 1px 2px cornflowerblue"} width={"100%"} height={"7%"} pl={5} alignItems={"center"} border={"1px solid cornflowerblue"} borderRadius={"5px"}>

                        <Text fontSize={"1.3rem"} mb={2}>Starting Price: ${hotelInfo.hotelStartingPrice}</Text>
                    </Flex>
                    <Flex boxShadow={"1px 1px 2px cornflowerblue"} width={"100%"} height={"7%"} pl={5} alignItems={"center"} border={"1px solid cornflowerblue"} borderRadius={"5px"}>

                        <Text fontSize={"1.3rem"} mb={2}>Star Rating: {hotelInfo.hotelStarRating}</Text>
                    </Flex>
                    <Flex boxShadow={"1px 1px 2px cornflowerblue"} width={"100%"} height={"7%"} pl={5} alignItems={"center"} border={"1px solid cornflowerblue"} borderRadius={"5px"}>
                        <Text fontSize={"1.3rem"} mb={2}>Location: {hotelInfo.hotelCity}, {hotelInfo.hotelState}, {hotelInfo.hotelCountry}</Text>

                    </Flex>
                    <Flex boxShadow={"1px 1px 2px cornflowerblue"} width={"100%"} height={"7%"} pl={5} alignItems={"center"} border={"1px solid cornflowerblue"} borderRadius={"5px"}>

                        <Text fontSize={"1.3rem"} mb={2}>Landmark: {hotelInfo.hotelLandmark}</Text>
                    </Flex>
                    <Flex boxShadow={"1px 1px 2px cornflowerblue"} width={"100%"} height={"7%"} pl={5} alignItems={"center"} border={"1px solid cornflowerblue"} borderRadius={"5px"}>

                        <Text fontSize={"1.3rem"} mb={2}>Pincode: {hotelInfo.hotelPincode}</Text>
                    </Flex>
                    <Flex boxShadow={"1px 1px 2px cornflowerblue"} width={"100%"} height={"7%"} pl={5} alignItems={"center"} border={"1px solid cornflowerblue"} borderRadius={"5px"}>

                        <Text fontSize={"1.3rem"}>Payment Options:</Text>
                        <Text ml={4}>Postpaid Payment: {hotelInfo.hotelPaymentOption.postpaidPayment ? "Yes" : "No"}</Text>
                        <Text ml={4}>Prepaid Payment: {hotelInfo.hotelPaymentOption.prepaidPayment ? "Yes" : "No"}</Text>
                        <Text ml={4}>Partial Payment: {hotelInfo.hotelPaymentOption.partialPayment ? "Yes" : "No"}</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    );
};

export default DisplayHotel;
