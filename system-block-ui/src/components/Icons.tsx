import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const Icon = ({ children, ...props }: IconProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    height="18"
    viewBox="0 0 24 24"
    width="18"
    {...props}
  >
    {children}
  </svg>
);

export const CircuitIcon = (props: IconProps) => (
  <Icon {...props}>
    <path
      d="M5 5h4m6 0h4M5 19h4m6 0h4M5 5v14m14-14v14M9 5v5h6V5m-6 14v-5h6v5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
    <circle cx="5" cy="5" fill="currentColor" r="1.5" />
    <circle cx="19" cy="5" fill="currentColor" r="1.5" />
    <circle cx="5" cy="19" fill="currentColor" r="1.5" />
    <circle cx="19" cy="19" fill="currentColor" r="1.5" />
  </Icon>
);

export const SearchIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="m16 16 4 4"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.8"
    />
  </Icon>
);

export const CodeIcon = (props: IconProps) => (
  <Icon {...props}>
    <path
      d="m8.5 7-5 5 5 5M15.5 7l5 5-5 5M13.5 4l-3 16"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
  </Icon>
);

export const SparkIcon = (props: IconProps) => (
  <Icon {...props}>
    <path
      d="m13 2-2 7H5l5 3-2 8 9-11h-6l2-7Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
  </Icon>
);

export const PdfIcon = (props: IconProps) => (
  <Icon {...props}>
    <path
      d="M6 2h8l4 4v16H6V2Z"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
    <path
      d="M14 2v5h5M9 12h6M9 16h4"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.8"
    />
  </Icon>
);

export const CopyIcon = (props: IconProps) => (
  <Icon {...props}>
    <rect
      height="12"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.8"
      width="12"
      x="8"
      y="8"
    />
    <path
      d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.8"
    />
  </Icon>
);

export const ResetIcon = (props: IconProps) => (
  <Icon {...props}>
    <path
      d="M4 8V3m0 0h5M4 3l4 4a8 8 0 1 1-2.1 8"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
  </Icon>
);

export const FitIcon = (props: IconProps) => (
  <Icon {...props}>
    <path
      d="M9 4H4v5m11-5h5v5M9 20H4v-5m11 5h5v-5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
  </Icon>
);

export const PlusIcon = (props: IconProps) => (
  <Icon {...props}>
    <path
      d="M12 5v14M5 12h14"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.8"
    />
  </Icon>
);

export const WarningIcon = (props: IconProps) => (
  <Icon {...props}>
    <path
      d="m12 3 10 18H2L12 3Z"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
    <path
      d="M12 9v5m0 3h.01"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.8"
    />
  </Icon>
);
