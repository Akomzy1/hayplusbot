/**
 * HFMBrokerProvider — production broker implementation.
 *
 * In v3.4 only `signupUrl()` is fully implemented. The other interface
 * methods throw "no Partner API" errors with clear remediation pointers
 * because HFM does not expose a public Partner API. The operational
 * equivalents happen via manual admin actions at /admin/hfm-sync.
 *
 * The methods that throw are intentionally implemented (rather than
 * omitted) so that the type system enforces the BrokerProvider contract,
 * and so that any future API access can fill them in without touching
 * any consumer code.
 */

import type {
  AccountVerificationResult,
  BrokerProvider,
  MasterStrategyMetrics,
} from "../types";

export interface HFMBrokerProviderConfig {
  ibCode: string;
}

export class HFMBrokerProvider implements BrokerProvider {
  readonly name = "hfm";

  constructor(private readonly config: HFMBrokerProviderConfig) {}

  /**
   * URL construction only — no API call. Always available.
   */
  signupUrl(referralToken?: string): string {
    const url = new URL("https://register.hfm.com/");
    url.searchParams.set("refid", this.config.ibCode);
    if (referralToken) {
      url.searchParams.set("ref", referralToken);
    }
    return url.toString();
  }

  async verifyAccountUnderPartnerCode(
    _hfmAccountNumber: string,
  ): Promise<AccountVerificationResult> {
    throw new Error(
      "HFM has no Partner API. Account verification happens via admin CSV " +
        "reconciliation at /admin/hfm-sync. Do not call this method directly. " +
        "If HFM ever offers an API, fill in this implementation.",
    );
  }

  async getMasterStrategyMetrics(): Promise<MasterStrategyMetrics> {
    throw new Error(
      "HFM has no Partner API. Master strategy metrics are managed via " +
        "admin dashboard manual updates. Do not call this method directly.",
    );
  }

  async getActiveHfcopySubscribers(): Promise<string[]> {
    throw new Error(
      "HFM has no Partner API. Active subscribers are reconciled via " +
        "admin CSV upload at /admin/hfm-sync. Do not call this method directly.",
    );
  }
}
