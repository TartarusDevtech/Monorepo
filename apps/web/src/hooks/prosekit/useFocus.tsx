import type { EditorExtension } from "@/helpers/prosekit/extension";
import type { Editor } from "prosekit/core";
import { useEffect } from "react";

const useFocus = (editor: Editor<EditorExtension>, isComment: boolean) => {
  useEffect(() => {
    if (!isComment) {
      editor.focus();
    }
  }, [editor, isComment]);
};

export default useFocus;
