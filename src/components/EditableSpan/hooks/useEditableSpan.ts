import { ChangeEvent, KeyboardEvent, useState } from "react";

export const useEditableSpan = (mainTitle: string, onChangeTitle: (newTitle: string) => void) => {

  const [title, setTitle] = useState<string>("");
  const [isEditModeOn, setIsEditModeOn] = useState<boolean>(false);

  const completeChanges = () => onChangeTitle(title);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onDoubleClickHandler = () => {
    setIsEditModeOn(true);
    setTitle(mainTitle);
  };
  const onBlurHandler = () => {
    setIsEditModeOn(false);
    completeChanges();
  };
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      completeChanges();
      setIsEditModeOn(false);
    }
  };

  return {
    title,
    isEditModeOn,
    onChangeHandler,
    onDoubleClickHandler,
    onBlurHandler,
    onKeyDownHandler
  };
};