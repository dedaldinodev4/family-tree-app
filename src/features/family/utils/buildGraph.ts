import { stratify, tree } from "d3-hierarchy";
import type { Member } from "../family.schema";
import type { Node, Edge } from "reactflow";

type Graph = {
  nodes: Node[];
  edges: Edge[];
}

export const buildGraph = (members: Member[]): Graph => {

  if (members.length === 0) {
    return { nodes: [], edges: [] };
  }

  const memberMap = new Map(members.map((m) => [m.id, m]));
  
  const stratifyData = members.map((m) => ({
    id: m.id,
    parentId: m.parentId && memberMap.has(m.parentId) ? m.parentId : null,
    name: m.name,
  }))

  const root =tree<Member>().nodeSize([180, 120])(
    stratify<Member>()
    .id((d) => d.id)
    .parentId((d) => d.parentId)(stratifyData)
  )

  const nodes: Node[] = root.descendants().map((node) => {
    const member = memberMap.get(node.id || "")!;
    return {
      id: `${member.id}`,
      data: { label: member.name },
      position: { x: node.x, y: node.y },
    } 
  }) 

  const edges: Edge[] = root.links().map((link) => ({
    id: `${link.source.id}-${link.target.id}`,
    source: `${link.source.id}`,
    target: `${link.target.id}`,
    type: "smoothstep",
  }))

  return { nodes, edges };
};
