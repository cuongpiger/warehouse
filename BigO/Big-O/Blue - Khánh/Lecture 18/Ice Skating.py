class Node:
  def __init__(self, parent, rank):
    self.parent = parent
    self.rank = rank

  def print(self):
    print(self.parent)
    print(self.rank)

def findRoot(s, u):
  if s[u].parent != u:
    s[u].parent = findRoot(s, s[u].parent)
  return s[u].parent

def union(s, u, v):
  ru = findRoot(s, u)
  rv = findRoot(s, v)
  if ru != rv:
    if s[ru].rank < s[rv].rank:
      s[ru].parent = rv
    elif s[ru].rank > s[rv].rank:
      s[rv].parent = ru
    else:
      s[rv].parent = ru
      s[ru].rank += 1

if __name__ == "__main__":
  n = int(input())  
  s = []
  for i in range(n):
    s.append(Node(i, 0))
  a = []
  for i in range(n):
    u, v = map(int, input().split())
    a.append((u, v))
  for i in range(n):
    for j in range(n):
      if a[i][0] == a[j][0] or a[i][1] == a[j][1]:
        union(s, i, j)
  c = set()
  for i in range(n):
    c.add(findRoot(s, i))
  print(len(c) - 1)