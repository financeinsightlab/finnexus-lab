import CalculatorPage, { generateMetadata as generateCalculatorMetadata } from '../[slug]/page';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata({ params: Promise.resolve({ slug: 'autonomous-workforce' }) });
}

export default async function AutonomousWorkforcePage() {
  return CalculatorPage({ params: Promise.resolve({ slug: 'autonomous-workforce' }) });
}
