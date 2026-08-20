# @trshcmpctr/scaffold

Quickly generate new package boilerplate.

## Usage

```sh
rush scaffold
```

## Customizing Packages

Scaffold generates a minimal node library so some customization may be necessary.

### Build Output Caching

> See docs on Rush [build cache](https://rushjs.io/pages/maintainer/build_cache/).

To enable `build` output caching,
add a file at `<project-path>/config/rush-project.json` with the relative output folder name:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/rush/v5/rush-project.schema.json",
  "operationSettings": [
    {
      "operationName": "build",
      "outputFolderNames": ["dist", "lib"]
    }
  ]
}
```

> See template for [rush-project.json](https://rushjs.io/pages/configs/rush-project_json/).
