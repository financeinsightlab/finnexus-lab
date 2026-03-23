import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white mt-24">
      <div className="wrap py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-1 font-bold text-xl mb-4">
              <span className="text-brand-teal">FinNexus</span>
              <span className="text-brand-gold">Lab</span>
            </Link>
            <p className="text-gray-300 mb-2">Financial Intelligence Platform delivering data-driven insights</p>
            <p className="italic text-gray-400">Rigorous. Precise. Useful.</p>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Platform</h3>
            <ul className="space-y-2">
              {['Research', 'Insights', 'Tools', 'Services', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="text-sm text-gray-300 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://linkedin.com/in/YOUR-PROFILE" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-300 hover:text-white transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="mailto:hello@finnexuslab.com" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Email
                </a>
              </li>
              <li>
                <Link href="/resume" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Resume
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-10 pt-6">
        <div className="wrap flex justify-between items-center">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} FinNexus Lab. All rights reserved.</p>
          <p className="text-sm italic text-gray-400">Financial Intelligence for Markets, Strategy & Data</p>
        </div>
      </div>
    </footer>
  );
}