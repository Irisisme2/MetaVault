import React, { useState } from "react";
import {
  Box,
  Button,
  Collapse,
  Flex,
  Image,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  useDisclosure,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import Card from "components/card/Card";
import btcIcon from "assets/img/icons/Btc.jpg";
import ethIcon from "assets/img/icons/Eth.png";
import adaIcon from "assets/img/icons/Ada.jpg";
import dotIcon from "assets/img/icons/Dot.png";
import bnbIcon from "assets/img/icons/Bnb.png";
import xrpIcon from "assets/img/icons/xrp.png";
import chainlinkIcon from "assets/img/icons/chainlink.png";
import ltcIcon from "assets/img/icons/litecoin.png";

// Sample historical data for the chart
const historicalData = {
  Bitcoin: [
    { date: "2024-08-10", value: 44000 },
    { date: "2024-08-11", value: 45000 },
    { date: "2024-08-12", value: 46000 },
    { date: "2024-08-13", value: 45500 },
    { date: "2024-08-14", value: 47000 },
  ],
  Ethereum: [
    { date: "2024-08-10", value: 3200 },
    { date: "2024-08-11", value: 3150 },
    { date: "2024-08-12", value: 3300 },
    { date: "2024-08-13", value: 3400 },
    { date: "2024-08-14", value: 3200 },
  ],
  Cardano: [
    { date: "2024-08-10", value: 1.1 },
    { date: "2024-08-11", value: 1.15 },
    { date: "2024-08-12", value: 1.2 },
    { date: "2024-08-13", value: 1.22 },
    { date: "2024-08-14", value: 1.2 },
  ],
  Polkadot: [
    { date: "2024-08-10", value: 24 },
    { date: "2024-08-11", value: 24.5 },
    { date: "2024-08-12", value: 25 },
    { date: "2024-08-13", value: 26 },
    { date: "2024-08-14", value: 25.5 },
  ],
  Binance: [
    { date: "2024-08-10", value: 390 },
    { date: "2024-08-11", value: 395 },
    { date: "2024-08-12", value: 400 },
    { date: "2024-08-13", value: 410 },
    { date: "2024-08-14", value: 405 },
  ],
  XRP: [
    { date: "2024-08-10", value: 0.5 },
    { date: "2024-08-11", value: 0.52 },
    { date: "2024-08-12", value: 0.55 },
    { date: "2024-08-13", value: 0.54 },
    { date: "2024-08-14", value: 0.56 },
  ],
  Chainlink: [
    { date: "2024-08-10", value: 8.5 },
    { date: "2024-08-11", value: 8.7 },
    { date: "2024-08-12", value: 9.0 },
    { date: "2024-08-13", value: 8.8 },
    { date: "2024-08-14", value: 8.9 },
  ],
  Litecoin: [
    { date: "2024-08-10", value: 150 },
    { date: "2024-08-11", value: 155 },
    { date: "2024-08-12", value: 160 },
    { date: "2024-08-13", value: 158 },
    { date: "2024-08-14", value: 162 },
  ],
};

const initialAssets  = [
  {
    name: "Bitcoin",
    icon: btcIcon,
    currentValue: "45,000 USD",
    change: "+2.5%",
    performance: "High",
    type: "Cryptocurrency",
    blockchain: "Bitcoin",
    volatility: "Low",
    roi: "500%",
    avgPerformance: "45000 USD",
    marketData: {
      volume: "1B USD",
      marketCap: "850B USD",
      supply: "18.7M BTC",
      rsi: "70",
      macd: "Positive",
      movingAverage: "43000 USD",
      bollingerBands: "42000-44000 USD",
    },
    news: [
      { date: "2024-08-14", title: "Bitcoin Hits New All-Time High", link: "#" },
      { date: "2024-08-12", title: "Bitcoin Market Analysis", link: "#" },
    ],
  },
  {
    name: "Ethereum",
    icon: ethIcon,
    currentValue: "3,200 USD",
    change: "-1.5%",
    performance: "Moderate",
    type: "Cryptocurrency",
    blockchain: "Ethereum",
    volatility: "High",
    roi: "400%",
    avgPerformance: "3200 USD",
    marketData: {
      volume: "800M USD",
      marketCap: "370B USD",
      supply: "120M ETH",
      rsi: "60",
      macd: "Neutral",
      movingAverage: "3100 USD",
      bollingerBands: "3000-3200 USD",
    },
    news: [
      { date: "2024-08-13", title: "Ethereum Network Upgrade", link: "#" },
      { date: "2024-08-11", title: "ETH Price Volatility", link: "#" },
    ],
  },
  {
    name: "Cardano",
    icon: adaIcon,
    currentValue: "1.20 USD",
    change: "+3.0%",
    performance: "Good",
    type: "Cryptocurrency",
    blockchain: "Cardano",
    volatility: "Moderate",
    roi: "250%",
    avgPerformance: "1.20 USD",
    marketData: {
      volume: "150M USD",
      marketCap: "40B USD",
      supply: "35B ADA",
      rsi: "65",
      macd: "Positive",
      movingAverage: "1.15 USD",
      bollingerBands: "1.10-1.20 USD",
    },
    news: [
      { date: "2024-08-12", title: "Cardano's New Partnership", link: "#" },
      { date: "2024-08-10", title: "ADA Price Surge", link: "#" },
    ],
  },
  {
    name: "Polkadot",
    icon: dotIcon,
    currentValue: "25 USD",
    change: "+1.0%",
    performance: "Stable",
    type: "Cryptocurrency",
    blockchain: "Polkadot",
    volatility: "Low",
    roi: "300%",
    avgPerformance: "25 USD",
    marketData: {
      volume: "200M USD",
      marketCap: "30B USD",
      supply: "1B DOT",
      rsi: "55",
      macd: "Neutral",
      movingAverage: "24 USD",
      bollingerBands: "23-25 USD",
    },
    news: [
      { date: "2024-08-11", title: "Polkadot Expands Ecosystem", link: "#" },
      { date: "2024-08-09", title: "DOT Market Trends", link: "#" },
    ],
  },
  {
    name: "Binance",
    icon: bnbIcon,
    currentValue: "400 USD",
    change: "+2.0%",
    performance: "Strong",
    type: "Cryptocurrency",
    blockchain: "Binance",
    volatility: "Moderate",
    roi: "350%",
    avgPerformance: "400 USD",
    marketData: {
      volume: "500M USD",
      marketCap: "60B USD",
      supply: "170M BNB",
      rsi: "70",
      macd: "Positive",
      movingAverage: "390 USD",
      bollingerBands: "380-400 USD",
    },
    news: [
      { date: "2024-08-14", title: "Binance Coin Update", link: "#" },
      { date: "2024-08-12", title: "BNB Price Analysis", link: "#" },
    ],
  },
  {
    name: "XRP",
    icon: xrpIcon,
    currentValue: "0.55 USD",
    change: "+1.5%",
    performance: "Moderate",
    type: "Cryptocurrency",
    blockchain: "Ripple",
    volatility: "High",
    roi: "200%",
    avgPerformance: "0.55 USD",
    marketData: {
      volume: "300M USD",
      marketCap: "25B USD",
      supply: "45B XRP",
      rsi: "60",
      macd: "Neutral",
      movingAverage: "0.52 USD",
      bollingerBands: "0.50-0.55 USD",
    },
    news: [
      { date: "2024-08-12", title: "Ripple's New Partnerships", link: "#" },
      { date: "2024-08-10", title: "XRP Market Update", link: "#" },
    ],
  },
  {
    name: "Chainlink",
    icon: chainlinkIcon,
    currentValue: "9.00 USD",
    change: "+2.5%",
    performance: "Good",
    type: "Cryptocurrency",
    blockchain: "Ethereum",
    volatility: "Moderate",
    roi: "300%",
    avgPerformance: "9.00 USD",
    marketData: {
      volume: "100M USD",
      marketCap: "15B USD",
      supply: "1B LINK",
      rsi: "65",
      macd: "Positive",
      movingAverage: "8.80 USD",
      bollingerBands: "8.50-9.00 USD",
    },
    news: [
      { date: "2024-08-13", title: "Chainlink's Price Rally", link: "#" },
      { date: "2024-08-11", title: "LINK Market Insights", link: "#" },
    ],
  },
  {
    name: "Litecoin",
    icon: ltcIcon,
    currentValue: "160 USD",
    change: "+3.0%",
    performance: "Strong",
    type: "Cryptocurrency",
    blockchain: "Litecoin",
    volatility: "Moderate",
    roi: "250%",
    avgPerformance: "160 USD",
    marketData: {
      volume: "250M USD",
      marketCap: "11B USD",
      supply: "66M LTC",
      rsi: "68",
      macd: "Positive",
      movingAverage: "155 USD",
      bollingerBands: "150-160 USD",
    },
    news: [
      { date: "2024-08-12", title: "Litecoin Halving Event", link: "#" },
      { date: "2024-08-10", title: "LTC Price Prediction", link: "#" },
    ],
  },
];


function AssetCard({
  name,
  icon,
  currentValue,
  change,
  performance,
  type,
  blockchain,
  volatility,
  roi,
  avgPerformance,
  marketData,
  news,
  onCompareClick,
  onShowChartClick,
  onEditClick,
  onDeleteClick,
}) {
  const { isOpen, onToggle } = useDisclosure();
  const cardSize = useBreakpointValue({ base: "sm", md: "md", lg: "lg" });

  return (
    <Card
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
      p={6}
      maxW="lg"
      size={cardSize}
      bg="white"
      transition="transform 0.2s"
      _hover={{ transform: "scale(1.02)" }}
    >
      <Flex align="center">
        <Image src={icon} boxSize="60px" borderRadius="full" alt={`${name} logo`} mr={4} />
        <Box flex="1">
          <Text fontSize="2xl" fontWeight="bold" color="teal.600">
            {name}
          </Text>
          <Text fontSize="xl" fontWeight="medium" color="gray.700">
            {currentValue}
          </Text>
          <Text fontSize="lg" color={change.startsWith("+") ? "green.500" : "red.500"}>
            {change}
          </Text>
        </Box>
        <Button onClick={onToggle} variant="ghost" size="lg">
          {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </Button>
      </Flex>
      <Collapse in={isOpen}>
        <Box mt={4}>
          <SimpleGrid columns={2} spacing={4}>
            <Stat>
              <StatLabel fontSize="sm">Performance</StatLabel>
              <StatNumber fontSize="lg">{performance}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel fontSize="sm">Type</StatLabel>
              <StatNumber fontSize="lg">{type}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel fontSize="sm">Blockchain</StatLabel>
              <StatNumber fontSize="lg">{blockchain}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel fontSize="sm">Volatility</StatLabel>
              <StatNumber fontSize="lg">{volatility}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel fontSize="sm">ROI</StatLabel>
              <StatNumber fontSize="lg">{roi}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel fontSize="sm">Avg Performance</StatLabel>
              <StatNumber fontSize="lg">{avgPerformance}</StatNumber>
            </Stat>
            {Object.entries(marketData).map(([key, value]) => (
              <Stat key={key}>
                <StatLabel fontSize="sm">{key}</StatLabel>
                <StatNumber fontSize="lg">{value}</StatNumber>
              </Stat>
            ))}
          </SimpleGrid>
          <Box mt={4}>
            <Text fontSize="lg" fontWeight="bold">
              News
            </Text>
            {news.map((item) => (
              <Box key={item.title} mt={2}>
                <Text as="a" href={item.link} color="blue.500" fontSize="md" target="_blank">
                  {item.title}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {item.date}
                </Text>
              </Box>
            ))}
          </Box>
          <Box mt={4}>
            <Text fontSize="lg" fontWeight="bold">
              Historical Performance
            </Text>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                data={historicalData[name]}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="date" />
                <YAxis />
                <RechartsTooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
          <Flex mt={4} justify="space-between">
            <Button onClick={onCompareClick} colorScheme="teal" size="lg">
              Compare
            </Button>
            <Button onClick={onShowChartClick} colorScheme="teal" size="lg">
              Show Chart
            </Button>
            <Button onClick={onEditClick} colorScheme="blue" size="lg">
              Edit
            </Button>
            <Button onClick={onDeleteClick} colorScheme="red" size="lg">
              Delete
            </Button>
          </Flex>
        </Box>
      </Collapse>
    </Card>
  );
}

export default function AssetCards() {
  const [assets, setAssets] = useState(initialAssets);
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [selectedChartAsset, setSelectedChartAsset] = useState(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);

  // Form states for adding/editing
  const [newAssetName, setNewAssetName] = useState("");
  const [newAssetIcon, setNewAssetIcon] = useState("");
  const [newAssetCurrentValue, setNewAssetCurrentValue] = useState("");
  const [newAssetChange, setNewAssetChange] = useState("");
  const [newAssetPerformance, setNewAssetPerformance] = useState("");
  const [newAssetType, setNewAssetType] = useState("");
  const [newAssetBlockchain, setNewAssetBlockchain] = useState("");
  const [newAssetVolatility, setNewAssetVolatility] = useState("");
  const [newAssetRoi, setNewAssetRoi] = useState("");
  const [newAssetAvgPerformance, setNewAssetAvgPerformance] = useState("");
  const [newAssetMarketData, setNewAssetMarketData] = useState({});
  const [newAssetNews, setNewAssetNews] = useState([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const openEditModal = (asset) => {
    setEditingAsset(asset);
    setNewAssetName(asset.name);
    setNewAssetIcon(asset.icon);
    setNewAssetCurrentValue(asset.currentValue);
    setNewAssetChange(asset.change);
    setNewAssetPerformance(asset.performance);
    setNewAssetType(asset.type);
    setNewAssetBlockchain(asset.blockchain);
    setNewAssetVolatility(asset.volatility);
    setNewAssetRoi(asset.roi);
    setNewAssetAvgPerformance(asset.avgPerformance);
    setNewAssetMarketData(asset.marketData);
    setNewAssetNews(asset.news);
    setIsEditModalOpen(true);
  };
  
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    resetForm();
  };

  const handleAddAsset = () => {
    const newAsset = {
      name: newAssetName,
      icon: newAssetIcon,
      currentValue: newAssetCurrentValue,
      change: newAssetChange,
      performance: newAssetPerformance,
      type: newAssetType,
      blockchain: newAssetBlockchain,
      volatility: newAssetVolatility,
      roi: newAssetRoi,
      avgPerformance: newAssetAvgPerformance,
      marketData: newAssetMarketData,
      news: newAssetNews,
    };
    setAssets([...assets, newAsset]);
    closeModal();
  };

  const handleEditAsset = () => {
    const updatedAssets = assets.map((asset) =>
      asset.name === editingAsset.name
        ? {
            ...asset,
            name: newAssetName,
            icon: newAssetIcon,
            currentValue: newAssetCurrentValue,
            change: newAssetChange,
            performance: newAssetPerformance,
            type: newAssetType,
            blockchain: newAssetBlockchain,
            volatility: newAssetVolatility,
            roi: newAssetRoi,
            avgPerformance: newAssetAvgPerformance,
            marketData: newAssetMarketData,
            news: newAssetNews,
          }
        : asset
    );
    setAssets(updatedAssets);
    closeEditModal();
  };

  const handleDeleteAsset = (assetToDelete) => {
    setAssets(assets.filter(asset => asset.name !== assetToDelete.name));
  };

  const resetForm = () => {
    setNewAssetName("");
    setNewAssetIcon("");
    setNewAssetCurrentValue("");
    setNewAssetChange("");
    setNewAssetPerformance("");
    setNewAssetType("");
    setNewAssetBlockchain("");
    setNewAssetVolatility("");
    setNewAssetRoi("");
    setNewAssetAvgPerformance("");
    setNewAssetMarketData({});
    setNewAssetNews([]);
  };

  const handleCompare = (asset) => {
    setSelectedAssets([asset]);
    // Logic for comparison
  };

  const handleShowChart = (asset) => {
    setSelectedChartAsset(asset);
    // Logic for showing chart
  };

  return (
    <div>
      <Button onClick={openModal} colorScheme="teal" mb={4}>
        Add New Asset
      </Button>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        {assets.map((asset) => (
          <AssetCard
            key={asset.name}
            {...asset}
            onCompareClick={() => handleCompare(asset)}
            onShowChartClick={() => handleShowChart(asset)}
            onEditClick={() => openEditModal(asset)}
            onDeleteClick={() => handleDeleteAsset(asset)}
          />
        ))}
      </SimpleGrid>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Asset</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input value={newAssetName} onChange={(e) => setNewAssetName(e.target.value)} />
            </FormControl>
            {/* Add other form controls here */}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddAsset}>
              Add
            </Button>
            <Button variant="ghost" onClick={closeModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Asset</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input value={newAssetName} onChange={(e) => setNewAssetName(e.target.value)} />
            </FormControl>
            {/* Add other form controls here */}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleEditAsset}>
              Save
            </Button>
            <Button variant="ghost" onClick={closeEditModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
