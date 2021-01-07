f = open('tmp.txt', 'r');

script = f.read()
script = script.replace('\n\n', ' ')
script = script.replace('. ', '.\n\n')

f.close();



f = open('fmt.md', 'w');
f.write(script)
f.close()


print(script)