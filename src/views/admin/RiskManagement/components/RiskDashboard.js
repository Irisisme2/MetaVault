import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  Select,
  Switch,
  Tooltip,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Progress,
  useColorModeValue,
  useBreakpointValue,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatGroup,
} from '@chakra-ui/react';
import Card from 'components/card/Card'; // Adjust import based on your file path
import { Line, Bar, Radar, PolarArea } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  BarElement,
  RadarController,
  RadialLinearScale,
  PolarAreaController,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from 'chart.js';
import { BiShield, BiCog } from 'react-icons/bi';

// Register Chart.js components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  BarElement,
  RadarController,
  RadialLinearScale,
  PolarAreaController,
  Title,
  ChartTooltip,
  Legend
);

// Mock data for charts
const volatilityData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Asset Volatility',
      data: [10, 12, 14, 13, 15, 16, 14],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: true,
    },
    {
      label: 'Portfolio Volatility',
      data: [8, 9, 10, 11, 12, 13, 14],
      borderColor: 'rgb(153, 102, 255)',
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      fill: true,
    },
  ],
};

const liquidityData = {
  labels: ['Asset A', 'Asset B', 'Asset C', 'Asset D'],
  datasets: [
    {
      label: 'Liquidity',
      data: [85, 78, 90, 60],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
    },
  ],
};

const historicalData = {
  labels: ['2019', '2020', '2021', '2022', '2023'],
  datasets: [
    {
      label: 'Annual Volatility',
      data: [15, 13, 14, 12, 16],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
    },
  ],
};

