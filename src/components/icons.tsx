import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width={32}
      height={32}
      {...props}
    >
      <g fill="currentColor">
        <path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88Z" />
        <path d="M168 88a40 40 0 0 0-72.36 24H88a8 8 0 0 0 0 16h8.06A40 40 0 1 0 168 88Zm0 64a24 24 0 1 1-23.33-21.23a8 8 0 0 0 7-5.54A8 8 0 0 0 144 120h-4.36A40.22 40.22 0 0 0 168 152Z" />
      </g>
    </svg>
  );
}
