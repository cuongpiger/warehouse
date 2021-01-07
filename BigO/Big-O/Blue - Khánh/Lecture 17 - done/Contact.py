class Node:
  def __init__(self):
    self.cntWord = 0
    self.child = dict()

def addWord(root, s):
  tmp = root
  for ch in s:
    if ch not in tmp.child:
      tmp.child[ch] = Node()
    tmp = tmp.child[ch]
    tmp.cntWord += 1

def searchWord(root, s):
  tmp = root
  for ch in s:
    if ch not in tmp.child:
      return 0
    tmp = tmp.child[ch]
  return tmp.cntWord

if __name__ == "__main__":
  root = Node()
  n = int(input())

  for i in range(n):
    t, s = input().split()
    if t == 'add':
      addWord(root, s)
    else:
      print(searchWord(root, s))