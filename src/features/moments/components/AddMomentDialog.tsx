import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MomentForm } from "./MomentForm";
import type { Moment } from "../moments.schema";

export function AddMomentDialog({ onAdd }: { onAdd: (data: Moment) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Adicionar Momento</Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl">
        <MomentForm
          onSubmit={(data) => {
            onAdd(data);
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
