.PHONY: all build run deploy

all:
	make build

build:
	@echo "Building the server"
	$(MAKE) -C backend

run:
	@echo "Running the server";
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
	./gradlew assembleDebug
	adb install -r app/build/outputs/apk/debug/app-debug.apk
	adb reverse tcp:1700 tcp:1700
	adb shell am start \
	  -a android.intent.action.VIEW \
	  -d https://127.0.0.1:1700
	adb install app-debug.apk
