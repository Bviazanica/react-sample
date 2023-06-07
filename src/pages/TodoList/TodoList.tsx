import { Input } from "baseui/input";
import { FormControl } from "baseui/form-control";
import { styled, useStyletron } from "baseui";
import { Button } from "baseui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getTodoEntryList,
  createTodoEntry,
  updateTodoEntry,
} from "../../api/todo-entry";
import { useState } from "react";
import { Checkbox } from "../../components/Checkbox";

const TodoList = () => {
  const [css, theme] = useStyletron();
  const queryClient = useQueryClient();

  const [inputValue, setInputValue] = useState("");
  const [editingEntryValue, setEditingEntryValue] = useState("");
  const [editingEntryId, setEditingEntryId] = useState<null | number>(null);

  const { data: todoEntries = [] } = useQuery({
    queryKey: [getTodoEntryList.name],
    queryFn: getTodoEntryList,
  });

  const latestIdInEntries = Math.max(...todoEntries.map(({ id }) => id), 1);
  const [latestId, setLatestId] = useState(latestIdInEntries);

  const { mutate: createTodoEntryMutation } = useMutation({
    mutationFn: async ({ id, value }: { id: number; value: string }) => {
      createTodoEntry({ id, value }), setLatestId(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [getTodoEntryList.name] });
      setInputValue("");
    },
  });

  const { mutate: updateTodoEntryMutation } = useMutation({
    mutationFn: async ({
      entryId,
      newValue,
    }: {
      entryId: number;
      newValue: string;
    }) => updateTodoEntry({ entryId, newValue }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [getTodoEntryList.name] });
    },
  });

  return (
    <div>
      <FormControl
        label={() => "What do you have to do?"}
        overrides={{
          ControlContainer: {
            style: {
              width: "22rem",
            },
          },
          Label: {
            style: {
              color: theme.colors.white,
            },
          },
        }}
      >
        <InputWrapper>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button
            disabled={!inputValue}
            overrides={{
              Root: {
                style: {
                  margin: "0 0 0 0.5rem",
                },
              },
            }}
            onClick={() =>
              createTodoEntryMutation({
                id: latestId + 1,
                value: inputValue,
              })
            }
          >
            Add
          </Button>
        </InputWrapper>
      </FormControl>
      <EntryWrapper>
        {todoEntries?.map(({ id, value }) => (
          <Entry key={id}>
            <Checkbox
              entryId={id}
              setEditingEntryId={setEditingEntryId}
              setEditingEntryValue={setEditingEntryValue}
            />
            {editingEntryId === id && (
              <Input
                value={editingEntryValue}
                onChange={(e) => setEditingEntryValue(e.target.value)}
              />
            )}
            {editingEntryId !== id && <div>{value}</div>}
            <EntryContent>
              {editingEntryId !== id && (
                <Button
                  onClick={() => {
                    setEditingEntryId(id);
                    setEditingEntryValue(value);
                  }}
                  overrides={{
                    Root: {
                      style: {
                        backgroundColor: theme.colors.primary700,
                        ":hover": {
                          backgroundColor: theme.colors.primary600,
                        },
                      },
                    },
                  }}
                >
                  Edit
                </Button>
              )}
              {editingEntryId === id && (
                <Button
                  onClick={() => {
                    updateTodoEntryMutation({
                      entryId: id,
                      newValue: editingEntryValue,
                    });
                    setEditingEntryId(null);
                    setEditingEntryValue("");
                  }}
                  overrides={{
                    Root: {
                      style: {
                        backgroundColor: theme.colors.positive700,
                        ":hover": {
                          backgroundColor: theme.colors.positive600,
                        },
                      },
                    },
                  }}
                >
                  Confirm
                </Button>
              )}
            </EntryContent>
          </Entry>
        ))}
      </EntryWrapper>
    </div>
  );
};

const InputWrapper = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const EntryWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const Entry = styled("div", ({ $theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "1rem",
  justifyContent: "space-between",
  backgroundColor: $theme.colors.primary500,
  padding: "1rem",
  borderRadius: "1rem",
  width: "20rem",
}));

const EntryContent = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "0.5rem",
});

export { TodoList };
