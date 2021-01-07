def check(a, e, k):
  need = 0.0
  have = 0.0
  for x in a:
    if x > e:
      have += x - e
    else:
      need += e - x
  if have - have * k / 100 >= need:
    return True
  else:
    return False

def bs(a, k):
  low = 0.0
  hight = 1000.0
  res = 0.0
  while abs(low - hight) >= 1e-9:
    mid = (low + hight) / 2
    if check(a, mid, k):
      res = mid
      low = mid
    else:
      hight = mid
  return res

if __name__ == "__main__":
  n, k = map(int, input().split())
  a = list(map(int, input().split()))
  print("%.6f" %bs(a, k))