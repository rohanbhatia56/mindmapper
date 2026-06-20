# MindMeister Clone 🧠

A fully-featured mind mapping application built with React, React Flow, and Zustand. Create, organize, and visualize your ideas in an interactive mind map.

## Features

✨ **Core Functionality**
- Create hierarchical mind maps with a central idea
- Add unlimited child nodes
- Edit node labels by double-clicking
- Drag and drop nodes to reorganize
- Delete nodes (except the central idea)
- Visual connections between parent and child nodes

🎨 **UI/UX**
- Beautiful gradient design
- Color-coded nodes (random colors for new nodes)
- Interactive node selection
- Smooth animations and transitions
- Responsive canvas with zoom and pan controls
- Mini map for navigation

⚙️ **Advanced Features**
- **Undo/Redo**: Full history management
- **Export**: Save your mind map as JSON
- **Import**: Load previously saved mind maps
- **Clear**: Reset to a blank canvas

🎮 **Controls**
- **Add Node**: Select a node, click "Add Node" or use the "+" button
- **Edit Node**: Double-click any node to edit its label
- **Delete Node**: Click the "✕" button or press Delete
- **Navigate**: Use mouse wheel to zoom, drag to pan
- **Select**: Click nodes to select them

## Installation

1. **Navigate to the project directory:**
   ```bash
   cd /Users/rbhatia/Documents/mindmeister-clone
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   The app will automatically open at `http://localhost:5173`

## Building for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

## Project Structure

```
mindmeister-clone/
├── src/
│   ├── components/
│   │   ├── MindMap.jsx       # Canvas and React Flow setup
│   │   ├── MindNode.jsx      # Individual node component
│   │   └── Toolbar.jsx       # Top toolbar with controls
│   ├── utils/
│   │   └── store.js          # Zustand state management
│   ├── styles/
│   │   ├── index.css         # Global styles
│   │   ├── app.css           # App-level styles
│   │   ├── toolbar.css       # Toolbar styles
│   │   ├── node.css          # Node styles
│   │   └── mindmap.css       # Canvas styles
│   ├── App.jsx               # Main app component
│   └── main.jsx              # React entry point
├── index.html                # HTML template
├── package.json              # Dependencies
└── vite.config.js           # Vite configuration
```

## State Management

Uses **Zustand** for state management with the following actions:

- `addNode(parentId)` - Add child node
- `updateNodeLabel(nodeId, label)` - Change node text
- `updateNodePosition(nodeId, position)` - Update node location
- `deleteNode(nodeId)` - Remove node
- `setSelectedNode(nodeId)` - Select a node
- `undo()` - Undo last action
- `redo()` - Redo last action
- `clearAll()` - Reset map
- `exportAsJSON()` - Export map data
- `importFromJSON(json)` - Import map data

## Technologies Used

- **React 18** - UI library
- **React Flow 11** - Interactive graph library
- **Zustand** - State management
- **Vite** - Build tool and dev server
- **CSS3** - Styling with animations and gradients

## Tips & Tricks

1. **Keyboard Shortcuts**
   - Press `Delete` to remove selected node
   - Press `Escape` while editing to cancel changes

2. **Organizing Your Map**
   - Double-click to quickly edit multiple nodes in succession
   - Use the mini map to navigate large mind maps
   - The central red node cannot be deleted

3. **Exporting**
   - Export as JSON for backup or sharing
   - Import JSON files to restore previous maps
   - Use the same format for programmatic map creation

4. **Performance**
   - The app handles hundreds of nodes smoothly
   - Zoom and pan are optimized for large maps
   - History is kept in memory (browser restart clears history)

## License

MIT

## Future Enhancements

Possible features for future versions:
- Collaborative editing (WebSocket sync)
- Rich text nodes with images
- Custom themes and styles
- Node icons and emojis
- PDF/PNG export with layout options
- Templates for different use cases
- Mobile app with touch gestures
- Database persistence
- Real-time collaboration
