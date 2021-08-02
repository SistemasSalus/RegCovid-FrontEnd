export class Node {
  NodeId: number;
  NodeName: string;
  static buildFromJson(json: any): Node {
    const node = new Node();
    return Object.assign(node, json);
  }
}
