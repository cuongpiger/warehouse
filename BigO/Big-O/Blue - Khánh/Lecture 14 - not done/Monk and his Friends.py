def solve():
  n, m = map(int, input().split())
  a = list(map(int, input().split()))
  s = set()
  for i in range(n):
    s.add(a[i])
  for i in range(m):
    if a[n + i] in s:
      print("YES")
    else:
      print("NO")
      s.add(a[n + i])

if __name__ == "__main__":
  t = int(input())
  for i in range(t):
    solve()