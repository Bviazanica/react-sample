import { Input } from "baseui/input";
import { FormControl } from "baseui/form-control";
import { useStyletron } from "baseui";
import { Button } from "baseui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getTodoEntryList,
  createTodoEntry,
  removeTodoEntry,
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

  const { mutate: removeTodoEntryMutation } = useMutation({
    mutationFn: async (id: number) => removeTodoEntry(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [getTodoEntryList.name] });
    },
  });

  const { mutate: createTodoEntryMutation } = useMutation({
    mutationFn: async ({ id, value }: { id: number; value: string }) =>
      createTodoEntry({ id, value }),
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
    <div
      className={css({
        padding: "2rem 0",
      })}
    >
      <FormControl
        label={() => "What do you have to do?"}
        overrides={{
          Label: {
            style: {
              color: theme.colors.white,
            },
          },
        }}
      >
        <div
          className={css({
            padding: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          })}
        >
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button
            disabled={!inputValue}
            overrides={{
              Root: {
                style: {
                  margin: "0.5rem",
                },
              },
            }}
            onClick={() =>
              createTodoEntryMutation({
                id: todoEntries.length,
                value: inputValue,
              })
            }
          >
            Add
          </Button>
        </div>
      </FormControl>
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        })}
      >
        {todoEntries?.map(({ id, value }) => (
          <div
            key={id}
            className={css({
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "1rem",
              justifyContent: "space-between",
              backgroundColor: theme.colors.primary500,
              padding: "1rem",
              borderRadius: "1rem",
            })}
          >
            <Checkbox />
            {editingEntryId === id && (
              <Input
                value={editingEntryValue}
                onChange={(e) => setEditingEntryValue(e.target.value)}
              />
            )}
            {editingEntryId !== id && <div>{value}</div>}
            <div
              className={css({
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "0.5rem",
              })}
            >
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
              <Button
                onClick={() => removeTodoEntryMutation(id)}
                overrides={{
                  Root: {
                    style: {
                      backgroundColor: theme.colors.negative500,
                      ":hover": {
                        backgroundColor: theme.colors.negative400,
                      },
                    },
                  },
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { TodoList };
