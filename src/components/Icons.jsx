const base = {
  width: 16,
  height: 16,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export const PlusIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)
export const SearchIcon = (p) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
)
export const SunIcon = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
)
export const MoonIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
)
export const DownloadIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3v12m0 0-4-4m4 4 4-4M4 21h16" />
  </svg>
)
export const UploadIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M12 15V3m0 0L8 7m4-4 4 4M4 21h16" />
  </svg>
)
export const PencilIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M4 20h4L19 9l-4-4L4 16v4z" />
  </svg>
)
export const TrashIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
  </svg>
)
export const XIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

// Small "in" badge used as the LinkedIn link
export const LinkedInBadge = ({ className = '' }) => (
  <span
    className={`inline-flex h-5 w-5 items-center justify-center rounded bg-[#0a66c2] text-[11px] font-bold leading-none text-white ${className}`}
    aria-hidden="true"
  >
    in
  </span>
)