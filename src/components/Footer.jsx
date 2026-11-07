import React from 'react';
import ScrollTextReveal from './ScrollTextReveal';
import ScrollRevealItem from './ScrollRevealItem';
import ScrollImage from './ScrollImage';

export default function Footer() {
  const offerings = [
    { name: 'OD AI HUB Academy', href: '#od-ai-hub-academy' },
    { name: 'OD AI HUB Data Science & ML', href: '#od-ai-hub-ds-ml' },
    { name: 'OD AI HUB', href: '#od-ai-hub' },
    { name: 'OD AI HUB School of Business', href: '#od-ai-hub-business' },
    { name: 'OD AI HUB Neovarsity', href: '#od-ai-hub-neovarsity' },
  ];

  const resources = [
    { name: 'Topics', href: '#topics' },
    { name: 'Events', href: '#events' },
    { name: 'Blogs', href: '#blogs' },
    { name: 'OD AI HUB Alumni', href: '#od-ai-hub-alumni' },
  ];

  const teachAtOdAiHub = [
    { name: 'Become a Mentor', href: '#become-mentor' },
    { name: 'Become a TA', href: '#become-ta' },
    { name: 'Become a Career Coach', href: '#become-coach' },
  ];

  const company = [
    { name: 'Blog', href: '#blog' },
    { name: 'About us', href: '#about-us' },
    { name: 'Contact Us', href: '#contact-us' },
    { name: 'Careers', href: '#careers' },
  ];

  const other = [
    { name: 'Review', href: '#review' },
    { name: 'Terms of Use', href: '#terms' },
    { name: 'Privacy Policy', href: '#privacy' },
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/odaihub/',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/c/ODAIHUB',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/school/od-ai-hub/',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      ),
    },
    {
      name: 'Twitter/X',
      href: 'https://twitter.com/od_ai_hub',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/od_ai_hub/',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: 'Quora',
      href: 'https://www.quora.com/topic/OD-AI-HUB',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 4.84 3.44 8.87 8 9.8v-2.1c-3.4-.8-6-3.8-6-7.7 0-4.4 3.6-8 8-8s8 3.6 8 8c0 3.9-2.6 6.9-6 7.7v2.1c4.56-.93 8-4.96 8-9.8 0-5.52-4.48-10-10-10zm-1 16.5v-3h2v3h-2z" />
        </svg>
      ),
    },
  ];

  return (
    <footer 
      className="w-full bg-[#111111] text-gray-300 pt-14 sm:pt-20 pb-28 sm:pb-32 border-t border-gray-800"
    >
      <div className="max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 5-Column Grid with Staggered Scroll Entrance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-8">
          
          {/* Column 1 – Branding & App Download */}
          <ScrollRevealItem
            staggerIndex={0}
            yOffset={24}
            scaleInitial={0.97}
            initialOpacity={0.35}
            startOffset={0.96}
            endOffset={0.70}
            className="space-y-4 sm:space-y-5 sm:col-span-2 lg:col-span-1"
          >
            {/* OD AI HUB Logo Area with Scroll Scale */}
            <ScrollImage
              scaleFrom={0.94}
              opacityFrom={0.4}
              parallaxDistance={8}
              className="rounded-md"
            >
              <div 
                className="w-40 sm:w-44 h-11 sm:h-12 border border-dashed border-gray-700 rounded-md bg-black/40 flex items-center justify-center text-xs text-gray-400 font-medium select-none transition-transform hover:border-gray-500"
                title="OD AI HUB Logo"
                aria-label="OD AI HUB Logo Placeholder"
              >
                {/* OD AI HUB Logo Placeholder */}
              </div>
            </ScrollImage>

            {/* Tagline with Continuous Scroll Reveal */}
            <ScrollTextReveal
              as="p"
              startOffset={0.94}
              endOffset={0.68}
              className="text-sm font-bold text-gray-200 tracking-wide block"
            >
              #CreateImpact
            </ScrollTextReveal>

            {/* App Download Area */}
            <div className="pt-2 space-y-3">
              <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wider">
                Download our App
              </span>
              
              <div className="flex items-center gap-3">
                {/* QR Code Container with Scroll Image Scale */}
                <ScrollImage
                  scaleFrom={0.94}
                  opacityFrom={0.4}
                  parallaxDistance={8}
                  className="rounded-md"
                >
                  <div 
                    className="w-18 h-18 sm:w-20 sm:h-20 rounded-md border border-dashed border-gray-700 bg-black/50 flex items-center justify-center text-[10px] text-gray-500 text-center px-1 transition-transform hover:border-gray-500"
                    title="App Download QR Code Placeholder"
                    aria-label="App QR Code"
                  >
                    {/* QR Code Placeholder */}
                  </div>
                </ScrollImage>

                {/* Google Play Download Badge with Scroll Image Scale */}
                <ScrollImage
                  scaleFrom={0.94}
                  opacityFrom={0.4}
                  parallaxDistance={8}
                  className="rounded-md"
                >
                  <div 
                    className="w-28 sm:w-32 h-9 sm:h-10 rounded-md border border-dashed border-gray-700 bg-black/50 flex items-center justify-center text-[10px] sm:text-[11px] text-gray-400 font-medium text-center transition-transform hover:border-gray-500"
                    title="Google Play Badge Placeholder"
                    aria-label="Google Play Badge"
                  >
                    {/* Google Play Badge */}
                  </div>
                </ScrollImage>
              </div>
            </div>
          </ScrollRevealItem>

          {/* Column 2 – Our Offerings */}
          <ScrollRevealItem
            staggerIndex={1}
            yOffset={24}
            scaleInitial={0.97}
            initialOpacity={0.35}
            startOffset={0.96}
            endOffset={0.70}
            className="space-y-3.5 sm:space-y-4"
          >
            <ScrollTextReveal
              as="h4"
              startOffset={0.94}
              endOffset={0.68}
              className="text-[#A9D5FF] font-bold text-xs sm:text-sm tracking-wider uppercase block"
            >
              Our Offerings
            </ScrollTextReveal>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm">
              {offerings.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white hover:translate-x-0.5 transition-all duration-150 inline-block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-400 rounded"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </ScrollRevealItem>

          {/* Column 3 – Resources & Teach at OD AI HUB */}
          <ScrollRevealItem
            staggerIndex={2}
            yOffset={24}
            scaleInitial={0.97}
            initialOpacity={0.35}
            startOffset={0.96}
            endOffset={0.70}
            className="space-y-6 sm:space-y-8"
          >
            <div className="space-y-3.5 sm:space-y-4">
              <ScrollTextReveal
                as="h4"
                startOffset={0.94}
                endOffset={0.68}
                className="text-[#A9D5FF] font-bold text-xs sm:text-sm tracking-wider uppercase block"
              >
                Resources
              </ScrollTextReveal>
              <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm">
                {resources.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white hover:translate-x-0.5 transition-all duration-150 inline-block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-400 rounded"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3.5 sm:space-y-4 pt-1">
              <ScrollTextReveal
                as="h4"
                startOffset={0.94}
                endOffset={0.68}
                className="text-[#A9D5FF] font-bold text-xs sm:text-sm tracking-wider uppercase block"
              >
                Teach at OD AI HUB
              </ScrollTextReveal>
              <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm">
                {teachAtOdAiHub.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white hover:translate-x-0.5 transition-all duration-150 inline-block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-400 rounded"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollRevealItem>

          {/* Column 4 – Company & Follow us on */}
          <ScrollRevealItem
            staggerIndex={3}
            yOffset={24}
            scaleInitial={0.97}
            initialOpacity={0.35}
            startOffset={0.96}
            endOffset={0.70}
            className="space-y-6 sm:space-y-8"
          >
            <div className="space-y-3.5 sm:space-y-4">
              <ScrollTextReveal
                as="h4"
                startOffset={0.94}
                endOffset={0.68}
                className="text-[#A9D5FF] font-bold text-xs sm:text-sm tracking-wider uppercase block"
              >
                Company
              </ScrollTextReveal>
              <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm">
                {company.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white hover:translate-x-0.5 transition-all duration-150 inline-block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-400 rounded"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3.5 sm:space-y-4 pt-1">
              <ScrollTextReveal
                as="h4"
                startOffset={0.94}
                endOffset={0.68}
                className="text-[#A9D5FF] font-bold text-xs sm:text-sm tracking-wider uppercase block"
              >
                Follow us on
              </ScrollTextReveal>
              <div className="flex items-center gap-3.5 text-gray-400">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white hover:scale-110 active:scale-95 transition-all duration-150 p-1 -m-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-400 rounded"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </ScrollRevealItem>

          {/* Column 5 – Other */}
          <ScrollRevealItem
            staggerIndex={4}
            yOffset={24}
            scaleInitial={0.97}
            initialOpacity={0.35}
            startOffset={0.96}
            endOffset={0.70}
            className="space-y-3.5 sm:space-y-4"
          >
            <ScrollTextReveal
              as="h4"
              startOffset={0.94}
              endOffset={0.68}
              className="text-[#A9D5FF] font-bold text-xs sm:text-sm tracking-wider uppercase block"
            >
              Other
            </ScrollTextReveal>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm">
              {other.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white hover:translate-x-0.5 transition-all duration-150 inline-block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-400 rounded"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </ScrollRevealItem>

        </div>

        {/* Bottom Section: Divider, Disclaimer & Copyright with Continuous Scroll Reveal */}
        <ScrollRevealItem
          yOffset={16}
          scaleInitial={0.99}
          initialOpacity={0.4}
          startOffset={0.98}
          endOffset={0.80}
          className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-gray-800/80 text-center space-y-3 text-[11px] sm:text-xs text-gray-500"
        >
          <ScrollTextReveal
            as="p"
            startOffset={0.98}
            endOffset={0.75}
            className="max-w-3xl mx-auto leading-relaxed px-2 block"
          >
            OD AI HUB offers a certificate-based program. It is not a university/college and does not confer degrees.
          </ScrollTextReveal>
          <p className="text-gray-400 font-medium">
            © {new Date().getFullYear()} OD AI HUB. All rights reserved.
          </p>
        </ScrollRevealItem>

      </div>
    </footer>
  );
}
