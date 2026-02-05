import { motion } from "framer-motion";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import type { Moment } from "../moments.schema";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { PhotoCarouselModal } from "./PhotoCarrouselModal";

export function MomentCard({ moment }: { moment: Moment }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
      >
        <Card className="overflow-hidden">
          <img
            src={moment.photos[0]}
            onClick={() => setOpen(true)}
            className="h-48 w-full object-cover cursor-pointer"
          />

          <CardContent className="space-y-2 p-4">
            <h3 className="font-semibold">{moment.title}</h3>

            <p className="text-xs text-muted-foreground">
              {format(new Date(moment.date), "dd/MM/yyyy", {
                locale: ptBR,
              })}
            </p>

            {moment.description && (
              <p className="text-sm text-muted-foreground">
                {moment.description}
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <PhotoCarouselModal
        open={open}
        onOpenChange={setOpen}
        photos={moment.photos}
      />
    </>
  );
}
