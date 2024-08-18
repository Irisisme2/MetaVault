import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  VStack,
  Image,
  Divider,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Select,
  Spinner,
  Alert,
  AlertIcon,
  Button,
} from '@chakra-ui/react';
import Card from 'components/card/Card.js';
import { Line, Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

// Import ikon
import usdIcon from 'assets/img/icons/usd.jpg';
import btcIcon from 'assets/img/icons/Btc.jpg';
import ethIcon from 'assets/img/icons/Eth.png';
import adaIcon from 'assets/img/icons/Ada.jpg';
import dotIcon from 'assets/img/icons/Dot.png';
import bnbIcon from 'assets/img/icons/Bnb.png';

// Przykładowe dane z ikonami i kolorami
const initialData = [
  { name: 'Bitcoin', symbol: 'BTC', value: 30000, change: 2.5, icon: btcIcon, history: [29000, 29500, 30000, 30500], volatility: [1, 2, 1.5, 2], color: '#F7931A' },
  { name: 'Ethereum', symbol: 'ETH', value: 2000, change: -1.8, icon: ethIcon, history: [1950, 1980, 2000, 1970], volatility: [0.8, 1.2, 1, 0.9], color: '#3C9CFF' },
  { name: 'Cardano', symbol: 'ADA', value: 0.5, change: 0.7, icon: adaIcon, history: [0.48, 0.49, 0.5, 0.51], volatility: [0.02, 0.03, 0.01, 0.02], color: '#004C7F' },
  { name: 'Polkadot', symbol: 'DOT', value: 8, change: 3.2, icon: dotIcon, history: [7.8, 7.9, 8, 8.2], volatility: [0.3, 0.4, 0.35, 0.3], color: '#E6007A' },
  { name: 'Binance Coin', symbol: 'BNB', value: 350, change: 1.1, icon: bnbIcon, history: [340, 345, 350, 355], volatility: [2, 2.5, 2.1, 2.2], color: '#F3BA2F' },
];

const RealTimeAssetData = () => {
  const [assets, setAssets] = useState(initialData);
  const [totalValue, setTotalValue] = useState(initialData.reduce((acc, asset) => acc + asset.value, 0));
  const [filter, setFilter] = useState('all'); // Filter state
  const [sortBy, setSortBy] = useState('value'); // Sort by state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState('value');

  const textColor = useColorModeValue('black', 'white');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate fetching data with a timeout
        const response = await new Promise((resolve) =>
          setTimeout(() => resolve(initialData), 2000)
        );
        setAssets(response);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setTotalValue(assets.reduce((acc, asset) => acc + asset.value, 0));
  }, [assets]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const formatCurrency = (value) => `$${value.toFixed(2)}`;
  const formatPercentage = (value) => `${value.toFixed(2)}%`;
  const getChangeColor = (change) => (change >= 0 ? 'green.500' : 'red.500');

  const generateChartData = (history, label, color) => ({
    labels: history.map((_, index) => `T${index + 1}`),
    datasets: [
      {
        label,
        data: history,
        borderColor: color,
        backgroundColor: `${color}33`, // Lighten the color for background
        borderWidth: 2,
        fill: true,
      },
    ],
  });

  const generateBarChartData = (volatility, color) => ({
    labels: volatility.map((_, index) => `T${index + 1}`),
    datasets: [
      {
        label: 'Volatility',
        data: volatility,
        backgroundColor: `${color}33`, // Lighten the color for background
        borderColor: color,
        borderWidth: 1,
      },
    ],
  });

  const filteredAssets = assets
    .filter((asset) => filter === 'all' || asset.symbol === filter)
    .sort((a, b) => {
      if (sortBy === 'value') return b.value - a.value;
      if (sortBy === 'change') return b.change - a.change;
      return 0;
    });

  return (
    <Card
      direction={{ base: 'column', md: 'row' }}
      p='20px'
      mb='20px'
      maxW='100%'
      bg={cardBg}
    >
      <VStack spacing={4} align='stretch'>
        <Text fontSize='lg' fontWeight='bold' color={textColor}>
          Current Holdings
        </Text>
        <Text fontSize='md' fontWeight='semibold' color={textColor}>
          Total Portfolio Value: {formatCurrency(totalValue)}
        </Text>
        
        <Flex justify='space-between' mb='15px'>
          <Select
            placeholder='Filter by Asset'
            onChange={handleFilterChange}
            bg='white'
            color='black'
            borderColor='gray.300'
            borderRadius='md'
            _focus={{ boxShadow: '0 0 0 2px rgba(66, 153, 225, 0.6)' }}
            _hover={{ borderColor: 'gray.400' }}
            width='200px'
          >
            <option value='all'>All</option>
            {assets.map((asset) => (
              <option key={asset.symbol} value={asset.symbol}>
                {asset.name} ({asset.symbol})
              </option>
            ))}
          </Select>
          <Select
            placeholder='Sort By'
            onChange={handleSortChange}
            bg='white'
            color='black'
            borderColor='gray.300'
            borderRadius='md'
            _focus={{ boxShadow: '0 0 0 2px rgba(66, 153, 225, 0.6)' }}
            _hover={{ borderColor: 'gray.400' }}
            width='150px'
          >
            <option value='value'>Value</option>
            <option value='change'>Change</option>
          </Select>
        </Flex>

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
            <Tabs variant='enclosed' onChange={(index) => setSelectedTab(index === 0 ? 'value' : 'volatility')}>
              <TabList>
                <Tab>Value Chart</Tab>
                <Tab>Volatility</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Box borderWidth='1px' borderColor={borderColor} borderRadius='md' overflow='hidden'>
                    {filteredAssets.map((asset) => (
                      <Box key={asset.symbol} p='15px' borderBottomWidth='1px' borderColor={borderColor}>
                        <Flex justify='space-between' align='center'>
                          <Flex align='center'>
                            <Image src={asset.icon} boxSize='30px' mr='10px' />
                            <Text fontSize='md' fontWeight='semibold' color={textColor}>
                              {asset.name} ({asset.symbol})
                            </Text>
                          </Flex>
                          <Text fontSize='md' fontWeight='semibold' color={getChangeColor(asset.change)}>
                            {formatCurrency(asset.value)} ({formatPercentage(asset.change)})
                          </Text>
                        </Flex>
                        <Divider my='10px' />
                        <Line
                          data={generateChartData(asset.history, 'Price History', asset.color)}
                          options={{
                            responsive: true,
                            scales: {
                              x: { display: false },
                              y: { display: false },
                            },
                            plugins: {
                              legend: { display: false },
                              tooltip: {
                                callbacks: {
                                  label: (context) => `${context.dataset.label}: ${formatCurrency(context.raw)}`,
                                },
                              },
                            },
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Box borderWidth='1px' borderColor={borderColor} borderRadius='md' overflow='hidden'>
                    {filteredAssets.map((asset) => (
                      <Box key={asset.symbol} p='15px' borderBottomWidth='1px' borderColor={borderColor}>
                        <Flex justify='space-between' align='center'>
                          <Flex align='center'>
                            <Image src={asset.icon} boxSize='30px' mr='10px' />
                            <Text fontSize='md' fontWeight='semibold' color={textColor}>
                              {asset.name} ({asset.symbol})
                            </Text>
                          </Flex>
                          <Text fontSize='md' fontWeight='semibold' color={getChangeColor(asset.change)}>
                            {formatCurrency(asset.value)} ({formatPercentage(asset.change)})
                          </Text>
                        </Flex>
                        <Divider my='10px' />
                        <Bar
                          data={generateBarChartData(asset.volatility, asset.color)}
                          options={{
                            responsive: true,
                            scales: {
                              x: { display: true },
                              y: { display: true },
                            },
                            plugins: {
                              legend: { display: false },
                              tooltip: {
                                callbacks: {
                                  label: (context) => `${context.dataset.label}: ${context.raw.toFixed(2)}`,
                                },
                              },
                            },
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </>
        )}
      </VStack>
    </Card>
  );
};

export default RealTimeAssetData;
