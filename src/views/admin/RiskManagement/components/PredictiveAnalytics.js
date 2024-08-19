import React, { useState } from 'react';
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
  FormControl,
  FormLabel,
  Stack,
  IconButton,
} from '@chakra-ui/react';
import Card from 'components/card/Card'; // Adjust the import based on your card component file path
import { Line, Radar, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  RadarController,
  RadialLinearScale,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from 'chart.js';
import { BiTrendingUp, BiCloud, BiDownload, BiShareAlt, BiBell } from 'react-icons/bi';
import { FaFilter, FaChartPie } from 'react-icons/fa';
import Annotation from 'chartjs-plugin-annotation';

// Register Chart.js components
ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  RadarController,
  RadialLinearScale,
  Title,
  ChartTooltip,
  Legend,
  Annotation
);

// Mock data for charts
const marketForecastData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Market Forecast',
      data: [120, 130, 125, 140, 150, 160, 155],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: true,
    },
  ],
};

const riskScenarioData = {
  labels: ['Scenario 1', 'Scenario 2', 'Scenario 3'],
  datasets: [
    {
      label: 'Risk Impact',
      data: [40, 70, 60],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ],
};

const PredictiveAnalytics = () => {
  const [modelType, setModelType] = useState('ARIMA');
  const [dataSource, setDataSource] = useState('External API');
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [showDetailedForecast, setShowDetailedForecast] = useState(false);
  const [showDetailedScenarios, setShowDetailedScenarios] = useState(false);
  const [forecastTimeframe, setForecastTimeframe] = useState('6 Months');
  const [riskScenarioComparison, setRiskScenarioComparison] = useState('Scenario 1');
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const cardSize = useBreakpointValue({ base: 'sm', md: 'md', lg: 'lg' });

  const handleModelChange = (e) => setModelType(e.target.value);
  const handleDataSourceChange = (e) => setDataSource(e.target.value);
  const handleForecastTimeframeChange = (e) => setForecastTimeframe(e.target.value);
  const handleRiskScenarioComparisonChange = (e) => setRiskScenarioComparison(e.target.value);

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }} px={{ base: '20px', md: '40px' }} width="100%" height="100%">
      {/* Market Predictions Card */}
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
          Market Predictions
        </Text>
        <Flex justify="space-between" mb="20px" flexDirection={{ base: 'column', md: 'row' }}>
          <Select
            placeholder="Select Timeframe"
            value={forecastTimeframe}
            onChange={handleForecastTimeframeChange}
            mb={{ base: '10px', md: '0' }}
          >
            <option value="1 Month">1 Month</option>
            <option value="3 Months">3 Months</option>
            <option value="6 Months">6 Months</option>
            <option value="1 Year">1 Year</option>
          </Select>
          <Flex>
            <Tooltip label="Apply Filters">
              <IconButton
                aria-label="Apply Filters"
                icon={<FaFilter />}
                mr="2"
                onClick={() => {
                  // Logic to apply filters
                }}
              />
            </Tooltip>
            <Tooltip label="Customize Graph">
              <IconButton
                aria-label="Customize Graph"
                icon={<FaChartPie />}
                mr="2"
                onClick={() => {
                  // Logic to customize the graph
                }}
              />
            </Tooltip>
            <Button colorScheme="blue" onClick={() => setShowDetailedForecast(true)}>
              View Detailed Forecast
            </Button>
          </Flex>
        </Flex>
        <Box height="300px" mb="20px">
          <Line data={marketForecastData} options={{ responsive: true, maintainAspectRatio: false }} />
        </Box>
        <Text mb="20px">
          Visualize predictions for asset performance based on current and historical data. Use these forecasts to
          strategize investments.
        </Text>
        <Flex justify="space-between">
          <Button
            colorScheme="blue"
            leftIcon={<BiDownload />}
            onClick={() => {
              // Logic to download the forecast report
            }}
          >
            Download Forecast Report
          </Button>
          <Button
            colorScheme="teal"
            leftIcon={<BiShareAlt />}
            onClick={() => {
              // Logic to share the report with the team
            }}
          >
            Share with Team
          </Button>
        </Flex>
      </Card>

      {/* Risk Scenarios Card */}
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
          Risk Scenarios
        </Text>
        <Flex justify="space-between" mb="20px" flexDirection={{ base: 'column', md: 'row' }}>
          <Select
            placeholder="Select Scenario"
            value={riskScenarioComparison}
            onChange={handleRiskScenarioComparisonChange}
            mb={{ base: '10px', md: '0' }}
          >
            <option value="Scenario 1">Scenario 1</option>
            <option value="Scenario 2">Scenario 2</option>
            <option value="Scenario 3">Scenario 3</option>
          </Select>
          <Flex>
            <Tooltip label="Apply Filters">
              <IconButton
                aria-label="Apply Filters"
                icon={<FaFilter />}
                mr="2"
                onClick={() => {
                  // Logic to apply filters
                }}
              />
            </Tooltip>
            <Tooltip label="Customize Graph">
              <IconButton
                aria-label="Customize Graph"
                icon={<FaChartPie />}
                mr="2"
                onClick={() => {
                  // Logic to customize the graph
                }}
              />
            </Tooltip>
            <Button colorScheme="blue" onClick={() => setShowDetailedScenarios(true)}>
              View Detailed Scenarios
            </Button>
          </Flex>
        </Flex>
        <Box height="300px" mb="20px">
          <Radar
            data={riskScenarioData}
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
        <Text mb="20px">
          Analyze different risk scenarios and understand their potential impact on your portfolio. Adjust parameters to
          explore various outcomes.
        </Text>
        <Flex justify="space-between">
          <Button
            colorScheme="blue"
            leftIcon={<BiDownload />}
            onClick={() => {
              // Logic to download the scenarios report
            }}
          >
            Download Scenarios Report
          </Button>
          <Button
            colorScheme="teal"
            leftIcon={<BiShareAlt />}
            onClick={() => {
              // Logic to share the scenarios with the team
            }}
          >
            Share with Team
          </Button>
        </Flex>
      </Card>

      {/* Analytics Settings Card */}
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
          Analytics Settings
        </Text>
        <Flex justify="space-between" mb="20px" flexDirection={{ base: 'column', md: 'row' }}>
          <FormControl>
            <FormLabel htmlFor="modelType">Predictive Model</FormLabel>
            <Select id="modelType" value={modelType} onChange={handleModelChange}>
              <option value="ARIMA">ARIMA</option>
              <option value="Prophet">Prophet</option>
              <option value="SARIMA">SARIMA</option>
              <option value="XGBoost">XGBoost</option>
            </Select>
          </FormControl>
          <FormControl ml={{ md: '20px' }}>
            <FormLabel htmlFor="dataSource">Data Source</FormLabel>
            <Select id="dataSource" value={dataSource} onChange={handleDataSourceChange}>
              <option value="External API">External API</option>
              <option value="Local File">Local File</option>
              <option value="Manual Entry">Manual Entry</option>
            </Select>
          </FormControl>
        </Flex>
        <Button colorScheme="teal" onClick={() => setIsConfiguring(true)}>
          Configure Models
        </Button>
        <Button colorScheme="purple" ml="10px" onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}>
          {showAdvancedSettings ? 'Hide Advanced Settings' : 'Show Advanced Settings'}
        </Button>
        {showAdvancedSettings && (
          <Box mt="20px">
            <Text mb="10px">Advanced Settings:</Text>
            <Stack spacing="20px">
              <FormControl>
                <FormLabel>Data File Upload</FormLabel>
                <Input type="file" />
              </FormControl>
              <FormControl>
                <FormLabel>Manual Data Entry</FormLabel>
                <Input placeholder="Enter data here" />
              </FormControl>
              <Button colorScheme="green" onClick={() => alert('Data updated!')}>
                Update Data
              </Button>
            </Stack>
          </Box>
        )}
      </Card>

      {/* Detailed Forecast Modal */}
      <Modal isOpen={showDetailedForecast} onClose={() => setShowDetailedForecast(false)} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detailed Forecast</ModalHeader>
          <ModalBody>
            <Text fontSize="lg" mb="10px">
              Here is the detailed forecast report. You can review the data, adjust parameters, and download the full
              report.
            </Text>
            <Box mb="20px">
              <Line data={marketForecastData} options={{ responsive: true, maintainAspectRatio: false }} />
            </Box>
            <Button
              colorScheme="blue"
              leftIcon={<BiDownload />}
              onClick={() => {
                // Logic to download the detailed report
              }}
            >
              Download Detailed Report
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => setShowDetailedForecast(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Detailed Scenarios Modal */}
      <Modal isOpen={showDetailedScenarios} onClose={() => setShowDetailedScenarios(false)} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detailed Risk Scenarios</ModalHeader>
          <ModalBody>
            <Text fontSize="lg" mb="10px">
              Explore detailed data for each risk scenario. Adjust parameters and compare scenarios to understand
              potential impacts.
            </Text>
            <Box mb="20px">
              <Radar
                data={riskScenarioData}
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
            <Button
              colorScheme="blue"
              leftIcon={<BiDownload />}
              onClick={() => {
                // Logic to download the detailed scenarios report
              }}
            >
              Download Detailed Scenarios
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => setShowDetailedScenarios(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PredictiveAnalytics;
