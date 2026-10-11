import React, { useState } from 'react';
import { useAutomotiveMail, UserAddress, OrderConfirmation } from '../context/AutomotiveMailContext';
import { AutomotiveMailLogo } from './AutomotiveMailLogo';
import { X, Trash2, ShieldCheck, CheckCircle2, Gift, MapPin, Truck, ArrowRight, CreditCard, Smartphone } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartCount,
    cartTotal,
    removeFromCart,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    userAddress,
    completeCheckout,
    lastOrder,
  } = useAutomotiveMail();

  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [addressForm, setAddressForm] = useState<UserAddress>(userAddress);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [isGiftMode, setIsGiftMode] = useState(false);
  const [giftRecipient, setGiftRecipient] = useState('');
  const [giftNote, setGiftNote] = useState('Happy Birthday! May your mailbox carry the finest speed.');
  const [confirmedOrder, setConfirmedOrder] = useState<OrderConfirmation | null>(null);

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setStep('checkout');
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const order = completeCheckout({
      address: addressForm,
      paymentMethod,
      giftDetails: isGiftMode ? { recipient: giftRecipient, note: giftNote } : undefined,
    });
    setConfirmedOrder(order);
    setStep('success');
  };

  const handleClose = () => {
    setIsCartOpen(false);
    // Reset back to cart view after close
    setTimeout(() => {
      setStep('cart');
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0D0D12] border-l border-[#242430] text-[#E6E4DF] flex flex-col shadow-2xl">
          {/* Drawer Header */}
          <div className="p-5 border-b border-[#1E1E28] flex items-center justify-between bg-[#111117]">
            <div className="flex items-center gap-3">
              <AutomotiveMailLogo variant="stamp-only" />
              <div>
                <h3 className="font-serif-display font-bold text-sm uppercase tracking-wide text-white">
                  {step === 'cart' && 'Collector Cart'}
                  {step === 'checkout' && 'Indian Express Dispatch'}
                  {step === 'success' && 'Dispatch Confirmed'}
                </h3>
                <span className="text-[11px] font-mono text-[#8E8C85]">
                  {step === 'cart' && `${cartCount} Subscription Item${cartCount === 1 ? '' : 's'}`}
                  {step === 'checkout' && 'Verified Pan-India Shipping'}
                  {step === 'success' && 'Sealed & En Route'}
                </span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="p-1.5 rounded text-[#8E8C85] hover:text-white hover:bg-[#1E1E28] transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {/* STEP 1: CART VIEW */}
            {step === 'cart' && (
              <>
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#181822] border border-[#2B2B38] flex items-center justify-center mx-auto text-[#8E8C85]">
                      <Truck className="w-7 h-7 text-[#C5A059]" />
                    </div>
                    <div className="font-serif-display text-lg text-white font-bold">Your Mailbag is Empty</div>
                    <p className="text-xs text-[#8E8C85] max-w-xs mx-auto">
                      Choose a subscription plan to start receiving physical museum prints at your doorstep in India.
                    </p>
                    <a
                      href="#plans"
                      onClick={handleClose}
                      className="inline-block mt-2 px-6 py-2.5 rounded bg-gradient-to-r from-[#F4E3B2] to-[#C5A059] text-black text-xs font-bold uppercase tracking-wider"
                    >
                      Browse Plans
                    </a>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.plan.id}
                        className="p-4 rounded-xl bg-[#121218] border border-[#242430] flex flex-col justify-between"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="text-[10px] font-mono text-[#E5C158] uppercase tracking-wider">
                              Monthly Subscription
                            </span>
                            <h4 className="font-serif-display font-bold text-base text-white">
                              {item.plan.name}
                            </h4>
                            <p className="text-xs text-[#8E8C85] mt-0.5 line-clamp-1">{item.plan.tagline}</p>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.plan.id)}
                            className="text-[#6E6E7A] hover:text-[#EF4444] p-1 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Included items mini summary */}
                        <div className="mt-3 pt-3 border-t border-[#1C1C26] text-[11px] text-[#A6A49F] space-y-1">
                          <div className="flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-[#E5C158]" />
                            <span>1× 300 GSM Archival Hero Poster</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-[#38BDF8]" />
                            <span>1× Technical Blueprint Schematic</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-[#FB923C]" />
                            <span>1× Magazine Cover + Story Letter + 3× Polaroids</span>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between pt-3 border-t border-[#1C1C26]">
                          <span className="text-xs text-[#8E8C85]">Quantity: {item.quantity}</span>
                          <span className="font-mono-numbers text-lg font-bold text-white">
                            ₹{item.plan.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    ))}

                    {/* Free shipping banner */}
                    <div className="p-3 rounded-lg bg-[#0E1712] border border-[#065F46]/40 flex items-center gap-2.5 text-xs text-[#34D399]">
                      <ShieldCheck className="w-4 h-4 shrink-0" />
                      <span>Free Express Tracked Delivery across all 28 Indian States.</span>
                    </div>

                    {/* Gift option toggle */}
                    <div className="p-4 rounded-xl bg-[#121218] border border-[#242430]">
                      <label className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-2.5">
                          <Gift className="w-4 h-4 text-[#E5C158]" />
                          <span className="text-xs font-semibold text-white">This is a Gift Subscription</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={isGiftMode}
                          onChange={(e) => setIsGiftMode(e.target.checked)}
                          className="rounded border-[#3A3A48] text-[#E5C158] focus:ring-[#E5C158] bg-[#181822]"
                        />
                      </label>

                      {isGiftMode && (
                        <div className="mt-3 pt-3 border-t border-[#1C1C26] space-y-2.5 animate-in fade-in duration-150">
                          <div>
                            <label className="text-[10px] font-mono uppercase text-[#8E8C85] block mb-1">
                              Recipient Name
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Rohaan Varma"
                              value={giftRecipient}
                              onChange={(e) => setGiftRecipient(e.target.value)}
                              className="w-full text-xs px-3 py-2 bg-[#09090C] border border-[#262634] rounded text-white focus:outline-none focus:border-[#E5C158]"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-mono uppercase text-[#8E8C85] block mb-1">
                              Wax-Sealed Dedication Note
                            </label>
                            <textarea
                              rows={2}
                              value={giftNote}
                              onChange={(e) => setGiftNote(e.target.value)}
                              className="w-full text-xs px-3 py-2 bg-[#09090C] border border-[#262634] rounded text-white focus:outline-none focus:border-[#E5C158]"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* STEP 2: CHECKOUT VIEW */}
            {step === 'checkout' && (
              <form onSubmit={handleSubmitOrder} className="space-y-5">
                <div className="p-3.5 rounded-lg bg-[#14141C] border border-[#242432] text-xs">
                  <div className="flex justify-between text-[#8E8C85] mb-1">
                    <span>Plan Payload:</span>
                    <span className="text-white font-medium">{cart[0]?.plan.name || 'Both Worlds'}</span>
                  </div>
                  <div className="flex justify-between text-[#8E8C85] mb-1">
                    <span>Monthly Subscription:</span>
                    <span className="text-white font-mono">₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-[#8E8C85]">
                    <span>Pan-India Shipping:</span>
                    <span className="text-[#34D399] font-mono">FREE (Air Express)</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#C5A059] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Indian Delivery Address</span>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-[#8E8C85] block mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={addressForm.fullName}
                      onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                      className="w-full text-xs px-3 py-2.5 bg-[#121218] border border-[#282836] rounded text-white focus:outline-none focus:border-[#E5C158]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-[#8E8C85] block mb-1">
                      Phone Number (For Tracking Updates)
                    </label>
                    <input
                      type="tel"
                      required
                      value={addressForm.phone}
                      onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                      className="w-full text-xs px-3 py-2.5 bg-[#121218] border border-[#282836] rounded text-white focus:outline-none focus:border-[#E5C158]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-[#8E8C85] block mb-1">Street Address</label>
                    <textarea
                      rows={2}
                      required
                      value={addressForm.streetAddress}
                      onChange={(e) => setAddressForm({ ...addressForm, streetAddress: e.target.value })}
                      className="w-full text-xs px-3 py-2 bg-[#121218] border border-[#282836] rounded text-white focus:outline-none focus:border-[#E5C158]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-mono text-[#8E8C85] block mb-1">City</label>
                      <input
                        type="text"
                        required
                        value={addressForm.city}
                        onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                        className="w-full text-xs px-3 py-2 bg-[#121218] border border-[#282836] rounded text-white focus:outline-none focus:border-[#E5C158]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-[#8E8C85] block mb-1">PIN Code</label>
                      <input
                        type="text"
                        required
                        pattern="[0-9]{6}"
                        maxLength={6}
                        value={addressForm.pincode}
                        onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                        className="w-full text-xs px-3 py-2 bg-[#121218] border border-[#282836] rounded text-white focus:outline-none focus:border-[#E5C158]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-[#8E8C85] block mb-1">State</label>
                    <input
                      type="text"
                      required
                      value={addressForm.state}
                      onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                      className="w-full text-xs px-3 py-2 bg-[#121218] border border-[#282836] rounded text-white focus:outline-none focus:border-[#E5C158]"
                    />
                  </div>
                </div>

                {/* Payment selection */}
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#C5A059]">Payment Method</div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-2.5 rounded border text-xs flex items-center gap-2 ${
                        paymentMethod === 'upi'
                          ? 'border-[#E5C158] bg-[#181824] text-white'
                          : 'border-[#282836] bg-[#101016] text-[#8E8C85]'
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5 text-[#E5C158]" />
                      <span>UPI (Instant)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2.5 rounded border text-xs flex items-center gap-2 ${
                        paymentMethod === 'card'
                          ? 'border-[#E5C158] bg-[#181824] text-white'
                          : 'border-[#282836] bg-[#101016] text-[#8E8C85]'
                      }`}
                    >
                      <CreditCard className="w-3.5 h-3.5 text-[#E5C158]" />
                      <span>Card / NetBanking</span>
                    </button>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded text-xs font-bold uppercase tracking-[0.16em] bg-gradient-to-r from-[#F4E3B2] via-[#E5C158] to-[#C5A059] text-black shadow-lg"
                  >
                    Confirm Subscription · ₹{cartTotal} / mo
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep('cart')}
                    className="w-full py-2 text-xs text-[#8E8C85] hover:text-white mt-1"
                  >
                    ← Back to Cart
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: ORDER SUCCESS CONFIRMATION SLIP */}
            {step === 'success' && confirmedOrder && (
              <div className="space-y-6 text-center py-4 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-[#064E3B]/30 border border-[#059669] flex items-center justify-center mx-auto text-[#34D399]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#E5C158] block mb-1">
                    Order Sealed & Dispatched
                  </span>
                  <h3 className="font-serif-display font-black text-2xl text-white">
                    Welcome to the Circle
                  </h3>
                  <p className="text-xs text-[#A8A59E] mt-1 max-w-xs mx-auto">
                    Your October drop is being prepared on 300 GSM cotton paper in our workshop.
                  </p>
                </div>

                {/* Collector Dispatch Receipt Slip */}
                <div className="p-5 rounded-xl bg-[#121218] border border-[#2B2B3A] text-left text-xs font-mono space-y-2.5">
                  <div className="flex justify-between border-b border-[#20202C] pb-2">
                    <span className="text-[#8E8C85]">Order ID:</span>
                    <span className="text-[#F4F1EA] font-bold">{confirmedOrder.orderId}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#20202C] pb-2">
                    <span className="text-[#8E8C85]">Plan Tier:</span>
                    <span className="text-white">{confirmedOrder.tierName}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#20202C] pb-2">
                    <span className="text-[#8E8C85]">Amount Paid:</span>
                    <span className="text-[#E5C158] font-bold">₹{confirmedOrder.totalAmount}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#20202C] pb-2">
                    <span className="text-[#8E8C85]">Recipient:</span>
                    <span className="text-white">{confirmedOrder.recipientName}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#20202C] pb-2">
                    <span className="text-[#8E8C85]">Destination:</span>
                    <span className="text-white">
                      {confirmedOrder.city} ({confirmedOrder.pincode})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8E8C85]">Tracking Carrier:</span>
                    <span className="text-[#38BDF8]">{confirmedOrder.trackingNumber}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleClose}
                    className="w-full py-3 rounded text-xs font-bold uppercase tracking-wider bg-[#1A1A24] hover:bg-[#252534] border border-[#3A3A4C] text-white transition-colors"
                  >
                    Return to Homepage
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer Actions (When on cart view with items) */}
          {step === 'cart' && cart.length > 0 && (
            <div className="p-5 border-t border-[#1E1E28] bg-[#111117] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#8E8C85] block">Monthly Total</span>
                  <span className="text-xs text-[#34D399]">Tracked Indian Shipping Included</span>
                </div>
                <div className="text-right">
                  <span className="font-mono-numbers text-2xl font-black text-[#F4F1EA]">
                    ₹{cartTotal}
                  </span>
                  <span className="text-[11px] text-[#8E8C85] block font-mono">/ month</span>
                </div>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 px-4 rounded text-xs font-bold uppercase tracking-[0.16em] bg-gradient-to-r from-[#F4E3B2] via-[#E5C158] to-[#C5A059] hover:from-white hover:to-[#D4AF37] text-black transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Proceed to Dispatch Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default CartDrawer;
