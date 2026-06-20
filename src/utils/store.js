import { create } from 'zustand'

export const useMindMapStore = create((set, get) => ({
  nodes: [
    {
      id: '1',
      data: { label: 'Central Idea' },
      position: { x: 0, y: 0 },
      style: {
        background: '#ff6b6b',
        color: '#fff',
        border: '2px solid #c92a2a',
        borderRadius: '8px',
        padding: '10px 15px',
        fontWeight: 'bold',
      },
    },
  ],
  edges: [],
  selectedNode: null,
  editingNodeId: null,
  history: [],
  historyIndex: -1,

  addNode: (parentId) => {
    const state = get()
    const parentNode = state.nodes.find(n => n.id === parentId)
    if (!parentNode) return

    const newId = Math.random().toString(36).substr(2, 9)
    const angle = Math.random() * Math.PI * 2
    const distance = 200
    const newPosition = {
      x: parentNode.position.x + Math.cos(angle) * distance,
      y: parentNode.position.y + Math.sin(angle) * distance,
    }

    const colors = ['#4ecdc4', '#44af69', '#f7dc6f', '#bb8fce', '#85c1e2', '#f8b88b']
    const randomColor = colors[Math.floor(Math.random() * colors.length)]

    const newNode = {
      id: newId,
      data: { label: 'New Idea' },
      position: newPosition,
      style: {
        background: randomColor,
        color: '#fff',
        border: `2px solid ${randomColor}`,
        borderRadius: '8px',
        padding: '10px 15px',
        fontWeight: 'bold',
      },
    }

    const newEdge = {
      id: `${parentId}-${newId}`,
      source: parentId,
      target: newId,
      animated: true,
      style: { stroke: '#888' },
    }

    set(state => ({
      nodes: [...state.nodes, newNode],
      edges: [...state.edges, newEdge],
      selectedNode: newId,
      history: [...state.history.slice(0, state.historyIndex + 1), {
        nodes: state.nodes,
        edges: state.edges,
      }],
      historyIndex: state.historyIndex + 1,
    }))
  },

  updateNodeLabel: (nodeId, label) => {
    set(state => ({
      nodes: state.nodes.map(n =>
        n.id === nodeId ? { ...n, data: { ...n.data, label } } : n
      ),
    }))
  },

  updateNodePosition: (nodeId, position) => {
    set(state => ({
      nodes: state.nodes.map(n =>
        n.id === nodeId ? { ...n, position } : n
      ),
    }))
  },

  deleteNode: (nodeId) => {
    set(state => {
      if (nodeId === '1') return state
      const newNodes = state.nodes.filter(n => n.id !== nodeId)
      const newEdges = state.edges.filter(
        e => e.source !== nodeId && e.target !== nodeId
      )
      return {
        nodes: newNodes,
        edges: newEdges,
        selectedNode: null,
        history: [...state.history.slice(0, state.historyIndex + 1), {
          nodes: state.nodes,
          edges: state.edges,
        }],
        historyIndex: state.historyIndex + 1,
      }
    })
  },

  setSelectedNode: (nodeId) => {
    set({ selectedNode: nodeId })
  },

  setEditingNodeId: (nodeId) => {
    set({ editingNodeId: nodeId })
  },

  undo: () => {
    set(state => {
      if (state.historyIndex > 0) {
        const newIndex = state.historyIndex - 1
        const prevState = state.history[newIndex]
        return {
          nodes: prevState.nodes,
          edges: prevState.edges,
          historyIndex: newIndex,
        }
      }
      return state
    })
  },

  redo: () => {
    set(state => {
      if (state.historyIndex < state.history.length - 1) {
        const newIndex = state.historyIndex + 1
        const nextState = state.history[newIndex]
        return {
          nodes: nextState.nodes,
          edges: nextState.edges,
          historyIndex: newIndex,
        }
      }
      return state
    })
  },

  clearAll: () => {
    set({
      nodes: [
        {
          id: '1',
          data: { label: 'Central Idea' },
          position: { x: 0, y: 0 },
          style: {
            background: '#ff6b6b',
            color: '#fff',
            border: '2px solid #c92a2a',
            borderRadius: '8px',
            padding: '10px 15px',
            fontWeight: 'bold',
          },
        },
      ],
      edges: [],
      selectedNode: null,
      editingNodeId: null,
      history: [],
      historyIndex: -1,
    })
  },

  exportAsJSON: () => {
    const state = get()
    return JSON.stringify({ nodes: state.nodes, edges: state.edges }, null, 2)
  },

  importFromJSON: (json) => {
    try {
      const data = JSON.parse(json)
      set({
        nodes: data.nodes || [],
        edges: data.edges || [],
        selectedNode: null,
        editingNodeId: null,
      })
    } catch (e) {
      console.error('Invalid JSON', e)
    }
  },
}))
