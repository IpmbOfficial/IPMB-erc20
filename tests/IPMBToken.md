# IPMBToken Tests

## Verify Fixture
- [x] Contracts are deployed

## Check Info
- [x] #name
- [x] #symbol
- [x] #decimals

## Check Deployer balance
- [x] #balanceOf

## Transfer 50 tokens
- [x] #transfer
- [x] #balanceOf (sender)
- [x] #balanceOf (recipient)

## Burn 100 tokens
- [x] #burn
- [x] #balanceOf

## Approve spender
- [x] #approve
- [x] #allowance

## Increase & decrease allowance spender
- [x] #increaseAllowance
- [x] #allowance (after increase)
- [x] #decreaseAllowance
- [x] #allowance (after decrease)

## Transfer on behalf of owner
- [x] #transferFrom
- [x] #allowance (after transfer)
- [x] #balanceOf

## Burn on behalf of owner
- [x] #burnFrom
- [x] #allowance (after burn)
- [x] #balanceOf

## Batch transfer of 100 tokens
- [x] #batchTransfers
- [x] #balanceOf (sender)
- [x] #balanceOf (first recipient)
- [x] #balanceOf (second recipient)

## Transfer Ownership
- [x] #transferOwnership
- [x] #owner
- [x] #balanceOf (new owner)

---

### Contract Performance Metrics

| Solc version: 0.8.19 | Optimizer enabled: true | Runs: 200 | Block limit: 30000000 gas |
|----------------------|-------------------------|-----------|----------------------------|

#### Methods

| Contract   | Method              | Min | Max | Avg  | # calls | usd (avg) |
|------------|---------------------|-----|-----|------|---------|-----------|
| IPMBToken  | approve             | -   | -   | 46283| 1       | -         |
| IPMBToken  | batchTransfers      | -   | -   | 61715| 1       | -         |
| IPMBToken  | burn                | -   | -   | 33713| 1       | -         |
| IPMBToken  | burnFrom            | -   | -   | 41569| 1       | -         |
| IPMBToken  | decreaseAllowance   | -   | -   | 29426| 1       | -         |
| IPMBToken  | increaseAllowance   | -   | -   | 29464| 1       | -         |
| IPMBToken  | transfer            | -   | -   | 51460| 1       | -         |
| IPMBToken  | transferFrom        | -   | -   | 59357| 1       | -         |
| IPMBToken  | transferOwnership   | -   | -   | 28678| 1       | -         |

#### Deployments

| Deployment | Min | Max | Avg     | % of limit |
|------------|-----|-----|---------|------------|
| IPMBToken  | -   | -   | 965577  | 3.2%       |
