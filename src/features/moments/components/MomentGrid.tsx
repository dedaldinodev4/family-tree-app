import type { Moment } from "../moments.schema";
import { MomentCard } from "./MomentCard";

export function MomentsGrid({ moments }: { moments: Moment[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {moments.map((moment) => (
        <MomentCard key={moment.id} moment={moment} />
      ))}
    </div>
  );
}
