def solve():
  n, x = map(int, input().split())
  a = list(map(int, input().split()))
  s = set(a)
  if len(s) == x:
    print('Good')
  elif len(s) < x:
    print('Bad')
  elif len(s) > x:
    print('Average')

if __name__ == "__main__":
  t = int(input())
  for i in range(t):
    solve()