import queue
INF =  1000001

class Node:
  def __init__(self, id, dist):
    self.id = id
    self.dist = dist
  
  def __lt__(self, other):
    return self.dist < other.dist

def MST(graph):
  d = [INF] *  len(graph) 
  check = [False] * len(graph)
  q = queue.PriorityQueue()

  d[1] = 0
  q.put(Node(1, 0))
  while q.qsize():
    u = q.get().id
    check[u] = True

    for neightbor in graph[u]:
      v = neightbor.id
      c = neightbor.dist
      if check[v] == False and c < d[v]:
        d[v] = c
        q.put(Node(v, c))

  return d

def solve():
  m = int(input())
  M = dict()
  graph = [[] for i in range(100)]
  id = 0
  for i in range(m):
    s, t, c = input().split()
    c = int(c)
    if s not in M:
      M[s] = id
      id += 1
    if t not in M:
      M[t] = id
      id += 1
    u = M[s]
    v = M[t]
    graph[u].append(Node(v, c))
    graph[v].append(Node(u, c))
  d = MST(graph)
  sum = 0
  for name, id in M.items():
    if d[id] == INF:
      print("Impossible")
      return
    else:
      sum += d[id]
  print(sum)

if __name__ == "__main__":
  t = int(input())
  for i in range(1, t + 1):
    input()
    print("Case ", i, ": ", sep = "", end = "")
    solve()