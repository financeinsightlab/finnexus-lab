import ToolsHubClient from '@/components/tools/ToolsHubClient';
import PromotionSlot from '@/components/promotions/PromotionSlot';

export type { Tool } from '@/lib/tools-registry';

/**
 * Tools hub. The interactive catalogue lives in a client component; the
 * promotion slots are rendered on the server and handed in as nodes so the
 * page stays cacheable and never fires per-page promotion API calls.
 */
export default function ToolsPage() {
  return (
    <ToolsHubClient
      topSlot={<PromotionSlot slot="TOOL_SECTION" path="/tools" />}
      bottomSlot={
        <>
          <PromotionSlot slot="CONTENT_BOTTOM" path="/tools" />
          <PromotionSlot slot="FOOTER" path="/tools" />
        </>
      }
    />
  );
}
