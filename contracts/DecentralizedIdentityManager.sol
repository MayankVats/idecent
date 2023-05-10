// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "./interfaces/IDecentralizedIdentityManager.sol";

contract DecentralizedIdentityManager is IDecentralizedIdentityManager {
    mapping(address => User) public users;

    event UserCreated(address indexed userId, uint256 createdAt);
    event UserUpdated(address indexed userId);

    /**
     * @dev Creates a new decentralized identity for the caller using the provided `nickname` and `publicKey`.
     * @param nickname A bytes32 value representing the nickname of the user.
     * @param publicKey A bytes32 value representing the keccak256 hash of the public key of the user.
     * @return userId The Ethereum address of the newly created user.
     *
     * Requirements:
     * - The caller must be authorized to create a new identity using the provided public key.
     * - The user must not already exist.
     *
     * Emits a {UserCreated} event.
     */
    function createUser(
        bytes32 nickname,
        bytes32 publicKey
    ) external override returns (address) {
        address userId = _publicKeyToAddress(publicKey);

        require(userId == msg.sender, "Not authorized");
        require(users[userId].registrationTime == 0, "User already exists");

        users[userId] = User(
            nickname,
            publicKey,
            block.timestamp,
            block.timestamp
        );

        emit UserCreated(userId, block.timestamp);
        return userId;
    }

    /**
     * @dev Update the details of an existing user.
     * @param userId The address of the user to update.
     * @param nickname The new nickname to assign to the user.
     * @param publicKey The new keccak256 hash of the public key to assign to the user.
     * Emits a {UserUpdated} event.
     */
    function updateUser(
        address userId,
        bytes32 nickname,
        bytes32 publicKey
    ) external override {
        address currentUserId = _publicKeyToAddress(users[userId].publicKey);

        require(
            currentUserId == msg.sender,
            "unauthorized or user does not exist"
        );

        users[userId].nickname = nickname;
        users[userId].publicKey = publicKey;
        users[userId].lastUpdateTime = block.timestamp;

        emit UserUpdated(userId);
    }

    /**
     * @dev Get the user details for a given user ID.
     * @param userId The Ethereum address of the user.
     * @return nickname The nickname of the user.
     * @return publicKey The public key of the user.
     * @return registrationTime The timestamp when the user was first registered.
     * @return lastUpdateTime The timestamp when the user details were last updated.
     * @notice This function can be called by anyone.
     * @notice If the user with the given ID does not exist, the function will revert.
     */
    function getUser(
        address userId
    )
        external
        view
        override
        returns (
            bytes32 nickname,
            bytes32 publicKey,
            uint256 registrationTime,
            uint256 lastUpdateTime
        )
    {
        require(users[userId].registrationTime != 0, "User does not exist");
        nickname = users[userId].nickname;
        publicKey = users[userId].publicKey;
        registrationTime = users[userId].registrationTime;
        lastUpdateTime = users[userId].lastUpdateTime;
    }

    /**
     * @dev Verifies the signature of a message signed by a user.
     * @param userId The Ethereum address of the user.
     * @param messageHash The hash of the message that was signed.
     * @param v The recovery byte of the signature.
     * @param r The R component of the ECDSA signature.
     * @param s The S component of the ECDSA signature.
     * @return True if the signature is valid and was signed by the user, otherwise false.
     * @notice This function will revert if the user does not exist.
     */
    function verifyUserSignature(
        address userId,
        bytes32 messageHash,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external view override returns (bool) {
        require(users[userId].registrationTime != 0, "User does not exist");
        bytes32 messageHashWithPrefix = keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", messageHash)
        );
        address signer = ecrecover(messageHashWithPrefix, v, r, s);
        return signer == userId;
    }

    /**
     * @dev Converts a 32-byte public key to its corresponding Ethereum address.
     * @param publicKey Keccak256 hash of the public key to be converted.
     * @return The Ethereum address corresponding to the provided public key.
     */
    function _publicKeyToAddress(
        bytes32 publicKey
    ) internal pure returns (address) {
        return address(uint160(uint256(publicKey)));
    }
}
