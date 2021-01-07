def canClimb(a, k):
  for i in range(len(a)):
    if k < 0 or a[i] - a[i - 1] > k:
      return False
    if a[i] - a[i - 1] == k:
      k -= 1
  return True

def solve():
  n = int(input())
  a = list(map(int, input().split()))
  a.sort()

  left = 1
  right = 10000000

  res = -1
  while left <= right:
    mid = (left + right) // 2
    if canClimb(a, mid):
      res = mid
      right = mid - 1
    else:
      left = mid + 1
  
  print(res)

if __name__ == "__main__":
  t = int(input())
  for i in range(1, t + 1):
    print("Case ", i, ": ", sep = "", end = "")
    solve()