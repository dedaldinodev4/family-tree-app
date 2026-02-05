import { MotionConfig, motion } from "framer-motion";
import type { Moment } from "../moments.schema";
import { groupMomentsByYear } from "../utils/timeline";
import { MomentCard } from "./MomentCard";

export function MomentsTimeline({ moments }: { moments: Moment[] }) {
  const grouped = groupMomentsByYear(moments);

  return (
    <MotionConfig transition={{ duration: 0.4, ease: "easeOut" }}>
      <div className="space-y-10">
        {Object.entries(grouped)
          .sort(([a], [b]) => Number(b) - Number(a)) // anos decrescente
          .map(([year, items]) => (
            <motion.div
              key={year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl font-bold mb-4 relative">
                <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary" />
                {year}
              </h2>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((moment, index) => (
                  <motion.div
                    key={moment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <MomentCard moment={moment} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
      </div>
    </MotionConfig>
  );
}
