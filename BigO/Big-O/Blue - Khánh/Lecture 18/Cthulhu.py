class Node:
  def __init__(self, parent, rank):
    self.parent = parent
    self.rank = rank

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
    return True
  return False

if __name__ == "__main__":
  n, m = map(int, input().split())
  if n != m:
    print("NO")
    exit(0)
  s = []
  for i in range(n + 1):
    s.append(Node(i, 0))
  cnt = 0
  for i in range(m):
    u, v = map(int, input().split())
    if union(s, u, v) == False:
      cnt += 1
  if cnt == 1:
    print("FHTAGN!")
  else:
    print("NO")