import sys

class pair:
  def __init__(self, first, second):
    self.first = first
    self.second  = second

  def __lt__(self, other):
    return self.first < other.first

def Try(i, s, cnt, a, res):
  if cnt.first == len(a):
    return
  if i == a[cnt.first].first:
    res[a[cnt.first].second] = s
    cnt.first += 1
    return
  Try(i + 1, s + "0", cnt, a, res)
  Try(i + 1, s + "1", cnt, a, res)

if __name__ == "__main__":
  sys.setrecursionlimit(1500)
  n = int(input())
  x = list(map(int, input().split()))
  a = []
  for i in range(n):
    a.append(pair(x[i], i))
  res = [""] * n
  s = ""
  cnt = pair(0, 0)
  Try(0, s, cnt, a, res)
  for s in res:
    if s == "":
      print("NO")
      exit(0)
  print("YES")
  for s in res:
    print(s)