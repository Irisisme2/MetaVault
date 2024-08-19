import React from "react";
import { Box, Flex, Icon, Image, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card.js";
import btcIcon from "assets/img/icons/Btc.jpg";
import ethIcon from "assets/img/icons/Eth.png";
import adaIcon from "assets/img/icons/Ada.jpg";
import dotIcon from "assets/img/icons/Dot.png";
import bnbIcon from "assets/img/icons/Bnb.png";
import xrpIcon from "assets/img/icons/xrp.png";

const LastStakes = ({ lastStakes }) => {
  const textColor = useColorModeValue("brands.900", "white");
  const bgItem = useColorModeValue(
    { bg: "white", boxShadow: "0px 40px 58px -20px rgba(112, 144, 176, 0.12)" },
    { bg: "navy.700", boxShadow: "unset" }
  );
  const textColorDate = useColorModeValue("secondaryGray.600", "white");

  const getImageForToken = (poolName) => {
    switch (poolName) {
      case "ETH Staking Pool":
        return ethIcon;
      case "BTC Staking Pool":
        return btcIcon;
      case "ADA Staking Pool":
        return adaIcon;
      case "DOT Staking Pool":
        return dotIcon;
      case "BNB Staking Pool":
        return bnbIcon;
      case "XRP Staking Pool":
        return xrpIcon;
      default:
        return ethIcon; // Default to ETH image if poolName not recognized
    }
  };

  return (
    <Box mt="40px" bg={useColorModeValue("white", "navy.700")} p="20px" borderRadius="10px">
      <Text fontSize="xl" fontWeight="bold" mb="20px" color={textColor}>
        Last Stakes
      </Text>
      {lastStakes.map((stake, index) => (
        <Card
          key={index}
          _hover={bgItem}
          bg="transparent"
          boxShadow="unset"
          px="24px"
          py="21px"
          transition="0.2s linear"
          mb="20px"
        >
          <Flex direction={{ base: "column" }} justify="center">
            <Flex position="relative" align="center">
              <Image src={getImageForToken(stake.poolName)} w="66px" h="66px" borderRadius="20px" me="16px" />
              <Flex
                direction="column"
                w={{ base: "70%", md: "100%" }}
                me={{ base: "4px", md: "32px", xl: "10px", "3xl": "32px" }}
              >
                <Text color={textColor} fontSize={{ base: "md" }} mb="5px" fontWeight="bold" me="14px">
                  {stake.poolName}
                </Text>
                <Text color="secondaryGray.600" fontSize={{ base: "sm" }} fontWeight="400" me="14px">
                  Amount: {stake.amount}
                </Text>
                <Text color="secondaryGray.600" fontSize={{ base: "sm" }} fontWeight="400" me="14px">
                  Staking Period: {stake.stakingPeriod}
                </Text>
              </Flex>
              <Flex me={{ base: "4px", md: "32px", xl: "10px", "3xl": "32px" }} align="center">
                <Image src={getImageForToken(stake.poolName)} w="24px" h="24px" borderRadius="50%" me="7px" />
                <Text fontWeight="700" fontSize="md" color={textColor}>
                  {stake.amount}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Card>
      ))}
    </Box>
  );
};

export default LastStakes;
