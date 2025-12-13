.PHONY: all build run

all:
	build

build:
	@echo "Building the server"
	$(MAKE) -C backend

run:
	@echo "Running the server\033";
	./backend/server & echo $$! > server.pid

stop:
	@echo "Stopping server"
	-kill $$(cat server.pid)
	-rm -f server.pid

clean:
	$(MAKE) -C backend clean
	rm -f server.pid