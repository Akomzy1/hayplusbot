/**
 * HFMBrokerProvider unit tests + factory dispatch / misconfiguration tests.
 */

import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { HFMBrokerProvider } from "./provider";
import { _resetBrokerProviderCache, getBrokerProvider } from "../index";

describe("HFMBrokerProvider", () => {
  it("identifies as 'hfm'", () => {
    expect(new HFMBrokerProvider({ ibCode: "10981" }).name).toBe("hfm");
  });

  describe("signupUrl", () => {
    it("returns the HFM register URL with the IB code embedded", () => {
      const url = new HFMBrokerProvider({ ibCode: "10981" }).signupUrl();
      const parsed = new URL(url);
      expect(parsed.origin + parsed.pathname).toBe(
        "https://register.hfm.com/",
      );
      expect(parsed.searchParams.get("refid")).toBe("10981");
      expect(parsed.searchParams.has("ref")).toBe(false);
    });

    it("includes the referral token in the ref query param when provided", () => {
      const url = new HFMBrokerProvider({ ibCode: "10981" }).signupUrl(
        "haytest-attribution",
      );
      const parsed = new URL(url);
      expect(parsed.searchParams.get("refid")).toBe("10981");
      expect(parsed.searchParams.get("ref")).toBe("haytest-attribution");
    });

    it("URL-encodes special characters in the IB code (defensive)", () => {
      const url = new HFMBrokerProvider({ ibCode: "ab&cd" }).signupUrl();
      // URL.searchParams encodes & in values
      expect(url).toContain("refid=ab%26cd");
    });
  });

  describe("methods that depend on the Partner API throw with helpful guidance", () => {
    const p = new HFMBrokerProvider({ ibCode: "10981" });

    it("verifyAccountUnderPartnerCode throws", async () => {
      await expect(p.verifyAccountUnderPartnerCode("100001")).rejects.toThrow(
        /HFM has no Partner API.*\/admin\/hfm-sync/,
      );
    });

    it("getMasterStrategyMetrics throws", async () => {
      await expect(p.getMasterStrategyMetrics()).rejects.toThrow(
        /HFM has no Partner API.*manual updates/,
      );
    });

    it("getActiveHfcopySubscribers throws", async () => {
      await expect(p.getActiveHfcopySubscribers()).rejects.toThrow(
        /HFM has no Partner API.*CSV upload/,
      );
    });
  });
});

describe("getBrokerProvider() factory dispatch", () => {
  // Snapshot env so tests don't leak state into each other.
  const original = {
    BROKER_PROVIDER: process.env.BROKER_PROVIDER,
    HFM_IB_CODE: process.env.HFM_IB_CODE,
  };

  beforeEach(() => {
    _resetBrokerProviderCache();
  });

  afterEach(() => {
    process.env.BROKER_PROVIDER = original.BROKER_PROVIDER;
    process.env.HFM_IB_CODE = original.HFM_IB_CODE;
    _resetBrokerProviderCache();
  });

  it("returns HFMBrokerProvider when BROKER_PROVIDER=hfm and HFM_IB_CODE set", () => {
    process.env.BROKER_PROVIDER = "hfm";
    process.env.HFM_IB_CODE = "10981";
    const p = getBrokerProvider();
    expect(p.name).toBe("hfm");
    expect(p.signupUrl()).toContain("refid=10981");
  });

  it("throws a clear error when HFM_IB_CODE is missing", () => {
    process.env.BROKER_PROVIDER = "hfm";
    delete process.env.HFM_IB_CODE;
    expect(() => getBrokerProvider()).toThrow(/Missing HFM_IB_CODE/);
  });

  it("throws when HFM_IB_CODE is the empty string", () => {
    process.env.BROKER_PROVIDER = "hfm";
    process.env.HFM_IB_CODE = "";
    expect(() => getBrokerProvider()).toThrow(/Missing HFM_IB_CODE/);
  });

  it("returns MockBrokerProvider when BROKER_PROVIDER=mock", () => {
    process.env.BROKER_PROVIDER = "mock";
    const p = getBrokerProvider();
    expect(p.name).toBe("mock");
  });

  it("throws on unknown provider name", () => {
    process.env.BROKER_PROVIDER = "exness";
    expect(() => getBrokerProvider()).toThrow(/Unknown broker provider/);
  });

  it("caches the provider instance across calls", () => {
    process.env.BROKER_PROVIDER = "mock";
    const a = getBrokerProvider();
    const b = getBrokerProvider();
    expect(a).toBe(b);
  });
});
