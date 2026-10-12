/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AuthProvider } from './context/AuthContext';
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
import { CustomerRequestModal } from './components/CustomerRequestModal';
import { AccountModal } from './components/AccountModal';
import { AuthModal } from './components/AuthModal';
import { LoginPage } from './components/LoginPage';
import { AdminPortal } from './components/AdminPortal';
import { CustomerAccountPage } from './components/CustomerAccountPage';

function MainContent() {
  const [currentRoute, setCurrentRoute] = React.useState<
    'home' | 'login' | 'register' | 'account' | 'admin'
  >('home');

  React.useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();

      if (
        hash === '#/admin' ||
        hash === '#admin' ||
        hash === '#/admin/requests' ||
        hash === '#admin/requests' ||
        path === '/admin' ||
        path === '/admin/requests'
      ) {
        setCurrentRoute('admin');
      } else if (
        hash === '#/account' ||
        hash === '#account' ||
        hash === '#/requests' ||
        hash === '#requests' ||
        path === '/account' ||
        path === '/requests'
      ) {
        setCurrentRoute('account');
      } else if (hash === '#/login' || hash === '#login' || path === '/login') {
        setCurrentRoute('login');
      } else if (hash === '#/register' || hash === '#register' || path === '/register') {
        setCurrentRoute('register');
      } else {
        setCurrentRoute('home');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    window.addEventListener('popstate', handleHash);
    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('popstate', handleHash);
    };
  }, []);

  const navigateToHome = () => {
    window.location.hash = '';
    setCurrentRoute('home');
  };

  if (currentRoute === 'admin') {
    return (
      <div className="min-h-screen bg-[#08080A] text-[#E6E4DF]">
        <AdminPortal onBackToHome={navigateToHome} />
        <CustomerRequestModal />
        <AccountModal />
        <AuthModal />
        <DropsModal />
      </div>
    );
  }

  if (currentRoute === 'account') {
    return (
      <div className="min-h-screen bg-[#08080A] text-[#E6E4DF]">
        <CustomerAccountPage onBackToHome={navigateToHome} />
        <CustomerRequestModal />
        <AccountModal />
        <AuthModal />
        <DropsModal />
      </div>
    );
  }

  if (currentRoute === 'login' || currentRoute === 'register') {
    return (
      <div className="min-h-screen bg-[#08080A] text-[#E6E4DF] selection:bg-[#C5A059]/30 selection:text-[#F3E5AB]">
        <LoginPage
          defaultMode={currentRoute === 'register' ? 'register' : 'login'}
          onBackToHome={navigateToHome}
        />
        <CustomerRequestModal />
        <AccountModal />
        <AuthModal />
        <DropsModal />
      </div>
    );
  }

  return (
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
      <CustomerRequestModal />
      <AccountModal />
      <AuthModal />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AutomotiveMailProvider>
        <MainContent />
      </AutomotiveMailProvider>
    </AuthProvider>
  );
}
