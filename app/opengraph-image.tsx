/* eslint-disable react/no-unknown-property, @next/next/no-img-element */
// FILE: app/opengraph-image.tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'FinNexus Lab — Financial Intelligence Platform';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#1A2B3C',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* Decorative grid overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              linear-gradient(rgba(56, 189, 248, 0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(56, 189, 248, 0.04) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Decorative radial circle */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(56, 189, 248, 0.1) 0%, transparent 70%)',
          }}
        />

        {/* Content */}
        <p
          style={{
            color: '#38BDF8',
            fontSize: '18px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            margin: '0 0 20px 0',
          }}
        >
          Financial Intelligence Platform
        </p>

        <h1
          style={{
            color: '#FFFFFF',
            fontSize: '72px',
            fontWeight: '800',
            margin: '0 0 20px 0',
            lineHeight: '1.1',
          }}
        >
          FinNexus{' '}
          <span style={{ color: '#38BDF8' }}>Lab</span>
        </h1>

        <p
          style={{
            color: '#9CA3AF',
            fontSize: '26px',
            lineHeight: '1.5',
            margin: '0 0 40px 0',
            maxWidth: '600px',
          }}
        >
          Data-Driven Insights on Markets, Strategy & Capital
        </p>

        {/* Stats row */}
        <div
          style={{
            display: 'flex',
            gap: '40px',
            marginTop: 'auto',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                color: '#FFFFFF',
                fontSize: '32px',
                fontWeight: 'bold',
                marginBottom: '4px',
              }}
            >
              10+
            </div>
            <div
              style={{
                color: '#9CA3AF',
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Reports
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                color: '#FFFFFF',
                fontSize: '32px',
                fontWeight: 'bold',
                marginBottom: '4px',
              }}
            >
              ₹1T+
            </div>
            <div
              style={{
                color: '#9CA3AF',
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Market Cap
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                color: '#FFFFFF',
                fontSize: '32px',
                fontWeight: 'bold',
                marginBottom: '4px',
              }}
            >
              Free
            </div>
            <div
              style={{
                color: '#9CA3AF',
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Always
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}