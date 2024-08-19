import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  IconButton,
  Input,
  Select,
  useColorModeValue,
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
  VStack,
  HStack,
} from '@chakra-ui/react';
import Card from 'components/card/Card'; // Adjust the import based on your card component file path
import { BiPlus, BiTrash, BiLink, BiCog, BiKey, BiNetworkChart } from 'react-icons/bi';

// Sub-component for individual blockchain settings
const BlockchainSettings = ({ blockchain, onRemove, onConfigure }) => (
  <Tr>
    <Td>{blockchain}</Td>
    <Td>
      <HStack spacing={3}>
        <Button size="sm" colorScheme="teal" onClick={() => onConfigure(blockchain)}>
          Configure
        </Button>
        <IconButton
          aria-label="Remove blockchain"
          icon={<BiTrash />}
          onClick={() => onRemove(blockchain)}
          colorScheme="red"
          size="sm"
        />
      </HStack>
    </Td>
  </Tr>
);

const IntegrationManagement = () => {
  const [blockchains, setBlockchains] = useState([
    { name: 'Ethereum', apiKey: 'eth-api-key', network: 'mainnet' },
    { name: 'Binance Smart Chain', apiKey: 'bsc-api-key', network: 'testnet' },
  ]);
  const [newConnection, setNewConnection] = useState('');
  const [newApiKey, setNewApiKey] = useState('');
  const [newNetwork, setNewNetwork] = useState('');
  const [selectedBlockchain, setSelectedBlockchain] = useState(null);
  const [zrSignApiKey, setZrSignApiKey] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const textColor = useColorModeValue('secondaryGray.900', 'white');

  const addBlockchain = () => {
    if (newConnection && newApiKey && newNetwork) {
      setBlockchains([
        ...blockchains,
        { name: newConnection, apiKey: newApiKey, network: newNetwork },
      ]);
      setNewConnection('');
      setNewApiKey('');
      setNewNetwork('');
    }
  };

  const removeBlockchain = (name) => {
    setBlockchains(blockchains.filter((blockchain) => blockchain.name !== name));
  };

  const configureBlockchain = (blockchain) => {
    setSelectedBlockchain(blockchain);
    onOpen();
  };

  const saveBlockchainConfig = () => {
    setBlockchains(
      blockchains.map((blockchain) =>
        blockchain.name === selectedBlockchain.name ? selectedBlockchain : blockchain
      )
    );
    onClose();
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }} px={{ base: '20px', md: '40px' }} width="100%" height="100%">
      {/* Blockchain Connections Card */}
      <Card
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        p={6}
        width="100%"
        bg="white"
        transition="transform 0.2s"
        _hover={{ transform: 'scale(1.02)' }}
        mb="20px"
      >
        <Flex align="center" mb="20px">
          <BiLink size={32} color="teal" />
          <Text fontSize="2xl" fontWeight="700" color={textColor} ml="10px">
            Blockchain Connections
          </Text>
        </Flex>
        <Box mb="20px">
          <Text fontWeight="bold" mb="10px">
            Connected Blockchains:
          </Text>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Blockchain</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {blockchains.map((blockchain, index) => (
                <BlockchainSettings
                  key={index}
                  blockchain={blockchain.name}
                  onRemove={removeBlockchain}
                  onConfigure={() => configureBlockchain(blockchain)}
                />
              ))}
            </Tbody>
          </Table>
        </Box>
        <VStack mb="20px" spacing={4} align="start">
          <Input
            placeholder="Blockchain Name"
            value={newConnection}
            onChange={(e) => setNewConnection(e.target.value)}
          />
          <Input
            placeholder="API Key"
            value={newApiKey}
            onChange={(e) => setNewApiKey(e.target.value)}
          />
          <Select placeholder="Select Network" value={newNetwork} onChange={(e) => setNewNetwork(e.target.value)}>
            <option value="mainnet">Mainnet</option>
            <option value="testnet">Testnet</option>
            <option value="devnet">Devnet</option>
          </Select>
          <Button colorScheme="teal" leftIcon={<BiPlus />} onClick={addBlockchain}>
            Add Connection
          </Button>
        </VStack>
      </Card>

      {/* zrSign Settings Card */}
      <Card
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        p={6}
        width="100%"
        bg="white"
        transition="transform 0.2s"
        _hover={{ transform: 'scale(1.02)' }}
        mb="20px"
      >
        <Flex align="center" mb="20px">
          <BiCog size={32} color="purple" />
          <Text fontSize="2xl" fontWeight="700" color={textColor} ml="10px">
            zrSign Settings
          </Text>
        </Flex>
        <Text mb="20px">
          Manage your zrSign integration settings, API keys, and cross-chain configurations.
        </Text>
        <VStack mb="20px" spacing={4} align="start">
          <Flex align="center">
            <Text fontWeight="bold" mr="10px">
              zrSign API Key:
            </Text>
            <Input
              placeholder="Enter zrSign API Key"
              value={zrSignApiKey}
              onChange={(e) => setZrSignApiKey(e.target.value)}
              mr="10px"
            />
            <Button colorScheme="purple" onClick={() => console.log('zrSign API Key Saved:', zrSignApiKey)}>
              Save API Key
            </Button>
          </Flex>
          <Flex align="center">
            <Button colorScheme="purple" onClick={onOpen} leftIcon={<BiNetworkChart />}>
              Manage zrSign Integration
            </Button>
          </Flex>
        </VStack>
      </Card>

      {/* Modal for Blockchain Configurations */}
      {selectedBlockchain && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Configuration Settings for {selectedBlockchain.name}</ModalHeader>
            <ModalBody>
              <VStack spacing={4} align="start">
                <Text fontWeight="bold">API Key:</Text>
                <Input
                  placeholder="API Key"
                  value={selectedBlockchain.apiKey}
                  onChange={(e) =>
                    setSelectedBlockchain({ ...selectedBlockchain, apiKey: e.target.value })
                  }
                />
                <Text fontWeight="bold">Network:</Text>
                <Select
                  value={selectedBlockchain.network}
                  onChange={(e) =>
                    setSelectedBlockchain({ ...selectedBlockchain, network: e.target.value })
                  }
                >
                  <option value="mainnet">Mainnet</option>
                  <option value="testnet">Testnet</option>
                  <option value="devnet">Devnet</option>
                </Select>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={saveBlockchainConfig}>
                Save Changes
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default IntegrationManagement;
