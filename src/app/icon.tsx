import { ImageResponse } from 'next/og'

export const size = {
  width: 120,
  height: 120,
}
export const contentType = 'image/svg+xml'

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '120px',
        height: '120px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '112px',
          height: '112px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #00a4e8 0%, #4f46e5 100%)',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{ color: '#fafafa' }}
          width={80}
          height={80}
          viewBox="0 0 24 24"
        >
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path strokeWidth="2" d="M8 12h.009m3.986 0h.01m3.986 0H16" />
            <path
              strokeWidth="1.5"
              d="M18 21c1.232 0 2.231-1.151 2.231-2.571c0-2.248-.1-3.743 1.442-5.52c.436-.502.436-1.316 0-1.818c-1.542-1.777-1.442-3.272-1.442-5.52C20.231 4.151 19.232 3 18 3M6 21c-1.232 0-2.231-1.151-2.231-2.571c0-2.248.1-3.743-1.442-5.52c-.436-.502-.436-1.316 0-1.818C3.835 9.352 3.769 7.84 3.769 5.57C3.769 4.151 4.768 3 6 3"
            />
          </g>
        </svg>
      </div>
    </div>,
    { ...size },
  )
}
