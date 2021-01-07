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

def solve():
  n = int(input())
  s = []
  for i in range(0, n + 1):
    s.append(Node(i, 0))
  
  success = 0
  unsuccess = 0
  while True:
    try:
      q, u, v = input().split()
      u = int(u)
      v = int(v)
      if q == "c":
        union(s, u, v)
      else:
        ru = findRoot(s, u)
        rv = findRoot(s, v)
        if ru != rv:
          unsuccess += 1
        else:
          success += 1
    except:
      break
  print(success, unsuccess, sep = ",")

if __name__ == "__main__":
  t = int(input())
  input()
  for i in range(t):
    solve()