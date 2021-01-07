class Node:
  def __init__(self):
    self.end = False
    self.child = dict()

def addWord(root, s):
  tmp = root
  for ch in s:
    if ch not in tmp.child:
      tmp.child[ch] = Node()
    tmp = tmp.child[ch]
  tmp.end = True

def searchWord(root, s):
  tmp = root
  for ch in s:
    tmp = tmp.child[ch]
  return len(tmp.child)
      
def solve():
  n = int(input())
  root = Node()
  a = []
  
  for i in range(n):
    s = input()
    a.append(s)
    addWord(root, s)
  
  for s in a:
    if searchWord(root, s) > 0:
      print("NO")
      return
  
  print("YES")

if __name__ == "__main__":
  t = int(input())
  for i in range(t):
    print("Case ", i + 1, ": ", sep = "", end = "")
    solve()