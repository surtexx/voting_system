// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    Candidate[] public candidates;
    mapping(address => string) public voters;
    address owner;

    uint256 public votingStart;
    uint256 public votingEnd;

    // Event for when a vote is cast
    event VoteCast(address indexed voter, string indexed candidateName);

    constructor(string[] memory _candidateNames, uint256 _duration) {
        for (uint256 i = 0; i < _candidateNames.length; i++) {
            Candidate memory newCandidate = Candidate({
                name: _candidateNames[i],
                voteCount: 0
            });
            candidates.push(newCandidate);
        }

        owner = msg.sender;
        votingStart = block.timestamp;
        votingEnd = block.timestamp + (_duration * 1 minutes);
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function addCandidate(string memory _name) public onlyOwner {
        Candidate memory newCandidate = Candidate({
            name: _name,
            voteCount: 0
        });
        candidates.push(newCandidate);
    }

    function vote(uint256 _index) public {
        require(bytes(voters[msg.sender]).length == 0, "You have already voted.");
        require(_index < candidates.length && _index >=0, "Invalid candidate.");

        candidates[_index].voteCount++;
        voters[msg.sender] = candidates[_index].name;

        emit VoteCast(msg.sender, candidates[_index].name);
    }

    function getAllVotesOfCandidates() public view returns (Candidate[] memory){
        return candidates;
    }

    function getVotingStatus() public view returns (bool) {
        return (block.timestamp >= votingStart && block.timestamp < votingEnd);
    }

    function getRemainingTime() public view returns (uint256) {
        require(block.timestamp >= votingStart, "Voting has not started yet.");
        if (block.timestamp >= votingEnd) {
            return 0;
    }
        return votingEnd - block.timestamp;
    }

    function transferETH(address payable _to, uint256 _amount) external {
        require(_to != address(0), "Invalid recipient address");
        require(address(this).balance >= _amount, "Insufficient balance");
        
        _to.transfer(_amount);
    }

    function checkBalance() public view returns (uint256) {
        return address(this).balance;
    }
}