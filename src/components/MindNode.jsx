import React, { useState } from 'react'
import { Handle, Position } from 'reactflow'
import { useMindMapStore } from '../utils/store'
import '../styles/node.css'

export default function MindNode({ data, id, selected }) {
  const [isEditing, setIsEditing] = useState(false)
  const [label, setLabel] = useState(data.label)
  const {
    updateNodeLabel,
    deleteNode,
    addNode,
    setSelectedNode,
    editingNodeId,
    setEditingNodeId,
  } = useMindMapStore()

  const handleDoubleClick = () => {
    setIsEditing(true)
    setEditingNodeId(id)
  }

  const handleSave = () => {
    updateNodeLabel(id, label || 'New Idea')
    setIsEditing(false)
    setEditingNodeId(null)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      setLabel(data.label)
      setIsEditing(false)
      setEditingNodeId(null)
    }
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    deleteNode(id)
  }

  const handleAddChild = (e) => {
    e.stopPropagation()
    addNode(id)
  }

  const handleSelect = () => {
    setSelectedNode(id)
  }

  return (
    <div
      className={`mind-node ${selected ? 'selected' : ''}`}
      onClick={handleSelect}
    >
      <Handle type="target" position={Position.Top} />

      {isEditing ? (
        <input
          type="text"
          className="node-input"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <div className="node-label" onDoubleClick={handleDoubleClick}>
          {label}
        </div>
      )}

      <div className="node-controls">
        {id !== '1' && (
          <button
            className="node-btn delete-btn"
            onClick={handleDelete}
            title="Delete node"
          >
            ✕
          </button>
        )}
        <button
          className="node-btn add-btn"
          onClick={handleAddChild}
          title="Add child node"
        >
          +
        </button>
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}
