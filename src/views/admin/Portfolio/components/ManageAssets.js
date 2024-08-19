import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Image,
  Button,
  IconButton,
  Input,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import Card from "components/card/Card";


const ManageAssets = () => {
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [newAsset, setNewAsset] = useState({ name: "", icon: "", currentValue: "" });
  const [isEditing, setIsEditing] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleAddAsset = () => {
    if (isEditing) {
      setAssets(
        assets.map((asset) =>
          asset.id === selectedAsset.id ? { ...selectedAsset, ...newAsset } : asset
        )
      );
      toast({
        title: "Asset Updated",
        description: "The asset has been successfully updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      setAssets([...assets, { ...newAsset, id: Date.now() }]);
      toast({
        title: "Asset Added",
        description: "The new asset has been successfully added.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
    setNewAsset({ name: "", icon: "", currentValue: "" });
    onClose();
  };

  const handleEditAsset = (asset) => {
    setSelectedAsset(asset);
    setNewAsset(asset);
    setIsEditing(true);
    onOpen();
  };

  const handleRemoveAsset = (id) => {
    setAssets(assets.filter((asset) => asset.id !== id));
    toast({
      title: "Asset Removed",
      description: "The asset has been successfully removed.",
      status: "info",
      duration: 5000,
      isClosable: true,
    });
  };

  const openAddModal = () => {
    setIsEditing(false);
    setNewAsset({ name: "", icon: "", currentValue: "" });
    onOpen();
  };

  return (
    <Box p="20px">
      <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={openAddModal} mb="20px">
        Add New Asset
      </Button>

      {assets.map((asset) => (
        <Card key={asset.id} p="20px" mb="10px">
          <Flex align="center">
            <Image src={asset.icon} boxSize="50px" mr="4" />
            <Box>
              <Text fontSize="lg" fontWeight="bold">{asset.name}</Text>
              <Text fontSize="md">{asset.currentValue}</Text>
            </Box>
            <Box ml="auto">
              <IconButton
                icon={<EditIcon />}
                onClick={() => handleEditAsset(asset)}
                mr="2"
                aria-label="Edit Asset"
              />
              <IconButton
                icon={<DeleteIcon />}
                colorScheme="red"
                onClick={() => handleRemoveAsset(asset.id)}
                aria-label="Delete Asset"
              />
            </Box>
          </Flex>
        </Card>
      ))}

      {/* Modal for Adding/Editing Asset */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEditing ? "Edit Asset" : "Add New Asset"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb="4">
              <FormLabel>Asset Name</FormLabel>
              <Input
                value={newAsset.name}
                onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Icon URL</FormLabel>
              <Input
                value={newAsset.icon}
                onChange={(e) => setNewAsset({ ...newAsset, icon: e.target.value })}
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Current Value</FormLabel>
              <Input
                value={newAsset.currentValue}
                onChange={(e) => setNewAsset({ ...newAsset, currentValue: e.target.value })}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr="3" onClick={handleAddAsset}>
              {isEditing ? "Save Changes" : "Add Asset"}
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ManageAssets;
