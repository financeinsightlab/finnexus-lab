// lib/promotions — promotion delivery engine.
//
// Server components and route handlers import from here. Client components
// must import the pure modules directly:
//   '@/lib/promotions/catalog'   vocabulary (slots, page types, modes)
//   '@/lib/promotions/targeting' rule evaluation + rotation (pure)
//   '@/lib/promotions/href'      outbound link + UTM handling (pure)
//   '@/lib/promotions/display'   device/theme CSS + frequency capping (client-safe)

export * from './catalog';
export * from './targeting';
export * from './href';
export * from './engine';
