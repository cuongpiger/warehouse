if __name__ == "__main__":
  n, x0, y0 = map(int, input().split())
  s = set()
  for i in range(n):
    x, y = map(int, input().split())
    if y != y0:
      s.add((x - x0)/(y - y0))
    else:
      s.add(1e-8)
  print(len(s))