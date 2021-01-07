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

  sum = 0
  for i in range(1, n + 1):
    sum += d[i]
  return sum

if __name__ == "__main__":
  n, m = map(int, input().split())
  graph = [[] for i in range(n + 1)]
  
  for i in range(m):
    u, v, c = map(int, input().split())
    graph[u].append(Node(v, c))
    graph[v].append(Node(u, c))
  
  print(MST(graph))
