### Publish
(if actions fails)

```bash
npx changeset
```

Fill summary. If you want to add more details to the changelog, you can edit file created in `.changeset` folder.

After, run to bump version.

```bash
npx changeset version
```

It will create CHANGELOG.md and change package version. Commit it and push to remote.

After, just publish.

```bash
npx changeset publish
```
