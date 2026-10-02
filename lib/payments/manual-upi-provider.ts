export const MANUAL_UPI_PLANS = ['PRO', 'ELITE'] as const;
export type ManualUpiPlan = (typeof MANUAL_UPI_PLANS)[number];

export interface PaymentInstructions {
    provider: 'MANUAL_UPI';
    plan: ManualUpiPlan;
    amountMinor: number;
    currency: 'INR';
    amountLabel: string;
    periodLabel: '/month';
    upiId: string;
    qrPath: string;
}

/** Provider seam for future payment integrations; no provider SDK is loaded here. */
export interface PaymentProvider<TPlan extends string = string> {
    readonly method: string;
    supports(plan: string): plan is TPlan;
    instructions(plan: TPlan): PaymentInstructions;
}

const PRICE_MINOR: Record<ManualUpiPlan, number> = {
    PRO: 99_900,
    ELITE: 199_900,
};

const UPI_ID = 'sumitsingh7445@ptyes';
const QR_PATH = '/upi-qr.png';

function formatAmount(amountMinor: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amountMinor / 100);
}

export const manualUPIProvider: PaymentProvider<ManualUpiPlan> = {
    method: 'MANUAL_UPI',
    supports(plan: string): plan is ManualUpiPlan {
        return (MANUAL_UPI_PLANS as readonly string[]).includes(plan);
    },
    instructions(plan) {
        return {
            provider: 'MANUAL_UPI',
            plan,
            amountMinor: PRICE_MINOR[plan],
            currency: 'INR',
            amountLabel: formatAmount(PRICE_MINOR[plan]),
            periodLabel: '/month',
            upiId: UPI_ID,
            qrPath: QR_PATH,
        };
    },
};

/** Add one Asia/Kolkata calendar month, clamping month-end dates (Jan 31 → Feb 28/29). */
export function addCalendarMonth(from: Date): Date {
    // India has a fixed UTC+05:30 offset (no daylight-saving transitions).
    const indiaOffsetMs = (5 * 60 + 30) * 60 * 1000;
    const localCalendar = new Date(from.getTime() + indiaOffsetMs);
    const originalDay = localCalendar.getUTCDate();
    localCalendar.setUTCDate(1);
    localCalendar.setUTCMonth(localCalendar.getUTCMonth() + 1);
    const lastDayOfTargetMonth = new Date(Date.UTC(
        localCalendar.getUTCFullYear(),
        localCalendar.getUTCMonth() + 1,
        0,
    )).getUTCDate();
    localCalendar.setUTCDate(Math.min(originalDay, lastDayOfTargetMonth));
    return new Date(localCalendar.getTime() - indiaOffsetMs);
}

export function normalizeTransactionReference(value: string): string {
    return value.trim().replace(/\s+/g, '').toUpperCase();
}

export function isValidTransactionReference(value: string): boolean {
    return /^[A-Z0-9-]{6,64}$/.test(normalizeTransactionReference(value));
}
