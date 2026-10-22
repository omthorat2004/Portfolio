// Abacus-based counting is being replaced with IP-based unique counting
// (pending Upstash Redis provisioning). Showing 0 in the meantime.
export default function Visitors() {
  return (
    <p className="mt-4 flex flex-wrap gap-x-[18px] gap-y-1 font-sans text-[0.8125rem] text-muted">
      0 views · 0 visitors
    </p>
  );
}
