import React, { useCallback } from 'react'
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { useMindMapStore } from '../utils/store'
import MindNode from './MindNode'
import '../styles/mindmap.css'

const nodeTypes = {
  custom: MindNode,
}

export default function MindMap() {
  const { nodes: storeNodes, edges: storeEdges, updateNodePosition } = useMindMapStore()
  const [nodes, setNodes, onNodesChange] = useNodesState(
    storeNodes.map(n => ({ ...n, type: 'custom' }))
  )
  const [edges, setEdges, onEdgesChange] = useEdgesState(storeEdges)

  React.useEffect(() => {
    setNodes(storeNodes.map(n => ({ ...n, type: 'custom' })))
  }, [storeNodes, setNodes])

  React.useEffect(() => {
    setEdges(storeEdges)
  }, [storeEdges, setEdges])

  const onConnect = useCallback((connection) => {
    setEdges((eds) => addEdge(connection, eds))
  }, [setEdges])

  const onNodeDragStop = useCallback((event, node) => {
    updateNodePosition(node.id, node.position)
  }, [updateNodePosition])

  return (
    <div className="mindmap-container">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDragStop={onNodeDragStop}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background color="#aaa" gap={16} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  )
}
