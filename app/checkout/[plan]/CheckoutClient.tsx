'use client';

import { useState } from 'react';

interface CheckoutClientProps {
    plan: string;
    planName: string;
    price: string;
    period: string;
    configured: boolean;
    missing: string[];
    signedIn: boolean;
}

export default function CheckoutClient({
    plan,
    planName,
    price,
    period,
    signedIn,
}: CheckoutClientProps) {
    return (
        <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-white/10 dark:bg-[#111c31]">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 dark:text-teal-400">
                {planName}
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                {price}
                <span className="text-base font-normal text-slate-500">{period}</span>
            </h1>

            {!signedIn ? (
                <>
                    <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
                        Sign in to continue to payment.
                    </p>
                    <a
                        href={`/auth/signin?callbackUrl=/checkout/${plan.toLowerCase()}`}
                        className="mt-6 inline-block rounded-lg bg-teal-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
                    >
                        Sign in to upgrade
                    </a>
                </>
            ) : (
                <div className="mt-6">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-4">
                        Scan the QR code to pay via UPI
                    </p>
                    {/* Provided QR code for the UPI ID */}
                    <img 
                        src="/upi-qr.png" 
                        alt="UPI QR Code" 
                        className="mx-auto w-64 h-auto border border-slate-200 p-2 rounded-xl bg-white"
                    />
                    <p className="mt-4 text-base font-semibold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 py-2 rounded-lg">
                        UPI ID: <span className="text-teal-600 dark:text-teal-400">sumitsingh7445@ptyes</span>
                    </p>
                    
                    <div className="mt-6 rounded-xl border border-teal-100 bg-teal-50 p-4 dark:border-teal-900/30 dark:bg-teal-900/20 text-left">
                        <p className="text-sm text-teal-800 dark:text-teal-200">
                            <strong>Next Steps:</strong>
                            <br /><br />
                            After completing the payment, please send the payment screenshot for confirmation and account activation to:
                        </p>
                        <a href="mailto:kunwaranalytics@gmail.com" className="font-bold text-teal-700 dark:text-teal-300 underline mt-3 block text-center text-lg">
                            kunwaranalytics@gmail.com
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
