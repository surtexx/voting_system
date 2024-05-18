const express = require('express');
const path = require('path');
const { run } = require('hardhat');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.post('/api/getVotingStatus', async (req, res) => {
    try {
        const status = await run('get-voting-status');
        res.json({ "status": status });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get voting status' });
    }
});

app.get('/api/getAllVotesOfCandidates', async (req, res) => {
    try {
        await run('get-all-votes');
        res.json({ message: 'Votes fetched successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get candidates' });
    }
});

app.post('/api/addCandidate', async (req, res) => {
    const { name } = req.body;
    try {
        await run('add-candidate', { name });
        res.json({ message: `Candidate ${name} added successfully.` });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add candidate' });
    }
});

app.post('/api/vote', async (req, res) => {
    const { index } = req.body;
    try {
        await run('vote', { index });
        res.json({ message: `Voted for candidate at index ${index}.` });
    } catch (error) {
        res.status(500).json({ error: 'Failed to vote' });
    }
});

app.get('/api/getRemainingTime', async (req, res) => {
    try {
        await run('get-remaining-time');
        res.json({ message: 'Remaining time fetched successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get remaining time' });
    }
});

app.get('/api/getBalance', async (req, res) => {
    try {
        await run('get-balance');
        res.json({ message: 'Balance fetched successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get balance' });
    }
});

app.post('/api/transferETH', async (req, res) => {
    const { to, amount } = req.body;
    try {
        await run('transfer-eth', { to, amount });
        res.json({ message: `Transferred ${amount} ETH to ${to}.` });
    } catch (error) {
        res.status(500).json({ error: 'Failed to transfer ETH' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
