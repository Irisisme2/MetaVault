// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IZRSign {
    // Zakładamy, że zrSign ma metodę do przesyłania aktywów
    function transferAssets(
        address to,
        uint256 amount,
        bytes calldata data
    ) external returns (bool);

    // Zakładamy, że zrSign ma metodę do sprawdzania salda
    function balanceOf(address account) external view returns (uint256);
}

contract AssetManager {
    IZRSign public zrSign;
    address public owner;

    // Modyfikator, który zapewnia, że tylko właściciel kontraktu może wywołać funkcję
    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor(address _zrSignAddress) {
        zrSign = IZRSign(_zrSignAddress);
        owner = msg.sender;
    }

    // Funkcja do przesyłania aktywów za pomocą zrSign
    function transferAssets(
        address to,
        uint256 amount,
        bytes calldata data
    ) external onlyOwner returns (bool) {
        require(zrSign.transferAssets(to, amount, data), "Transfer failed");
        return true;
    }

    // Funkcja do sprawdzania salda w zrSign
    function checkBalance(address account) external view returns (uint256) {
        return zrSign.balanceOf(account);
    }

    // Funkcja do zmiany adresu kontraktu zrSign
    function updateZRSignAddress(address _zrSignAddress) external onlyOwner {
        zrSign = IZRSign(_zrSignAddress);
    }
}
