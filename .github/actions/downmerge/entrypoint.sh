#!/bin/bash

BRANCH_SOURCE="${1}"
BRANCH_TARGET="${2}"
COMMIT_MESSAGE="${3}"

echo "Source Branch: $BRANCH_SOURCE"
echo "Target Branch: $BRANCH_TARGET"
echo "Commit Message: $COMMIT_MESSAGE"
echo

git checkout ${BRANCH_TARGET}  # Checkout target branch
git merge ${BRANCH_SOURCE} -m "${COMMIT_MESSAGE}" # Merge in source branch
git push origin ${BRANCH_TARGET}  # Push changes to the remote
