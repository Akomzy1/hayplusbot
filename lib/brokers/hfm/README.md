# HFMBrokerProvider

This is the production broker implementation for HFM. As of v3.4, HFM does
not offer a public Partner API. The implementation is therefore minimal:

- `signupUrl()` — fully implemented (URL construction with IB referral code)
- All other methods throw "no Partner API" errors

## Operational equivalents

The functions that would have been API calls in v3.3 are now manual processes:

| v3.3 API method | v3.4 manual equivalent |
|---|---|
| `verifyAccountUnderPartnerCode()` | Admin CSV reconciliation at `/admin/hfm-sync` |
| `getMasterStrategyMetrics()` | Admin manual subscriber count update at `/admin/hfm-sync` |
| `getActiveHfcopySubscribers()` | Same — admin reads from CSV upload |

## Future: if HFM offers a Partner API

If HFM ever announces a public Partner API:

1. Fill in the method implementations using HFM's documented endpoints.
2. Add Finnhub or similar FX rate fetching if balance checks are reintroduced.
3. Re-evaluate whether to bring back the v3.3 two-tier balance gate.
4. Migrate users from manual reconciliation to automated sync.

The interface preserves swap-readiness for this scenario.

## Configuration

Required env var: `HFM_IB_CODE` — your client's HFM IB referral code.

Set `BROKER_PROVIDER=hfm` (the default in v3.4) to activate this provider.
Use `mock` only for specific test scenarios.

If `BROKER_PROVIDER=hfm` and `HFM_IB_CODE` is missing or empty, the factory
throws at the first `getBrokerProvider()` call so the misconfiguration
fails loudly at app startup rather than silently producing broken signup
URLs.
