import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Programs from './components/Programs';
import ExaminationModes from './components/ExaminationModes';
import AdmissionProcess from './components/AdmissionProcess';
import NsetGuide from './components/NsetGuide';
import ImportantDates from './components/ImportantDates';
import FeeStructure from './components/FeeStructure';
import BenefitsEarly from './components/BenefitsEarly';
import Certification from './components/Certification';
import CampusLife from './components/CampusLife';
import Faqs from './components/Faqs';
import Footer from './components/Footer';
import FloatingNav from './components/FloatingNav';

export default function App() {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col overflow-x-hidden selection:bg-blue-600 selection:text-white">
      {/* Sticky Two-Level Header with Dynamic Active Section Tracking */}
      <Header />

      {/* Main Content Area */}
      <main className="w-full flex-grow">
        {/* Section 1: Home / Hero Section */}
        <HeroSection />

        {/* Section 2: Programs (AI & Computer Science) */}
        <Programs />

        {/* Section 3: Admissions & Fees (Encompassing Examination Modes, Admission Process, NSET Guide, Dates, Fees, Scholarships) */}
        <div id="admissions-fees" className="scroll-mt-24">
          <ExaminationModes />
          <AdmissionProcess />
          <NsetGuide />
          <ImportantDates />
          <FeeStructure />
          <BenefitsEarly />
        </div>

        {/* Section 4: Certification & Academic Credentials */}
        <Certification />

        {/* Section 5: Campus Life & Facilities */}
        <CampusLife />

        {/* Section 7: FAQs */}
        <Faqs />
      </main>

      {/* Global OD AI HUB Footer */}
      <Footer />

      {/* Floating Bottom Section Navigation */}
      <FloatingNav />
    </div>
  );
}
