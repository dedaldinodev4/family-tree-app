import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function PhotoCarouselModal({
  open,
  onOpenChange,
  photos,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  photos: string[];
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <Carousel>
          <CarouselContent>
            {photos.map((photo, i) => (
              <CarouselItem key={i}>
                <img
                  src={photo}
                  className="h-[400px] w-full rounded-lg object-contain"
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}
