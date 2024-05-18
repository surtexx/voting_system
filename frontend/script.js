async function getVotingStatus() {
    try {
        const response = await fetch('/api/getVotingStatus');
        const result = await response.json();
        if (result.error)
            document.getElementById('statusOutput').innerText = result.error;
        else
            document.getElementById('statusOutput').innerText = `Voting is currently ${result.status ? "open" : "closed"}.`;
    } catch (error) {
        console.error('Error fetching voting status:', error);
    }
}

async function getAllVotesOfCandidates() {
    try {
        const response = await fetch('/api/getAllVotesOfCandidates');
        const candidates = await response.json();
        const candidatesList = document.getElementById('votesOutput');
        candidatesList.innerHTML = '';
        candidates.votes.forEach(candidate => {
            const candidateElement = document.createElement('li');
            candidateElement.innerText = `${candidate.name}: ${candidate.voteCount} votes`;
            candidatesList.appendChild(candidateElement);
        });
    } catch (error) {
        console.error('Error fetching candidates:', error);
    }
}

async function addCandidate() {
    const name = document.getElementById('candidateName').value;
    try {
        const response = await fetch('/api/addCandidate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });
        const result = await response.json();
        if (result.error)
            document.getElementById('addCandidateMessage').innerText = result.error;
        else {
            document.getElementById('addCandidateMessage').innerText = result.message;
            populateCandidates();
        }
    } catch (error) {
        console.error('Error adding candidate:', error);
    }
}

async function populateCandidates() {
    try {
        const response = await fetch('/api/getAllVotesOfCandidates');
        const candidates = await response.json();
        const candidateSelect = document.getElementById('candidateSelect');
        
        candidateSelect.innerHTML = '<option value="" disabled selected>Select a candidate</option>'; // Reset options
        
        candidates.votes.forEach((candidate, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.innerText = candidate.name;
            candidateSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching candidates:', error);
    }
}

async function vote() {
    const select = document.getElementById('candidateSelect');
    const index = select.value;
    
    if (!index) {
        document.getElementById('voteMessage').innerText = 'Please select a candidate.';
        return;
    }

    try {
        const response = await fetch('/api/vote', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ index })
        });
        const result = await response.json();
        if (result.error)
            document.getElementById('voteMessage').innerText = result.error;
        else
            document.getElementById('voteMessage').innerText = result.message;
    } catch (error) {
        console.error('Error voting:', error);
    }
}

// Call populateCandidates when the page loads
window.onload = populateCandidates;

async function getRemainingTime() {
    try {
        const response = await fetch('/api/getRemainingTime');
        const result = await response.json();
        if (result.error)
            document.getElementById('timeOutput').innerText = result.error;
        else
            document.getElementById('timeOutput').innerText = `Remaining voting time: ${result.remainingTime} seconds.`;
    } catch (error) {
        console.error('Error fetching remaining time:', error);
    }
}

async function getBalance() {
    const address = document.getElementById('address').value;
    try {
        const response = await fetch('/api/getBalance/' + address);
        const result = await response.json();
        if (result.error)
            document.getElementById('balanceOutput').innerText = result.error;
        else
            document.getElementById('balanceOutput').innerText = `Contract balance: ${result.balance} ETH.`;
    } catch (error) {
        console.error('Error fetching balance:', error);
    }
}


async function transferETH() {
    const to = document.getElementById('transferTo').value;
    const amount = document.getElementById('transferAmount').value;
    try {
        const response = await fetch('/api/transferETH', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ to, amount })
        });
        const result = await response.json();
        if (result.error)
            document.getElementById('transferMessage').innerText = result.error;
        else
            document.getElementById('transferMessage').innerText = result.message;
    } catch (error) {
        console.error('Error transferring ETH:', error);
    }
}
