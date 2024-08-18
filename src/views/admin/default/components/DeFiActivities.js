import React, { useState } from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  useColorModeValue,
  Button,
  Input,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import btcIcon from "assets/img/icons/Btc.jpg";
import ethIcon from "assets/img/icons/Eth.png";
import adaIcon from "assets/img/icons/Ada.jpg";
import dotIcon from "assets/img/icons/Dot.png";

const DeFiActivities = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [stakeAmount, setStakeAmount] = useState(1);
  const [unstakeAmount, setUnstakeAmount] = useState(1);

  const data = {
    staking: [
      {
        id: 1,
        poolName: "ETH Staking Pool",
        amount: 5,
        startDate: "2024-07-01",
        endDate: "2024-08-01",
        options: "Weekly payouts",
        risk: "Medium",
        details: "ETH staking with moderate risk and consistent payouts.",
        image: ethIcon,
        chartData: [
          { name: "Week 1", value: 2 },
          { name: "Week 2", value: 3 },
          { name: "Week 3", value: 4 },
          { name: "Week 4", value: 5 },
        ],
      },
      {
        id: 2,
        poolName: "BTC Staking Pool",
        amount: 8,
        startDate: "2024-07-02",
        endDate: "2024-08-02",
        options: "Monthly payouts",
        risk: "Low",
        details: "BTC staking with low risk and monthly payouts.",
        image: btcIcon,
        chartData: [
          { name: "Week 1", value: 3 },
          { name: "Week 2", value: 4 },
          { name: "Week 3", value: 5 },
          { name: "Week 4", value: 8 },
        ],
      },
    ],
    lending: [
      {
        id: 1,
        poolName: "ADA Lending Pool",
        amount: 15,
        startDate: "2024-07-01",
        endDate: "2024-09-01",
        interestRate: "4.5%",
        risk: "High",
        details: "High-risk ADA lending with potential for high returns.",
        image: adaIcon,
        chartData: [
          { name: "Month 1", value: 4 },
          { name: "Month 2", value: 6 },
          { name: "Month 3", value: 7 },
        ],
      },
      {
        id: 2,
        poolName: "DOT Lending Pool",
        amount: 10,
        startDate: "2024-07-15",
        endDate: "2024-08-15",
        interestRate: "5.0%",
        risk: "Medium",
        details: "Medium-risk DOT lending with steady interest.",
        image: dotIcon,
        chartData: [
          { name: "Month 1", value: 5 },
          { name: "Month 2", value: 5.5 },
          { name: "Month 3", value: 6 },
        ],
      },
    ],
    borrowing: [
      {
        id: 1,
        poolName: "ETH Borrowing",
        amount: 2,
        startDate: "2024-07-05",
        endDate: "2024-08-05",
        interestRate: "6.0%",
        risk: "Low",
        details: "Low-risk ETH borrowing with competitive rates.",
        image: ethIcon,
        chartData: [
          { name: "Week 1", value: 1 },
          { name: "Week 2", value: 1.5 },
          { name: "Week 3", value: 2 },
          { name: "Week 4", value: 2.5 },
        ],
      },
      {
        id: 2,
        poolName: "BTC Borrowing",
        amount: 3,
        startDate: "2024-07-10",
        endDate: "2024-09-10",
        interestRate: "5.5%",
        risk: "Medium",
        details: "Medium-risk BTC borrowing with flexible terms.",
        image: btcIcon,
        chartData: [
          { name: "Week 1", value: 2 },
          { name: "Week 2", value: 2.5 },
          { name: "Week 3", value: 3 },
          { name: "Week 4", value: 3.5 },
        ],
      },
    ],
  };

  const handleModalOpen = (type, id) => {
    setActiveModal({ type, id });
  };

  const handleModalClose = () => {
    setActiveModal(null);
  };

  const handleFormSubmit = (amount) => {
    console.log(`${activeModal.type === "stake" ? "Stake" : "Unstake"} ${amount} for ID ${activeModal.id}`);
    setActiveModal(null);
  };

  const textColor = useColorModeValue("secondaryGray.900", "white");

  const getRiskColor = (risk) => {
    switch (risk) {
      case "High":
        return "red.500";
      case "Medium":
        return "orange.400";
      case "Low":
        return "green.500";
      default:
        return textColor;
    }
  };

  const renderCards = (items, type) => {
    return items.map((item) => (
      <Card key={item.id} p="15px" mb="20px" boxShadow="lg">
        <Flex align="center" justify="space-between">
          <Flex align="center">
            <Image src={item.image} alt={item.poolName} boxSize="50px" borderRadius="full" mr="15px" />
            <Box>
              <Text fontSize="xl" fontWeight="bold" color={textColor} mb="3px">
                {item.poolName}
              </Text>
              <Text fontSize="sm" color={textColor} mb="3px">
                Amount: {item.amount}
              </Text>
              <Text fontSize="sm" color={textColor} mb="3px">
                Start Date: {item.startDate}
              </Text>
              <Text fontSize="sm" color={textColor} mb="3px">
                End Date: {item.endDate}
              </Text>
              <Text fontSize="sm" fontWeight="bold" color={getRiskColor(item.risk)} mb="3px">
                Risk Level: {item.risk}
              </Text>
              <Text fontSize="sm" color={textColor} mb="3px">
                Details: {item.details}
              </Text>
              {type !== "staking" && (
                <Text fontSize="sm" color={textColor} mb="3px">
                  Interest Rate: {item.interestRate}
                </Text>
              )}
            </Box>
          </Flex>
          <Flex>
            {type === "staking" && (
              <>
                <Button onClick={() => handleModalOpen("stake", item.id)} colorScheme="blue" size="sm" mr="10px">
                  Stake more
                </Button>
                <Button onClick={() => handleModalOpen("unstake", item.id)} colorScheme="red" size="sm">
                  Unstake
                </Button>
              </>
            )}
            <Button onClick={() => handleModalOpen("details", item.id)} colorScheme="purple" size="sm" ml="10px">
              More details
            </Button>
          </Flex>
        </Flex>
      </Card>
    ));
  };

  return (
    <Card p="20px" boxShadow="xl">
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Staking</Tab>
          <Tab>Lending</Tab>
          <Tab>Borrowing</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {renderCards(data.staking, "staking")}
          </TabPanel>
          <TabPanel>
            {renderCards(data.lending, "lending")}
          </TabPanel>
          <TabPanel>
            {renderCards(data.borrowing, "borrowing")}
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Modal */}
      <Modal isOpen={!!activeModal} onClose={handleModalClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {activeModal?.type === "stake" ? "Stake more" : activeModal?.type === "unstake" ? "Unstake" : "Details"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {(activeModal?.type === "stake" || activeModal?.type === "unstake") && (
              <FormControl>
                <FormLabel>{activeModal?.type === "stake" ? "Stake amount:" : "Unstake amount:"}</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  min="1"
                  value={activeModal?.type === "stake" ? stakeAmount : unstakeAmount}
                  onChange={(e) => {
                    if (activeModal?.type === "stake") {
                      setStakeAmount(parseInt(e.target.value) || 0);
                    } else {
                      setUnstakeAmount(parseInt(e.target.value) || 0);
                    }
                  }}
                />
              </FormControl>
            )}
            {activeModal?.type === "details" && (
              <Box>
                <Text fontSize="md" color={textColor} mb="15px">
                  {data[activeModal.type]?.find(item => item.id === activeModal.id)?.details}
                </Text>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={data[activeModal.type]?.find(item => item.id === activeModal.id)?.chartData}>
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            {(activeModal?.type === "stake" || activeModal?.type === "unstake") ? (
              <Button colorScheme="blue" onClick={() => handleFormSubmit(activeModal?.type === "stake" ? stakeAmount : unstakeAmount)}>
                Submit
              </Button>
            ) : (
              <Button colorScheme="blue" onClick={handleModalClose}>
                Close
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default DeFiActivities;
