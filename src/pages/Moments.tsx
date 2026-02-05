import { 
  useMoments, 
  useSaveMoment 
} from "@/features/moments/moments.hooks";
import { 
  AddMomentDialog 
} from "@/features/moments/components/AddMomentDialog";
import { 
  MomentsTimeline 
} from "@/features/moments/components/MomemtsTimeline";

export default function Moments () {
  const { data: moments = [] } = useMoments();
  const save = useSaveMoment();

  return (
    <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold">Momentos da Família</h1>
      <AddMomentDialog
        onAdd={(moment) => {
          save.mutate(moment);
        }}
      />
    </div>

    {moments.length === 0 ? (
      <p className="text-muted-foreground">Nenhum momento registrado.</p>
    ) : (
      <MomentsTimeline moments={moments} />
    )}
  </div>
  );
}
