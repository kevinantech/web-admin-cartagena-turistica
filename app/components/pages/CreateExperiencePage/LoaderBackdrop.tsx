import { Loader2 } from "lucide-react";

export type LoaderBackdropProps = { open: boolean };
const LoaderBackdrop: React.FC<LoaderBackdropProps> = ({ open }) => {
  return open ? (
    <div className="absolute inset-0 z-10 h-full w-full bg-white/80 flex justify-center rounded-lg">
      <div className="fixed mt-8 w-fit  flex flex-col items-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-600" />
        <p className="text-sm text-gray-600">Creando plan turístico...</p>
      </div>
    </div>
  ) : null;
};

export { LoaderBackdrop };
