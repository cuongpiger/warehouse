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
    if tmp.end == True:
      return False
  tmp.end = True
  return True

if __name__ == "__main__":
  root = Node()
  n = int(input())
  for i in range(n):
    s = input()
    if addWord(root, s) == False:
      print("vulnerable")
      exit(0)
  print("non vulnerable")