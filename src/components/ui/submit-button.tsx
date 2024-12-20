import { Loader2, SaveIcon } from "lucide-react";
import { Button } from "./button";

export default function SubmitButton({ isSubmitting }: { isSubmitting: boolean }) {
    return (
        <Button aria-disabled={isSubmitting} disabled={isSubmitting} type="submit" className="gap-1" variant={"default"}>
            {!isSubmitting ?
                <>
                    <SaveIcon size={18} />
                    Guardar
                </>
                :
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Guardando
                </>
            }
        </Button>
    )
}