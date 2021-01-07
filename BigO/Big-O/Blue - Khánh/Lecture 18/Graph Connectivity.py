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

def solve():
  n = input()
  n = ord(n) - ord("A") + 1
  s = []
  for i in range(n):
    s.append(Node(i, 0))
  while True:
    try:
      uv = input()
      if uv == "\n" or uv == "":
        break
      u, v = uv[0], uv[1]
      u = ord(u) - ord("A")
      v = ord(v) - ord("A")
      union(s, u, v)
    except:
      break
  
  c = set()
  for i in range(n):
    c.add(findRoot(s, i))
  print(len(c))

if __name__ == "__main__":
  t = int(input())
  input()
  for i in range(t):
    if i != 0:
      print("")
    solve()