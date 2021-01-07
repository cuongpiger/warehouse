from math import sqrt

n, s = map(int, input().split())
M = dict()
for i in range(n):
  x, y, k = map(int, input().split())
  if x*x + y*y in M:
    M[x*x + y*y] += k
  else:
    M[x*x + y*y] = k
for key, value in sorted(M.items()):
  s += value
  if s >= 1000000:
    print("%.10f" %sqrt(key))
    exit(0)
print(-1)