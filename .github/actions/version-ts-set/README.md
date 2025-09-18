# Pom and Changelog Version Updater

This action is used to update a ts file in your project which exports the app version number

## Inputs

### `version`

> **Description:** Version number to explicitly set
> **Options:** string > **Required** : true

### `path`

> **Description:** Location of version file
> **Options:** string
> **Default:** `version.ts` > **Required** : false

### `token`

> **Description:** Token to be exported in ts file
> **Options:** string
> **Default:** `VERSION` > **Required** : false

## Example usage

```yaml
- name: ts-version-set
  id: ts-version-get
  uses: andre-davcev/fantasia-super-app/.github/actions/ts-version-set
  with:
    version: 2.0.0-SNAPSHOT+build.1
    file: ts-project/pom.xml
    token: VERSION
```
