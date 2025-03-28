"use client";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import EnvironmentForm from "../environment/environment-form";

export function EnvironmentDialogForm() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-blue-500 font-bold">Nuevo entorno</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nuevo entorno</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <EnvironmentForm
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
