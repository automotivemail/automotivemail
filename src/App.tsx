/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AutomotiveMailProvider } from './context/AutomotiveMailContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SubscriptionPlans } from './components/SubscriptionPlans';
import { EnthusiastVoices } from './components/EnthusiastVoices';
import { LegendarySubject } from './components/LegendarySubject';
import { HowItWorks } from './components/HowItWorks';
import { TheGuarantee } from './components/TheGuarantee';
import { NostalgicMission } from './components/NostalgicMission';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { DropsModal } from './components/DropsModal';
import { CartDrawer } from './components/CartDrawer';
import { AccountModal } from './components/AccountModal';

export default function App() {
  return (
    <AutomotiveMailProvider>
      <div className="min-h-screen bg-[#08080A] text-[#E6E4DF] selection:bg-[#C5A059]/30 selection:text-[#F3E5AB]">
        {/* Header - Fixed dark nav */}
        <Header />

        {/* Main 8 Homepage Sections */}
        <main>
          {/* 1. Hero */}
          <Hero />

          {/* 2. Subscription Plans */}
          <SubscriptionPlans />

          {/* 3. Enthusiast Voices */}
          <EnthusiastVoices />

          {/* 4. The Legendary Subject */}
          <LegendarySubject />

          {/* 5. How It Works */}
          <HowItWorks />

          {/* 6. The Guarantee */}
          <TheGuarantee />

          {/* 7. The Nostalgic Mission */}
          <NostalgicMission />

          {/* 8. FAQ */}
          <FAQ />
        </main>

        {/* Footer */}
        <Footer />

        {/* Interactive Modals and Drawers */}
        <DropsModal />
        <CartDrawer />
        <AccountModal />
      </div>
    </AutomotiveMailProvider>
  );
}
