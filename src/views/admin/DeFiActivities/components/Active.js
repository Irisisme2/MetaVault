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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  Input,
  Select,
} from "@chakra-ui/react";
import Card from "components/card/Card";

// Import icons
import btcIcon from "assets/img/icons/Btc.jpg";
import ethIcon from "assets/img/icons/Eth.png";
import adaIcon from "assets/img/icons/Ada.jpg";
import dotIcon from "assets/img/icons/Dot.png";
import bnbIcon from "assets/img/icons/Bnb.png";
import xrpIcon from "assets/img/icons/xrp.png";
import chainlinkIcon from "assets/img/icons/chainlink.png";
import ltcIcon from "assets/img/icons/litecoin.png";

// Mock data for staking and lending/borrowing positions
const initialStakingPositions = [
  {
    id: 1,
    name: 'ETH Staking Pool',
    stakedAmount: '10 ETH',
    rewards: '0.5 ETH',
    duration: '3 months',
    image: ethIcon,
  },
  {
    id: 2,
    name: 'BTC Staking Pool',
    stakedAmount: '0.5 BTC',
    rewards: '0.02 BTC',
    duration: '6 months',
    image: btcIcon,
  },
  {
    id: 3,
    name: 'ADA Staking Pool',
    stakedAmount: '500 ADA',
    rewards: '25 ADA',
    duration: '1 year',
    image: adaIcon,
  },
];

const initialLendingBorrowingPositions = [
  {
    id: 1,
    name: 'Lending Platform A',
    amount: '2000 USD',
    interestRate: '5%',
    duration: '12 months',
    image: chainlinkIcon,
  },
  {
    id: 2,
    name: 'Lending Platform B',
    amount: '1500 EUR',
    interestRate: '4%',
    duration: '6 months',
    image: ltcIcon,
  },
];

