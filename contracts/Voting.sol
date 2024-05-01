// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
    // Struct to represent a candidate
    struct Candidate {
        string name;
        uint256 voteCount;
    }
    
    // Mapping to store candidates
    mapping(address => Candidate) private candidates;
    
    // Array of candidate addresses for iteration
    address[] private candidateAddresses;
    
    // Mapping to store voters and their voted candidate
    mapping(address => address) private voters;
    
    // Event for when a vote is cast
    event VoteCast(address indexed voter, address indexed candidate);
    
    // Modifier to check if the sender is a registered candidate
    modifier onlyCandidate() {
        bool registered = false;
        for (uint256 i = 0; i < candidateAddresses.length; i++) {
            if (candidateAddresses[i] == msg.sender) {
                registered = true;
                break;
            }
        }
        require(!registered, "You are already registered as a candidate.");
        _;
    }
    
    // Function to register as a candidate
    function registerAsCandidate(string memory _name) external onlyCandidate{
        candidates[msg.sender] = Candidate(_name, 0);
        candidateAddresses.push(msg.sender);
    }
    
    // Function to cast a vote
    function vote(address _candidate) external {
        require(voters[msg.sender] == address(0), "You have already voted.");
        require(candidates[_candidate].voteCount >= 0, "Invalid candidate.");
        
        voters[msg.sender] = _candidate;
        candidates[_candidate].voteCount++;
        
        emit VoteCast(msg.sender, _candidate);
    }
    
    // Function to get total number of candidates
    function getTotalCandidates() external view returns (uint256) {
        return candidateAddresses.length;
    }
    
    // Function to get total votes for a candidate
    function getVotesForCandidate(address _candidate) external view returns (uint256) {
        return candidates[_candidate].voteCount;
    }
    
    // Function to get name of a candidate
    function getCandidateName(address _candidate) external view returns (string memory) {
        return candidates[_candidate].name;
    }
    
    // Function to transfer ETH
    function transferETH(address payable _to, uint256 _amount) external {
        require(_to != address(0), "Invalid recipient address");
        require(address(this).balance >= _amount, "Insufficient balance");
        
        _to.transfer(_amount);
    }
}
