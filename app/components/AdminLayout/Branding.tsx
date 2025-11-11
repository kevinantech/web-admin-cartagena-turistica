import { cn } from "~/lib/utils";
export type BrandingProps = { variant?: "header" };

const Branding: React.FC<BrandingProps> = ({ variant }) => {
  return (
    <div className={cn({ "hidden lg:block": variant === "header" })}>
      <h1 className="text-foreground font-bold">VISITA CARTAGENA</h1>
      <span className="block text-xs text-foreground font-medium">Administrador</span>
    </div>
  );
};

export { Branding };
