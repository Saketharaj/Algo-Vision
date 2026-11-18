/**
 * AlgoVision - Graph Algorithm Step Generator Suite
 * Implements deterministic execution traces for:
 * 1. Breadth-First Search (BFS)
 * 2. Depth-First Search (DFS)
 * 3. Dijkstra's Algorithm
 * 4. A* Search Algorithm
 */

export const GraphGenerators = {
    // Helper to build adjacency list from nodes & edges
    buildAdjacency(nodes, edges) {
        const adj = {};
        for (const node of nodes) {
            adj[node.id] = [];
        }
        for (const edge of edges) {
            if (!adj[edge.from]) adj[edge.from] = [];
            adj[edge.from].push({ node: edge.to, weight: edge.weight ?? 1 });

            // Undirected by default unless edge.directed === true
            if (!edge.directed) {
                if (!adj[edge.to]) adj[edge.to] = [];
                adj[edge.to].push({ node: edge.from, weight: edge.weight ?? 1 });
            }
        }
        return adj;
    },

    // -------------------------------------------------------------------------
    // 1. Breadth-First Search (BFS)
    // -------------------------------------------------------------------------
    bfs(nodes, edges, startId, targetId = null) {
        const adj = this.buildAdjacency(nodes, edges);
        const steps = [];
        let operations = 0;

        if (!adj[startId]) {
            return [{
                type: 'error',
                activeNode: null,
                visitedNodes: [],
                queue: [],
                codeLine: 1,
                description: `Start node '${startId}' does not exist in graph.`,
                metrics: { operations: 0 }
            }];
        }

        const visited = new Set([startId]);
        const queue = [startId];
        const traversalOrder = [];
        const parents = {};

        steps.push({
            type: 'init',
            activeNode: startId,
            visitedNodes: Array.from(visited),
            queue: [...queue],
            parents: { ...parents },
            traversalOrder: [...traversalOrder],
            codeLine: 2,
            description: `Starting BFS from node '${startId}'. Initialized FIFO queue with ['${startId}'].`,
            metrics: { operations: 0 }
        });

        while (queue.length > 0) {
            const u = queue.shift();
            traversalOrder.push(u);
            operations++;

            steps.push({
                type: 'dequeue',
                activeNode: u,
                visitedNodes: Array.from(visited),
                queue: [...queue],
                parents: { ...parents },
                traversalOrder: [...traversalOrder],
                codeLine: 5,
                description: `Dequeued node '${u}'. Inspecting incident edges.`,
                metrics: { operations }
            });

            if (targetId && u === targetId) {
                // Reconstruct path
                const path = [];
                let curr = targetId;
                while (curr) {
                    path.unshift(curr);
                    curr = parents[curr];
                }

                steps.push({
                    type: 'target-reached',
                    activeNode: u,
                    visitedNodes: Array.from(visited),
                    queue: [...queue],
                    parents: { ...parents },
                    finalPath: path,
                    traversalOrder: [...traversalOrder],
                    codeLine: 6,
                    description: `Target node '${targetId}' reached! Shortest path: ${path.join(' → ')}.`,
                    metrics: { operations }
                });
                return steps;
            }

            const neighbors = adj[u] || [];
            for (const { node: v } of neighbors) {
                operations++;
                steps.push({
                    type: 'examine-edge',
                    activeNode: u,
                    activeEdge: [u, v],
                    visitedNodes: Array.from(visited),
                    queue: [...queue],
                    parents: { ...parents },
                    traversalOrder: [...traversalOrder],
                    codeLine: 7,
                    description: `Examining neighbor edge (${u} → ${v}). ${visited.has(v) ? `Node '${v}' already visited.` : `Node '${v}' unvisited.`}`,
                    metrics: { operations }
                });

                if (!visited.has(v)) {
                    visited.add(v);
                    parents[v] = u;
                    queue.push(v);

                    steps.push({
                        type: 'enqueue',
                        activeNode: v,
                        activeEdge: [u, v],
                        visitedNodes: Array.from(visited),
                        queue: [...queue],
                        parents: { ...parents },
                        traversalOrder: [...traversalOrder],
                        codeLine: 10,
                        description: `Marked node '${v}' as visited and enqueued. Queue state: [${queue.join(', ')}].`,
                        metrics: { operations }
                    });
                }
            }
        }

        steps.push({
            type: 'complete',
            activeNode: null,
            visitedNodes: Array.from(visited),
            queue: [],
            parents: { ...parents },
            traversalOrder: [...traversalOrder],
            codeLine: 12,
            description: `BFS completed. Traversed ${visited.size} node(s) in order: ${traversalOrder.join(' → ')}.`,
            metrics: { operations }
        });

        return steps;
    },

    // -------------------------------------------------------------------------
    // 2. Depth-First Search (DFS)
    // -------------------------------------------------------------------------
    dfs(nodes, edges, startId, targetId = null) {
        const adj = this.buildAdjacency(nodes, edges);
        const steps = [];
        let operations = 0;

        if (!adj[startId]) {
            return [{
                type: 'error',
                activeNode: null,
                visitedNodes: [],
                codeLine: 1,
                description: `Start node '${startId}' not found.`,
                metrics: { operations: 0 }
            }];
        }

        const visited = new Set();
        const traversalOrder = [];
        const parents = {};
        let targetReached = false;

        steps.push({
            type: 'init',
            activeNode: startId,
            visitedNodes: [],
            callStack: [startId],
            parents: {},
            traversalOrder: [],
            codeLine: 1,
            description: `Starting DFS from root node '${startId}'.`,
            metrics: { operations: 0 }
        });

        function traverse(u, stack) {
            if (targetReached) return;

            visited.add(u);
            traversalOrder.push(u);
            operations++;

            steps.push({
                type: 'visit-node',
                activeNode: u,
                visitedNodes: Array.from(visited),
                callStack: [...stack],
                parents: { ...parents },
                traversalOrder: [...traversalOrder],
                codeLine: 2,
                description: `Visiting node '${u}'. Pushed to call stack: [${stack.join(' → ')}].`,
                metrics: { operations }
            });

            if (targetId && u === targetId) {
                targetReached = true;
                const path = [];
                let curr = targetId;
                while (curr) {
                    path.unshift(curr);
                    curr = parents[curr];
                }

                steps.push({
                    type: 'target-reached',
                    activeNode: u,
                    visitedNodes: Array.from(visited),
                    callStack: [...stack],
                    finalPath: path,
                    traversalOrder: [...traversalOrder],
                    codeLine: 3,
                    description: `Target node '${targetId}' discovered! Path: ${path.join(' → ')}.`,
                    metrics: { operations }
                });
                return;
            }

            const neighbors = adj[u] || [];
            for (const { node: v } of neighbors) {
                if (targetReached) break;

                operations++;
                steps.push({
                    type: 'examine-edge',
                    activeNode: u,
                    activeEdge: [u, v],
                    visitedNodes: Array.from(visited),
                    callStack: [...stack],
                    parents: { ...parents },
                    traversalOrder: [...traversalOrder],
                    codeLine: 4,
                    description: `Probing branch (${u} → ${v}). ${visited.has(v) ? `Node '${v}' already visited, skipping.` : `Exploring branch deeper.`}`,
                    metrics: { operations }
                });

                if (!visited.has(v)) {
                    parents[v] = u;
                    traverse(v, [...stack, v]);
                }
            }

            if (!targetReached) {
                steps.push({
                    type: 'backtrack',
                    activeNode: u,
                    visitedNodes: Array.from(visited),
                    callStack: stack.slice(0, -1),
                    parents: { ...parents },
                    traversalOrder: [...traversalOrder],
                    codeLine: 8,
                    description: `Backtracking from dead-end at node '${u}'. Popping stack.`,
                    metrics: { operations }
                });
            }
        }

        traverse(startId, [startId]);

        steps.push({
            type: 'complete',
            activeNode: null,
            visitedNodes: Array.from(visited),
            callStack: [],
            parents: { ...parents },
            traversalOrder: [...traversalOrder],
            codeLine: 9,
            description: `DFS traversal complete. Total nodes visited: ${visited.size}. Order: ${traversalOrder.join(' → ')}.`,
            metrics: { operations }
        });

        return steps;
    },

    // -------------------------------------------------------------------------
    // 3. Dijkstra's Shortest Path Algorithm
    // -------------------------------------------------------------------------
    dijkstra(nodes, edges, startId, targetId = null) {
        const adj = this.buildAdjacency(nodes, edges);
        const steps = [];
        let operations = 0;

        const distances = {};
        const parents = {};
        const unvisited = new Set(nodes.map(n => n.id));

        for (const node of nodes) {
            distances[node.id] = Infinity;
        }
        distances[startId] = 0;

        steps.push({
            type: 'init',
            activeNode: startId,
            distances: { ...distances },
            parents: { ...parents },
            unvisited: Array.from(unvisited),
            codeLine: 1,
            description: `Initialized Dijkstra's algorithm. Distance to start node '${startId}' is 0, all others set to ∞.`,
            metrics: { operations: 0 }
        });

        while (unvisited.size > 0) {
            // Find unvisited node with smallest distance
            let u = null;
            let minDist = Infinity;
            for (const nodeId of unvisited) {
                if (distances[nodeId] < minDist) {
                    minDist = distances[nodeId];
                    u = nodeId;
                }
            }

            if (u === null || minDist === Infinity) {
                // Remaining unvisited nodes are unreachable
                steps.push({
                    type: 'unreachable',
                    activeNode: null,
                    distances: { ...distances },
                    parents: { ...parents },
                    unvisited: Array.from(unvisited),
                    codeLine: 7,
                    description: 'Remaining unvisited nodes have distance ∞ and are disconnected from the source.',
                    metrics: { operations }
                });
                break;
            }

            unvisited.delete(u);
            operations++;

            steps.push({
                type: 'settle-node',
                activeNode: u,
                distances: { ...distances },
                parents: { ...parents },
                unvisited: Array.from(unvisited),
                codeLine: 6,
                description: `Extracted min-distance vertex '${u}' with final optimal distance ${minDist}. Settling node.`,
                metrics: { operations }
            });

            if (targetId && u === targetId) {
                const path = [];
                let curr = targetId;
                while (curr) {
                    path.unshift(curr);
                    curr = parents[curr];
                }

                steps.push({
                    type: 'target-reached',
                    activeNode: u,
                    distances: { ...distances },
                    parents: { ...parents },
                    finalPath: path,
                    finalDistance: minDist,
                    codeLine: 7,
                    description: `Destination '${targetId}' settled with shortest path distance = ${minDist}! Optimal route: ${path.join(' → ')}.`,
                    metrics: { operations }
                });
                return steps;
            }

            const neighbors = adj[u] || [];
            for (const { node: v, weight } of neighbors) {
                if (unvisited.has(v)) {
                    operations++;
                    const alt = distances[u] + weight;

                    steps.push({
                        type: 'examine-edge',
                        activeNode: u,
                        activeEdge: [u, v],
                        edgeWeight: weight,
                        distances: { ...distances },
                        parents: { ...parents },
                        unvisited: Array.from(unvisited),
                        codeLine: 8,
                        description: `Inspecting edge (${u} → ${v}, weight: ${weight}). Alternate dist: ${distances[u]} + ${weight} = ${alt} vs current: ${distances[v]}.`,
                        metrics: { operations }
                    });

                    if (alt < distances[v]) {
                        distances[v] = alt;
                        parents[v] = u;

                        steps.push({
                            type: 'relax-edge',
                            activeNode: u,
                            activeEdge: [u, v],
                            distances: { ...distances },
                            parents: { ...parents },
                            unvisited: Array.from(unvisited),
                            codeLine: 10,
                            description: `Relaxed edge! Shortest known distance to '${v}' reduced to ${alt} via parent '${u}'.`,
                            metrics: { operations }
                        });
                    }
                }
            }
        }

        steps.push({
            type: 'complete',
            activeNode: null,
            distances: { ...distances },
            parents: { ...parents },
            unvisited: [],
            codeLine: 13,
            description: `Dijkstra execution finished. Shortest distance table computed for all reachable nodes.`,
            metrics: { operations }
        });

        return steps;
    },

    // -------------------------------------------------------------------------
    // 4. A* Search Algorithm
    // -------------------------------------------------------------------------
    aStar(nodes, edges, startId, targetId) {
        const nodeMap = {};
        for (const n of nodes) nodeMap[n.id] = n;
        const adj = this.buildAdjacency(nodes, edges);
        const steps = [];
        let operations = 0;

        if (!nodeMap[startId] || !nodeMap[targetId]) {
            return [{
                type: 'error',
                activeNode: null,
                codeLine: 1,
                description: 'Start node or target node is missing.',
                metrics: { operations: 0 }
            }];
        }

        // Admissible Euclidean heuristic h(n)
        const targetNode = nodeMap[targetId];
        const heuristic = (id) => {
            const n = nodeMap[id];
            if (!n || !targetNode) return 0;
            const dx = n.x - targetNode.x;
            const dy = n.y - targetNode.y;
            return Math.round(Math.hypot(dx, dy));
        };

        const gScore = {};
        const fScore = {};
        const hScore = {};
        const parents = {};
        const openSet = new Set([startId]);
        const closedSet = new Set();

        for (const n of nodes) {
            gScore[n.id] = Infinity;
            fScore[n.id] = Infinity;
            hScore[n.id] = heuristic(n.id);
        }

        gScore[startId] = 0;
        fScore[startId] = hScore[startId];

        steps.push({
            type: 'init',
            activeNode: startId,
            openSet: Array.from(openSet),
            closedSet: Array.from(closedSet),
            gScore: { ...gScore },
            hScore: { ...hScore },
            fScore: { ...fScore },
            parents: { ...parents },
            codeLine: 2,
            description: `Starting A* Search towards target '${targetId}'. Heuristic h('${startId}') = ${hScore[startId]}.`,
            metrics: { operations: 0 }
        });

        while (openSet.size > 0) {
            // Find node in openSet with smallest fScore
            let current = null;
            let lowestF = Infinity;
            for (const id of openSet) {
                if (fScore[id] < lowestF) {
                    lowestF = fScore[id];
                    current = id;
                }
            }

            operations++;

            steps.push({
                type: 'select-f-min',
                activeNode: current,
                openSet: Array.from(openSet),
                closedSet: Array.from(closedSet),
                gScore: { ...gScore },
                hScore: { ...hScore },
                fScore: { ...fScore },
                parents: { ...parents },
                codeLine: 6,
                description: `Extracted '${current}' from open set with lowest f(n) = g(${gScore[current]}) + h(${hScore[current]}) = ${fScore[current]}.`,
                metrics: { operations }
            });

            if (current === targetId) {
                const path = [];
                let curr = targetId;
                while (curr) {
                    path.unshift(curr);
                    curr = parents[curr];
                }

                steps.push({
                    type: 'target-reached',
                    activeNode: current,
                    openSet: Array.from(openSet),
                    closedSet: Array.from(closedSet),
                    finalPath: path,
                    finalDistance: gScore[targetId],
                    codeLine: 7,
                    description: `Target '${targetId}' reached with optimal cost g = ${gScore[targetId]}! Path: ${path.join(' → ')}.`,
                    metrics: { operations }
                });
                return steps;
            }

            openSet.delete(current);
            closedSet.add(current);

            const neighbors = adj[current] || [];
            for (const { node: neighbor, weight } of neighbors) {
                if (closedSet.has(neighbor)) continue;

                operations++;
                const tentativeG = gScore[current] + weight;

                steps.push({
                    type: 'evaluate-neighbor',
                    activeNode: current,
                    activeEdge: [current, neighbor],
                    openSet: Array.from(openSet),
                    closedSet: Array.from(closedSet),
                    gScore: { ...gScore },
                    fScore: { ...fScore },
                    parents: { ...parents },
                    codeLine: 10,
                    description: `Evaluating edge (${current} → ${neighbor}, weight: ${weight}). Tentative gScore = ${tentativeG} vs current g = ${gScore[neighbor]}.`,
                    metrics: { operations }
                });

                if (tentativeG < gScore[neighbor]) {
                    parents[neighbor] = current;
                    gScore[neighbor] = tentativeG;
                    fScore[neighbor] = tentativeG + hScore[neighbor];
                    openSet.add(neighbor);

                    steps.push({
                        type: 'update-scores',
                        activeNode: current,
                        activeEdge: [current, neighbor],
                        openSet: Array.from(openSet),
                        closedSet: Array.from(closedSet),
                        gScore: { ...gScore },
                        fScore: { ...fScore },
                        parents: { ...parents },
                        codeLine: 13,
                        description: `Updated '${neighbor}': g = ${tentativeG}, h = ${hScore[neighbor]}, f = ${fScore[neighbor]}. Added to Open Set.`,
                        metrics: { operations }
                    });
                }
            }
        }

        steps.push({
            type: 'no-path',
            activeNode: null,
            openSet: [],
            closedSet: Array.from(closedSet),
            codeLine: 17,
            description: `Open set exhausted. No viable path exists connecting '${startId}' to '${targetId}'.`,
            metrics: { operations }
        });

        return steps;
    }
};
