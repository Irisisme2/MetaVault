import React from "react";
import {
  Box,
  Flex,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Progress,
  SimpleGrid,
  Divider,
  Badge,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  HStack,
  Avatar,
  Stack,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import { Line, Bar } from 'react-chartjs-2';
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const ForecastingTools = () => {
  const marketForecast = {
    riskLevel: "Medium",
    expectedReturn: "7%",
    predictionAccuracy: "80%",
    marketConditions: "Stable",
    investmentRecommendation: "Hold",
    riskFactors: [
      { name: "Market Volatility", level: "High" },
      { name: "Liquidity Risk", level: "Medium" },
      { name: "Inflation Risk", level: "Low" },
    ],
    historicalReturns: [4, 5, 6, 7, 8],
    futurePredictions: [7, 6, 8, 7, 9],
    scenarios: {
      bestCase: "10% Expected Return",
      worstCase: "3% Expected Return",
      mostLikely: "7% Expected Return",
    },
    technicalIndicators: {
      RSI: 55,
      MACD: {
        signal: 2.5,
        histogram: 1.2,
      },
      movingAverages: {
        shortTerm: "50-Day: 6%",
        longTerm: "200-Day: 8%",
      },
    },
    expertComments: [
      {
        name: "John Doe",
        role: "Senior Analyst",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        comment: "The market is showing signs of stabilization. Hold your investments for now.",
      },
      {
        name: "Jane Smith",
        role: "Chief Economist",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        comment: "With inflation under control, we expect moderate growth in the coming quarters.",
      },
    ],
    recentTransactions: [
      { date: "2024-08-10", type: "Buy", amount: "1.5 BTC", price: "30,000 USD" },
      { date: "2024-08-05", type: "Sell", amount: "0.5 BTC", price: "32,000 USD" },
    ],
    portfolioImpact: {
      currentValue: "15% of Portfolio",
      riskContribution: "High",
    },
    predictionTrends: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [
        {
          label: "Expected Returns",
          data: [5, 6, 7, 8],
          fill: false,
          borderColor: "rgba(75,192,192,1)",
        },
        {
          label: "Historical Returns",
          data: [4, 5, 6, 7],
          fill: false,
          borderColor: "rgba(153,102,255,1)",
        },
      ],
    },
    riskAnalysis: {
      labels: ["Market Volatility", "Liquidity Risk", "Inflation Risk"],
      datasets: [
        {
          label: "Risk Level",
          data: [7, 5, 3],
          backgroundColor: ["rgba(255,99,132,0.6)", "rgba(255,159,64,0.6)", "rgba(75,192,192,0.6)"],
        },
      ],
    },
  };

  const getColorScheme = (riskLevel) => {
    switch (riskLevel) {
      case "High":
        return "red";
      case "Medium":
        return "orange";
      case "Low":
        return "green";
      default:
        return "gray";
    }
  };

  return (
    <Card p="20px" boxShadow="lg">
      <Text fontSize="xl" fontWeight="bold" mb="20px">
        Forecasting Tools 📊🔮
      </Text>

      <Box mb="20px">
        <Stat>
          <StatLabel>Risk Level</StatLabel>
          <StatNumber color={getColorScheme(marketForecast.riskLevel)}>
            {marketForecast.riskLevel}
          </StatNumber>
          <StatHelpText>Current Market Conditions: {marketForecast.marketConditions}</StatHelpText>
        </Stat>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing="20px" mb="20px">
        <Box>
          <Stat>
            <StatLabel>Expected Return</StatLabel>
            <StatNumber>{marketForecast.expectedReturn}</StatNumber>
            <StatHelpText>Prediction Accuracy: {marketForecast.predictionAccuracy}</StatHelpText>
          </Stat>
          <Box mt="15px">
            <Text fontSize="md" fontWeight="bold">
              Investment Recommendation:
            </Text>
            <Badge colorScheme={marketForecast.investmentRecommendation === "Buy" ? "green" : marketForecast.investmentRecommendation === "Sell" ? "red" : "yellow"} fontSize="lg">
              {marketForecast.investmentRecommendation}
            </Badge>
          </Box>
        </Box>

        <Box>
          <Text fontSize="md" fontWeight="bold" mb="10px">
            Risk Factors
          </Text>
          {marketForecast.riskFactors.map((risk, index) => (
            <Flex key={index} alignItems="center" justifyContent="space-between" mb="5px">
              <Text fontSize="sm">{risk.name}</Text>
              <Badge colorScheme={getColorScheme(risk.level)}>{risk.level}</Badge>
            </Flex>
          ))}
        </Box>
      </SimpleGrid>

      <Divider mb="20px" />

      <Tabs variant="soft-rounded" colorScheme="teal" mb="20px">
        <TabList>
          <Tab>Scenarios</Tab>
          <Tab>Technical Indicators</Tab>
          <Tab>Portfolio Impact</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <SimpleGrid columns={3} spacing={5}>
              <Box>
                <Text fontSize="md" fontWeight="bold">Best Case</Text>
                <Text>{marketForecast.scenarios.bestCase}</Text>
              </Box>
              <Box>
                <Text fontSize="md" fontWeight="bold">Worst Case</Text>
                <Text>{marketForecast.scenarios.worstCase}</Text>
              </Box>
              <Box>
                <Text fontSize="md" fontWeight="bold">Most Likely</Text>
                <Text>{marketForecast.scenarios.mostLikely}</Text>
              </Box>
            </SimpleGrid>
          </TabPanel>

          <TabPanel>
            <VStack align="start">
              <Box>
                <Text fontSize="md" fontWeight="bold">RSI</Text>
                <Text>{marketForecast.technicalIndicators.RSI}</Text>
              </Box>
              <Box>
                <Text fontSize="md" fontWeight="bold">MACD</Text>
                <Text>Signal: {marketForecast.technicalIndicators.MACD.signal}, Histogram: {marketForecast.technicalIndicators.MACD.histogram}</Text>
              </Box>
              <Box>
                <Text fontSize="md" fontWeight="bold">Moving Averages</Text>
                <Text>{marketForecast.technicalIndicators.movingAverages.shortTerm}</Text>
                <Text>{marketForecast.technicalIndicators.movingAverages.longTerm}</Text>
              </Box>
            </VStack>
          </TabPanel>

          <TabPanel>
            <Stat>
              <StatLabel>Portfolio Impact</StatLabel>
              <StatNumber>{marketForecast.portfolioImpact.currentValue}</StatNumber>
              <StatHelpText>Risk Contribution: <Badge colorScheme={getColorScheme(marketForecast.portfolioImpact.riskContribution)}>{marketForecast.portfolioImpact.riskContribution}</Badge></StatHelpText>
            </Stat>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Divider mb="20px" />

      <Box mb="20px">
        <Text fontSize="md" fontWeight="bold" mb="10px">
          Expected Return Over Next Weeks
        </Text>
        <Box h="200px">
          <Line
            data={marketForecast.predictionTrends}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: true,
                },
                tooltip: {
                  callbacks: {
                    label: function (tooltipItem) {
                      return `${tooltipItem.dataset.label}: ${tooltipItem.formattedValue}%`;
                    },
                  },
                },
              },
              scales: {
                x: {
                  type: "category",
                  labels: marketForecast.predictionTrends.labels,
                },
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: function (value) {
                      return `${value}%`;
                    },
                  },
                },
              },
            }}
          />
        </Box>
      </Box>

      <Divider mb="20px" />

      <Box mb="20px">
        <Text fontSize="md" fontWeight="bold" mb="10px">
          Risk Analysis
        </Text>
        <Box h="200px">
          <Bar
            data={marketForecast.riskAnalysis}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: true,
                },
              },
              scales: {
                x: {
                  type: "category",
                  labels: marketForecast.riskAnalysis.labels,
                },
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: function (value) {
                      return `Level ${value}`;
                    },
                  },
                },
              },
            }}
          />
        </Box>
      </Box>

      <Divider mb="20px" />

      <Box mb="20px">
        <Text fontSize="md" fontWeight="bold" mb="10px">
          Expert Comments
        </Text>
        <VStack align="start" spacing={4}>
          {marketForecast.expertComments.map((comment, index) => (
            <HStack key={index} align="start" spacing={4}>
              <Avatar src={comment.avatar} size="sm" />
              <Box>
                <Text fontWeight="bold">{comment.name}</Text>
                <Text fontSize="sm" color="gray.500">{comment.role}</Text>
                <Text>{comment.comment}</Text>
              </Box>
            </HStack>
          ))}
        </VStack>
      </Box>

      <Divider mb="20px" />

      <Box>
        <Text fontSize="md" fontWeight="bold" mb="10px">
          Recent Transactions
        </Text>
        <VStack align="start" spacing={3}>
          {marketForecast.recentTransactions.map((transaction, index) => (
            <Flex key={index} align="center" justifyContent="space-between" width="100%">
              <Text>{transaction.date}</Text>
              <Text>{transaction.type}</Text>
              <Text>{transaction.amount}</Text>
              <Text>{transaction.price}</Text>
            </Flex>
          ))}
        </VStack>
      </Box>
    </Card>
  );
};

export default ForecastingTools;
