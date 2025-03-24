"use client";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import UserEpicForm from "../user-epic/user-epic-form";

export function UserEpicDialogForm() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-blue-500 font-bold">Nueva épica de usuario</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nueva épica de usuario</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <UserEpicForm
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
