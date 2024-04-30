import { Box, Button, Flex, Icon, IconButton, Image, Stack, Text, chakra } from "@chakra-ui/react";
import Link from "next/link";

const HotelCard = ({ product }: any) => {
    return (
        <Stack
            spacing={{ base: 0, md: 4 }}
            width={"98%"}
            height={"220px"}
            direction={{ base: 'column', md: 'row' }}
            border="1px solid cornflowerblue"
            borderColor="gray.400"
            p={2}
            rounded="md"
            margin={2}
            overflow="hidden"
            pos="relative"
        >
            <Flex ml="0 !important">
                <Image
                    rounded="md"
                    w={{ base: '100%', md: '18rem' }}
                    h="auto"
                    objectFit="cover"
                    src={product.hotelImageUrl}
                    alt="product image"
                />
            </Flex>
            <Stack direction="column" spacing={2} w="100%" mt={{ base: '5px !important', sm: 0 }}>
                <Flex justifyContent="space-between">
                    <chakra.h3 fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold" color={"cornflowerblue"}>
                        <Link href={`/displayHotel/${product.id}`}>
                            {product.hotelName}
                        </Link>
                    </chakra.h3>
                    <chakra.h3 fontSize={"sm"} fontWeight="bold">
                        Starting From: Rs.{product.hotelStartingPrice}
                    </chakra.h3>
                </Flex>
                <Box>
                    <Text fontSize="sm" fontWeight="500">
                        {product.hotelAddress}
                    </Text>
                </Box>
                <Box>
                    <Text fontSize="sm" fontWeight="500">
                        {product.hotelContactNumber}
                    </Text>
                </Box>
                <Box>
                    <Text fontSize="sm" fontWeight="500">
                        {product.hotelDescription}
                    </Text>
                </Box>
                <Stack
                    direction={{ base: 'column-reverse', sm: 'row' }}
                    justifyContent="space-between"
                    alignItems={{ base: 'flex-start', sm: 'center' }}
                >
                    <Text fontSize="sm" mt={{ base: 1, sm: 0 }} color={"cornflowerblue"}>
                        {product.hotelStarRating} Star
                    </Text>
                    <Stack direction="row" spacing={1} mb={4}>
                        <Link href={`/updateDetails/${product.id}`} passHref>
                            <Box as="a" color="cornflowerblue" textDecoration="none" _hover={{ textDecoration: "underline" }}>
                                <Text fontSize="sm">EDIT DETAILS...</Text>
                            </Box>
                        </Link>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default HotelCard;
