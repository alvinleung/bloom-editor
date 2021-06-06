import { useEffect, useRef } from "react";

export const useFileDrop = (
  acceptFileTypes: string[],
  fileDropHandler: (file: File) => void
) => {
  const dropAreaRef = useRef<HTMLDivElement>();
  useEffect(() => {
    const dropArea = dropAreaRef.current;
    // const acceptFileTypes = ["image/png", "image/jpg"];

    let didCancel = false;

    const handleDragOver = (event) => {
      event.stopPropagation();
      event.preventDefault();
      // Style the drag-and-drop as a "copy file" operation.
      event.dataTransfer.dropEffect = "copy";
    };

    const handleDrop = (event) => {
      event.stopPropagation();
      event.preventDefault();
      const fileList = event.dataTransfer.files;
      const droppedFiles: FileList = fileList;

      console.log(event.dataTransfer.files);

      // droppedFiles.forEach((droppedFile) => {

      for (let i = 0; i < droppedFiles.length; i++) {
        const droppedFile = droppedFiles[i];

        const needFileTypeCheck =
          acceptFileTypes !== null && acceptFileTypes[0] !== "*";

        if (needFileTypeCheck) {
          // typecheck the scene file
          if (!droppedFile.type) {
            console.warn("File type undefined, abort handling file drop.");
            return;
          }
          const isFileTypeAcceptable = acceptFileTypes.some((fileType) =>
            droppedFile.type.startsWith(fileType)
          );

          if (!isFileTypeAcceptable) {
            console.log(
              `File is not a ${acceptFileTypes} file.`,
              droppedFile.type,
              droppedFile
            );
            return;
          }
        }

        fileDropHandler && fileDropHandler(droppedFile);
      }
    };

    dropArea.addEventListener("dragover", handleDragOver);
    dropArea.addEventListener("drop", handleDrop);

    return () => {
      didCancel = true;
      dropArea.removeEventListener("dragover", handleDragOver);
      dropArea.removeEventListener("drop", handleDrop);
    };
  }, [fileDropHandler]);

  return dropAreaRef;
};
