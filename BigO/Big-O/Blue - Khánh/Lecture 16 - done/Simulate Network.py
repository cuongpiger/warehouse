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

    for neightbor in graph[u].items():
      v = neightbor[0]
      c = neightbor[1]
      if check[v] == False and c < d[v]:
        d[v] = c
        q.put(Node(v, c))

  return d

if __name__ == "__main__":
  n, m = map(int, input().split())
  graph = [dict() for i in range(n + 1)]
  
  for i in range(m):
    u, v, c = map(int, input().split())
    if v not in graph[u]:
      graph[u][v] = c
      graph[v][u] = c
    else:
      graph[u][v] = min(graph[u][v], c)
      graph[v][u] = graph[u][v]
  
  d = MST(graph)
  d.sort(reverse = True)
  
  q = int(input())
  if q == 0:
    c = []
  else:
    c = list(map(int, input().split()))
  c.sort()
  
  j = 0
  for i in range(1, n + 1):
    while j < q and c[j] > d[i]:
      j += 1
    if j == q:
      break
    d[i] = c[j]
    j += 1

  res = 0
  for i in range(1, n + 1):
    res += d[i]
  print(res)