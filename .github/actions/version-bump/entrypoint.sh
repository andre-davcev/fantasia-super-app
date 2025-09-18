#!/bin/bash

VERSION="${1}"
TYPE="${2}"

echo "Type: ${TYPE}"

MAJOR=$(echo ${VERSION} | cut -d '.' -f 1)
MINOR=$(echo ${VERSION} | cut -d '.' -f 2)
PATCH=$(echo ${VERSION} | cut -d '.' -f 3 | awk -F '-' '{print $1}')
BUILD=$(echo ${VERSION} | sed 's/-SNAPSHOT+build./-/' | awk -F '-' '{print $2}')

case "$TYPE" in
  build)
    if [[ -z "$BUILD" ]]; then
      BUILD=0
    else
      ((BUILD++))
    fi

    BUILD_VERSION="-SNAPSHOT+build.${BUILD}"
    ;;
  patch)
    ((PATCH++))
    BUILD=0
    ;;
  minor)
    ((MINOR++))
    PATCH=0
    BUILD=0
    ;;
  major)
    ((MAJOR++))
    MINOR=0
    PATCH=0
    BUILD=0
    ;;
esac

VERSION="${MAJOR}.${MINOR}.${PATCH}"
VERSION_FULL="${VERSION}${BUILD_VERSION}"

echo "Version: ${VERSION}"
echo "Build: ${BUILD}"
echo "Version Full: ${VERSION_FULL}"

echo "version=$VERSION" >> $GITHUB_OUTPUT
echo "build=$BUILD" >> $GITHUB_OUTPUT
echo "version-full=$VERSION_FULL" >> $GITHUB_OUTPUT
