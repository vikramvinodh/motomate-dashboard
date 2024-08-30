dev:
	BUILDKIT_PROGRESS=plain docker compose --file docker/docker-compose.dev.yml up --force-recreate --no-deps --build --remove-orphans