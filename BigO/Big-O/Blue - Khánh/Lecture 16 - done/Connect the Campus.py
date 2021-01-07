import queue
from math import sqrt
INF = 1000001

class Point:
  def __init__(self, x, y):
    self.x = x
    self.y = y

  def dist(self, other):
    x1, y1 = self.x, self.y
    x2, y2 = other.x, other.y
    return sqrt((x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2))

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
  for i in range(len(graph)):
    sum += d[i]
  return sum    

def solve():
  n = 0
  try:
    n = int(input())
  except:
    exit(0)

  graph = [[] for i in range(n)]
  cord = []
  for i in range(n):
    x, y = map(int, input().split())
    cord.append(Point(x, y))
  for i in range(n):
    for j in range(i + 1, n):
      graph[i].append(Node(j, cord[i].dist(cord[j])))
      graph[j].append(Node(i, cord[i].dist(cord[j])))

  m = int(input())
  for i in range(m):
    u, v = map(int, input().split())
    u -= 1
    v -= 1
    for j in range(len(graph[u])):
      if graph[u][j].id == v:
        graph[u][j].dist = 0
        break
    for j in range(len(graph[v])):
      if graph[v][j].id == u:
        graph[v][j].dist = 0
        break
  
  print("%.2f" %MST(graph))

if __name__ == "__main__":
  while True:
    solve()