import { VNode } from 'vue';

export interface Icons {
  [key: string]: Function
}

export interface IconObject {
  name: string,
  node: VNode,
}
