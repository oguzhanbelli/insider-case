# Horse Racing Game - Docker Commands

.PHONY: help build run dev stop clean logs test docker-test

# Default target
help:
	@echo "Available commands:"
	@echo "  make build     - Build production Docker image"
	@echo "  make run       - Run production container"
	@echo "  make dev       - Start development container with hot reload"
	@echo "  make stop      - Stop all containers"
	@echo "  make clean     - Remove containers and images"
	@echo "  make logs      - View container logs"
	@echo "  make test      - Run tests in container"
	@echo "  make docker-test - Test Docker build"

# Build production image
build:
	docker-compose build horse-racing-game

# Run production container
run:
	docker-compose up

# Start development container
dev:
	docker-compose --profile dev up

# Stop all containers
stop:
	docker-compose down

# Clean up containers and images
clean:
	docker-compose down -v --rmi all
	docker system prune -f

# View logs
logs:
	docker-compose logs -f

# Run tests
test:
	docker run --rm -v $(PWD):/app -w /app node:20-alpine sh -c "npm install && npm run test:run"

# Test Docker build
docker-test:
	docker build -t horse-racing-test .
	docker run --rm -p 8081:80 horse-racing-test &
	sleep 5
	curl -f http://localhost:8081 || (echo "Docker test failed" && exit 1)
	docker stop $$(docker ps -q --filter ancestor=horse-racing-test)
	docker rmi horse-racing-test
