import { redirect } from 'next/navigation';

export default function DiagnosticRedirect() {
  redirect('/placement-day-war-room?tab=diagnostic');
}
