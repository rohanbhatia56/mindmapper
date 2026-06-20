import React, { useEffect } from 'react'
import { useMindMapStore } from './utils/store'
import MindMap from './components/MindMap'
import Toolbar from './components/Toolbar'
import './styles/app.css'

function App() {
  const { deleteNode } = useMindMapStore()

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Delete') {
        const selected = document.querySelector('.mind-node.selected')
        if (selected && selected !== document.querySelector('.mind-node')) {
          const nodeId = selected.getAttribute('data-id')
          if (nodeId && nodeId !== '1') {
            deleteNode(nodeId)
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [deleteNode])

  return (
    <div className="app">
      <Toolbar />
      <MindMap />
    </div>
  )
}

export default App
