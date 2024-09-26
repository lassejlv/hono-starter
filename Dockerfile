# Import the base image
FROM oven/bun:latest

# Create app directory and copy the source
WORKDIR /app
COPY . .

# Install dependencies
RUN bun install --no-save

# Expose the port the app runs on.
EXPOSE 8080

# Run the app
CMD ["bun", "src/index.ts"]