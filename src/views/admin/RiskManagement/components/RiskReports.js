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
} from '@chakra-ui/react';
import Card from 'components/card/Card'; // Adjust the import based on your card component file path
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
const historicalRiskData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Risk Level',
      data: [20, 25, 15, 30, 22, 18, 27],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      fill: true,
    },
  ],
};

const summaryRiskData = {
  labels: ['Risk Type A', 'Risk Type B', 'Risk Type C'],
  datasets: [
    {
      label: 'Risk Distribution',
      data: [30, 50, 20],
      backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)'],
      borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)'],
      borderWidth: 1,
    },
  ],
};

const RiskReports = () => {
  const [reportType, setReportType] = useState('Detailed');
  const [alertThreshold, setAlertThreshold] = useState(10);
  const [customAlert, setCustomAlert] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const cardSize = useBreakpointValue({ base: 'sm', md: 'md', lg: 'lg' });

  const handleReportTypeChange = (e) => setReportType(e.target.value);
  const handleAlertThresholdChange = (e) => setAlertThreshold(e.target.value);

  const renderReportContent = () => {
    switch (reportType) {
      case 'Detailed':
        return (
          <Box>
            <Text mb="20px">
              Comprehensive analysis of risk factors, including detailed metrics, recent alerts, and risk summaries.
            </Text>
            <StatGroup mb="20px">
              <Stat>
                <StatLabel>Current Risk Level</StatLabel>
                <StatNumber>25%</StatNumber>
                <StatHelpText>
                  <Tooltip label="Current risk level based on recent data" aria-label="Current Risk Level Tooltip">
                    <Text as="span">Current risk level</Text>
                  </Tooltip>
                </StatHelpText>
                <Progress value={25} size="sm" colorScheme="red" />
              </Stat>
              <Stat>
                <StatLabel>Recent Alerts</StatLabel>
                <StatNumber>5</StatNumber>
                <StatHelpText>
                  <Tooltip label="Number of alerts triggered in the last month" aria-label="Recent Alerts Tooltip">
                    <Text as="span">Recent alerts</Text>
                  </Tooltip>
                </StatHelpText>
                <Progress value={50} size="sm" colorScheme="orange" />
              </Stat>
            </StatGroup>
            <Box height="300px" mb="20px">
              <Line data={historicalRiskData} options={{ responsive: true, maintainAspectRatio: false }} />
            </Box>
            <Text fontWeight="bold" mb="10px">
              Risk Summary:
            </Text>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Metric</Th>
                  <Th isNumeric>Value</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Average Risk Level</Td>
                  <Td isNumeric>22%</Td>
                </Tr>
                <Tr>
                  <Td>Maximum Risk Level</Td>
                  <Td isNumeric>30%</Td>
                </Tr>
                {/* Add more rows as needed */}
              </Tbody>
            </Table>
          </Box>
        );
      case 'Summary':
        return (
          <Box>
            <Text mb="20px">
              Summary of risk distribution with a focus on key risk types and their proportions.
            </Text>
            <Box height="300px" mb="20px">
              <Bar data={summaryRiskData} options={{ responsive: true, maintainAspectRatio: false }} />
            </Box>
            <Text mb="20px">
              Risk distribution for major risk types. This summary provides an overview of the risk landscape.
            </Text>
            <Box height="300px">
              <PolarArea data={summaryRiskData} options={{ responsive: true, maintainAspectRatio: false }} />
            </Box>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }} px={{ base: '20px', md: '40px' }} width="100%" height="100%">
      {/* Report Card */}
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
          Risk Reports
        </Text>
        <Flex mb="20px" flexDirection={{ base: 'column', md: 'row' }} align="center">
          <Select placeholder="Select Report Type" value={reportType} onChange={handleReportTypeChange} mb={{ base: '10px', md: '0' }}>
            <option value="Detailed">Detailed Report</option>
            <option value="Summary">Summary Report</option>
          </Select>
          <Switch
            ml={{ md: '20px' }}
            isChecked={customAlert}
            onChange={() => setCustomAlert(!customAlert)}
            colorScheme="red"
          >
            Enable Custom Alerts
          </Switch>
          {customAlert && (
            <Input
              type="number"
              value={alertThreshold}
              onChange={handleAlertThresholdChange}
              width="120px"
              ml="20px"
              placeholder="Alert Threshold (%)"
            />
          )}
        </Flex>
        <Text mb="20px">
          Generate comprehensive risk reports with the ability to view detailed risk metrics, historical data, and
          set custom alerts.
        </Text>
        <Button colorScheme="blue" onClick={onOpen}>
          Generate Report
        </Button>
      </Card>

      {/* Report Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{reportType} Report</ModalHeader>
          <ModalBody>
            <Text mb="20px">
              Detailed information and analysis for the selected report type. The content will include risk metrics,
              analysis, and recommendations based on your data.
            </Text>
            {renderReportContent()}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={() => console.log('Download Report')}>
              Download Report
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default RiskReports;
