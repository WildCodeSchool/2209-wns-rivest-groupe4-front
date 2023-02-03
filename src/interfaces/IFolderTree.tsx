import IFile from "./IFile";

export default interface FolderTree {
  id?: string;
  parentFolder?: string | null;
  name: string;
  files: IFile[];
}
