import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  VStack,
  Divider,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Tag,
  Spinner,
  Alert,
  AlertIcon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  InputGroup,
  InputLeftElement,
  Input,
} from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2'; // Correctly import the Pie chart
import Chart from 'chart.js/auto';
import { FaSearch } from 'react-icons/fa';
import Card from 'components/card/Card.js';

// Mock data for performance insights
const roiData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'ROI',
      data: [5, 10, 7, 15, 12, 20, 25],
      borderColor: '#FF5733',
      backgroundColor: 'rgba(255, 87, 51, 0.2)',
      borderWidth: 2,
      fill: true,
    },
  ],
};

const growthData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Growth',
      data: [2, 8, 6, 12, 10, 18, 22],
      borderColor: '#33C1FF',
      backgroundColor: 'rgba(51, 193, 255, 0.2)',
      borderWidth: 2,
      fill: true,
    },
  ],
};

const recentActivities = [
  { activity: 'Staking', amount: '$5000', date: '2024-07-15' },
  { activity: 'Lending', amount: '$2000', date: '2024-07-10' },
  { activity: 'Borrowing', amount: '$1500', date: '2024-07-05' },
  { activity: 'Staking', amount: '$3000', date: '2024-06-20' },
];

const activitySummary = recentActivities.reduce((acc, curr) => {
  acc[curr.activity] = (acc[curr.activity] || 0) + parseFloat(curr.amount.slice(1).replace(',', ''));
  return acc;
}, {});

