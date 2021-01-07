def binSearch(a, x, left, right):
  while left <= right:
    mid = (left + right) // 2
    if a[mid] == x:
      return True
    elif a[mid] < x:
      left = mid + 1
    else:
      right = mid - 1
  return False

def solve():
  n, s = map(int, input().split())
  a = list(map(int, input().split()))
  a.sort()
  
  res = 0
  for i in range(n):
    if binSearch(a, s - a[i], i + 1, n - 1):
      res += 1
  print(res)

if __name__ == "__main__":
  t = int(input())
  for i in range(t):
    solve()