const ActivePositions = () => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const { isOpen: isStakingOpen, onOpen: onStakingOpen, onClose: onStakingClose } = useDisclosure();
  const { isOpen: isLendingOpen, onOpen: onLendingOpen, onClose: onLendingClose } = useDisclosure();
  const [selectedStaking, setSelectedStaking] = useState(null);
  const [selectedLending, setSelectedLending] = useState(null);
  const [stakingPositions, setStakingPositions] = useState(initialStakingPositions);
  const [lendingPositions, setLendingPositions] = useState(initialLendingBorrowingPositions);
  const [stakeForm, setStakeForm] = useState({ amount: '', period: '' });
  const [loanForm, setLoanForm] = useState({ amount: '', newFunds: '' });

  const handleStakingClick = (id) => {
    setSelectedStaking(id);
    onStakingOpen();
  };

  const handleLendingClick = (id) => {
    setSelectedLending(id);
    onLendingOpen();
  };

  const handleStakeNewAssets = () => {
    const updatedPositions = stakingPositions.map(position => {
      if (position.id === selectedStaking) {
        return {
          ...position,
          stakedAmount: `${parseFloat(position.stakedAmount) + parseFloat(stakeForm.amount)} ETH`,
        };
      }
      return position;
    });
    setStakingPositions(updatedPositions);
    setStakeForm({ amount: '', period: '' });
    onStakingClose();
  };

  const handleWithdrawAssets = () => {
    const updatedPositions = stakingPositions.map(position => {
      if (position.id === selectedStaking) {
        return {
          ...position,
          stakedAmount: `${parseFloat(position.stakedAmount) - parseFloat(stakeForm.amount)} ETH`,
        };
      }
      return position;
    });
    setStakingPositions(updatedPositions);
    setStakeForm({ amount: '', period: '' });
    onStakingClose();
  };

  const handleModifyStakingSettings = () => {
    // Placeholder for modifying staking settings
    alert('Modify staking settings feature is not implemented.');
  };

  const handleRepayLoan = () => {
    const updatedPositions = lendingPositions.map(position => {
      if (position.id === selectedLending) {
        return {
          ...position,
          amount: `${parseFloat(position.amount) - parseFloat(loanForm.amount)} USD`,
        };
      }
      return position;
    });
    setLendingPositions(updatedPositions);
    setLoanForm({ amount: '', newFunds: '' });
    onLendingClose();
  };

  const handleAddMoreFunds = () => {
    const updatedPositions = lendingPositions.map(position => {
      if (position.id === selectedLending) {
        return {
          ...position,
          amount: `${parseFloat(position.amount) + parseFloat(loanForm.newFunds)} USD`,
        };
      }
      return position;
    });
    setLendingPositions(updatedPositions);
    setLoanForm({ amount: '', newFunds: '' });
    onLendingClose();
  };

  const handleModifyLendingSettings = () => {
    // Placeholder for modifying lending settings
    alert('Modify lending settings feature is not implemented.');
  };

  const renderStakingDetails = () => {
    if (!selectedStaking) return null;

    const staking = stakingPositions.find(staking => staking.id === selectedStaking);

    return (
      <Box>
        <Image src={staking.image} alt={staking.name} height="200px" objectFit="cover" mb="10px" />
        <Text fontSize="lg" fontWeight="bold">{staking.name}</Text>
        <Text mt="10px"><strong>Staked Amount:</strong> {staking.stakedAmount}</Text>
        <Text mt="10px"><strong>Rewards:</strong> {staking.rewards}</Text>
        <Text mt="10px"><strong>Duration:</strong> {staking.duration}</Text>
        <VStack spacing={4} mt={4}>
          <Input
            placeholder="Enter amount to stake"
            value={stakeForm.amount}
            onChange={(e) => setStakeForm({ ...stakeForm, amount: e.target.value })}
          />
          <Select
            placeholder="Select period"
            value={stakeForm.period}
            onChange={(e) => setStakeForm({ ...stakeForm, period: e.target.value })}
          >
            <option value="1 month">1 month</option>
            <option value="3 months">3 months</option>
            <option value="6 months">6 months</option>
            <option value="1 year">1 year</option>
          </Select>
        </VStack>
      </Box>
    );
  };

  const renderLendingDetails = () => {
    if (!selectedLending) return null;

    const lending = lendingPositions.find(lending => lending.id === selectedLending);

    return (
      <Box>
        <Image src={lending.image} alt={lending.name} height="200px" objectFit="cover" mb="10px" />
        <Text fontSize="lg" fontWeight="bold">{lending.name}</Text>
        <Text mt="10px"><strong>Amount:</strong> {lending.amount}</Text>
        <Text mt="10px"><strong>Interest Rate:</strong> {lending.interestRate}</Text>
        <Text mt="10px"><strong>Duration:</strong> {lending.duration}</Text>
        <VStack spacing={4} mt={4}>
          <Input
            placeholder="Enter amount to repay"
            value={loanForm.amount}
            onChange={(e) => setLoanForm({ ...loanForm, amount: e.target.value })}
          />
          <Input
            placeholder="Enter additional funds"
            value={loanForm.newFunds}
            onChange={(e) => setLoanForm({ ...loanForm, newFunds: e.target.value })}
          />
        </VStack>
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
        {/* Active Staking Positions Section */}
        <Flex flexDirection="column" alignItems="left">
          <Box mt="40px">
            <Text fontSize="2xl" fontWeight="700" color={textColor} mb="20px">
              Active Staking Positions
            </Text>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px">
              {stakingPositions.map(position => (
                <Card key={position.id}>
                  <Image src={position.image} alt={position.name} height="250px" objectFit="cover" />
                  <Text fontSize="lg" fontWeight="bold" mt="10px">{position.name}</Text>
                  <Text mt="10px"><strong>Staked Amount:</strong> {position.stakedAmount}</Text>
                  <Text mt="10px"><strong>Rewards:</strong> {position.rewards}</Text>
                  <Text mt="10px"><strong>Duration:</strong> {position.duration}</Text>
                  <Button mt="10px" colorScheme="teal" w="full" onClick={() => handleStakingClick(position.id)}>
                    Manage Staking
                  </Button>
                </Card>
              ))}
            </SimpleGrid>
          </Box>
        </Flex>

        {/* Active Lending/Borrowing Positions Section */}
        <Flex flexDirection="column" alignItems="left">
          <Box mt="40px">
            <Text fontSize="2xl" fontWeight="700" color={textColor} mb="20px">
              Active Lending/Borrowing Positions
            </Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap="20px">
              {lendingPositions.map(position => (
                <Card key={position.id}>
                  <Image src={position.image} alt={position.name} height="150px" objectFit="cover" />
                  <Text fontSize="lg" fontWeight="bold" mt="10px">{position.name}</Text>
                  <Text mt="10px"><strong>Amount:</strong> {position.amount}</Text>
                  <Text mt="10px"><strong>Interest Rate:</strong> {position.interestRate}</Text>
                  <Text mt="10px"><strong>Duration:</strong> {position.duration}</Text>
                  <Button mt="10px" colorScheme="teal" w="full" onClick={() => handleLendingClick(position.id)}>
                    Manage Loan
                  </Button>
                </Card>
              ))}
            </SimpleGrid>
          </Box>
        </Flex>
      </Grid>

      {/* Staking Position Details Modal */}
      <Modal isOpen={isStakingOpen} onClose={onStakingClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Staking Position Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {renderStakingDetails()}
            <VStack spacing={4} mt={4}>
              <Button colorScheme="teal" w="full" onClick={handleStakeNewAssets}>
                Stake New Assets
              </Button>
              <Button colorScheme="teal" w="full" onClick={handleWithdrawAssets}>
                Withdraw Staked Assets
              </Button>
              <Button colorScheme="teal" w="full" onClick={handleModifyStakingSettings}>
                Modify Staking Settings
              </Button>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onStakingClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Lending/Borrowing Position Details Modal */}
      <Modal isOpen={isLendingOpen} onClose={onLendingClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Lending/Borrowing Position Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {renderLendingDetails()}
            <VStack spacing={4} mt={4}>
              <Button colorScheme="teal" w="full" onClick={handleRepayLoan}>
                Repay Loan
              </Button>
              <Button colorScheme="teal" w="full" onClick={handleAddMoreFunds}>
                Add More Funds
              </Button>
              <Button colorScheme="teal" w="full" onClick={handleModifyLendingSettings}>
                Modify Lending Settings
              </Button>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onLendingClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ActivePositions;
