export default interface IFolderTree {
  name: string;
  id: string;
  parentFolder?: {
    name: string;
    id: string;
  };
  children?: IFolderTree[];
  files?: Array<{
    id: string;
    content: string;
    extension: string;
    name: string;
  }>;
}
