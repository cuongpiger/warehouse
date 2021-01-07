s = set()

n = int(input())
for i in range(n):
  x = int(input())
  s.add(x)

res = 0
m = int(input())
for i in range(m):
  x = int(input())
  if x in s:
    res += 1

print(res)