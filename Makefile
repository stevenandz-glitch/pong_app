.PHONY: all build run deploy

all:
	make build

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

deploy:
	make build
	make run
	adb reverse tcp:5500 tcp:5500
	adb shell am start \
		-a android.intent.action.VIEW \
		-d http://localhost:5500