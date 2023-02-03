import IFile from "./IFile";
import IProject from "./IProject";

export default interface IFolder {
  id: number;
  name: string;
  parentFolder?: IFolder;
  project: IProject;
  files: IFile[];
}
