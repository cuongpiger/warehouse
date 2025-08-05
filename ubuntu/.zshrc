# The extending of the default .zshrc file

# Clean all unnecessary branches in git, except main and the active branches
# OS: All
function gitCleanBranches() {
  git branch | grep -vE "$(git symbolic-ref --short HEAD)|main" | xargs -n 1 git branch -D
}

# Using the below command to save image from clipboard to the first argument
# OS: MacOS
function si() {
  if [ -z "$1" ]; then
    echo "Usage: si <filename>"
    return 1
  fi

  python3 - <<END
import sys
from PIL import ImageGrab, Image

clip = ImageGrab.grabclipboard()
if clip is None:
    print("No image found in clipboard.")
    sys.exit(1)
clip.save("${1}.png")
print("Image saved to ${1}.png")
END
}
