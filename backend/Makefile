CXX =  g++
CXXFLAGS = -Icrow/include -pthread -std=c++20 -O2 -Wall
LIBS = -lssl -lcrypto -lpthread
SRC = server.cc
OUT = server

all: $(OUT)

$(OUT) : $(SRC)
	$(CXX) $(CXXFLAGS) $(SRC) -o $(OUT) $(LIBS)

clean:
	rm -f $(OUT)