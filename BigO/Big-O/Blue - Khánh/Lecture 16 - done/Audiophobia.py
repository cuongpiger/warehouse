class Edge:
  def __init__(self, u, v, c):
    self.u, self.v, self.c = u, v, c

  def __lt__(self, other):
    return self.c < other.c

class Node:
  def __init__(self, id, dist):
    self.id, self.dist = id, dist

def findRoot(root, u):
  while root[u] > 0:
    u = root[u]
  return u

def union(root, u, v):
  if root[u] > root[v]:
    root[v] += root[u]
    root[u] = v
  else:
    root[u] += root[v]
    root[v] = u

def kruskal(edgeList, n):
  root = [-1] * (n + 1)
  cnt = 0
  MST = [[] for i in range(n + 1)]

  for i in range(len(edgeList)):
    u, v, c = edgeList[i].u, edgeList[i].v, edgeList[i].c
    if cnt == n - 1:
      break
    ru = findRoot(root, u)
    rv = findRoot(root, v)
    if ru != rv:
      union(root, ru, rv)
      cnt += 1
      MST[u].append(Node(v, c))
      MST[v].append(Node(u, c))
  return MST

def DFS(graph, u, dist, check):
  check[u] = True
  for neighbor in graph[u]:
    v = neighbor.id
    c = neighbor.dist
    if check[v] == False:
      dist[v] = max(dist[u], c)
      DFS(graph, v, dist, check)

def solve(t):
  n, m, q = map(int, input().split())
  if n == 0 and m == 0 and q == 0:
    exit(0)
  print("Case #", t, sep = "")
  edgeList = []
  for i in range(m):
    u, v, c = map(int, input().split())
    edgeList.append(Edge(u, v, c))
  edgeList.sort()
  MST = kruskal(edgeList, n)
  for i in range(q):
    u, v = map(int, input().split())
    check = [False] * (n + 1)
    dist = [0] * (n + 1)
    DFS(MST, u, dist, check)
    if dist[v] == 0:
      print("No path")
    else:
      print(dist[v])
  print("")
  
if __name__ == "__main__":
  i = 1
  while True:
    solve(i)
    i += 1