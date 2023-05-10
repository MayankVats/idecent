// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IDecentralizedIdentityManager {
    struct User {
        bytes32 nickname;
        bytes32 publicKey;
        uint256 registrationTime;
        uint256 lastUpdateTime;
    }

    function createUser(
        bytes32 nickname,
        bytes32 publicKey
    ) external returns (address);

    function updateUser(
        address userId,
        bytes32 nickname,
        bytes32 publicKey
    ) external;

    function getUser(
        address userId
    )
        external
        view
        returns (
            bytes32 nickname,
            bytes32 publicKey,
            uint256 registrationTime,
            uint256 lastUpdateTime
        );

    function verifyUserSignature(
        address userId,
        bytes32 messageHash,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external view returns (bool);
}
