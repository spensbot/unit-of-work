import migrate from "./migrate";
import { resetState, store } from "./store"

const EXTENSION = ".uow"

const filePickerAcceptTypes: FilePickerAcceptType[] = [
  {
    description: "Unit of Work files (json)",
    accept: { "application/json": [EXTENSION] },
  }
]

export async function saveToFile() {
  const currentState = store.getState();
  const fileHandle = await window.showSaveFilePicker({
    suggestedName: `${currentState.portfolio.name}${EXTENSION}`,
    types: filePickerAcceptTypes,
  });

  const writable = await fileHandle.createWritable();
  await writable.write(JSON.stringify(currentState, null, 2));
  await writable.close();
}

export async function loadFromFile() {
  const [fileHandle] = await window.showOpenFilePicker({
    types: filePickerAcceptTypes,
  });

  const file = await fileHandle.getFile();
  const fileContents = await file.text();
  const loadedState = JSON.parse(fileContents);

  store.dispatch(resetState(migrate(loadedState)));
}