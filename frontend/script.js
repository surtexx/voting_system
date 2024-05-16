async function getVotingStatus() {
    try {
        const response = await fetch('/api/getVotingStatus');
        const result = await response.json();
        document.getElementById('status').innerText = `Voting is currently ${result.status ? "open" : "closed"}.`;
    } catch (error) {
        console.error('Error fetching voting status:', error);
    }
}

async function getAllVotesOfCandidates() {
    try {
        const response = await fetch('/api/getAllVotesOfCandidates');
        const candidates = await response.json();
        const candidatesList = document.getElementById('candidates');
        candidatesList.innerHTML = '';
        candidates.forEach((candidate, index) => {
            const listItem = document.createElement('li');
            listItem.innerText = `Candidate ${index}: ${candidate.name}, Votes: ${candidate.voteCount}`;
            candidatesList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching candidates:', error);
    }
}

async function addCandidate() {
    const name = document.getElementById('candidateName').value;
    console.log(name);
    try {
        const response = await fetch('/api/addCandidate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });
        const result = await response.json();
        document.getElementById('addCandidateMessage').innerText = result.message;
    } catch (error) {
        console.error('Error adding candidate:', error);
    }
}

async function vote() {
    const index = document.getElementById('candidateIndex').value;
    try {
        const response = await fetch('/api/vote', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ index })
        });
        const result = await response.json();
        document.getElementById('voteMessage').innerText = result.message;
    } catch (error) {
        console.error('Error voting:', error);
    }
}

async function getRemainingTime() {
    try {
        const response = await fetch('/api/getRemainingTime');
        const result = await response.json();
        document.getElementById('remainingTime').innerText = `Remaining voting time: ${result.remainingTime} seconds.`;
    } catch (error) {
        console.error('Error fetching remaining time:', error);
    }
}

async function getBalance() {
    try {
        const response = await fetch('/api/getBalance');
        const result = await response.json();
        document.getElementById('balance').innerText = `Contract balance: ${result.balance} ETH.`;
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
        document.getElementById('transferMessage').innerText = result.message;
    } catch (error) {
        console.error('Error transferring ETH:', error);
    }
}