const PerformanceInsights = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const textColor = useColorModeValue('black', 'white');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const assetBg = useColorModeValue('gray.100', 'gray.700');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate data fetching
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter activities based on search query
  const filteredActivities = recentActivities.filter((activity) =>
    activity.activity.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card
      direction={{ base: 'column', md: 'row' }}
      p='20px'
      mb='20px'
      maxW='100%'
      bg={cardBg}
      borderWidth='1px'
      borderColor={borderColor}
      borderRadius='md'
    >
      <VStack spacing={4} align='stretch'>
        <Text fontSize='lg' fontWeight='bold' color={textColor}>
          Performance Insights
        </Text>

        {loading ? (
          <Flex justify='center' align='center' h='100px'>
            <Spinner size='lg' />
          </Flex>
        ) : error ? (
          <Alert status='error'>
            <AlertIcon />
            {error}
          </Alert>
        ) : (
          <>
            <Tabs variant='enclosed'>
              <TabList>
                <Tab>ROI Trends</Tab>
                <Tab>Growth Trends</Tab>
                <Tab>Activity Summary</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Box borderWidth='1px' borderColor={borderColor} borderRadius='md' overflow='hidden'>
                    <Line
                      data={roiData}
                      options={{
                        responsive: true,
                        scales: {
                          x: { display: true, title: { display: true, text: 'Month' } },
                          y: { display: true, title: { display: true, text: 'ROI (%)' } },
                        },
                        plugins: {
                          legend: { position: 'top' },
                          tooltip: {
                            callbacks: {
                              label: (context) => `${context.dataset.label}: ${context.raw}%`,
                            },
                          },
                        },
                      }}
                    />
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Box borderWidth='1px' borderColor={borderColor} borderRadius='md' overflow='hidden'>
                    <Line
                      data={growthData}
                      options={{
                        responsive: true,
                        scales: {
                          x: { display: true, title: { display: true, text: 'Month' } },
                          y: { display: true, title: { display: true, text: 'Growth (%)' } },
                        },
                        plugins: {
                          legend: { position: 'top' },
                          tooltip: {
                            callbacks: {
                              label: (context) => `${context.dataset.label}: ${context.raw}%`,
                            },
                          },
                        },
                      }}
                    />
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Box borderWidth='1px' borderColor={borderColor} borderRadius='md' overflow='hidden'>
                    <InputGroup mb='4'>
                      <InputLeftElement pointerEvents='none'>
                        <FaSearch color='gray.300' />
                      </InputLeftElement>
                      <Input
                        type='text'
                        placeholder='Search Activities'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </InputGroup>
                    <Table variant='simple'>
                      <Thead>
                        <Tr>
                          <Th>Activity</Th>
                          <Th>Amount</Th>
                          <Th>Date</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {filteredActivities.length ? (
                          filteredActivities.map((activity, index) => (
                            <Tr key={index}>
                              <Td>{activity.activity}</Td>
                              <Td>{activity.amount}</Td>
                              <Td>{activity.date}</Td>
                            </Tr>
                          ))
                        ) : (
                          <Tr>
                            <Td colSpan='3'>No activities found</Td>
                          </Tr>
                        )}
                      </Tbody>
                    </Table>
                    <Divider orientation='horizontal' my='4' />
                    <Box borderWidth='1px' borderColor={borderColor} borderRadius='md' overflow='hidden'>
                      <Text fontSize='lg' fontWeight='bold' color={textColor} mb='4'>
                        Activity Distribution
                      </Text>
                      <Pie
                        data={{
                          labels: Object.keys(activitySummary),
                          datasets: [
                            {
                              data: Object.values(activitySummary),
                              backgroundColor: ['#FF5733', '#33C1FF', '#FFCE56', '#4BC0C0'],
                            },
                          ],
                        }}
                        options={{
                          responsive: true,
                          plugins: {
                            legend: {
                              position: 'top',
                            },
                            tooltip: {
                              callbacks: {
                                label: (context) => `${context.label}: $${context.raw.toFixed(2)}`,
                              },
                            },
                          },
                        }}
                      />
                    </Box>
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </>
        )}

        {/* Additional Summary Information */}
        <Box borderWidth='1px' borderColor={borderColor} borderRadius='md' p='4' bg={assetBg}>
          <Text fontSize='lg' fontWeight='bold' color={textColor} mb='2'>
            Summary
          </Text>
          <Flex direction={{ base: 'column', md: 'row' }} justify='space-between' align='center'>
            <Text color={textColor} mb={{ base: '2', md: '0' }}>
              Total Amount Invested: <Tag colorScheme='green'>${Object.values(activitySummary).reduce((a, b) => a + b, 0).toFixed(2)}</Tag>
            </Text>
            <Text color={textColor}>
              Average Investment: <Tag colorScheme='blue'>${(Object.values(activitySummary).reduce((a, b) => a + b, 0) / Object.keys(activitySummary).length).toFixed(2)}</Tag>
            </Text>
          </Flex>
          <Divider orientation='horizontal' my='4' />
          <Flex direction='column' gap='2'>
            <Text color={textColor} fontSize='sm'>
              Total ROI: <Tag colorScheme='teal'>{roiData.datasets[0].data[roiData.datasets[0].data.length - 1].toFixed(2)}%</Tag>
            </Text>
            <Text color={textColor} fontSize='sm'>
              Total Growth: <Tag colorScheme='purple'>{growthData.datasets[0].data[growthData.datasets[0].data.length - 1].toFixed(2)}%</Tag>
            </Text>
          </Flex>
        </Box>

        {/* Modal for Additional Details */}
        <Button onClick={onOpen} colorScheme='teal' variant='solid'>
          View Detailed Report
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Detailed Performance Report</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Here you can add more detailed information and analysis based on the performance data.</Text>
              {/* You can insert more charts or tables here for detailed insights */}
              <Text mt='4' fontWeight='bold'>Detailed ROI Analysis</Text>
              {/* Additional detailed charts or tables */}
              <Line
                data={roiData}
                options={{
                  responsive: true,
                  scales: {
                    x: { display: true, title: { display: true, text: 'Month' } },
                    y: { display: true, title: { display: true, text: 'ROI (%)' } },
                  },
                  plugins: {
                    legend: { position: 'top' },
                    tooltip: {
                      callbacks: {
                        label: (context) => `${context.dataset.label}: ${context.raw}%`,
                      },
                    },
                  },
                }}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      </VStack>
    </Card>
  );
};

export default PerformanceInsights;
