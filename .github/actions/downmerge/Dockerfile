FROM alpine:latest

# Install Git & Bash
RUN apk add --no-cache git
RUN apk add --no-cache bash

# Copy shell to container
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Run entrypoint script
ENTRYPOINT ["/entrypoint.sh"]
