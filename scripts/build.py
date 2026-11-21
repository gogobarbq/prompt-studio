from pathlib import Path
import json
import yaml

root = Path(__file__).resolve().parents[1]
data = []
for file in sorted((root / 'prompts').glob('*.md')):
    text = file.read_text(encoding='utf-8')
    if not text.startswith('---\n'):
        raise ValueError(f'Missing YAML front matter: {file}')
    _, front, body = text.split('---', 2)
    meta = yaml.safe_load(front)
    for field in ['id', 'title', 'project', 'tags', 'status', 'description', 'created_at', 'updated_at']:
        if field not in meta:
            raise ValueError(f'{file}: missing {field}')
    if meta['id'] != file.stem:
        raise ValueError(f'{file}: id does not match filename')
    for date_field in ['created_at', 'updated_at']:
        meta[date_field] = str(meta[date_field])
    content = body.strip()
    if content.startswith('# '):
        content = '\n'.join(content.splitlines()[1:]).strip()
    data.append({**meta, 'content': content})
(root / 'docs/prompts.json').write_text(
    json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8'
)
print(f'Built {len(data)} prompts')
