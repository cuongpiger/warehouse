def bs2(a, x):
  left = 1
  right = len(a) - 1
  res = -1
  while left <= right:
    mid = (left + right) // 2
    if a[mid] >= x:
      res = mid
      right = mid - 1
    else:
      left = mid + 1
  return res

def bs1(a, s, m):
  left = 0
  right = a[len(a) - 1]
  res = 0

  while left <= right:
    mid = (left + right) // 2
    pos = bs2(a, mid)
    sum = s[len(s) - 1] - s[pos - 1] - (len(s) - pos) * mid
    if sum >= m:
      res = mid
      left = mid + 1
    else:
      right = mid - 1
  
  return res

if __name__ == "__main__":
  n, m = map(int, input().split())
  a = list(map(int, input().split()))
  a.append(0)
  a.sort()
  s = [0]
  for i in range(1, n + 1):
    s.append(a[i] + s[i - 1])
  print(bs1(a, s, m))