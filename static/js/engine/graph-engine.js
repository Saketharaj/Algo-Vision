/**
 * AlgoVision - Interactive Graph Visualizer & Manipulation Engine
 * Supports drag-and-drop node placement, dynamic edge creation with weights,
 * start/target node selection, interactive presets, and step-by-step traversal animations.
 */

export class GraphVisualizer {
    constructor(canvasElement) {
        this.canvas = canvasElement;
        this.ctx = canvasElement.getContext('2d');
        this.nodes = [];
        this.edges = [];
        this.startNodeId = null;
        this.targetNodeId = null;
        this.mode = 'MOVE'; // 'MOVE', 'ADD_NODE', 'ADD_EDGE', 'SET_START', 'SET_TARGET'

        this.selectedSourceNode = null;
        this.draggedNode = null;
        this.dragOffset = { x: 0, y: 0 };
        this.lastStep = null;
        this.nodeRadius = 22;

        this.onGraphModified = null;

        this.theme = {
            bg: '#0d1117',
            nodeDefault: '#1e293b',
            nodeBorder: '#475569',
            nodeVisited: '#2e1065',
            nodeVisitedBorder: '#8b5cf6',
            nodeActive: '#b45309',
            nodeActiveBorder: '#f59e0b',
            nodePath: '#064e3b',
            nodePathBorder: '#10b981',
            edgeDefault: '#334155',
            edgeActive: '#f59e0b',
            edgePath: '#10b981',
            text: '#f8fafc',
            subText: '#94a3b8',
            badgeBg: '#1e293b',
            startRing: '#10b981',
            targetRing: '#f43f5e'
        };

        this._setupInteractions();
        this.loadPreset('network');
        this.resize();
        window.addEventListener('resize', () => this.resize());

        if (typeof ResizeObserver !== 'undefined' && this.canvas.parentElement) {
            this.resizeObserver = new ResizeObserver(() => this.resize());
            this.resizeObserver.observe(this.canvas.parentElement);
        }
    }

    setMode(mode) {
        this.mode = mode;
        this.selectedSourceNode = null;
        this.render(this.lastStep);
    }

    setStartNode(id) {
        this.startNodeId = id;
        this.render(this.lastStep);
        if (this.onGraphModified) this.onGraphModified();
    }

    setTargetNode(id) {
        this.targetNodeId = id;
        this.render(this.lastStep);
        if (this.onGraphModified) this.onGraphModified();
    }

    resize() {
        if (!this.canvas) return;
        const rect = this.canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        const w = rect.width > 0 ? rect.width : (this.canvas.parentElement?.clientWidth || 800);
        const h = rect.height > 0 ? rect.height : 420;

        this.width = Math.max(300, w);
        this.height = Math.max(200, h);
        this.canvas.width = this.width * dpr;
        this.canvas.height = this.height * dpr;
        this.ctx.resetTransform?.();
        this.ctx.scale(dpr, dpr);
        this.render(this.lastStep);
    }

