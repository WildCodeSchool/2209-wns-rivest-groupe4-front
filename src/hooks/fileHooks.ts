/* eslint-disable @typescript-eslint/no-non-null-assertion */
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { ExistingProjectQueryResult } from "../container/EditorContainer/types";
import IFolderTree from "../interfaces/IFolderTree";

const extractFileNameFromImport = (line: string) => {
  const regexWithBraces =
    /import\s+(?:\{.*\}|[\w\d_]+)\s+from\s+['"](.*)['"];?/;
  const regexWithoutBraces = /import\s+(?:[\w\d_]+)\s+from\s+['"](.*)['"];?/;

  const matchWithBraces = line.match(regexWithBraces);
  if (matchWithBraces) {
    const filePath = matchWithBraces[1];
    const fileNameWithExtension = filePath.split("/").pop() || "";
    const fileName = fileNameWithExtension.split(".").shift() || "";
    return fileName;
  }

  const matchWithoutBraces = line.match(regexWithoutBraces);
  if (matchWithoutBraces) {
    const filePath = matchWithoutBraces[1];
    const fileNameWithExtension = filePath.split("/").pop() || "";
    const fileName = fileNameWithExtension.split(".").shift() || "";
    return fileName;
  }

  return "";
};

const extractExportedVariable = (line: string) => {
  return line.replace("export", "");
};

const findFileContent = (
  project: ExistingProjectQueryResult,
  fileName: string,
) => {
  for (const folder of project.getAllFoldersByProjectId) {
    if (folder.files) {
      for (const file of folder.files) {
        if (file.name === fileName) {
          return file.content;
        }
      }
    }
  }
  return null;
};

const getImportedFiles = (
  code: string,
  project: ExistingProjectQueryResult,
) => {
  const importedFiles: string[] = [];

  const lines = code.split("\n");
  for (const line of lines) {
    if (line.includes("import")) {
      const fileName = extractFileNameFromImport(line);
      const fileContent = findFileContent(project, fileName);
      if (fileContent) {
        importedFiles.push(fileContent);
      }
    }
  }

  if (importedFiles.length === 0) {
    // TODO not only extract export, but remove all reserved module names
    return extractExportedVariable(code);
  }

  const modifiedCodeLines = lines.map((line) => {
    if (line.startsWith("import")) {
      return `// ${line}`;
    }
    return line;
  });

  const removedExports = importedFiles.map((line) =>
    extractExportedVariable(line),
  );
  const modifiedCode = modifiedCodeLines.join("\n");
  console.warn([...removedExports, modifiedCode].join("\n"));

  return [...removedExports, modifiedCode].join("\n");
};

const formatFileError = (error: string) => {
  const undesiredLinePattern = /^\/.*\n|^\s{2,}at.*\n/gm;
  const formattedErrorMessage = error.replace(undesiredLinePattern, "");

  return formattedErrorMessage;
};

const findFirstFile = (project: ExistingProjectQueryResult): string => {
  const files = project.getAllFoldersByProjectId.flatMap(
    (folder) => folder.files || [],
  );

  const closestFile = files.reduce(
    (closest, file) => {
      const fileId = parseInt(file.id, 10);
      const difference = Math.abs(fileId);

      if (difference < closest.difference) {
        return { file: file.content, difference };
      }

      return closest;
    },
    { file: "", difference: Infinity },
  );

  return closestFile.file;
};

const createZip = async (
  folders: IFolderTree[],
  zip: JSZip,
  parentFolderName = "",
): Promise<void> => {
  for (const folder of folders) {
    const folderName = folder.name.replace(/[\\/:*?"<>|]/g, "");
    const folderPath = `${parentFolderName}/${folderName}`.trim();

    const folderZip = folder.parentFolder && zip.folder(folderPath);

    if (folder.files) {
      if (!folder.parentFolder) {
        for (const file of folder.files) {
          zip.file(`${file.name}.${file.extension}`, file.content);
        }
      } else {
        for (const file of folder.files) {
          folderZip!.file(file.name, file.content);
        }
      }
    }

    if (folder.children) {
      // eslint-disable-next-line no-await-in-loop
      await createZip(folder.children, folderZip!, folderPath);
    }
  }
};

const saveProjectAsZip = async (
  project: ExistingProjectQueryResult,
): Promise<void> => {
  const zip = new JSZip();
  await createZip(project.getAllFoldersByProjectId, zip);
  const zipFile = await zip.generateAsync({ type: "blob" });
  saveAs(zipFile, project.getOneProject.name);
};

export default {
  getImportedFiles,
  formatFileError,
  findFirstFile,
  saveProjectAsZip,
};
