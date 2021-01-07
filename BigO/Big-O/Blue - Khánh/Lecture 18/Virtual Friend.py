class Node:
  def __init__(self, parent, rank):
    self.parent = parent
    self.rank = rank

def findRoot(s, u):
  if s[u].parent != u:
    s[u].parent = findRoot(s, s[u].parent)
  return s[u].parent

def union(s, child, u, v):
  ru = findRoot(s, u)
  rv = findRoot(s, v)
  if ru != rv:
    if s[ru].rank < s[rv].rank:
      s[ru].parent = rv
      child[rv] += child[ru]
    elif s[ru].rank > s[rv].rank:
      s[rv].parent = ru
      child[ru] += child[rv]
    else:
      s[rv].parent = ru
      child[ru] += child[rv]
      s[ru].rank += 1
  return max(child[ru], child[rv])

def solve():
  s = []
  for i in range(200000):
    s.append(Node(i, 0))
  child = [1] * 200000

  n = int(input())
  id = 0
  M = dict()
  for i in range(n):
    x, y = input().split()
    if x not in M:
      M[x] = id
      id += 1
    if y not in M:
      M[y] = id
      id += 1
    print(union(s, child, M[x], M[y]))

if __name__ == "__main__":
  t = int(input())
  for i in range(t):
    solve()