    loadPreset(name) {
        if (name === 'network') {
            this.nodes = [
                { id: 'A', label: 'A', x: 80, y: 160 },
                { id: 'B', label: 'B', x: 220, y: 70 },
                { id: 'C', label: 'C', x: 220, y: 250 },
                { id: 'D', label: 'D', x: 380, y: 70 },
                { id: 'E', label: 'E', x: 380, y: 250 },
                { id: 'F', label: 'F', x: 520, y: 160 }
            ];
            this.edges = [
                { from: 'A', to: 'B', weight: 4 },
                { from: 'A', to: 'C', weight: 2 },
                { from: 'B', to: 'C', weight: 1 },
                { from: 'B', to: 'D', weight: 5 },
                { from: 'C', to: 'E', weight: 8 },
                { from: 'C', to: 'D', weight: 10 },
                { from: 'D', to: 'E', weight: 2 },
                { from: 'D', to: 'F', weight: 6 },
                { from: 'E', to: 'F', weight: 3 }
            ];
            this.startNodeId = 'A';
            this.targetNodeId = 'F';
        } else if (name === 'tree') {
            this.nodes = [
                { id: 'A', label: 'A', x: 300, y: 50 },
                { id: 'B', label: 'B', x: 180, y: 140 },
                { id: 'C', label: 'C', x: 420, y: 140 },
                { id: 'D', label: 'D', x: 110, y: 250 },
                { id: 'E', label: 'E', x: 230, y: 250 },
                { id: 'F', label: 'F', x: 350, y: 250 },
                { id: 'G', label: 'G', x: 470, y: 250 }
            ];
            this.edges = [
                { from: 'A', to: 'B', weight: 3 },
                { from: 'A', to: 'C', weight: 4 },
                { from: 'B', to: 'D', weight: 2 },
                { from: 'B', to: 'E', weight: 5 },
                { from: 'C', to: 'F', weight: 1 },
                { from: 'C', to: 'G', weight: 6 }
            ];
            this.startNodeId = 'A';
            this.targetNodeId = 'E';
        } else if (name === 'cycle') {
            this.nodes = [
                { id: '1', label: '1', x: 160, y: 90 },
                { id: '2', label: '2', x: 320, y: 60 },
                { id: '3', label: '3', x: 460, y: 140 },
                { id: '4', label: '4', x: 420, y: 270 },
                { id: '5', label: '5', x: 220, y: 280 }
            ];
            this.edges = [
                { from: '1', to: '2', weight: 3 },
                { from: '2', to: '3', weight: 4 },
                { from: '3', to: '4', weight: 2 },
                { from: '4', to: '5', weight: 5 },
                { from: '5', to: '1', weight: 1 },
                { from: '2', to: '5', weight: 7 }
            ];
            this.startNodeId = '1';
            this.targetNodeId = '4';
        } else if (name === 'disconnected') {
            this.nodes = [
                { id: 'A', label: 'A', x: 120, y: 100 },
                { id: 'B', label: 'B', x: 240, y: 100 },
                { id: 'C', label: 'C', x: 180, y: 220 },
                { id: 'X', label: 'X', x: 400, y: 150 },
                { id: 'Y', label: 'Y', x: 520, y: 150 }
            ];
            this.edges = [
                { from: 'A', to: 'B', weight: 3 },
                { from: 'B', to: 'C', weight: 2 },
                { from: 'C', to: 'A', weight: 4 },
                { from: 'X', to: 'Y', weight: 1 }
            ];
            this.startNodeId = 'A';
            this.targetNodeId = 'Y';
        }
        this.lastStep = null;
        this.render();
        if (this.onGraphModified) this.onGraphModified();
    }

    clearGraph() {
        this.nodes = [];
        this.edges = [];
        this.startNodeId = null;
        this.targetNodeId = null;
        this.lastStep = null;
        this.render();
        if (this.onGraphModified) this.onGraphModified();
    }

    addNode(x, y) {
        const nextLetter = String.fromCharCode(65 + this.nodes.length);
        const id = this.nodes.some(n => n.id === nextLetter) ? `N${this.nodes.length + 1}` : nextLetter;
        this.nodes.push({ id, label: id, x: Math.round(x), y: Math.round(y) });
        if (!this.startNodeId) this.startNodeId = id;
        else if (!this.targetNodeId) this.targetNodeId = id;
        this.render(this.lastStep);
        if (this.onGraphModified) this.onGraphModified();
    }

    addEdge(fromId, toId, weight = 1) {
        if (fromId === toId) return;
        const exists = this.edges.some(e =>
            (e.from === fromId && e.to === toId) || (!e.directed && e.from === toId && e.to === fromId)
        );
        if (exists) return;

        this.edges.push({ from: fromId, to: toId, weight: Number(weight) || 1 });
        this.render(this.lastStep);
        if (this.onGraphModified) this.onGraphModified();
    }

    render(step = this.lastStep) {
        this.lastStep = step;
        const ctx = this.ctx;
        const w = this.width;
        const h = this.height;

        ctx.fillStyle = this.theme.bg;
        ctx.fillRect(0, 0, w, h);

        if (this.nodes.length === 0) {
            ctx.fillStyle = this.theme.subText;
            ctx.font = '14px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Graph is empty. Click "Add Node" to place nodes or select a preset.', w / 2, h / 2);
            return;
        }

