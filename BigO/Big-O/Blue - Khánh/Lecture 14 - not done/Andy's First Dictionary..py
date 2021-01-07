if __name__ == "__main__":
  S = set()
  while True:
    try:
      line = input()
      s = ""
      for ch in line:
        if ch.isalpha():
          s = s + ch
        else:
          S.add(s)
          s = ""
    except:
      break
  for key in S:
    print(key)