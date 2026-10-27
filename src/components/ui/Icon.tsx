import type { SVGProps } from "react";
const paths: Record<string, string[]> = {
  arrow: ["M4 12h16", "m14 6 6 6-6 6"],
  diagonal: ["M5 19 19 5", "M5 5h14v14"],
  code: ["m8 7-5 5 5 5", "m16 7 5 5-5 5", "m14 4-4 16"],
  flow: ["M4 3h6v6H4z", "M14 15h6v6h-6z", "M7 9v8h7", "M10 6h7v9"],
  spark: ["m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5Z"],
  layers: ["m12 3 10 5-10 5L2 8Z", "m2 12 10 5 10-5", "m2 16 10 5 10-5"],
  check: ["m5 12 4 4L19 6"],
  menu: ["M4 7h16", "M4 17h16"],
  close: ["m6 6 12 12", "M18 6 6 18"],
};
export function Icon({
  name,
  ...props
}: SVGProps<SVGSVGElement> & { name: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {(paths[name] ?? paths.arrow).map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
