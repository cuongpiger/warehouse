if __name__ == "__main__":
  M = dict()
  n = int(input())
  for i in range(n):
    s = input()
    if s in M:
      M[s] += 1
    else:
      M[s] = 1
  res = ""
  for key, value in M.items():
    if res == "":
      res = key
    else:
      if value > M[res]:
        res = key
  print(res)