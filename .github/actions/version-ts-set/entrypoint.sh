#!/bin/bash

VERSION="${1}"
FILE="${2}"
TOKEN="${3}"

echo "Version: $VERSION"
echo "Path: $FILE"
echo "Token: $TOKEN"
echo

echo "export const ${TOKEN} = '${VERSION}';" > "${FILE}"

echo "Updated ${FILE} to version ${VERSION}"
