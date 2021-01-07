from sys import stdin

def solve():
  M = dict()
  cnt = 1
  while True:
    try:
      line = input()
      if line == "":
        break
      if line in M:
        M[line] += 1
      else:
        M[line] = 1
      cnt += 1
    except:
      break
  
  for key, value in sorted(M.items()):
    print(key, "%.4f" %(value / cnt * 100))

if __name__ == "__main__":
  t = int(input())
  input()
  for i in range(t):
    solve()