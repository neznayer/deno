export enum StatEnum {
  DONE = "DONE",
  DOING = "DOING",
  TODO = "TODO",
}

export interface ITodo {
  _id: { $oid: string };
  title: string;
  content: string;
  status: StatEnum;
}
