import { Box, SimpleGrid, useColorModeValue, Icon, Flex, Select, Image, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React from "react";
import { MdAttachMoney, MdAccountBalanceWallet, MdTrendingUp, MdAccountBalance, MdLayers } from "react-icons/md";
import DeFiActivities from "views/admin/default/components/DeFiActivities";
import PerformanceInsights from "views/admin/default/components/PerformanceInsights";
import PendingTransactions from "views/admin/default/components/PendingTransactions";
import PieCard from "views/admin/default/components/PieCard";
import ForecastingTools from "views/admin/default/components/ForecastingTools";
import RealTimeAssetData from "views/admin/default/components/RealTimeAssetData";
import RiskAssessmentMetrics from "views/admin/default/components/RiskAssessmentMetrics";

import usdIcon from 'assets/img/icons/usd.jpg';
import btcIcon from 'assets/img/icons/Btc.jpg';
import ethIcon from 'assets/img/icons/Eth.png';
import adaIcon from 'assets/img/icons/Ada.jpg';
import dotIcon from 'assets/img/icons/Dot.png';
import bnbIcon from 'assets/img/icons/Bnb.png';

const fetchCryptoConversionRates = async (currency) => {
  const rates = {
    usd: 1,
    btc: 0.000031,
    eth: 0.00045,
    ada: 0.5,
    dot: 0.2,
    bnb: 0.0005,
  };
  return rates[currency] || 1;
};

export default function UserReports() {
  const [selectedBalanceCurrency, setSelectedBalanceCurrency] = useState('usd');
  const [selectedPortfolioCurrency, setSelectedPortfolioCurrency] = useState('usd');
  const [selectedEarningsCurrency, setSelectedEarningsCurrency] = useState('usd');
  const [selectedSpendCurrency, setSelectedSpendCurrency] = useState('usd');

  const [balanceConversionRate, setBalanceConversionRate] = useState(1);
  const [portfolioConversionRate, setPortfolioConversionRate] = useState(1);
  const [earningsConversionRate, setEarningsConversionRate] = useState(1);
  const [spendConversionRate, setSpendConversionRate] = useState(1);

  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

  // Update conversion rates when currency changes
  useEffect(() => {
    const updateBalanceConversionRate = async () => {
      const rate = await fetchCryptoConversionRates(selectedBalanceCurrency);
      setBalanceConversionRate(rate);
    };
    updateBalanceConversionRate();
  }, [selectedBalanceCurrency]);

  useEffect(() => {
    const updatePortfolioConversionRate = async () => {
      const rate = await fetchCryptoConversionRates(selectedPortfolioCurrency);
      setPortfolioConversionRate(rate);
    };
    updatePortfolioConversionRate();
  }, [selectedPortfolioCurrency]);

  useEffect(() => {
    const updateEarningsConversionRate = async () => {
      const rate = await fetchCryptoConversionRates(selectedEarningsCurrency);
      setEarningsConversionRate(rate);
    };
    updateEarningsConversionRate();
  }, [selectedEarningsCurrency]);

  useEffect(() => {
    const updateSpendConversionRate = async () => {
      const rate = await fetchCryptoConversionRates(selectedSpendCurrency);
      setSpendConversionRate(rate);
    };
    updateSpendConversionRate();
  }, [selectedSpendCurrency]);

  const balanceUSD = 1000;
  const portfolioValueUSD = 3450.76;
  const earningsUSD = 350.4;
  const spendUSD = 642.39;

  // Convert values based on the selected currencies
  const balance = (balanceUSD * balanceConversionRate).toFixed(2);
  const portfolioValue = (portfolioValueUSD * portfolioConversionRate).toFixed(2);
  const earnings = (earningsUSD * earningsConversionRate).toFixed(2);
  const spend = (spendUSD * spendConversionRate).toFixed(2);

  const currencyOptions = [
    { value: 'usd', label: 'USD', icon: usdIcon },
    { value: 'btc', label: 'BTC', icon: btcIcon },
    { value: 'eth', label: 'ETH', icon: ethIcon },
    { value: 'ada', label: 'ADA', icon: adaIcon },
    { value: 'dot', label: 'DOT', icon: dotIcon },
    { value: 'bnb', label: 'BNB', icon: bnbIcon },
  ];

  const balanceCurrencyOption = currencyOptions.find(option => option.value === selectedBalanceCurrency);
  const portfolioCurrencyOption = currencyOptions.find(option => option.value === selectedPortfolioCurrency);
  const earningsCurrencyOption = currencyOptions.find(option => option.value === selectedEarningsCurrency);
  const spendCurrencyOption = currencyOptions.find(option => option.value === selectedSpendCurrency);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap="20px"
        mb="20px"
      >
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={<Icon w="32px" h="32px" as={MdAccountBalanceWallet} color={brandColor} />}
            />
          }
          name="Total Value"
          value={
            <Flex align='center' fontSize='xl' fontWeight='bold'>
              <Text>{portfolioValue}</Text>
              <Image src={portfolioCurrencyOption?.icon} boxSize='24px' ml='10px' />
              <Text ml='2px'>{portfolioCurrencyOption?.label}</Text>
            </Flex>
          }
          endContent={
            <Flex direction='column' me='-16px' mt='10px' align='center'>
              <Select
                id='portfolio-currency'
                variant='outline'
                mt='-15px'
                size='sm'
                width='66px'
                value={selectedPortfolioCurrency}
                onChange={(e) => setSelectedPortfolioCurrency(e.target.value)}
                bg='white'
                color='black'
                borderColor='gray.300'
                borderRadius='md'
                _focus={{ boxShadow: '0 0 0 2px rgba(66, 153, 225, 0.6)' }}
                _hover={{ borderColor: 'gray.400' }}
                style={{ transform: 'translateX(-25px)', fontSize: '12px', padding: '4px 8px' }}
              >
                {currencyOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </Flex>
          }
        />

        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={<Icon w="32px" h="32px" as={MdTrendingUp} color={brandColor} />}
            />
          }
          name="Earnings"
          value={
            <Flex align='center' fontSize='xl' fontWeight='bold'>
              <Text>{earnings}</Text>
              <Image src={earningsCurrencyOption?.icon} boxSize='24px' ml='10px' />
              <Text ml='2px'>{earningsCurrencyOption?.label}</Text>
            </Flex>
          }
          endContent={
            <Flex direction='column' me='-16px' mt='10px' align='center'>
              <Select
                id='earnings-currency'
                variant='outline'
                mt='-15px'
                size='sm'
                width='66px'
                value={selectedEarningsCurrency}
                onChange={(e) => setSelectedEarningsCurrency(e.target.value)}
                bg='white'
                color='black'
                borderColor='gray.300'
                borderRadius='md'
                _focus={{ boxShadow: '0 0 0 2px rgba(66, 153, 225, 0.6)' }}
                _hover={{ borderColor: 'gray.400' }}
                style={{ transform: 'translateX(-25px)', fontSize: '12px', padding: '4px 8px' }}
              >
                {currencyOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </Flex>
          }
        />

        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={<Icon w="32px" h="32px" as={MdAttachMoney} color={brandColor} />}
            />
          }
          name="Spend this month"
          value={
            <Flex align='center' fontSize='xl' fontWeight='bold'>
              <Text>{spend}</Text>
              <Image src={spendCurrencyOption?.icon} boxSize='24px' ml='10px' />
              <Text ml='2px'>{spendCurrencyOption?.label}</Text>
            </Flex>
          }
          endContent={
            <Flex direction='column' me='-16px' mt='10px' align='center'>
              <Select
                id='spend-currency'
                variant='outline'
                mt='-20px'
                size='sm'
                width='66px'
                value={selectedSpendCurrency}
                onChange={(e) => setSelectedSpendCurrency(e.target.value)}
                bg='white'
                color='black'
                borderColor='gray.300'
                borderRadius='md'
                _focus={{ boxShadow: '0 0 0 2px rgba(66, 153, 225, 0.6)' }}
                _hover={{ borderColor: 'gray.400' }}
                style={{ transform: 'translateX(-25px)', fontSize: '12px', padding: '4px 8px' }}
              >
                {currencyOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </Flex>
          }
        />

        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={<Icon w='32px' h='32px' as={MdAccountBalance} color={brandColor} />}
            />
          }
          name='Total Balance'
          value={
            <Flex align='center' fontSize='xl' fontWeight='bold'>
              <Text>{balance}</Text>
              <Image src={balanceCurrencyOption?.icon} boxSize='24px' ml='10px' />
              <Text ml='2px'>{balanceCurrencyOption?.label}</Text>
            </Flex>
          }
          endContent={
            <Flex direction='column' me='-16px' mt='10px' align='center'>
              <Select
                id='balance-currency'
                variant='outline'
                mt='-15px'
                size='sm'
                width='66px'
                value={selectedBalanceCurrency}
                onChange={(e) => setSelectedBalanceCurrency(e.target.value)}
                bg='white'
                color='black'
                borderColor='gray.300'
                borderRadius='md'
                _focus={{ boxShadow: '0 0 0 2px rgba(66, 153, 225, 0.6)' }}
                _hover={{ borderColor: 'gray.400' }}
                style={{ transform: 'translateX(-25px)', fontSize: '12px', padding: '4px 8px' }}
              >
                {currencyOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </Flex>
          }
          style={{ maxWidth: '160px' }}
        />

        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={<Icon w="28px" h="28px" as={MdTrendingUp} color={brandColor}/>}
            />
          }
          name="DeFi Activities"
          value="Staking, Lending"
        />

        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={<Icon w="32px" h="32px" as={MdLayers} color={brandColor} />}
            />
          }
          name="Portfolio Diversification"
          value="7 Assets"
        />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        <RealTimeAssetData />
        <RiskAssessmentMetrics />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
      <PerformanceInsights />
      <ForecastingTools />
              <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
        </SimpleGrid>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <DeFiActivities/>
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
        <PendingTransactions />
        <PieCard />
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
}
