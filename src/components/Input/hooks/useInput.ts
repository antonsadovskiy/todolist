import { ChangeEvent, KeyboardEvent, useState } from "react";

export const useInput = (addItemHandler: (title: string) => void) => {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string>("");
  const isButtonDisabled = title.length === 0;

  const addItem = () => {
    if (title.trim()) {
      addItemHandler(title.trim());
      setTitle("");
    } else {
      setError("Title is required");
    }
  };

  const onClickHandler = () => addItem();

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError("");
    if (e.key === "Enter") {
      addItem();
    }
  };

  return {
    title,
    error,
    isButtonDisabled,
    onChangeHandler,
    onClickHandler,
    onKeyPressHandler,
  };
};
