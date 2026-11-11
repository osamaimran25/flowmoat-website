"""Small helpers for run.sh: keyword queue and post metadata.
Prints shell assignments (quoted with shlex) where run.sh evals the output."""
import json
import re
import shlex
import sys

cmd, *args = sys.argv[1:]

if cmd == "pending":
    for k in json.load(open(args[0])):
        if k["status"] == "pending":
            print(k["slug"])

elif cmd == "keyword":
    k = next(k for k in json.load(open(args[0])) if k["slug"] == args[1])
    print(f"KEYWORD={shlex.quote(k['keyword'])} SERVICE={shlex.quote(k['service'])} LINKS={shlex.quote(', '.join(k['links']))}")

elif cmd == "done":
    ks = json.load(open(args[0]))
    for k in ks:
        if k["slug"] == args[1]:
            k["status"] = "done"
    open(args[0], "w").write(json.dumps(ks, indent=2) + "\n")

elif cmd == "clean":
    # Keep only the Markdown file: drop text before the frontmatter and a wrapping code fence
    s = open(args[0]).read()
    s = s[s.index("---"):].rstrip()
    s = re.sub(r"\n```$", "", s).rstrip() + "\n"
    if not re.match(r"---\n(.*\n)*?---\n", s):
        sys.exit("No frontmatter in Claude's output")
    open(args[1], "w").write(s)

elif cmd == "meta":
    fm = open(args[0]).read().split("---")[1]
    get = lambda key: re.search(rf'^{key}:\s*"?(.*?)"?\s*$', fm, re.M).group(1)
    sub = get("excerpt").split(". ")[0].rstrip(".") + "."
    print(f"TITLE={shlex.quote(get('title'))} SUB={shlex.quote(sub)} MINUTES={shlex.quote(get('readingTime'))}")
