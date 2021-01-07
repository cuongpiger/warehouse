class Edge:
  def __init__(self, u, v, c):
    self.u, self.v, self.c = u, v, c

  def __lt__(self, other):
    return self.c < other.c

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

def kruskal(edgeList, deletedEdge, n):
  root = [-1] * (n + 1)
  cnt = 0
  MST = []
  sum = 0

  for i in range(len(edgeList)):
    u, v, c = edgeList[i].u, edgeList[i].v, edgeList[i].c
    if cnt == n - 1:
      break
    if i == deletedEdge:
      continue
    ru = findRoot(root, u)
    rv = findRoot(root, v)
    if ru != rv:
      union(root, ru, rv)
      cnt += 1
      sum += c
      MST.append(i)

  treeRoot = findRoot(root, 1)
  for i in range(1, n + 1):
    if findRoot(root, i) != treeRoot:
      return -1, MST

  return sum, MST

def isSameMST(MST1, MST2):
  if len(MST1) != len(MST2):
    return False
  for i in range(len(MST1)):
    if MST1[i] != MST2[i]:
      return False
  return True

def solve():
  n, m = map(int, input().split())
  edgeList = []
  for i in range(m):
    u, v, c = map(int, input().split())
    edgeList.append(Edge(u, v, c))
  edgeList.sort()
  
  MST1 = []
  first, MST1 = kruskal(edgeList, -1, n)
  print(first, end = " ")

  second = -1
  MST2 = []
  for i in range(len(edgeList)):
    sum, MST2 = kruskal(edgeList, i, n)
    if sum != -1 and isSameMST(MST1, MST2) == False:
      if second == -1 or second > sum:
        second = sum
  
  if second == -1:
    print(first)
  else:
    print(second)

if __name__ == "__main__":
  t = int(input())
  for i in range(t):
    solve()