export const shippingPolicy = {
  eyebrow: 'Policies',
  title: 'Shipping Policy',
  lede: 'How SV Hub packs and sends orders from Coimbatore — clearly, and without surprises at the door.',
  lastUpdated: 'August 2026',
  draftLabel: 'Draft for V1',
  draftNotice:
    'This is placeholder copy for design and review. Final shipping areas, charges, times and courier partners will be supplied and approved by SV Hub before this page goes live. Until then, nothing here should be treated as a binding shipping rule.',
  related: [
    { to: '/privacy-policy', label: 'Privacy Policy' },
    { to: '/terms-and-conditions', label: 'Terms & Conditions' },
    { to: '/refund-policy', label: 'Refund Policy' },
    { to: '/contact', label: 'Contact' },
  ],
  sections: [
    { id: 'areas', label: 'Shipping areas' },
    { id: 'processing', label: 'Order processing' },
    { id: 'times', label: 'Delivery times' },
    { id: 'charges', label: 'Shipping charges' },
    { id: 'tracking', label: 'Tracking' },
    { id: 'delays', label: 'Delays' },
    { id: 'support', label: 'Customer support' },
  ],
  areas: [
    {
      kicker: 'Usually available',
      title: 'Tamil Nadu & nearby',
      copy: 'Most pincodes in Tamil Nadu and neighbouring states. We confirm serviceability when you enter your address at checkout.',
    },
    {
      kicker: 'Most of India',
      title: 'Rest of India',
      copy: 'We aim to reach the rest of India through our delivery partners. If a pincode cannot be served, you will see that before you pay.',
    },
    {
      kicker: 'Not yet',
      title: 'Remote or restricted',
      copy: 'Some remote, high-risk or restricted pincodes may not be available. We will not take payment for a destination we cannot reach.',
    },
  ],
  steps: [
    {
      number: '01',
      title: 'Order confirmed',
      copy: 'Once payment succeeds, you receive an order number. Packing starts from there.',
    },
    {
      number: '02',
      title: 'Packed in Coimbatore',
      copy: 'Orders are packed from our kitchen and store in Coimbatore, Tamil Nadu.',
    },
    {
      number: '03',
      title: 'Handed to courier',
      copy: 'The parcel is given to a delivery partner. Tracking, when available, appears on the order.',
    },
  ],
  times: [
    {
      kicker: 'Indicative',
      title: 'Nearby',
      copy: 'Coimbatore and nearby areas are usually the quickest after dispatch. Exact dates depend on the courier and your pincode.',
    },
    {
      kicker: 'Indicative',
      title: 'Rest of India',
      copy: 'Longer routes take more working days. Checkout may show a standard or faster option — those timings are placeholders until this policy is approved.',
    },
  ],
  charges: [
    {
      kicker: 'At checkout',
      title: 'Shown before you pay',
      copy: 'Shipping is calculated on the checkout page. Cart totals currently say “calculated at checkout” on purpose.',
    },
    {
      kicker: 'Placeholder',
      title: 'Shop figures',
      copy: 'The V1 shop may show a free-shipping note and standard or faster rates. Those numbers are dummy data, not the final tariff.',
    },
    {
      kicker: 'To be approved',
      title: 'What we will not invent',
      copy: 'Courier names, COD rules, extra remote charges and festival surcharges will be added only when SV Hub approves them.',
    },
  ],
}
