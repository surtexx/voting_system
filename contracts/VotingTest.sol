// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./VotingSystem.sol";

contract VotingTest {
    VotingSystem public votingSystem;

    struct Candidate {
        string name;
        uint256 voteCount;
    }

    constructor() {
        string[] memory candidates = new string[](2);
        candidates[0] = "Alice";
        candidates[1] = "Bob";
        votingSystem = new VotingSystem(candidates, 1);
    }
    function testAddCandidate(string memory _name) public {
        votingSystem.addCandidate(_name);
        require(votingSystem.getAllVotesOfCandidates().length == 3, "Candidate not added.");
    }

    function testVote(uint256 _index) public {
        votingSystem.vote(_index);
        VotingSystem.Candidate[] memory votes = votingSystem.getAllVotesOfCandidates();
        require(votes[_index].voteCount == 1, "Vote not casted.");
    }

    function testGetVotingStatus() public view {
        bool status = votingSystem.getVotingStatus();
        require(status == true, "Voting status not fetched.");
    }
}
