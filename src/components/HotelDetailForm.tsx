'use client';

import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  VStack,
  Checkbox,
  HStack,
  Flex,
} from '@chakra-ui/react';
import { HotelInfoDetails } from '@/lib/HotelDetails';
import { addDoc } from 'firebase/firestore';
import { hotelRef } from '@/firebase/firebaseConfig';
import Link from 'next/link';

const initialFormData = {
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
}

const HotelDetailForm = () => {
  const [formData, setFormData] = useState<HotelInfoDetails>(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      hotelPaymentOption: {
        ...prevData.hotelPaymentOption,
        [name]: e.target.checked,
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      // basic validation 
      if (
        !formData.hotelName ||
        !formData.hotelEmailId ||
        !formData.hotelContactNumber ||
        !formData.hotelAddress ||
        !formData.hotelStartingPrice ||
        !formData.hotelDescription ||
        !formData.hotelStarRating ||
        !formData.hotelImageUrl ||
        !formData.hotelState ||
        !formData.hotelCity ||
        !formData.hotelCountry ||
        !formData.hotelRegion ||
        !formData.hotelPincode ||
        !formData.hotelLongitude ||
        !formData.hotelLatitude ||
        !formData.hotelMapUrl
      ) {
        alert('Please fill out all required fields');
        return;
      }

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.hotelEmailId)) {
        alert('Please enter a valid email address');
        return;
      }

      // Numeric field validation
      if (
        isNaN(formData.hotelContactNumber) ||
        isNaN(formData.hotelStartingPrice) ||
        isNaN(formData.hotelStarRating)
      ) {
        alert('Numeric fields must contain valid numbers');
        return;
      }

      // Assigning hotel slug details
      formData.hotelSlugsDetails = {
        hotel: formData.hotelName,
        hotelCity: formData.hotelCity,
        hotelRegion: formData.hotelRegion,
        hotelState: formData.hotelState,
        hotelCountry: formData.hotelCountry,
      };

      await addDoc(hotelRef, formData);

      setFormData(initialFormData);

      alert('Hotel added successfully!');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('An error occurred while adding the hotel. Please try again later.');
    }
  };

  return (
    <Stack width={"100%"} height={"100%"} p={10}>
      <Flex justify="flex-end">
        <Link href="/">
          <Button
            bg="blue.400"
            _hover={{ bg: 'blue.300' }}
            rounded="md"
            h={'45px'}
            color={'white'}
            fontSize={'1.5rem'}
          >
            Return
          </Button>
        </Link>
      </Flex>
      <Stack align="center" width={"100%"} mt={2}>
        <Heading fontSize="2xl" color={"cornflowerblue"}>ADD A HOTEL</Heading>
      </Stack>
      <HStack
        width={"100%"}
        height={"100%"}
        mt={5}
        bg={useColorModeValue('white', 'gray.700')}
        rounded="lg"
        boxShadow="lg"
        p={{ base: 3, sm: 5 }}
      >
        <VStack w={"100%"} h={"100%"}>
          <FormControl id="hotelName">
            <FormLabel>Hotel Name</FormLabel>
            <Input
              rounded="md"
              type="text"
              name="hotelName"
              value={formData.hotelName}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl id="hotelEmailId">
            <FormLabel>Email</FormLabel>
            <Input
              rounded="md"
              type="email"
              name="hotelEmailId"
              value={formData.hotelEmailId}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl id="hotelContactNumber">
            <FormLabel>Contact Number</FormLabel>
            <Input
              rounded="md"
              type="tel"
              name="hotelContactNumber"
              value={formData.hotelContactNumber}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl id="hotelLandmark">
            <FormLabel>Landmark</FormLabel>
            <Input
              rounded="md"
              type="text"
              name="hotelLandmark"
              value={formData.hotelLandmark}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl id="hotelAddress">
            <FormLabel>Address</FormLabel>
            <Input
              rounded="md"
              type="text"
              name="hotelAddress"
              value={formData.hotelAddress}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl id="hotelStartingPrice">
            <FormLabel>Starting Price</FormLabel>
            <Input
              rounded="md"
              type="number"
              name="hotelStartingPrice"
              value={formData.hotelStartingPrice}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl id="hotelDescription">
            <FormLabel>Description</FormLabel>
            <Input
              rounded="md"
              type="text"
              name="hotelDescription"
              value={formData.hotelDescription}
              onChange={handleChange}
              required
            />
          </FormControl>
        </VStack>
        <VStack w={"100%"} h={"100%"}>
          <FormControl id="hotelStarRating">
            <FormLabel>Star Rating</FormLabel>
            <Input
              rounded="md"
              type="number"
              name="hotelStarRating"
              value={formData.hotelStarRating}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl id="hotelImageUrl">
            <FormLabel>Image URL</FormLabel>
            <Input
              rounded="md"
              type="text"
              name="hotelImageUrl"
              value={formData.hotelImageUrl}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl id="hotelState">
            <FormLabel>State</FormLabel>
            <Input
              rounded="md"
              type="text"
              name="hotelState"
              value={formData.hotelState}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl id="hotelCity">
            <FormLabel>City</FormLabel>
            <Input
              rounded="md"
              type="text"
              name="hotelCity"
              value={formData.hotelCity}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl id="hotelCountry">
            <FormLabel>Country</FormLabel>
            <Input
              rounded="md"
              type="text"
              name="hotelCountry"
              value={formData.hotelCountry}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl id="hotelRegion">
            <FormLabel>Region</FormLabel>
            <Input
              rounded="md"
              type="text"
              name="hotelRegion"
              value={formData.hotelRegion}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl id="hotelPincode">
            <FormLabel>Pincode</FormLabel>
            <Input
              rounded="md"
              type="text"
              name="hotelPincode"
              value={formData.hotelPincode}
              onChange={handleChange}
              required
            />
          </FormControl>
        </VStack>
        <VStack w={"100%"} h={"100%"}>
          <FormControl id="hotelLongitude">
            <FormLabel>Longitude</FormLabel>
            <Input
              rounded="md"
              type="text"
              name="hotelLongitude"
              value={formData.hotelLongitude}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl id="hotelLatitude">
            <FormLabel>Latitude</FormLabel>
            <Input
              rounded="md"
              type="text"
              name="hotelLatitude"
              value={formData.hotelLatitude}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl id="hotelMapUrl">
            <FormLabel>Map URL</FormLabel>
            <Input
              rounded="md"
              type="text"
              name="hotelMapUrl"
              value={formData.hotelMapUrl}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl id="postpaidPayment">
            <FormLabel>Postpaid Payment</FormLabel>
            <Checkbox
              name="postpaidPayment"
              isChecked={formData.hotelPaymentOption.postpaidPayment}
              onChange={handleCheckboxChange('postpaidPayment')}
            />
          </FormControl>
          <FormControl id="prepaidPayment">
            <FormLabel>Prepaid Payment</FormLabel>
            <Checkbox
              name="prepaidPayment"
              isChecked={formData.hotelPaymentOption.prepaidPayment}
              onChange={handleCheckboxChange('prepaidPayment')}
            />
          </FormControl>
          <FormControl id="partialPayment">
            <FormLabel>Partial Payment</FormLabel>
            <Checkbox
              name="partialPayment"
              isChecked={formData.hotelPaymentOption.partialPayment}
              onChange={handleCheckboxChange('partialPayment')}
            />
          </FormControl>
        </VStack>
      </HStack>
      <Button
        bg="cornflowerblue"
        _hover={{ bg: 'blue.500' }}
        rounded="md"
        w="100%"
        h={"60px"}
        color={"white"}
        fontSize={"1.5rem"}
        onClick={handleSubmit}
      >
        Add Hotel
      </Button>
    </Stack>
  );
};

export default HotelDetailForm;