const RiskDashboard = () => {
  const [filter, setFilter] = useState('All');
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [assetType, setAssetType] = useState('All');
  const [showHistorical, setShowHistorical] = useState(false);
  const [customAlert, setCustomAlert] = useState(false);
  const [alertThreshold, setAlertThreshold] = useState(10);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const cardSize = useBreakpointValue({ base: 'sm', md: 'md', lg: 'lg' });

  useEffect(() => {
    // Simulate real-time data updates or fetch real data
  }, []);

  const handleFilterChange = (e) => setFilter(e.target.value);
  const handleDateRangeChange = (e) => setDateRange(e.target.value);
  const handleAssetTypeChange = (e) => setAssetType(e.target.value);
  const handleAlertThresholdChange = (e) => setAlertThreshold(e.target.value);

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }} px={{ base: '20px', md: '40px' }} width="100%" height="100%">
      {/* Volatility Metrics Card */}
      <Card
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        p={6}
        width="100%"
        bg="white"
        transition="transform 0.2s"
        _hover={{ transform: 'scale(1.02)' }}
        size={cardSize}
        mb="20px"
      >
        <Text fontSize="2xl" fontWeight="700" color={textColor} mb="20px">
          Volatility Metrics
        </Text>
        <Flex justify="space-between" mb="20px" flexDirection={{ base: 'column', md: 'row' }}>
          <Select
            placeholder="Select filter"
            value={filter}
            onChange={handleFilterChange}
            mb={{ base: '10px', md: '0' }}
          >
            <option value="All">All</option>
            <option value="High Risk">High Risk</option>
            <option value="Medium Risk">Medium Risk</option>
            <option value="Low Risk">Low Risk</option>
          </Select>
          <Select placeholder="Date Range" value={dateRange} onChange={handleDateRangeChange}>
            <option value="Last 7 Days">Last 7 Days</option>
            <option value="Last 30 Days">Last 30 Days</option>
            <option value="Last 6 Months">Last 6 Months</option>
            <option value="Last Year">Last Year</option>
          </Select>
          <Select placeholder="Asset Type" value={assetType} onChange={handleAssetTypeChange} ml={{ md: '10px' }}>
            <option value="All">All</option>
            <option value="Crypto">Crypto</option>
            <option value="Stocks">Stocks</option>
            <option value="Real Estate">Real Estate</option>
          </Select>
          <Switch
            ml={{ md: '10px' }}
            isChecked={showHistorical}
            onChange={() => setShowHistorical(!showHistorical)}
            colorScheme="teal"
          >
            Show Historical Data
          </Switch>
        </Flex>
        <StatGroup mb="20px">
          <Stat>
            <StatLabel>Asset Volatility</StatLabel>
            <StatNumber>12.5%</StatNumber>
            <StatHelpText>
              <Tooltip label="Volatility of individual assets in the portfolio" aria-label="Volatility Tooltip">
                <Text as="span">Asset volatility</Text>
              </Tooltip>
            </StatHelpText>
            <Progress value={12.5} size="sm" colorScheme="green" />
          </Stat>
          <Stat>
            <StatLabel>Portfolio Volatility</StatLabel>
            <StatNumber>8.3%</StatNumber>
            <StatHelpText>
              <Tooltip label="Overall volatility of the portfolio" aria-label="Portfolio Volatility Tooltip">
                <Text as="span">Portfolio volatility</Text>
              </Tooltip>
            </StatHelpText>
            <Progress value={8.3} size="sm" colorScheme="blue" />
          </Stat>
        </StatGroup>
        <Box height="300px" mb="20px">
          <Line data={volatilityData} options={{ responsive: true, maintainAspectRatio: false }} />
        </Box>
        {showHistorical && (
          <Box height="300px" mb="20px">
            <Radar
              data={historicalData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
              }}
            />
          </Box>
        )}
        <Button mt="20px" colorScheme="blue" onClick={onOpen}>
          View Detailed Report
        </Button>
      </Card>

      {/* Liquidity Analysis Card */}
      <Card
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        p={6}
        width="100%"
        bg="white"
        transition="transform 0.2s"
        _hover={{ transform: 'scale(1.02)' }}
        size={cardSize}
        mb="20px"
      >
        <Text fontSize="2xl" fontWeight="700" color={textColor} mb="20px">
          Liquidity Analysis
        </Text>
        <StatGroup mb="20px">
          <Stat>
            <StatLabel>Asset Liquidity</StatLabel>
            <StatNumber>85%</StatNumber>
            <StatHelpText>
              <Tooltip label="Liquidity of individual assets in the portfolio" aria-label="Asset Liquidity Tooltip">
                <Text as="span">Asset liquidity</Text>
              </Tooltip>
            </StatHelpText>
            <Progress value={85} size="sm" colorScheme="teal" />
          </Stat>
          <Stat>
            <StatLabel>Portfolio Liquidity</StatLabel>
            <StatNumber>78%</StatNumber>
            <StatHelpText>
              <Tooltip label="Overall liquidity of the portfolio" aria-label="Portfolio Liquidity Tooltip">
                <Text as="span">Portfolio liquidity</Text>
              </Tooltip>
            </StatHelpText>
            <Progress value={78} size="sm" colorScheme="orange" />
          </Stat>
        </StatGroup>
        <Box height="300px" mb="20px">
          <Bar data={liquidityData} options={{ responsive: true, maintainAspectRatio: false }} />
        </Box>
        <Box height="300px" mb="20px">
          <PolarArea
            data={liquidityData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                },
              },
            }}
          />
        </Box>
        <Button mt="20px" colorScheme="orange" onClick={onOpen}>
          View Detailed Report
        </Button>
      </Card>

      {/* Risk Management Card */}
      <Card
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        p={6}
        width="100%"
        bg="white"
        transition="transform 0.2s"
        _hover={{ transform: 'scale(1.02)' }}
        size={cardSize}
        mb="20px"
      >
        <Flex align="center" mb="20px">
          <BiShield size={32} color="teal" />
          <Text fontSize="2xl" fontWeight="700" color={textColor} ml="10px">
            Risk Management
          </Text>
        </Flex>
        <Text mb="20px">
          Assess potential risks and apply mitigation strategies to protect your investments. Monitor risk
          factors and set up alerts for critical situations.
        </Text>
        <Button colorScheme="teal" onClick={onOpen}>
          Manage Risk Settings
        </Button>
      </Card>

      {/* Settings Card */}
      <Card
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        p={6}
        width="100%"
        bg="white"
        transition="transform 0.2s"
        _hover={{ transform: 'scale(1.02)' }}
        size={cardSize}
        mb="20px"
      >
        <Flex align="center" mb="20px">
          <BiCog size={32} color="purple" />
          <Text fontSize="2xl" fontWeight="700" color={textColor} ml="10px">
            Settings
          </Text>
        </Flex>
        <Text mb="20px">
          Manage your dashboard settings to customize the information displayed and improve usability. Adjust
          preferences and configure notifications.
        </Text>
        <Button colorScheme="purple" onClick={onOpen}>
          Update Preferences
        </Button>
      </Card>

      {/* Detailed Report Modals */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detailed Report</ModalHeader>
          <ModalBody>
            <Text mb="20px">
              Detailed insights and data visualizations for the selected metric. Analyze trends, compare data, and
              make informed decisions based on the latest information.
            </Text>
            <Box>
              {/* Include additional detailed data visualizations or information here */}
              <Text fontWeight="bold" mb="10px">
                Example Table:
              </Text>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Date</Th>
                    <Th>Metric</Th>
                    <Th isNumeric>Value</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>2024-07-01</Td>
                    <Td>Volatility</Td>
                    <Td isNumeric>12.5%</Td>
                  </Tr>
                  <Tr>
                    <Td>2024-07-02</Td>
                    <Td>Liquidity</Td>
                    <Td isNumeric>85%</Td>
                  </Tr>
                  {/* Add more rows as needed */}
                </Tbody>
              </Table>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Alert Settings Card */}
      <Card
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        p={6}
        width="100%"
        bg="white"
        transition="transform 0.2s"
        _hover={{ transform: 'scale(1.02)' }}
        size={cardSize}
      >
        <Text fontSize="2xl" fontWeight="700" color={textColor} mb="20px">
          Alert Settings
        </Text>
        <Flex align="center" mb="20px">
          <Text fontSize="lg" mr="10px">
            Custom Alert Threshold (%):
          </Text>
          <Input
            type="number"
            value={alertThreshold}
            onChange={handleAlertThresholdChange}
            width="120px"
            ml="10px"
          />
          <Switch
            isChecked={customAlert}
            onChange={() => setCustomAlert(!customAlert)}
            ml="20px"
            colorScheme="red"
          >
            Enable Alerts
          </Switch>
        </Flex>
        <Text>
          {customAlert
            ? `Alerts will be triggered if any metric exceeds ${alertThreshold}%.`
            : 'Alerts are disabled.'}
        </Text>
      </Card>
    </Box>
  );
};

export default RiskDashboard;
