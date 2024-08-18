import React from "react";
import {
  Box,
  Flex,
  Text,
  Badge,
  Icon,
  VStack,
} from "@chakra-ui/react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import Card from "components/card/Card";

const PendingTransactions = () => {
  const transactions = [
    {
      id: 1,
      name: "Stake ETH",
      type: "Staking",
      amount: 2.5,
      status: "Pending",
      date: "2024-08-15",
      icon: FaArrowUp,
    },
    {
      id: 2,
      name: "Borrow USDC",
      type: "Borrowing",
      amount: 1000,
      status: "Pending",
      date: "2024-08-16",
      icon: FaArrowDown,
    },
    {
      id: 3,
      name: "Lend BTC",
      type: "Lending",
      amount: 0.5,
      status: "Pending",
      date: "2024-08-17",
      icon: FaArrowUp,
    },
  ];

  return (
    <Card p="20px" boxShadow="lg">
      <Text fontSize="xl" fontWeight="bold" mb="20px">
        Pending Transactions
      </Text>
      <VStack spacing={4} align="stretch">
        {transactions.map((transaction) => (
          <Flex
            key={transaction.id}
            align="center"
            justify="space-between"
            p="15px"
            bg="gray.100"
            borderRadius="md"
            boxShadow="md"
            _hover={{ bg: "gray.200" }}
          >
            <Flex align="center">
              <Icon as={transaction.icon} boxSize={5} color="blue.500" mr="10px" />
              <Box>
                <Text fontSize="lg" fontWeight="bold">
                  {transaction.name}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  {transaction.type} - {transaction.date}
                </Text>
              </Box>
            </Flex>
            <Flex align="center">
              <Text fontSize="md" fontWeight="bold" color="green.500" mr="10px">
                {transaction.amount} {transaction.type === "Borrowing" ? "USDC" : "ETH"}
              </Text>
              <Badge colorScheme="orange">{transaction.status}</Badge>
            </Flex>
          </Flex>
        ))}
      </VStack>
    </Card>
  );
};

export default PendingTransactions;
