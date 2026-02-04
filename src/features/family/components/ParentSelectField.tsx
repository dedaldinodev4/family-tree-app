import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";
import { useMembers } from "../family.hooks";


export function ParentSelectField() {
  const { setValue, watch } = useFormContext();
  const { data: members } = useMembers();

  const parentId = watch("parentId");

  return (
    <div className="space-y-1">
      <Select
        value={parentId ?? "none"}
        onValueChange={(value) =>
          setValue("parentId", value === "none" ? null : value)
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Selecione um pai" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="none" className="text-foreground">
            Membro sem pai (raiz)
          </SelectItem>

          {members && members
          .map((member) => (
            <SelectItem key={member.id} value={`${member.id}`}>
               {member.parentId ? "↳ " : ""}
               {member.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
