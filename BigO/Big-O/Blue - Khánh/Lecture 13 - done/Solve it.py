from sys import stdin
from math import exp, sin, cos, tan

def f(p, q, r, s, t, u, x):
  return p*exp(-x) + q*sin(x) + r*cos(x) + s*tan(x) + t*x*x + u

def solve(p, q, r, s, t, u):
  low = 0.0
  hight = 1.0

  while abs(low - hight) >= 1e-9:
    mid = (low + hight) / 2
    if f(p, q, r, s, t, u, mid) - 0.0 > 0:
      low = mid
    else:
      hight = mid

  return low

if __name__ == "__main__":
  for line in stdin:
    if line == "" or line == '\n':
      break
    p, q, r, s, t, u = map(int, line.split())
    if f(p, q, r, s, t, u, 0) * f(p, q, r, s, t, u, 1) > 0:
      print("No solution")
    else:
      print("%.4f" %solve(p, q, r, s, t, u))