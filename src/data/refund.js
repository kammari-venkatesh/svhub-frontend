import { contact } from './contact.js'

export const refundPolicy = {
  eyebrow: 'Policies',
  title: 'Refund & Cancellation Policy',
  lede: 'How cancellations, returns and refunds will work at SV Hub — once this page is approved.',
  effectiveDate: 'To be confirmed',
  lastUpdated: 'August 2026',
  draftLabel: 'Draft for V1',
  draftNotice:
    'This is placeholder copy for design and review. It maps the topics this page will cover. It does not set cancellation windows, eligibility rules, fees or timelines. SV Hub will supply and approve the final policy before this page goes live.',
  related: [
    { to: '/terms-and-conditions', label: 'Terms & Conditions' },
    { to: '/shipping-policy', label: 'Shipping Policy' },
    { to: '/privacy-policy', label: 'Privacy Policy' },
    { to: '/contact', label: 'Contact' },
  ],
  sections: [
    { id: 'cancellation', label: 'Order cancellation' },
    { id: 'eligibility', label: 'Refund eligibility' },
    { id: 'process', label: 'Refund process' },
    { id: 'damaged', label: 'Damaged products' },
    { id: 'returns', label: 'Return conditions' },
    { id: 'timelines', label: 'Refund timelines' },
    { id: 'support', label: 'Customer support' },
  ],
  cancellation: [
    {
      kicker: 'To be confirmed',
      title: 'Before an order is packed',
      copy: 'The approved policy will state whether you can cancel after payment and before packing, and any conditions that apply.',
    },
    {
      kicker: 'To be confirmed',
      title: 'After dispatch',
      copy: 'The approved policy will state what happens if you ask to cancel after the order has left Coimbatore — including whether a return is needed instead.',
    },
    {
      kicker: 'To be confirmed',
      title: 'How to request a cancellation',
      copy: 'This block will describe the steps to follow. Until then, write to us with your order number using the contact details at the end of this page.',
    },
  ],
  eligibility: [
    {
      kicker: 'To be confirmed',
      title: 'Possible reasons for review',
      copy: 'Topics we expect this block to cover include a wrong item, a missing item, or a quality concern. The approved list will be published here.',
    },
    {
      kicker: 'To be confirmed',
      title: 'Nutri-Hub food products',
      copy: 'Because many Nutri-Hub products are food, the approved policy will say which items can be refunded or returned, and which cannot, for hygiene or perishability.',
    },
    {
      kicker: 'To be confirmed',
      title: 'Self-Care products',
      copy: 'Handmade soaps and other Self-Care items may have their own return conditions. Those rules will be added here when approved.',
    },
    {
      kicker: 'To be confirmed',
      title: 'Change of mind',
      copy: 'Whether a change of mind is eligible — and on which products — will be stated only in the client-approved policy.',
    },
  ],
  steps: [
    {
      number: '01',
      title: 'Tell us about the order',
      copy: 'The approved process will ask for details such as your order number, the product, and what went wrong. Photos may be requested where they help.',
    },
    {
      number: '02',
      title: 'We review the request',
      copy: 'How we look into a request, and how we reply, will be described here once SV Hub confirms the internal steps.',
    },
    {
      number: '03',
      title: 'Outcome',
      copy: 'The approved policy will say what we may offer — for example a refund, a replacement, or another resolution — and when each applies.',
    },
    {
      number: '04',
      title: 'If a refund is due',
      copy: 'This step will explain how money is returned (for example to the original payment method) after the client confirms that process.',
    },
  ],
  damaged: [
    {
      kicker: 'To be confirmed',
      title: 'Tell us promptly',
      copy: 'The approved policy will say how soon to contact us after delivery, and what to keep (packaging, product, photos) so we can look into it.',
    },
    {
      kicker: 'To be confirmed',
      title: 'What we may ask for',
      copy: 'This block will list any photos or order details needed. Please keep a damaged item until the approved policy — or our reply — says otherwise.',
    },
    {
      kicker: 'To be confirmed',
      title: 'Replacement or refund',
      copy: 'Whether a damaged item is replaced, refunded, or handled another way will be confirmed by SV Hub and written here.',
    },
  ],
  returns: [
    {
      kicker: 'To be confirmed',
      title: 'Condition of goods',
      copy: 'The approved policy will state whether items must be unused, unopened, or in original packing — and any exceptions.',
    },
    {
      kicker: 'To be confirmed',
      title: 'Food and handmade care',
      copy: 'Return rules for edible products and handmade soaps will be set with hygiene and safety in mind. Those rules are not final on this draft page.',
    },
    {
      kicker: 'To be confirmed',
      title: 'Return shipping',
      copy: 'Who pays for a return, and how a return is arranged from your address, will be published here after approval.',
    },
  ],
  timelines: [
    {
      kicker: 'To be confirmed',
      title: 'Review time',
      copy: 'How long we take to look at a cancellation or refund request will be written here as a clear working-day range, once confirmed.',
    },
    {
      kicker: 'To be confirmed',
      title: 'After a refund is approved',
      copy: 'The time to issue a refund, and any extra time the bank or UPI provider may take to show it, will be described in the approved policy.',
    },
    {
      kicker: 'To be confirmed',
      title: 'How you will hear from us',
      copy: 'This block will say whether we update you by email, WhatsApp, or in My Orders — after SV Hub chooses the channel.',
    },
  ],
  supportNote: contact.replyNote,
}
