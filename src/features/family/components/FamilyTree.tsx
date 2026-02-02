import ReactFlow, { Background, Controls } from "reactflow";
import { useNavigate } from "@tanstack/react-router";
import "reactflow/dist/style.css";

import { buildGraph } from "../utils/buildGraph";
import type { Member } from "../family.schema";

type Props = {
  members: Member[];
}

export function FamilyTree({ members }: Props) {
  const { nodes, edges } = buildGraph(members);
  const navigate = useNavigate();

  return (
    <div className="w-full h-[600px] border rounded-lg">
      <ReactFlow nodes={nodes} edges={edges} 
      fitView
      onNodeClick={(_, node) => {
        navigate({
          to: "/members/$memberId",
          params: {
            memberId: node.id,
          }
        })
      }}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
