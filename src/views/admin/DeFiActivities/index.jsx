import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Text,
  useColorModeValue,
  SimpleGrid,
  Image,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import btcIcon from "assets/img/icons/Btc.jpg";
import ethIcon from "assets/img/icons/Eth.png";
import adaIcon from "assets/img/icons/Ada.jpg";
import dotIcon from "assets/img/icons/Dot.png";
import bnbIcon from "assets/img/icons/Bnb.png";
import xrpIcon from "assets/img/icons/xrp.png";
import chainlinkIcon from "assets/img/icons/chainlink.png";
import ltcIcon from "assets/img/icons/litecoin.png";
import Card from "components/card/Card.js";
import Active from "views/admin/DeFiActivities/components/Active"; 

const stakingOpportunities = [
  {
    id: 1,
    name: 'ETH Staking Opportunity',
    description: 'Earn rewards by staking Ethereum tokens.',
    apy: '5%',
    lockInPeriod: '1 month - 6 months',
    requirements: 'Minimum 0.1 ETH',
    image: ethIcon,
    formFields: [
      { label: 'ETH Amount', type: 'number', placeholder: 'Enter ETH amount' },
      { label: 'Staking Period', type: 'select', options: ['1 month', '3 months', '6 months'] }
    ]
  },
  {
    id: 2,
    name: 'BTC Staking Opportunity',
    description: 'Stake Bitcoin for monthly rewards.',
    apy: '7%',
    lockInPeriod: '1 month - 6 months',
    requirements: 'Minimum 0.01 BTC',
    image: btcIcon,
    formFields: [
      { label: 'BTC Amount', type: 'number', placeholder: 'Enter BTC amount' },
      { label: 'Staking Period', type: 'select', options: ['1 month', '3 months', '6 months'] }
    ]
  },
  {
    id: 3,
    name: 'ADA Staking Opportunity',
    description: 'Stake ADA tokens and earn ADA rewards.',
    apy: '6.5%',
    lockInPeriod: '1 month - 6 months',
    requirements: 'Minimum 50 ADA',
    image: adaIcon,
    formFields: [
      { label: 'ADA Amount', type: 'number', placeholder: 'Enter ADA amount' },
      { label: 'Staking Period', type: 'select', options: ['1 month', '3 months', '6 months'] }
    ]
  },
  {
    id: 4,
    name: 'DOT Staking Opportunity',
    description: 'Stake DOT tokens for weekly rewards.',
    apy: '8%',
    lockInPeriod: '1 month - 6 months',
    requirements: 'Minimum 10 DOT',
    image: dotIcon,
    formFields: [
      { label: 'DOT Amount', type: 'number', placeholder: 'Enter DOT amount' },
      { label: 'Staking Period', type: 'select', options: ['1 month', '3 months', '6 months'] }
    ]
  },
  {
    id: 5,
    name: 'BNB Staking Opportunity',
    description: 'Earn BNB rewards by staking BNB tokens.',
    apy: '6%',
    lockInPeriod: '1 month - 6 months',
    requirements: 'Minimum 0.5 BNB',
    image: bnbIcon,
    formFields: [
      { label: 'BNB Amount', type: 'number', placeholder: 'Enter BNB amount' },
      { label: 'Staking Period', type: 'select', options: ['1 month', '3 months', '6 months'] }
    ]
  },
  {
    id: 6,
    name: 'XRP Staking Opportunity',
    description: 'Stake XRP tokens for daily rewards.',
    apy: '9%',
    lockInPeriod: '1 month - 6 months',
    requirements: 'Minimum 100 XRP',
    image: xrpIcon,
    formFields: [
      { label: 'XRP Amount', type: 'number', placeholder: 'Enter XRP amount' },
      { label: 'Staking Period', type: 'select', options: ['1 month', '3 months', '6 months'] }
    ]
  },
];

const lendingBorrowingPlatforms = [
  {
    id: 1,
    name: 'Platform A',
    description: 'Lend or borrow assets with competitive rates.',
    rates: 'Interest rates vary by asset',
    terms: 'Flexible terms available',
    image: chainlinkIcon,
  },
  {
    id: 2,
    name: 'Platform B',
    description: 'Access a variety of lending and borrowing options.',
    rates: 'Up to 12% APY for lenders',
    terms: 'Short-term and long-term options',
    image: ltcIcon,
  },
  {
    id: 4,
    name: 'Platform D',
    description: 'Secure and easy-to-use platform for both lenders and borrowers.',
    rates: 'Competitive rates based on asset type',
    terms: 'Short and long-term options available',
    image: bnbIcon,
  },
  {
    id: 5,
    name: 'Platform E',
    description: 'Offers innovative lending and borrowing features with low fees.',
    rates: 'High rates for both lenders and borrowers',
    terms: 'Flexible and dynamic terms',
    image: xrpIcon,
  },
];

