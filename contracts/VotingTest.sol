// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./VotingSystem.sol";

contract TestVoting {
    VotingSystem public votingSystem;

    constructor(VotingSystem _votingSystem) {
        votingSystem = _votingSystem;
    }

    function testVotingSystem() public {
        votingSystem.registerAsCandidate("Candidate 1");
        
        votingSystem.vote(address(this));

        // Get total number of candidates
        uint256 totalCandidates = votingSystem.getTotalCandidates();
        require(totalCandidates == 1, "Incorrect number of candidates");

        // Get total votes for a candidate
        uint256 votesForCandidate1 = votingSystem.getVotesForCandidate(address(this));
        require(votesForCandidate1 == 1, "Incorrect number of votes");

        // Get name of a candidate
        string memory name = votingSystem.getCandidateName(address(this));
        require(keccak256(abi.encodePacked(name)) == keccak256(abi.encodePacked("Candidate 1")), "Incorrect candidate name.");
    }
}
