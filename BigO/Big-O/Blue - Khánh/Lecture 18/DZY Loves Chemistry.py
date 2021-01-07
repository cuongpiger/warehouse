from math import pow

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
  n, m = map(int, input().split())
  s = []
  for i in range(n + 1):
    s.append(Node(i, 0))
  for i in range(m):
    u, v = map(int, input().split())
    union(s, u, v)
  c = set()
  for i in range(1, n + 1):
    c.add(findRoot(s, i))
  print(int(pow(2, n - len(c))))