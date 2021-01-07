def tallestShorter(a, x):
  left = 0
  right = len(a) - 1
  res = -1
  while left <= right:
    mid = (left + right) // 2
    if a[mid] < x:
      res = mid
      left = mid + 1
    else:
      right = mid - 1
  return res

def shortestTaller(a, x):
  left = 0
  right = len(a) - 1
  res = -1
  while left <= right:
    mid = (left + right) // 2
    if a[mid] > x:
      res = mid
      right = mid - 1
    else:
      left = mid + 1
  return res

if __name__ == "__main__":
  n = int(input())
  a = list(map(int, input().split()))
  m = int(input())
  q = list(map(int, input().split()))

  a.sort()
  for x in q:
    pos = tallestShorter(a, x)
    if pos == -1:
      print("X", end = " ")
    else:
     print(a[pos], end = " ")

    pos = shortestTaller(a, x)
    if pos == -1:
      print("X")
    else:
     print(a[pos])
