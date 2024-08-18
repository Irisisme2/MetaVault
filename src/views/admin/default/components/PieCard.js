import React from 'react';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { Pie } from 'react-chartjs-2';
import Card from 'components/card/Card.js';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const AssetBreakdown = () => {
  const chartBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('black', 'white');

  // Example data
  const data = {
    labels: ['Bitcoin', 'Ethereum', 'Cardano', 'Polkadot', 'Binance Coin'],
    datasets: [
      {
        data: [50, 30, 10, 5, 5],
        backgroundColor: ['#F2A900', '#3C3C3D', '#0033A0', '#E6007A', '#F0B90D'],
        borderColor: chartBg,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: textColor,
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
          },
        },
      },
    },
  };

  return (
    <Card
      direction={{ base: 'column', md: 'row' }}
      p='20px'
      mb='20px'
      maxW='100%'
      bg={chartBg}
    >
      <Flex direction='column' align='center' justify='center' p='20px'>
        <Text fontSize='lg' fontWeight='bold' color={textColor} mb='15px'>
          Asset Breakdown
        </Text>
        <Box width='100%' maxW='400px'>
          <Pie data={data} options={options} />
        </Box>
      </Flex>
    </Card>
  );
};

export default AssetBreakdown;
