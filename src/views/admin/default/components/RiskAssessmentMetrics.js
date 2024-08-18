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
  Spinner,
  Alert,
  AlertIcon,
  Image,
  Tooltip,
} from '@chakra-ui/react';
import Card from 'components/card/Card.js';
import { Line, Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import btcIcon from 'assets/img/icons/Btc.jpg';
import ethIcon from 'assets/img/icons/Eth.png';
import adaIcon from 'assets/img/icons/Ada.jpg';
import dotIcon from 'assets/img/icons/Dot.png';
import bnbIcon from 'assets/img/icons/Bnb.png';

// Przykładowe dane z kolorami i ikonami
const initialData = [
  { name: 'Bitcoin', symbol: 'BTC', volatility: [1, 2, 1.5, 2], liquidity: 70, color: '#F7931A', icon: btcIcon, risk: 'High' },
  { name: 'Ethereum', symbol: 'ETH', volatility: [0.8, 1.2, 1, 0.9], liquidity: 85, color: '#3C9CFF', icon: ethIcon, risk: 'Moderate' },
  { name: 'Cardano', symbol: 'ADA', volatility: [0.02, 0.03, 0.01, 0.02], liquidity: 40, color: '#004C7F', icon: adaIcon, risk: 'Low' },
  { name: 'Polkadot', symbol: 'DOT', volatility: [0.3, 0.4, 0.35, 0.3], liquidity: 60, color: '#E6007A', icon: dotIcon, risk: 'Moderate' },
  { name: 'Binance Coin', symbol: 'BNB', volatility: [2, 2.5, 2.1, 2.2], liquidity: 75, color: '#F3BA2F', icon: bnbIcon, risk: 'High' },
];

const RiskAssessmentMetrics = () => {
  const [assets, setAssets] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState('volatility');

  // Wywołanie Hooków na początku komponentu
  const textColor = useColorModeValue('black', 'white');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const assetBg = useColorModeValue('gray.100', 'gray.700');

  const generateVolatilityChartData = () => ({
    labels: Array.from({ length: initialData[0].volatility.length }, (_, index) => `T${index + 1}`),
    datasets: assets.map((asset) => ({
      label: asset.name,
      data: asset.volatility,
      borderColor: asset.color,
      backgroundColor: `${asset.color}33`,
      borderWidth: 2,
      fill: true,
    })),
  });

  const generateLiquidityChartData = () => ({
    labels: assets.map((asset) => asset.name),
    datasets: [
      {
        label: 'Liquidity',
        data: assets.map((asset) => asset.liquidity),
        backgroundColor: assets.map((asset) => `${asset.color}33`),
        borderColor: assets.map((asset) => asset.color),
        borderWidth: 1,
      },
    ],
  });

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
          Risk Assessment Metrics
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
          <Tabs variant='enclosed' onChange={(index) => setSelectedTab(index === 0 ? 'volatility' : 'liquidity')}>
            <TabList>
              <Tab>Volatility Index</Tab>
              <Tab>Liquidity Metrics</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box borderWidth='1px' borderColor={borderColor} borderRadius='md' overflow='hidden'>
                  <Line
                    data={generateVolatilityChartData()}
                    options={{
                      responsive: true,
                      scales: {
                        x: { display: true, title: { display: true, text: 'Time' } },
                        y: { display: true, title: { display: true, text: 'Volatility' } },
                      },
                      plugins: {
                        legend: { position: 'top' },
                        tooltip: {
                          callbacks: {
                            label: (context) => `${context.dataset.label}: ${context.raw.toFixed(2)}`,
                          },
                        },
                      },
                    }}
                  />
                </Box>
              </TabPanel>
              <TabPanel>
                <Box borderWidth='1px' borderColor={borderColor} borderRadius='md' overflow='hidden'>
                  <Bar
                    data={generateLiquidityChartData()}
                    options={{
                      responsive: true,
                      scales: {
                        x: { display: true, title: { display: true, text: 'Assets' } },
                        y: { display: true, title: { display: true, text: 'Liquidity' } },
                      },
                      plugins: {
                        legend: { position: 'top' },
                        tooltip: {
                          callbacks: {
                            label: (context) => `${context.dataset.label}: ${context.raw}`,
                          },
                        },
                      },
                    }}
                  />
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}
        
        <Divider orientation='horizontal' />

        {/* Asset Details Section */}
        <VStack align='stretch' spacing={4}>
          <Text fontSize='md' fontWeight='bold' color={textColor}>
            Asset Details
          </Text>
          {assets.map((asset) => (
            <Flex
              key={asset.symbol}
              align='center'
              p='10px'
              borderWidth='1px'
              borderColor={borderColor}
              borderRadius='md'
              bg={assetBg}
              boxShadow='md'
              justify='space-between'
            >
              <Flex align='center'>
                <Image src={asset.icon} boxSize='24px' mr='10px' />
                <Text fontSize='sm' color={textColor} fontWeight='bold'>
                  {asset.name} ({asset.symbol})
                </Text>
              </Flex>
              <Flex direction='column' align='flex-end'>
                <Text fontSize='sm' color={textColor}>
                  Liquidity: {asset.liquidity}
                </Text>
                <Tooltip label={`Risk Level: ${asset.risk}`} aria-label={`Risk Level: ${asset.risk}`}>
                  <Text fontSize='sm' color={textColor} mt='2'>
                    Risk: <span style={{ color: asset.risk === 'High' ? 'red' : asset.risk === 'Moderate' ? 'orange' : 'green' }}>{asset.risk}</span>
                  </Text>
                </Tooltip>
              </Flex>
            </Flex>
          ))}
        </VStack>
      </VStack>
    </Card>
  );
};

export default RiskAssessmentMetrics;