const Marketplace = () => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isPlatformOpen, onOpen: onPlatformOpen, onClose: onPlatformClose } = useDisclosure();
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [formData, setFormData] = useState({
    amount: "",
    period: "1 month"
  });
  const [lastStakes, setLastStakes] = useState([]); // State for storing last stakes

  const handleOpportunityClick = (opportunityId) => {
    setSelectedOpportunity(opportunityId);
    onOpen();
  };

  const handleStake = () => {
    // Add new stake to the list of last stakes after form submission
    const opportunity = stakingOpportunities.find(opportunity => opportunity.id === selectedOpportunity);
    const newStake = {
      opportunityName: opportunity.name,
      amount: formData.amount,
      stakingPeriod: formData.period
    };
    setLastStakes([...lastStakes, newStake]);
    onClose(); // Close modal after staking
    setFormData({ amount: "", period: "1 month" }); // Reset form
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const renderFormFields = () => {
    if (!selectedOpportunity) return null;

    const opportunity = stakingOpportunities.find(opportunity => opportunity.id === selectedOpportunity);

    return (
      <>
        {opportunity.formFields.map((field) => (
          <Flex key={field.label} mb="0.5rem">
            <Text minW="120px">{field.label}:</Text>
            {field.type === 'number' ? (
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder={field.placeholder}
                style={{ marginRight: '10px' }}
              />
            ) : (
              <Select
                name="period"
                value={formData.period}
                onChange={handleChange}
                placeholder={field.placeholder}
                style={{ marginRight: '10px' }}
              >
                {field.options.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </Select>
            )}
          </Flex>
        ))}
      </>
    );
  };

  const handlePlatformClick = (platformId) => {
    setSelectedPlatform(platformId);
    onPlatformOpen();
  };

  const renderPlatformDetails = () => {
    if (!selectedPlatform) return null;

    const platform = lendingBorrowingPlatforms.find(platform => platform.id === selectedPlatform);

    return (
      <Box>
        <Image src={platform.image} alt={platform.name} height="200px" objectFit="cover" mb="10px" />
        <Text fontSize="lg" fontWeight="bold">{platform.name}</Text>
        <Text mt="10px">{platform.description}</Text>
        <Text mt="10px"><strong>Rates:</strong> {platform.rates}</Text>
        <Text mt="10px"><strong>Terms:</strong> {platform.terms}</Text>
      </Box>
    );
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Grid
        templateColumns={{ base: "1fr", xl: "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display="grid"
      >
        {/* Staking Opportunities Section */}
        <Flex flexDirection="column" alignItems="left">
          <Box mt="40px"> {/* Additional top margin */}
            <Text fontSize="2xl" fontWeight="700" color={textColor} mb="20px">
              Staking Opportunities
            </Text>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px">
              {stakingOpportunities.map(opportunity => (
                <Card
                  key={opportunity.id}
                  height="600px"
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  p="20px"
                >
                  <Image src={opportunity.image} alt={opportunity.name} height="330px" objectFit="cover" />
                  <Flex align="center" mt="20px">
                    <Text color={textColor} fontSize="lg" fontWeight="bold">
                      {opportunity.name}
                    </Text>
                  </Flex>
                  <Text mt="10px" color={textColor} fontSize="md">
                    {opportunity.description}
                  </Text>
                  <Text mt="10px" color={textColor} fontSize="md">
                    <strong>APY:</strong> {opportunity.apy}
                  </Text>
                  <Text mt="10px" color={textColor} fontSize="md">
                    <strong>Lock-In Period:</strong> {opportunity.lockInPeriod}
                  </Text>
                  <Text mt="10px" color={textColor} fontSize="md">
                    <strong>Requirements:</strong> {opportunity.requirements}
                  </Text>
                  <Button mt="10px" colorScheme="blue" onClick={() => handleOpportunityClick(opportunity.id)} w="full">
                    Join Pool
                  </Button>
                </Card>
              ))}
            </SimpleGrid>
            
          </Box>
        </Flex>

        {/* Lending/Borrowing Opportunities Section */}
        <Flex flexDirection="column" gridColumn="2 / 3" alignItems="center">
          <Box mt="40px">
            <Text fontSize="2xl" fontWeight="700" color={textColor} mb="20px">
              Lending/Borrowing Opportunities
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap="20px">
              {lendingBorrowingPlatforms.map(platform => (
                <Card
                  key={platform.id}
                  height="530px"
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  p="20px"
                >
                  <Image src={platform.image} alt={platform.name} height="200px" objectFit="cover" />
                  <Flex align="center" mt="20px">
                    <Text color={textColor} fontSize="lg" fontWeight="bold">
                      {platform.name}
                    </Text>
                  </Flex>
                  <Text mt="10px" color={textColor} fontSize="md">
                    {platform.description}
                  </Text>
                  <Text mt="10px" color={textColor} fontSize="md">
                    <strong>Rates:</strong> {platform.rates}
                  </Text>
                  <Text mt="10px" color={textColor} fontSize="md">
                    <strong>Terms:</strong> {platform.terms}
                  </Text>
                  <Button mt="10px" colorScheme="blue" w="full" onClick={() => handlePlatformClick(platform.id)}>
                    Initiate Action
                  </Button>
                </Card>
              ))}
            </SimpleGrid>
          </Box>
        </Flex>
      </Grid>
      <Active />

      {/* Modal for staking opportunity */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Join Staking Opportunity</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {renderFormFields()}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleStake}>Stake</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal for lending/borrowing platform */}
      <Modal isOpen={isPlatformOpen} onClose={onPlatformClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Platform Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {renderPlatformDetails()}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onPlatformClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={() => alert('Action initiated')}>
              Confirm Action
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Marketplace;