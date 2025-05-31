import os

def read_prompt_file(filename):
    with open(os.path.join("prompts", filename), "r", encoding="utf-8") as f:
        return f.read().strip()

