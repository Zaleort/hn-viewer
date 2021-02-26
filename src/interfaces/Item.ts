export default interface Item {
  id: number;
  deleted: boolean;
  type: 'job' | 'story' | 'comment' | 'poll' | 'pollopt';
  by: string;
  time: number;
  text: string;
  dead: boolean;
  parent: number;
  poll: object;
  kids: number[];
  resolvedKids?: Item[],
  url: string;
  score: string;
  title: string;
  parts: object;
  descendants: number;
}