        const nodeMap = {};
        for (const n of this.nodes) nodeMap[n.id] = n;

        // Parse Step Context
        const activeNode = step?.activeNode;
        const activeEdge = step?.activeEdge;
        const visitedSet = new Set(step?.visitedNodes || []);
        const finalPath = step?.finalPath || [];
        const finalPathSet = new Set(finalPath);
        const pathEdges = new Set();
        for (let i = 0; i < finalPath.length - 1; i++) {
            pathEdges.add(`${finalPath[i]}->${finalPath[i + 1]}`);
            pathEdges.add(`${finalPath[i + 1]}->${finalPath[i]}`);
        }

        // 1. Draw Edges
        for (const edge of this.edges) {
            const u = nodeMap[edge.from];
            const v = nodeMap[edge.to];
            if (!u || !v) continue;

            const isPathEdge = pathEdges.has(`${edge.from}->${edge.to}`);
            const isActiveEdge = activeEdge && (
                (activeEdge[0] === edge.from && activeEdge[1] === edge.to) ||
                (activeEdge[0] === edge.to && activeEdge[1] === edge.from)
            );

            ctx.beginPath();
            ctx.moveTo(u.x, u.y);
            ctx.lineTo(v.x, v.y);

            if (isPathEdge) {
                ctx.strokeStyle = this.theme.edgePath;
                ctx.lineWidth = 4;
            } else if (isActiveEdge) {
                ctx.strokeStyle = this.theme.edgeActive;
                ctx.lineWidth = 3;
            } else {
                ctx.strokeStyle = this.theme.edgeDefault;
                ctx.lineWidth = 2;
            }
            ctx.stroke();

            // Draw Weight badge in middle of edge
            const midX = (u.x + v.x) / 2;
            const midY = (u.y + v.y) / 2;
            ctx.fillStyle = '#1e293b';
            ctx.beginPath();
            ctx.arc(midX, midY, 11, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = isPathEdge ? this.theme.edgePath : (isActiveEdge ? this.theme.edgeActive : '#475569');
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.fillStyle = isPathEdge ? '#34d399' : (isActiveEdge ? '#fef3c7' : '#94a3b8');
            ctx.font = '10px "JetBrains Mono", monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(edge.weight, midX, midY);
        }

        // If in ADD_EDGE mode and source node is selected, draw guideline to mouse
        if (this.mode === 'ADD_EDGE' && this.selectedSourceNode) {
            const u = nodeMap[this.selectedSourceNode];
            if (u && this.mousePos) {
                ctx.beginPath();
                ctx.setLineDash([4, 4]);
                ctx.moveTo(u.x, u.y);
                ctx.lineTo(this.mousePos.x, this.mousePos.y);
                ctx.strokeStyle = '#38bdf8';
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.setLineDash([]);
            }
        }

        // 2. Draw Nodes
        for (const node of this.nodes) {
            const isStart = node.id === this.startNodeId;
            const isTarget = node.id === this.targetNodeId;
            const isActive = node.id === activeNode;
            const isVisited = visitedSet.has(node.id);
            const isPath = finalPathSet.has(node.id);

            // Ring for Start / Target
            if (isStart || isTarget) {
                ctx.beginPath();
                ctx.arc(node.x, node.y, this.nodeRadius + 4, 0, Math.PI * 2);
                ctx.strokeStyle = isStart ? this.theme.startRing : this.theme.targetRing;
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            // Outer Node Circle
            let fill = this.theme.nodeDefault;
            let stroke = this.theme.nodeBorder;

            if (isPath) {
                fill = this.theme.nodePath;
                stroke = this.theme.nodePathBorder;
            } else if (isActive) {
                fill = this.theme.nodeActive;
                stroke = this.theme.nodeActiveBorder;
            } else if (isVisited) {
                fill = this.theme.nodeVisited;
                stroke = this.theme.nodeVisitedBorder;
            } else if (this.selectedSourceNode === node.id) {
                fill = '#0369a1';
                stroke = '#38bdf8';
            }

            ctx.beginPath();
            ctx.arc(node.x, node.y, this.nodeRadius, 0, Math.PI * 2);
            ctx.fillStyle = fill;
            ctx.fill();
            ctx.strokeStyle = stroke;
            ctx.lineWidth = (isActive || isPath || this.selectedSourceNode === node.id) ? 2.5 : 1.5;
            ctx.stroke();

            // Label
            ctx.fillStyle = this.theme.text;
            ctx.font = 'bold 13px "JetBrains Mono", monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(node.label, node.x, node.y);

            // Distance or heuristic score badge above node if step has distance table
            if (step && step.distances && step.distances[node.id] !== undefined) {
                const distVal = step.distances[node.id] === Infinity ? '∞' : step.distances[node.id];
                ctx.fillStyle = '#0f172a';
                ctx.fillRect(node.x - 16, node.y - this.nodeRadius - 16, 32, 14);
                ctx.strokeStyle = '#334155';
                ctx.strokeRect(node.x - 16, node.y - this.nodeRadius - 16, 32, 14);
                ctx.fillStyle = '#38bdf8';
                ctx.font = '10px "JetBrains Mono", monospace';
                ctx.fillText(`d:${distVal}`, node.x, node.y - this.nodeRadius - 9);
            }
        }
    }

    _setupInteractions() {
        const c = this.canvas;

        const getPos = (e) => {
            const rect = c.getBoundingClientRect();
            return {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };

        const findNodeAt = (pos) => {
            return this.nodes.find(n => Math.hypot(n.x - pos.x, n.y - pos.y) <= this.nodeRadius + 4);
        };

        c.addEventListener('mousedown', (e) => {
            const pos = getPos(e);
            const clickedNode = findNodeAt(pos);

            if (this.mode === 'MOVE') {
                if (clickedNode) {
                    this.draggedNode = clickedNode;
                    this.dragOffset = { x: pos.x - clickedNode.x, y: pos.y - clickedNode.y };
                }
            } else if (this.mode === 'ADD_NODE') {
                if (!clickedNode) {
                    this.addNode(pos.x, pos.y);
                }
            } else if (this.mode === 'ADD_EDGE') {
                if (clickedNode) {
                    if (!this.selectedSourceNode) {
                        this.selectedSourceNode = clickedNode.id;
                        this.render(this.lastStep);
                    } else {
                        if (this.selectedSourceNode !== clickedNode.id) {
                            const weightStr = prompt('Enter edge weight (e.g. 1-99):', '3');
                            if (weightStr !== null) {
                                const w = parseInt(weightStr, 10) || 1;
                                this.addEdge(this.selectedSourceNode, clickedNode.id, w);
                            }
                        }
                        this.selectedSourceNode = null;
                        this.render(this.lastStep);
                    }
                } else {
                    this.selectedSourceNode = null;
                    this.render(this.lastStep);
                }
            } else if (this.mode === 'SET_START') {
                if (clickedNode) this.setStartNode(clickedNode.id);
            } else if (this.mode === 'SET_TARGET') {
                if (clickedNode) this.setTargetNode(clickedNode.id);
            }
        });

        window.addEventListener('mousemove', (e) => {
            const pos = getPos(e);
            this.mousePos = pos;
            if (this.draggedNode && this.mode === 'MOVE') {
                this.draggedNode.x = Math.max(this.nodeRadius + 4, Math.min(this.width - this.nodeRadius - 4, pos.x - this.dragOffset.x));
                this.draggedNode.y = Math.max(this.nodeRadius + 4, Math.min(this.height - this.nodeRadius - 4, pos.y - this.dragOffset.y));
                this.render(this.lastStep);
                if (this.onGraphModified) this.onGraphModified();
            } else if (this.mode === 'ADD_EDGE' && this.selectedSourceNode) {
                this.render(this.lastStep);
            }
        });

        window.addEventListener('mouseup', () => {
            this.draggedNode = null;
        });
    }
}
