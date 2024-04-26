import { useState, useEffect } from 'react';
import { Flex, Input, IconButton, Box, Divider, Heading, Spinner } from '@chakra-ui/react';
import { IoMdAddCircle } from "react-icons/io";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig'; // Import your Firestore db instance
import HotelCard from './HotelCard';
import Link from 'next/link';

const DisplayHotels = () => {
  const [hotels, setHotels] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredHotels, setFilteredHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'hotels'));
        const fetchedHotels = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setHotels(fetchedHotels);
        setFilteredHotels(fetchedHotels);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching hotels:', error);
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  useEffect(() => {
    const filtered = hotels.filter((hotel: any) =>
      hotel.hotelName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredHotels(filtered);
  }, [searchValue, hotels]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <Flex width="100%" pl={20} pr={20} justifyContent="center">
      <Flex direction="column" w="90%" h="100%">
        <Flex h="15%">
          <Box flex="1" display="flex" alignItems="center" justifyContent="center">
            <Heading color="cornflowerblue">HOTELS.COM</Heading>
          </Box>
          <Box flex="3" display="flex" alignItems="center" ml={20}>
            <Input
              placeholder="Search by Hotel Name..."
              value={searchValue}
              onChange={handleChange}
            />
          </Box>

          <Box flex="1" display="flex" alignItems="center" color="cornflowerblue" justifyContent="flex-end">
            <Link href={"/addHotels"} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              ADD HOTELS <IoMdAddCircle style={{ marginLeft: "5px" }} size={"2rem"} />
            </Link>
          </Box>
        </Flex>

        <Divider my={4} />

        <Flex direction="column" h="85%" alignItems="center" justifyContent={"center"}>
          <Box height={"100%"} overflow="scroll" width={"100%"} justifyContent={"center"} alignItems={"center"}>
            {loading ? (
              <Flex width={"100%"} justify={"center"} alignItems={"center"}>
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              </Flex>
            ) : (
              filteredHotels.map((hotel: any) => (
                <HotelCard key={hotel.id} product={hotel} />
              ))
            )}

          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DisplayHotels;
