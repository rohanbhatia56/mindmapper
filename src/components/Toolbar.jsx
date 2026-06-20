import React, { useRef } from 'react'
import { useMindMapStore } from '../utils/store'
import '../styles/toolbar.css'

export default function Toolbar() {
  const {
    addNode,
    clearAll,
    undo,
    redo,
    exportAsJSON,
    importFromJSON,
    selectedNode,
    historyIndex,
    history,
  } = useMindMapStore()

  const fileInputRef = useRef(null)

  const handleExport = () => {
    const json = exportAsJSON()
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(json))
    element.setAttribute('download', 'mindmap.json')
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleImport = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const json = event.target?.result
        importFromJSON(json)
      }
      reader.readAsText(file)
    }
  }

  const handleAddNode = () => {
    if (selectedNode) {
      addNode(selectedNode)
    } else {
      alert('Please select a node first')
    }
  }

  return (
    <div className="toolbar">
      <div className="toolbar-section">
        <h1 className="toolbar-title">🧠 MindMeister Clone</h1>
      </div>

      <div className="toolbar-section">
        <button
          className="toolbar-btn"
          onClick={handleAddNode}
          title="Add child node to selected node"
        >
          ➕ Add Node
        </button>

        <button
          className="toolbar-btn"
          onClick={() => {
            if (window.confirm('Clear all nodes?')) {
              clearAll()
            }
          }}
          title="Clear all nodes"
        >
          🗑️ Clear
        </button>
      </div>

      <div className="toolbar-section">
        <button
          className="toolbar-btn"
          onClick={undo}
          disabled={historyIndex <= 0}
          title="Undo"
        >
          ↶ Undo
        </button>

        <button
          className="toolbar-btn"
          onClick={redo}
          disabled={historyIndex >= history.length - 1}
          title="Redo"
        >
          ↷ Redo
        </button>
      </div>

      <div className="toolbar-section">
        <button
          className="toolbar-btn"
          onClick={handleExport}
          title="Export as JSON"
        >
          💾 Export
        </button>

        <button
          className="toolbar-btn"
          onClick={() => fileInputRef.current?.click()}
          title="Import from JSON"
        >
          📂 Import
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          style={{ display: 'none' }}
        />
      </div>

      <div className="toolbar-info">
        <p>💡 Double-click a node to edit • Click + to add children • Press Delete to remove</p>
      </div>
    </div>
  )
}
