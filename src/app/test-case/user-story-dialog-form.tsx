"use client";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import UserStoryForm from "../user-story/user-story-form";

export function UserStoryDialogForm() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-blue-500 font-bold">Nueva historia de usuario</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nueva historia de usuario</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <UserStoryForm
            userEpicsList={[]}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
