class Node:
  def __init__(self):
    self.value = 0
    self.child = dict()

def addWord(root, s, value):
  tmp = root
  for ch in s:
    if ch not in tmp.child:
      tmp.child[ch] = Node()
    tmp = tmp.child[ch]
    tmp.value = max(tmp.value, value)

def searchWord(root, s):
  tmp = root
  for ch in s:
    if ch not in tmp.child:
      return -1
    tmp = tmp.child[ch]
  return tmp.value
      
if __name__ == "__main__":
  n, q = map(int, input().split())
  root = Node()
  
  for i in range(n):
    s, value = input().split()
    value = int(value)
    addWord(root, s, value)
  
  for i in range(q):
    s = input()
    print(searchWord(root, s))