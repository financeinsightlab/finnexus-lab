import { Metadata } from "next"
import SettingsClient from "./SettingsClient"

export const metadata: Metadata = {
  title: "Lead Engine Settings | FinNexus Admin",
}

export default function LeadsSettingsPage() {
  return <SettingsClient />
}