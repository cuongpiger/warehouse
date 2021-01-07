class Node:
  def __init__(self):
    self.level = False
    self.cntWord = 0
    self.child = dict()

def addWord(root, s, res):
  tmp = root
  for i in range(len(s)):
    ch = s[i]
    if ch not in tmp.child:
      tmp.child[ch] = Node()
    tmp = tmp.child[ch]
    tmp.level = i + 1
    tmp.cntWord += 1
    res = max(res, tmp.cntWord * tmp.level)
  return res

def solve():
  n = int(input())
  root = Node()
  res = 0
  for i in range(n):
    s = input()
    res = addWord(root, s, res)
  print(res)

if __name__ == "__main__":
  t = int(input())
  for i in range(t):
    print("Case ", i + 1, ": ", sep = "", end = "")
    solve()