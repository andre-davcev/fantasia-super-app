FROM alpine:latest

# Install Git & Bash
RUN apk add --no-cache git
RUN apk add --no-cache bash

# Copy shell to container
COPY entrypoint.sh /entrypoint.sh

# Config
RUN chmod +x /entrypoint.sh
RUN git config --global --add safe.directory /github/workspace

# Run entrypoint script
ENTRYPOINT ["/entrypoint.sh"]
