import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Checkbox as BaseCheckbox, LABEL_PLACEMENT } from "baseui/checkbox";
import { Dispatch, SetStateAction, useState } from "react";
import { getTodoEntryList, removeTodoEntry } from "../../api/todo-entry";

export const Checkbox: React.FC<{
  entryId: number;
  setEditingEntryId: Dispatch<SetStateAction<null | number>>;
  setEditingEntryValue: Dispatch<SetStateAction<string>>;
}> = ({ entryId, setEditingEntryId, setEditingEntryValue }) => {
  const [checked, setChecked] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: removeTodoEntryMutation } = useMutation({
    mutationFn: async () => removeTodoEntry(entryId),
    onSuccess: () => {
      setEditingEntryId(null);
      setEditingEntryValue("");
      queryClient.invalidateQueries({ queryKey: [getTodoEntryList.name] });
    },
  });

  return (
    <BaseCheckbox
      checked={checked}
      onChange={(e) => {
        if (e.target.checked) {
          setChecked(e.target.checked);
          removeTodoEntryMutation();
        }
      }}
      labelPlacement={LABEL_PLACEMENT.right}
    />
  );
};
