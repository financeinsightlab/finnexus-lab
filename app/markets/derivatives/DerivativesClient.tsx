'use client';

import React from 'react';
import OptionsChainView from '@/components/markets/OptionsChainView';
import FiiDiiFlowsView from '@/components/markets/FiiDiiFlowsView';

export default function DerivativesClient() {
  return (
    <div className="space-y-6">
      {/* 1. NIFTY Options Chain Matrix */}
      <OptionsChainView />

      {/* 2. Institutional Cash & F&O Flows */}
      <div className="pt-4 border-t border-neutral-800">
        <div className="mb-4">
          <h3 className="text-base font-bold text-white tracking-wide uppercase font-mono flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            Institutional Participation Dynamics (FII / DII)
          </h3>
          <p className="text-xs text-neutral-400 font-sans mt-0.5">
            Daily net institutional position changes, domestic absorption power, and rollover metrics.
          </p>
        </div>

        <FiiDiiFlowsView />
      </div>
    </div>
  );
}

