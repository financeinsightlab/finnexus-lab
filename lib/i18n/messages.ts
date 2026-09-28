// lib/i18n/messages.ts — message catalogues (Pillar F2)
//
// Flat-dotted keys keep lookups simple and serialisable. Both locales must
// define the same key set; `translate` falls back to the default locale when a
// key is missing so partial translations never crash the UI.

import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n/config';

export const messages = {
    'en-IN': {
        'common.search': 'Search',
        'common.signIn': 'Sign In',
        'common.account': 'Account',
        'common.signOut': 'Sign Out',
        'common.dashboard': 'Dashboard',
        'common.adminPanel': 'Admin Panel',
        'common.signedInAs': 'Signed in as',
        'common.language': 'Language',

        'dashboard.welcome': 'Welcome back, {name}',
        'dashboard.continueLearning': 'Continue learning',
        'dashboard.streak': '{count}-day streak',
        'dashboard.newSince': 'New since your last visit',
        'dashboard.latest': 'Latest across the platform',
        'dashboard.allCaughtUp':
            "You're all caught up — nothing new since your last visit.",
        'dashboard.browseArchive': 'Browse the archive',
        'dashboard.savedArticles': 'Saved Articles',
        'dashboard.subscription': 'Subscription',
        'dashboard.upgrade': 'Upgrade to Pro',
    },
    'en-US': {
        'common.search': 'Search',
        'common.signIn': 'Sign In',
        'common.account': 'Account',
        'common.signOut': 'Sign Out',
        'common.dashboard': 'Dashboard',
        'common.adminPanel': 'Admin Panel',
        'common.signedInAs': 'Signed in as',
        'common.language': 'Language',

        'dashboard.welcome': 'Welcome back, {name}',
        'dashboard.continueLearning': 'Continue learning',
        'dashboard.streak': '{count}-day streak',
        'dashboard.newSince': 'New since your last visit',
        'dashboard.latest': 'Latest across the platform',
        'dashboard.allCaughtUp':
            "You're all caught up — nothing new since your last visit.",
        'dashboard.browseArchive': 'Browse the archive',
        'dashboard.savedArticles': 'Saved Articles',
        'dashboard.subscription': 'Subscription',
        'dashboard.upgrade': 'Upgrade to Pro',
    },
} as const satisfies Record<Locale, Record<string, string>>;

export type MessageKey = keyof (typeof messages)[typeof DEFAULT_LOCALE];

export function getMessages(locale: Locale): Record<string, string> {
    return messages[locale] ?? messages[DEFAULT_LOCALE];
}
