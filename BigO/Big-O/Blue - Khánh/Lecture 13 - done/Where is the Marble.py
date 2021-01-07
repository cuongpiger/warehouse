from bisect import bisect_left

def solve(t):
  n, q = map(int, input().split())
  if n == 0 and q == 0:
    exit(0)
  
  a = []
  for i in range(n):
    x = int(input())
    a.append(x)
  a.sort()

  print("CASE# ", t, ":", sep = "")
  for i in range(q):
    x = int(input())
    pos = bisect_left(a, x, 0, n)
    if pos < n and a[pos] == x:
      print(x, "found at", pos + 1)
    else:
      print(x, "not found")

if __name__ == "__main__":
  i = 1
  while True:
    solve(i)
    i += 1
  print("\n")