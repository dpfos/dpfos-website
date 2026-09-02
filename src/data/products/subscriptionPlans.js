/* =========================================================
   DPF OS — SUBSCRIPTION PLANS
   ========================================================= */

export const subscriptionPlans = [
  {
    id: "premium-monthly",
    productId: "dpf-premium",

    name: "Premium Monthly",
    tier: "premium",

    billingInterval: "month",

    currency: "USD",
    price: 14.99,

    featured: false,

    description:
      "Flexible monthly access to the DPF OS Premium knowledge environment.",
  },

  {
    id: "premium-annual",
    productId: "dpf-premium",

    name: "Premium Annual",
    tier: "premium",

    billingInterval: "year",

    currency: "USD",
    price: 149,

    featured: true,

    badge: "Best Value",

    description:
      "12 months of DPF OS Premium access at a reduced annual rate.",
  },

  {
    id: "pro-monthly",
    productId: "dpf-pro",

    name: "Pro Monthly",
    tier: "pro",

    billingInterval: "month",

    currency: "USD",
    price: 29.99,

    featured: false,

    description:
      "Professional DPF OS access for coaches and football professionals.",
  },

  {
    id: "pro-annual",
    productId: "dpf-pro",

    name: "Pro Annual",
    tier: "pro",

    billingInterval: "year",

    currency: "USD",
    price: 299,

    featured: true,

    badge: "Best Value",

    description:
      "12 months of DPF OS Pro access at a reduced annual rate.",
  },
];

export function getPlanById(id) {
  return subscriptionPlans.find((plan) => plan.id === id);
}

export function getPlansByTier(tier) {
  return subscriptionPlans.filter(
    (plan) => plan.tier === tier
  );
}