import { cn } from "~/lib/utils";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className="grow place-content-center rounded-2xl text-center bg-white shadow-sm select-none">
      <img
        src="/app/components/icons/EmptyBox.svg"
        alt=""
        className={cn("mx-auto size-40", styles.img)}
      />
      <p className="mb-1 md:text-lg text-foreground">No hay planes turísticos todavía</p>
      <p className="text-sm md:text-base text-muted-foreground">
        Comienza creando tu primer plan turístico.
      </p>
    </div>
  );
};

export { NotFound };
