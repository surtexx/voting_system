const express = require('express');
const path = require('path');
const interact = require('./scripts/interact');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.get('/api/getVotingStatus', async (req, res) => {
    try {
        const status = await interact.getVotingStatus();
        res.json({ status: status });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get voting status:', error });
    }
});

app.get('/api/getAllVotesOfCandidates', async (req, res) => {
    try {
        let votes = await interact.getAllVotesOfCandidates();
        votes = votes.map(vote => {
            return {
                name: vote.name.toString(),
                voteCount: Number(vote.voteCount)
            };
        });
        
        res.json({ votes: votes });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get candidates: '+ error.message });
    }
});

app.post('/api/addCandidate', async (req, res) => {
    const { name } = req.body;
    try {
        await interact.addCandidate(name);
        res.json({ message: `Candidate ${name} added successfully.` });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add candidate: '+ error.message });
    }
});

app.post('/api/vote', async (req, res) => {
    const { index } = req.body;
    try {
        await interact.vote(index);
        res.json({ message: `Voted for candidate at index ${index}.` });
    } catch (error) {
        res.status(500).json({ error: 'Failed to vote: ' + error.message });
    }
});

app.get('/api/getRemainingTime', async (req, res) => {
    try {
        const remainingTime = Number(await interact.getRemainingTime());
        res.json({ remainingTime: remainingTime });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get remaining time: '+ error.message });
    }
});

app.get('/api/getBalance/:addr', async (req, res) => {
    const { addr } = req.params;
    try {
        const balance = Number(await interact.getBalance(addr));
        res.json({ balance: balance });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get balance: '+ error.message });
    }
});

app.post('/api/transferETH', async (req, res) => {
    const { to, amount } = req.body;
    try {
        await interact.transferETH(to, amount);
        res.json({ message: `Transferred ${amount} ETH to ${to}.` });
    } catch (error) {
        res.status(500).json({ error: 'Failed to transfer ETH: '+ error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
