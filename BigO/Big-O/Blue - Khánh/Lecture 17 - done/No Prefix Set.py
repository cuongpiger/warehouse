class Node:
  def __init__(self):
    self.end = False
    self.child = dict()

def addWord(root, s):
  tmp = root
  isPrefix = True

  for i in range(len(s)):
    ch = s[i]
    if ch not in tmp.child:
      isPrefix = False
      tmp.child[ch] = Node()
    elif tmp.child[ch].end == True and i < len(s) - 1:
      return True
    tmp = tmp.child[ch]
  tmp.end = True

  return isPrefix

if __name__ == "__main__":
  root = Node()
  n = int(input())
  for i in range(n):
    s = input()
    if addWord(root, s) == True:
      print("BAD SET")
      print(s)
      exit(0)
  print("GOOD SET")